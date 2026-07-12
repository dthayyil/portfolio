import { Hero } from "@/components/sections/hero";
import { WorkLifeMap } from "@/components/sections/work-life-map";
import { About } from "@/components/sections/about";
import { EngineeringValues } from "@/components/sections/engineering-values";
import { FocusAreas } from "@/components/sections/focus-areas";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ThoughtLeadership } from "@/components/sections/thought-leadership";
import { WhatIWorkWith } from "@/components/sections/what-i-work-with";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { OperatingSystem } from "@/components/sections/operating-system";
import { Contact } from "@/components/sections/contact";
import { getLatestPosts } from "@/lib/blog";

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
    </>
  );
}
