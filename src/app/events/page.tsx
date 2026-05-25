import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Events — Top Notch Properties" };
export default function EventsPage() {
  return <ComingSoonPage title="Events" description="Property showcases, open days, and industry events. Check back soon." />;
}
