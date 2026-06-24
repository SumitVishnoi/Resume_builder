import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsStrip from "@/components/landing/StatsStrip";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";


export default function LandingPage() {

  return (
    <main
      className="min-h-screen bg-[#FAFAFA] text-[#111318]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navbar />
      <Hero />
      <StatsStrip />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
