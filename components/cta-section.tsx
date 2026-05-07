import { getAllTestimonialsAsync } from "@/lib/cms";
import CTASectionView from "./cta-section-view";

export default async function CTASection() {
  const testimonials = await getAllTestimonialsAsync();
  return <CTASectionView testimonials={testimonials} />;
}
