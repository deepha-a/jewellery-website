import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

interface OfferingItem {
  title: string;
  image: string;
}

interface FeatureItem {
  title: string;
  description: string;
  // Custom SVG path structure
  svgPath: string;
  viewBox?: string;
}

export default function AboutPage() {
  const offerings: OfferingItem[] = [
    {
      title: "Jewellery Collections",
      image: "/images/jewellery.png",
    },
    {
      title: "Ethnic Wear",
      image: "/images/ethnic.png",
    },
    {
      title: "Bridal Collections",
      image: "/images/bridal.png",
    },
    {
      title: "Festive Fashion",
      image: "/images/festive.png",
    },
  ];

  const features: FeatureItem[] = [
    {
      title: "Certified Jewellery",
      description: "Every piece comes with a hallmark of purity and authenticity.",
      // Star/Award emblem badge
      svgPath: "M12 15l-2 5l2-1l2 1l-2-5zm0-12a6 6 0 1 0 6 6a6 6 0 0 0 -6-6zm0 10a4 4 0 1 1 4-4a4 4 0 0 1 -4 4z",
    },
    {
      title: "Premium Materials",
      description: "Only the finest silks, gems, and metals make it to our store.",
      // Diamond outline
      svgPath: "M12 2L2 9l10 13L22 9L12 2zm0 3.2L18.4 9H5.6L12 5.2z",
    },
    {
      title: "Secure Shopping",
      description: "Your data and transactions are protected by industry-leading security.",
      // Shield check
      svgPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-1.5-6l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4-6 6z",
    },
    {
      title: "Easy Returns",
      description: "Shop with confidence with our hassle-free return policies.",
      // Refresh/Sync loops
      svgPath: "M19 8l-4 4h3c0 3.3-2.7 6-6 6c-1.3 0-2.4-.4-3.4-1.1l-1.4 1.4C8.6 19.4 10.2 20 12 20c4.4 0 8-3.6 8-8h3l-4-4zM6 12c0-3.3 2.7-6 6-6c1.3 0 2.4.4 3.4 1.1l1.4-1.4C15.4 4.6 13.8 4 12 4C7.6 4 4 7.6 4 12H1l4 4l4-4H6z",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Hero Header */}
          <div className="text-center space-y-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
              About GlowDrape
            </h1>
            <p className="text-sm md:text-base text-gray-500 tracking-wide">
              Crafting elegance for every moment.
            </p>
          </div>

          {/* Story & Mission Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Our Story Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 space-y-4">
              <div className="flex items-center gap-3">
                {/* Book SVG */}
                <svg className="w-5 h-5 text-[#B48A36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                </svg>
                <h2 className="text-lg font-bold text-[#0F172A]">Our Story</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                GlowDrape was founded to bring together timeless jewellery
                and elegant fashion for every special occasion. Our journey
                began with a vision to merge heritage craftsmanship with
                contemporary aesthetics, creating a destination where every
                piece tells a story of sophistication and grace.
              </p>
            </div>

            {/* Our Mission Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 space-y-4">
              <div className="flex items-center gap-3">
                {/* Target SVG */}
                <svg className="w-5 h-5 text-[#B48A36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <h2 className="text-lg font-bold text-[#0F172A]">Our Mission</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                To provide quality craftsmanship, authentic designs, and a
                premium shopping experience. We are committed to ethical
                sourcing and maintaining the highest standards of purity in
                our jewellery, ensuring that GlowDrape remains a trusted
                companion for your most cherished milestones.
              </p>
            </div>
          </div>

          {/* What We Offer Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 md:p-10">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-lg font-bold text-[#0F172A]">What We Offer</h2>
              <div className="w-12 h-[3px] bg-[#B48A36] mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {offerings.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle lower gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold tracking-wide">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="space-y-10 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-[#0F172A]">
                Why Choose GlowDrape
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                Commitment to excellence in every detail.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] flex items-center justify-center mb-5 border border-[#F3EAD8]">
                    <svg 
                      className="w-5 h-5 text-[#B48A36]" 
                      viewBox={feature.viewBox || "0 0 24 24"} 
                      fill="currentColor"
                    >
                      <path d={feature.svgPath} />
                    </svg>
                  </div>

                  <h3 className="text-sm font-bold text-[#0F172A] mb-2 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}