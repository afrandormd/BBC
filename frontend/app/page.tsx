import FeaturedProductSection from "@/components/fragments/FeaturedProductSection";
import HeroSection from "@/components/fragments/HeroSection";
import Superiority from "@/components/fragments/SuperioritySection";

export default function Home() {
  return (
    <>
      {/* Bagian Hero Section */}
      <HeroSection />
      {/* Bagian Product Section */}
      <FeaturedProductSection />
      {/* Bagian Superiority Sectin  */}
      <Superiority />
    </>
  );
}
