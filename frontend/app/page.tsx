import FeaturedProductSection from "@/components/fragments/FeaturedProductSection";
import HeroSection from "@/components/fragments/HeroSection";
import Superiority from "@/components/fragments/SuperioritySection";
import Testimonial from "@/components/fragments/TestimonialSection";
import AboutSection from "@/components/fragments/AboutSection";

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
      {/* Bagian About Section */}
      <AboutSection />
    </>
  );
}
