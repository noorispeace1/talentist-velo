import StarsSection from "@/components/StarsSection";
import TrustedCompanies from "@/components/home/TrustedCompanies";
import HowItWorks from "@/components/home/HowItWorks";
import TrendingCategories from "@/components/home/TrendingCategories";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <StarsSection />
      <TrustedCompanies />
      <HowItWorks />
      <TrendingCategories />
    </div>
  );
}
