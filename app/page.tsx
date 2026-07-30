import Hero from "@/components/Hero";
import WhyChooseHola from "@/components/WhyChooseHola";
import FeaturedSection from "@/components/FeaturedSection";
import RewardsPreview from "@/components/RewardsPreview";
import WaveDivider from "@/components/WaveDivider";
import PromotionsSection from "@/components/home/PromotionsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WaveDivider color="var(--hola-beige)" />
      <WhyChooseHola />
      <FeaturedSection />
      <WaveDivider color="var(--hola-blue-dark)" />
      <RewardsPreview />
      <PromotionsSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
