import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Cookie Policy — Top Notch Properties" };
export default function CookiesPage() {
  return <ComingSoonPage title="Cookie Policy" description="Information about how we use cookies on this website." />;
}
