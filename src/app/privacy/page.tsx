import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Privacy Policy — Top Notch Properties" };
export default function PrivacyPage() {
  return <ComingSoonPage title="Privacy Policy" description="How we collect, use, and protect your personal data." />;
}
