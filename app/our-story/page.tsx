import type { Metadata } from "next";
import OurStoryExperience from "@/components/story/OurStoryExperience";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Discover the heart, journey, and coffee philosophy behind HOLA Coffee.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return <OurStoryExperience />;
}
