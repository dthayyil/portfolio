import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const PROFILE_HANDLE = "deepakthayyil";
const ARTICLES_URL = `https://www.linkedin.com/in/${PROFILE_HANDLE}/recent-activity/articles/`;
const ALL_ACTIVITY_URL = `https://www.linkedin.com/in/${PROFILE_HANDLE}/recent-activity/all/`;
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_FILE = path.join(BLOG_DIR, "linkedin-articles.json");
const USER_DATA_DIR = path.join(process.cwd(), ".playwright-session");

// Parse relative LinkedIn time strings like "3d", "2w", "1mo", "1 yr ago"
function parseRelativeTime(str) {
  if (!str) return new Date().toISOString();
  const now = new Date();
  const match = str.match(/(\d+)\s*(m|h|d|w|mo|yr)/i);
  if (!match) return now.toISOString();

  const num = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  if (unit === "m") now.setMinutes(now.getMinutes() - num);
  else if (unit === "h") now.setHours(now.getHours() - num);
  else if (unit === "d") now.setDate(now.getDate() - num);
  else if (unit === "w") now.setDate(now.getDate() - num * 7);
  else if (unit === "mo") now.setMonth(now.getMonth() - num);
  else if (unit === "yr") now.setFullYear(now.getFullYear() - num);

  return now.toISOString();
}

function cleanSlug(title, index) {
  if (!title) return `linkedin-article-${index + 1}`;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `linkedin-${slug.slice(0, 50)}`;
}

async function scrapeLinkedIn() {
  console.log("=================================================");
  console.log(`[LinkedIn Scraper] Target: ${ARTICLES_URL}`);
  console.log(`[LinkedIn Scraper] Storing session in: ${USER_DATA_DIR}`);
  console.log("=================================================");

  const isHeadless = false; //process.argv.includes("--headless");

  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  // Launch persistent context so LinkedIn cookies / login remain saved between runs
  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: isHeadless,
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  async function checkIsLoggedIn() {
    const cookies = await context.cookies();
    return cookies.some((c) => c.name === "li_at" && c.value && c.value.length > 10);
  }

  try {
    console.log(`[LinkedIn Scraper] Navigating directly to articles page: ${ARTICLES_URL}`);
    await page.goto(ARTICLES_URL, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(4000);

    const currentUrl = page.url();
    const isBlocked = currentUrl.includes("/authwall") || currentUrl.includes("/login");

    if (isBlocked && !(await checkIsLoggedIn())) {
      console.log("\n========================================================");
      console.log("[LinkedIn Scraper] LinkedIn login required.");
      console.log("Please log in in the opened browser window.");
      console.log("Waiting up to 3 minutes for you to complete login/2FA...");
      console.log("========================================================\n");

      await page.goto("https://www.linkedin.com/login", { waitUntil: "domcontentloaded" });

      const startTime = Date.now();
      while (Date.now() - startTime < 180000) {
        if (await checkIsLoggedIn()) {
          console.log("\n[Notice] Login detected successfully! Session saved.");
          await page.waitForTimeout(3000);
          break;
        }
        await page.waitForTimeout(2000);
      }

      console.log(`[LinkedIn Scraper] Loading articles page: ${ARTICLES_URL}`);
      await page.goto(ARTICLES_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(4000);
    }

    // Scroll down to load all published articles
    console.log("[LinkedIn Scraper] Scrolling to load articles...");
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 1200));
      await page.waitForTimeout(1500);
    }

    console.log("[LinkedIn Scraper] Extracting article metadata...");

    const scrapedArticles = await page.evaluate(() => {
      const results = [];
      const seenUrls = new Set();

      // Look for pulse article cards or feed updates
      const articleAnchors = document.querySelectorAll(
        'a[href*="/pulse/"], a[href*="/article/"], div.feed-shared-update-v2'
      );

      // 1. Direct Pulse article anchors
      const pulseLinks = document.querySelectorAll('a[href*="/pulse/"], a[href*="/article/"]');
      pulseLinks.forEach((a) => {
        const url = a.href.split("?")[0];
        if (seenUrls.has(url)) return;
        seenUrls.add(url);

        const container = a.closest("li, div.feed-shared-update-v2, .profile-creator-shared-feed-update__container") || a.parentElement;
        const title = a.innerText.trim() || a.getAttribute("aria-label") || container?.querySelector("h3, h2, strong")?.innerText?.trim() || "";
        const description = container?.querySelector(".feed-shared-update-v2__description, .feed-shared-inline-show-more-text, p")?.innerText?.trim() || "";
        const timeText = container?.querySelector("time, .feed-shared-actor__sub-description, .update-components-actor__sub-description")?.innerText?.trim() || "";

        if (title && title.length > 5) {
          results.push({
            title: title.split("\n")[0].trim(),
            link: url,
            description: description.replace(/\s+/g, " ").slice(0, 240) + (description.length > 240 ? "..." : ""),
            timeText,
          });
        }
      });

      // 2. Feed cards with article/newsletter components
      const cards = document.querySelectorAll(
        "li.profile-creator-shared-feed-update__container, div.feed-shared-update-v2"
      );

      cards.forEach((card) => {
        const linkElem = card.querySelector('a[href*="/pulse/"], a[href*="/article/"], a.app-aware-link[href*="activity"]');
        if (!linkElem) return;

        const url = linkElem.href.split("?")[0];
        if (seenUrls.has(url)) return;
        seenUrls.add(url);

        const titleElem = card.querySelector("h3, h2, .update-components-article__title, .feed-shared-article__title, strong");
        const title = titleElem ? titleElem.innerText.trim() : linkElem.innerText.trim();
        const descElem = card.querySelector(".feed-shared-update-v2__description, .feed-shared-inline-show-more-text, p");
        const description = descElem ? descElem.innerText.trim() : "";
        const timeElem = card.querySelector("time, .feed-shared-actor__sub-description, .update-components-actor__sub-description");
        const timeText = timeElem ? timeElem.innerText.trim() : "";

        if (title && title.length > 5) {
          results.push({
            title: title.split("\n")[0].trim(),
            link: url,
            description: description.replace(/\s+/g, " ").slice(0, 240) + (description.length > 240 ? "..." : ""),
            timeText,
          });
        }
      });

      return results;
    });

    console.log(`[LinkedIn Scraper] Found ${scrapedArticles.length} raw articles.`);

    if (scrapedArticles.length > 0) {
      const formatted = scrapedArticles.map((art, idx) => ({
        slug: cleanSlug(art.title, idx),
        title: art.title,
        description: art.description || `Read full article by Deepak Thayyil on LinkedIn.`,
        date: parseRelativeTime(art.timeText),
        category: "LinkedIn Article",
        tags: ["LinkedIn", "Thought Leadership"],
        readingTime: "5 min read",
        featured: idx < 2,
        externalUrl: art.link,
        source: "linkedin",
      }));

      // Sort newest first
      formatted.sort((a, b) => +new Date(b.date) - +new Date(a.date));

      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formatted, null, 2), "utf8");
      console.log(`[LinkedIn Scraper] Successfully wrote ${formatted.length} articles to:`);
      console.log(` -> ${OUTPUT_FILE}`);
    } else {
      console.log(`[LinkedIn Scraper] No new articles scraped. Preserving existing articles in ${OUTPUT_FILE}`);
    }
  } catch (err) {
    console.error("[LinkedIn Scraper] Error during scraping:", err.message);
  } finally {
    await context.close();
    console.log("[LinkedIn Scraper] Done.");
  }
}

scrapeLinkedIn();
