import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import {
  ArrowRight,
  CreditCard,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Star,
  ShoppingCart,
  Trash2,
  Tag,
  Heart,
} from "lucide-react";

const wishlistItems = [
  {
    category: "JEWELLERY",
    title: "Diamond Pendant",
    rating: "4.9",
    price: "₹4,499",
    oldPrice: "₹6,299",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "JEWELLERY",
    title: "Kundan Bridal Choker Set",
    rating: "4.8",
    price: "₹5,999",
    oldPrice: "₹8,499",
    image: "/images/jewellery.png",
  },
  {
    category: "ETHNIC WEAR",
    title: "Bridal Silk Saree",
    rating: "4.8",
    price: "₹7,999",
    oldPrice: "₹10,699",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "JEWELLERY",
    title: "Velvet Gold Bangle",
    rating: "4.7",
    price: "₹3,999",
    oldPrice: "₹5,199",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "JEWELLERY",
    title: "Ruby Ring",
    rating: "4.8",
    price: "₹4,499",
    oldPrice: "₹5,999",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "ETHNIC WEAR",
    title: "Gold Bridal Lehenga",
    rating: "4.8",
    price: "₹8,999",
    oldPrice: "₹12,499",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "FASHION",
    title: "Party Wear Gown",
    rating: "4.6",
    price: "₹4,799",
    oldPrice: "₹5,999",
    image: "/images/bridal.png",
  },
  {
    category: "CASUALS",
    title: "Sage Everyday Top",
    rating: "4.7",
    price: "₹1,299",
    oldPrice: "₹1,699",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  },
];

const recentlyViewed = [
  {
    title: "Gold Plated Earrings",
    price: "₹1,249",
    image:
      "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Velvet Crop Top",
    price: "₹2,890",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Silver Choker",
    price: "₹4,500",
    image: "/images/festive.png",
  },
  {
    title: "Wedding Saree",
    price: "₹15,400",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Temple Ring",
    price: "₹3,200",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
  },
];

export default function WishlistPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F8FAFC] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.65fr_0.95fr]">
            <section className="space-y-8">
              <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.05)] sm:p-10">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">GlowDrape</p>
                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">My Wishlist</h1>
                    <p className="mt-3 max-w-2xl text-sm text-slate-500">Products you’ve saved for later.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">18 Items</span>
                    <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#b89432]">
                      Continue Shopping
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">Favourites</h2>
                      <p className="mt-2 text-sm text-slate-500">Curated items you can move to cart or remove later.</p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <ShoppingCart className="h-4 w-4" />
                      Sort by Popularity
                    </button>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                    {wishlistItems.map((item) => (
                      <article key={item.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative h-72 overflow-hidden bg-slate-100">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition duration-500 hover:scale-105"
                          />
                          <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-900 shadow-md">
                            <Heart className="h-4 w-4 text-[#D4AF37]" />
                          </div>
                        </div>

                        <div className="space-y-4 p-6">
                          <span className="inline-flex rounded-full bg-[#FFFAEB] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#B48A36]">{item.category}</span>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Star className="h-4 w-4 text-[#FBBF24]" />
                              <span className="font-semibold text-slate-900">{item.rating}</span>
                              <span className="text-slate-400">(2,149)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-2xl font-bold text-slate-950">{item.price}</p>
                            <p className="text-sm text-slate-400 line-through">{item.oldPrice}</p>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B2240] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
                              <ShoppingCart className="h-4 w-4" /> Move to Cart
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                              <Trash2 className="h-4 w-4" /> Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="sticky top-8 space-y-6">
                <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">Wishlist Summary</h2>
                      <p className="text-sm text-slate-500">Quick view of saved products and stock.</p>
                    </div>
                    <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Updated</span>
                  </div>

                  <dl className="mt-6 space-y-4 text-sm text-slate-600">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <dt>Total Saved Products</dt>
                      <dd className="font-semibold text-slate-950">8</dd>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <dt>In Stock</dt>
                      <dd className="font-semibold text-slate-950">6</dd>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <dt>Out of Stock</dt>
                      <dd className="font-semibold text-[#DC2626]">2</dd>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <dt>Estimated Value</dt>
                      <dd className="font-semibold text-slate-950">₹32,092</dd>
                    </div>
                  </dl>

                  <button className="mt-6 w-full rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#b89432]">
                    Move All to Cart
                  </button>
                </section>

                <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Apply Coupon</p>
                      <p className="text-sm text-slate-500">Save extra on your wishlist purchase.</p>
                    </div>
                    <Tag className="h-5 w-5 text-[#D4AF37]" />
                  </div>

                  <div className="mt-6 grid gap-3">
                    <label className="block text-sm font-medium text-slate-600">Enter code</label>
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                    <button className="inline-flex items-center justify-center rounded-2xl bg-[#0B2240] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
                      Apply
                    </button>
                  </div>

                  <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">GLOW10</p>
                    <p className="mt-1">Tap to copy for 10% off above ₹8,999.</p>
                  </div>
                </section>

                <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-950">Why Shop With Us</h2>
                    <p className="mt-2 text-sm text-slate-500">Trusted service for every purchase.</p>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        title: "Free Shipping",
                        description: "On orders above ₹1,999",
                        icon: <CreditCard className="h-5 w-5 text-[#D4AF37]" />,
                      },
                      {
                        title: "Authentic Products",
                        description: "100% certified",
                        icon: <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />,
                      },
                      {
                        title: "Easy Returns",
                        description: "7-day return policy",
                        icon: <RotateCcw className="h-5 w-5 text-[#D4AF37]" />,
                      },
                      {
                        title: "24/7 Support",
                        description: "Dedicated stylists",
                        icon: <Headphones className="h-5 w-5 text-[#D4AF37]" />,
                      },
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start gap-4 rounded-3xl bg-slate-50 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B48A36]">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">{feature.title}</h3>
                          <p className="text-sm text-slate-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </aside>
          </div>

          <section className="mt-14 overflow-hidden rounded-[36px] bg-[#0B2240] p-8 text-white shadow-[0_30px_70px_rgba(11,34,64,0.22)] sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Recently Viewed</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Recently Viewed</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition hover:text-[#D4AF37]">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {recentlyViewed.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-200">{item.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
