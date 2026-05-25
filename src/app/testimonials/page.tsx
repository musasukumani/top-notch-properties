import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Testimonials — Top Notch Properties" };
export default function TestimonialsPage() {
  return <ComingSoonPage title="Client Stories" description="Hear what our clients say about their experience with Top Notch Properties." />;
}
