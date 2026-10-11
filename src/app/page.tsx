import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { EngineeringValues } from "@/components/sections/engineering-values";
import { FocusAreas } from "@/components/sections/focus-areas";
import { getLatestPosts } from "@/lib/blog";

const WorkLifeMap = dynamic(() =>
  import("@/components/sections/work-life-map").then((mod) => mod.WorkLifeMap)
);
const FeaturedProjects = dynamic(() =>
  import("@/components/sections/featured-projects").then((mod) => mod.FeaturedProjects)
);
const OperatingSystem = dynamic(() =>
  import("@/components/sections/operating-system").then((mod) => mod.OperatingSystem)
);
const ThoughtLeadership = dynamic(() =>
  import("@/components/sections/thought-leadership").then((mod) => mod.ThoughtLeadership)
);
const WhatIWorkWith = dynamic(() =>
  import("@/components/sections/what-i-work-with").then((mod) => mod.WhatIWorkWith)
);
const Skills = dynamic(() =>
  import("@/components/sections/skills").then((mod) => mod.Skills)
);
const Timeline = dynamic(() =>
  import("@/components/sections/timeline").then((mod) => mod.Timeline)
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact)
);
const FAQSection = dynamic(() => import("@/components/schema/FAQSection"));

export default function HomePage() {
  const posts = getLatestPosts(6);

  return (
    <>
      <Hero />
      <WorkLifeMap />
      <About />
      <EngineeringValues />
      <FocusAreas />
      <FeaturedProjects />
      <OperatingSystem />
      <ThoughtLeadership posts={posts} />
      <WhatIWorkWith />
      <Skills />
      <Timeline />
      <Contact />
      <FAQSection />
    </>
  );
}
