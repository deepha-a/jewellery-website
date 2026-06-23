import HeroSection from "./HeroSection";
import Features from "./Features";
import CategorySection from "./CategorySection";
import ProductSection from "./ProductSection";
import Footer from "../../components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#2A3B50] min-h-screen text-white">
      <HeroSection />
      <Features />
      <CategorySection />
      <ProductSection />
      <Footer />
    </main>
  );
}