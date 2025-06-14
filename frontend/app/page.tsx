import FeaturedProductSection from "@/components/fragments/FeaturedProductSection";
import HeroSection from "@/components/fragments/HeroSection";
import Superiority from "@/components/fragments/SuperioritySection";
import Testimonial from "@/components/fragments/TestimonialSection";

export default function Home() {
  return (
    <>
      {/* Bagian Hero Section */}
      <HeroSection />
      {/* Bagian Product Section */}
      <FeaturedProductSection />
      {/* Bagian Superiority Sectin  */}
      <Superiority />
       {/* Bagian Testimonial Section */}
      <Testimonial />
    </>
  );
}
