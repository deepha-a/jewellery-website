export default function CategorySection() {
  const categories = [
    {
      name: "Casual Wear",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rings",
      image:
        "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Ethnic Wear",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Necklaces",
      image:
        "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Earrings",
      image:
       "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=80",
    },
{
  name: "Bridal Collection",
  image:
    "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=400&q=80",
},
  ];

  return (
    <section className="py-16 px-6 md:px-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-serif text-[#0B2240]">
        Shop by Category
      </h2>

      <p className="text-gray-500 mt-2">
        Curated edits crafted for every occasion
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-[#D4AF37]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#0B2240]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
 