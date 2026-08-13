import Hero from "@/components/Hero";
import WhyChooseHola from "@/components/WhyChooseHola";
import FeaturedSection from "@/components/FeaturedSection";
import RewardsPreview from "@/components/RewardsPreview";
import WaveDivider from "@/components/WaveDivider";
import PromotionsSection from "@/components/home/PromotionsSection";
import HomepageVideoSection from "@/components/home/HomepageVideoSection";
import GallerySection from "@/components/home/GallerySection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getSettings } from "@/actions/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <Hero />
      <WaveDivider color="var(--hola-beige)" />
      <WhyChooseHola />
      <FeaturedSection />
      <WaveDivider color="var(--hola-blue-dark)" />
      <RewardsPreview />
      <PromotionsSection />
      <HomepageVideoSection url={settings.homepageVideoUrl} type={settings.homepageVideoType} />
      <GallerySection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
