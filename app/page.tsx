import Hero from "@/components/Hero";
import WhyChooseHola from "@/components/WhyChooseHola";
import FeaturedSection from "@/components/FeaturedSection";
import RewardsPreview from "@/components/RewardsPreview";
import PromotionsSection from "@/components/home/PromotionsSection";
import HomepageVideoSection from "@/components/home/HomepageVideoSection";
import GallerySection from "@/components/home/GallerySection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getSettings } from "@/actions/settings";
import { getApprovedMoments } from "@/actions/moments";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "HOLA Coffee | Find Your Happy Sip",
  description: "Handcrafted coffee, crave-worthy treats, rewarding visits, and warm moments at HOLA Coffee.",
};

export default async function HomePage() {
  const [settings, moments] = await Promise.all([getSettings(), getApprovedMoments()]);

  return (
    <>
      <Hero />
      <WhyChooseHola />
      <FeaturedSection />
      <RewardsPreview />
      <PromotionsSection />
      <HomepageVideoSection url={settings.homepageVideoUrl} type={settings.homepageVideoType} />
      <GallerySection moments={moments} />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
