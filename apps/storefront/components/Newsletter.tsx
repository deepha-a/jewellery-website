export default function Newsletter() {
  return (
    <section className="bg-white px-6 md:px-12 py-12">
      <div className="bg-[#243B5A] rounded-xl py-14 px-8 text-center text-white">
        <p className="text-xs uppercase text-[#D4AF37] mb-3">
          Join the GlowDrape Circle
        </p>

        <h2 className="text-4xl font-bold">
          Get 10% off your first order
        </h2>

        <p className="text-gray-300 mt-4 mb-8">
          Subscribe to receive new arrivals, festive edits and member-only offers.
        </p>

        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded w-72 text-black"
          />

          <button className="bg-[#D4AF37] px-6 py-3 rounded text-black font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}