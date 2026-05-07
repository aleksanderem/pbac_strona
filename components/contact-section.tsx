import { getAllTestimonialsAsync } from "@/lib/cms";
import ContactSectionView from "./contact-section-view";

export default async function ContactSection() {
  const testimonials = await getAllTestimonialsAsync();
  return <ContactSectionView testimonials={testimonials} />;
}
