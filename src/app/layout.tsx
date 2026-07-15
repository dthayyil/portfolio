import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Principal Software Engineer | Cloud Architect | AI-Native Engineering`,
    template: `%s · ${site.name}`,
  },
  description:
    "Principal Software Engineer & Cloud Architect helping organisations modernise software delivery through Platform Engineering, AI-Augmented Development (AI-DLC), Cloud-Native Architecture and Intelligent Automation.",
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} — AI-Native Engineering`,
    title: `${site.name} — Principal Software Engineer | Cloud Architect`,
    description:
      "Building the future of AI-native engineering: Platform Engineering, AI-DLC, GitHub Copilot enablement, Cloud-Native Architecture and DevOps governance.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Principal Software Engineer | Cloud Architect`,
    description:
      "AI-Native Engineering Leader — Platform Engineering, AI-DLC, GitHub Copilot, Cloud-Native Architecture.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/deepak-profile.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Principal Software Engineer",
  url: site.url,
  sameAs: [site.socials.linkedin, site.socials.github],
  knowsAbout: site.keywords,
  description:
    "Principal Software Engineer and Cloud Architect specialising in AI-DLC, Platform Engineering and Cloud-Native Architecture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        {GA_TRACKING_ID ? (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script id="gtag-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_TRACKING_ID}', {
  page_path: window.location.pathname,
});`}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
