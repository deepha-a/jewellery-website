"use client";

import { useState } from "react";

const categories = [
  "Necklaces",
  "Rings",
  "Earrings",
  "Bracelets",
  "Sarees",
  "casual wear",
];

const products = [
  // Necklaces
 {
  name: "Royal Necklace",
  price: "₹2,499",
  category: "Necklaces",
  image:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
},
{
  name: "Pearl Necklace",
  price: "₹1,999",
  category: "Necklaces",
  image:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
},
{
  name: "Gold Layered Necklace",
  price: "₹2,899",
  category: "Necklaces",
  image:
    "https://images.unsplash.com/flagged/photo-1570055349452-29232699cc63?auto=format&fit=crop&w=400&h=400&q=80",
},

  // Rings
  {
    name: "Diamond Ring",
    price: "₹1,799",
    category: "Rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&h=400&q=80",
    tagline: "Timeless Solitaires & Brilliant Cuts",
  },
  {
    name: "Gold Ring",
    price: "₹1,299",
    category: "Rings",
    image:
"https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=400&h=400&q=80",
    tagline: "Pure 22k & 18k Modern Filigree",
  },
  {  },
  {
    name: "Wedding Ring",
    price: "₹2,199",
    category: "Rings",
    image:
"https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=400&h=400&q=80",  },

  // Earrings
  {
  name: "Golden Earrings",
  price: "₹999",
  category: "Earrings",
  image:
    "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=800&q=80",
},
{
  name: "Pearl Drop Earrings",
  price: "₹1,199",
  category: "Earrings",
  image:
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
},
{
  name: "Luxury Earrings",
  price: "₹1,499",
  category: "Earrings",
  image:
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
},
  // Bracelets
// Bracelets
  {
    name: "Elegant Bracelet",
    price: "₹1,299",
    category: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    name: "Gold Bracelet",
    price: "₹1,899",
    category: "Bracelets",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    name: "Luxury Charm Bracelet",
    price: "₹2,499",
    category: "Bracelets",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&h=800&q=80",
  },
  // Sarees
  {
    name: "Silk Saree",
    price: "₹3,499",
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
  {
  name: "Bridal Saree",
  price: "₹5,999",
  category: "Sarees",
  image:
    "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
},

  // casual wear
  {
    name: "jackets",
    price: "₹1,499",
    category: "casual wear",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "casual tops",
    price: "₹2,199",
    category: "casual wear",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProductSection() {
  const [active, setActive] = useState("Necklaces");

  const filtered = products.filter((p) => p.category === active);

  return (
    <section className="py-16 px-6 md:px-16 bg-[#2A3B50]">
      <div className="text-center mb-10">
        <p className="text-[#D4AF37] uppercase tracking-widest text-sm">
          Premium Collection
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-white mt-3">
          Featured Products
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-14 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`pb-2 text-sm font-semibold transition ${
              active === cat
                ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                : "text-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-xl group"
          >
            <div className="h-80 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-[#0B2240]">
                {item.name}
              </h3>

              <p className="text-[#D4AF37] font-bold text-lg mt-2">
                {item.price}
              </p>

              <button className="mt-5 w-full bg-[#0B2240] text-white py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition">
                Add to Cart →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}