import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "About Us — Top Notch Properties" };
export default function AboutPage() {
  return <ComingSoonPage title="About Us" description="Learn about our story, mission, and the team behind Top Notch Properties." />;
}
