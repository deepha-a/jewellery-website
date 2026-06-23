import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#0B2240] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        
        <div>
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm">
            New Season 2026
          </p>

          <h1 className="text-5xl font-serif mt-4 leading-tight">
            Adorned in Glow,
            <br />
            Draped in Grace.
          </h1>

          <p className="text-gray-300 mt-5 max-w-md">
            Premium jewellery and elegant fashion for every moment.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/shop"
              className="bg-[#D4AF37] text-black px-6 py-3 rounded"
            >
              Shop Jewellery
            </Link>

            <Link
              href="/shop"
              className="border border-white px-6 py-3 rounded"
            >
              Explore Dresses
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
            alt="hero"
            className="rounded-full w-[450px] h-[450px] object-cover mx-auto"
          />
        </div>
      </div>
    </section>
  );
}