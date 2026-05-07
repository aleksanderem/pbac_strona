import { getAllTestimonialsAsync } from "@/lib/cms";
import TestimonialsSectionView from "./testimonials-section-view";

export default async function TestimonialsSection() {
  const testimonials = await getAllTestimonialsAsync();
  return <TestimonialsSectionView testimonials={testimonials} />;
}
