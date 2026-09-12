import { FAQ } from "lucide-react";
import { Section } from "@/components/ui/section";

export const FAQ_DATA = [
  {
    question: "What is your primary expertise as a Software Engineer?",
    answer:
      "I specialize as a Principal Software Engineer and Cloud Architect with 15+ years of experience in designing enterprise-grade software. My expertise spans .NET Core microservices, Kubernetes-based platform engineering, AI-augmented development workflows (AI-DLC), and Cloud-Native Architecture on AWS and Azure platforms.",
  },
  {
    question: "What is AI-Driven Development Lifecycle (AI-DLC) and how do you implement it?",
    answer:
      "AI-DLC treats AI as a first-class participant in the software development lifecycle with guardrails, not just autocomplete. I help organizations implement AI-DLC through governed GitHub Copilot enablement, agentic workflows for automation, AI-assisted release governance, and platform engineering practices that accelerate delivery while maintaining quality and security.",
  },
  {
    question: "Are you open to opportunities in Europe with visa sponsorship?",
    answer:
      "Yes, I am actively seeking Software Architect / Principal Engineer roles in Europe and am open to visa sponsorship & relocation. My background in healthcare domain (medical device firmware gateway, FDA-regulated environment) provides unique expertise for digital health and property-tech sectors.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "I focus on digital health, property-tech, and e-commerce domains. My healthcare background includes experience with medical device firmware gateways, BDL, Wi-Fi connectivity, and FDA-regulated environments. I've also built B2C/B2B e-commerce platforms with Apache Solr search and property/facilities management platforms using ReactJS.",
  },
  {
    question: "What cloud platforms and DevOps tools do you work with?",
    answer:
      "I work extensively with AWS (EC2, RDS, ECS) and Azure, along with Kubernetes, Docker, Azure DevOps, GitHub Actions, and Jenkins. My expertise includes infrastructure-as-code, microservices architecture, event-driven systems, and implementing 12-factor app principles.",
  },
  {
    question: "How do you approach platform engineering and developer productivity?",
    answer:
      "I build self-service golden paths using Kubernetes and Helm that reduce cognitive load and lead time. My approach includes creating IDP (Internal Developer Platforms), implementing DX metrics, automation, and tooling that enables measurable flow: shorter lead time, higher deploy frequency, and reduced toil for engineering teams.",
  },
];

export default function FAQSection() {
  return (
    <Section
      id="faq"
      title="Frequently Asked Questions"
      className="pb-20"
    >
      <div className="grid max-w-3xl mx-auto gap-6">
        {FAQ_DATA.map(({ question, answer }, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <FAQ className="h-4 w-4 text-brand" />{question}
            </h3>
            <p className="text-fg-muted leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>
      
      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_DATA.map(({ question, answer }) => ({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": answer,
            },
          })),
        })}
      </script>
    </Section>
  );
}