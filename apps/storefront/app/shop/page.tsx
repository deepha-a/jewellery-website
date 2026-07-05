"use client";

import { useState, useMemo, useEffect } from "react";

// Mock Product Structure
interface Product {
  id: number;
  name: string;
  category: "Jewellery" | "Dresses";
  material: "Gold" | "Silver" | "Diamond" | "Platinum";
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  colour: "navy" | "gold" | "red" | "green" | "white";
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  discount: string;
  tag?: string;
  image: string;
  thumbnails?: string[];
  description?: string;
}

// Complete mock product database (contains standard items + the signature jewelry set)
const initialProducts: Product[] = [
  {
    id: 9,
    name: "Sterling Silver Petals Luxe Rose Gold Plated Women's Jewelry Set",
    category: "Jewellery",
    material: "Silver",
    size: "M",
    colour: "gold",
    rating: 4.8,
    reviewsCount: 128,
    price: 10837,
    originalPrice: 12750,
    discount: "15% OFF",
    tag: "SIGNATURE",
    image: "/images/products/p4.jpg.jpeg",
    thumbnails: [
      "/images/products/p4.jpg.jpeg", // Purple main
      "/images/bridal.png", // Model
      "/images/products/p3.jpg.jpeg"  // Earrings
    ],
    description: "Experience the timeless allure of our handcrafted Sterling Silver Petal Luxe Rose Gold pendant. Designed with precision, this piece captures the essence of sophisticated luxury for the modern woman. Perfect for both daily elegance and special occasions."
  },
  {
    id: 1,
    name: "Pearl Drop Earrings",
    category: "Jewellery",
    material: "Silver",
    size: "M",
    colour: "white",
    rating: 4,
    reviewsCount: 24,
    price: 5499,
    originalPrice: 6873,
    discount: "20% OFF",
    tag: "NEW",
    image: "/images/products/p1.jpg.jpeg",
    thumbnails: [
      "/images/products/p1.jpg.jpeg",
      "/images/products/p3.jpg.jpeg",
      "/images/products/p6.jpg.jpeg"
    ],
    description: "These Pearl Drop Earrings are a majestic synthesis of clean silver and pristine, hand-harvested freshwater pearls. A perfect choice to highlight daily business attire or add elegance to party ensembles."
  },
  {
    id: 2,
    name: "Diamond Tennis Bracelet",
    category: "Jewellery",
    material: "Diamond",
    size: "S",
    colour: "white",
    rating: 5,
    reviewsCount: 103,
    price: 82999,
    originalPrice: 94317,
    discount: "12% OFF",
    tag: "NEW",
    image: "/images/products/p2.jpg.jpeg",
    thumbnails: [
      "/images/products/p2.jpg.jpeg",
      "/images/products/t4.jpg.jpeg",
      "/images/products/p8.jpg.jpeg"
    ],
    description: "An iconic luxury bracelet encrusted with 4 carats of brilliant-cut diamonds. Each stone is individually hand-set in conflict-free gold claws, creating a continuous row of sparkling excellence."
  },
  {
    id: 3,
    name: "Dusty Rose Lehenga",
    category: "Dresses",
    material: "Gold",
    size: "L",
    colour: "red",
    rating: 4.5,
    reviewsCount: 90,
    price: 12750,
    originalPrice: 19029,
    discount: "33% OFF",
    tag: "NEW",
    image: "/images/products/p10.jpg.jpeg",
    thumbnails: [
      "/images/products/p10.jpg.jpeg",
      "/images/products/t1.jpg.jpeg",
      "/images/products/p11.jpg.jpeg"
    ],
    description: "Hand-woven dusty rose lehenga decorated with heavy silver tilla and zardozi threadwork. Tailored in high-grade organza and silk to create a flowing silhouette for your most festive bridal moments."
  },
  {
    id: 4,
    name: "Banarasi Silk Saree",
    category: "Dresses",
    material: "Gold",
    size: "XL",
    colour: "green",
    rating: 4.5,
    reviewsCount: 85,
    price: 8499,
    originalPrice: 14165,
    discount: "40% OFF",
    image: "/images/products/r2.jpg.jpeg",
    thumbnails: [
      "/images/products/r2.jpg.jpeg",
      "/images/festive.png",
      "/images/bridal.png"
    ],
    description: "A traditional green Banarasi saree handloom-woven in the heart of Varanasi. Features intricate gold borders and kora silk details that shine beautifully under any light."
  },
  {
    id: 5,
    name: "Solitaire Pendant",
    category: "Jewellery",
    material: "Platinum",
    size: "M",
    colour: "white",
    rating: 5,
    reviewsCount: 98,
    price: 15147,
    originalPrice: 20750,
    discount: "27% OFF",
    image: "/images/products/p7.jpg.jpeg",
    thumbnails: [
      "/images/products/p7.jpg.jpeg",
      "/images/products/p4.jpg.jpeg",
      "/images/products/p8.jpg.jpeg"
    ],
    description: "A simple yet stunning statement of luxury. A single brilliant-cut 1-carat diamond pendant set on a delicate platinum chain."
  },
  {
    id: 6,
    name: "Gold Bangles",
    category: "Jewellery",
    material: "Gold",
    size: "L",
    colour: "gold",
    rating: 4,
    reviewsCount: 118,
    price: 43125,
    originalPrice: 57500,
    discount: "25% OFF",
    image: "/images/products/t4.jpg.jpeg",
    thumbnails: [
      "/images/products/t4.jpg.jpeg",
      "/images/products/p7.jpg.jpeg",
      "/images/products/p1.jpg.jpeg"
    ],
    description: "Twin traditional Indian gold bangles carved with exquisite filigree designs, crafted in 22-karat hallmarked solid gold."
  }
];

const categoriesList = [
  { name: "Casuals", image: "/images/categories/Casuals.jpg.jpeg", category: "Dresses" },
  { name: "Rings", image: "/images/categories/Rings.jpg.jpeg", category: "Jewellery" },
  { name: "Ethnic Wear", image: "/images/categories/Ethnic-Wear.jpg.jpeg", category: "Dresses" },
  { name: "Necklaces", image: "/images/categories/Necklaces.jpg.jpeg", category: "Jewellery" },
  { name: "Earrings", image: "/images/categories/Earrings.jpg.jpeg", category: "Jewellery" },
  { name: "Bridal Collections", image: "/images/categories/Bridal-Collections.jpg.jpeg", category: "Dresses" },
];

const testimonials = [
  {
    quote: "The craftsmanship of the GlowDrape jewellery is unparalleled. The diamond pendant I purchased is not just an accessory; it's a heirloom I will pass down. Exceptional service and exquisite packaging.",
    author: "ELEANOR VANE, LONDON",
    rating: 5,
  },
  {
    quote: "I purchased the Banarasi silk saree for a family wedding, and I was flooded with compliments. The richness of the zari border and the soft feel of premium silk is absolutely unmatched.",
    author: "PRIYA SEN, MUMBAI",
    rating: 5,
  },
  {
    quote: "Exceptional design and timely shipping. The Rose Lehenga was custom tailored to perfection and the craftsmanship left everyone in awe. Will definitely shop from GlowDrape again!",
    author: "MEGAN R., NEW YORK",
    rating: 5,
  }
];

export default function CategoriesPage() {
  // View Manager state: selectedProduct tracks active view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active product details helper states
  const [activeDetailImage, setActiveDetailImage] = useState<string>("");
  const [chosenFinish, setChosenFinish] = useState<string>("purple");
  const [productQuantity, setProductQuantity] = useState<number>(1);

  // Sync active detail image when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      setActiveDetailImage(selectedProduct.image);
      setProductQuantity(1);
      setChosenFinish("purple");
    }
  }, [selectedProduct]);

  // Navigation / Core state
  const [cartItems, setCartItems] = useState<number[]>([1, 4]); // Init with 2 items as in badge '2'
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<{ Jewellery: boolean; Dresses: boolean }>({
    Jewellery: false,
    Dresses: false,
  });
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [selectedMaterials, setSelectedMaterials] = useState<{
    Gold: boolean;
    Silver: boolean;
    Diamond: boolean;
    Platinum: boolean;
  }>({
    Gold: false,
    Silver: false,
    Diamond: false,
    Platinum: false,
  });
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColour, setSelectedColour] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<string>("Newest First");

  // Testimonial Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Email form
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Notification Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle Cart
  const handleAddToCart = (id: number, name: string, qty: number = 1) => {
    // Allows multiple adds or quantity additions
    const newItems = Array(qty).fill(id);
    setCartItems((prev) => [...prev, ...newItems]);
    showToast(`Added ${qty} × ${name} to your cart!`);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (id: number, name: string) => {
    if (wishlistItems.includes(id)) {
      setWishlistItems((prev) => prev.filter((item) => item !== id));
      showToast(`Removed ${name} from your wishlist.`);
    } else {
      setWishlistItems((prev) => [...prev, id]);
      showToast(`Added ${name} to your wishlist!`);
    }
  };

  // Handle Clear All filters
  const handleClearAllFilters = () => {
    setSelectedCategories({ Jewellery: false, Dresses: false });
    setPriceRange(100000);
    setSelectedMaterials({ Gold: false, Silver: false, Diamond: false, Platinum: false });
    setSelectedSize(null);
    setSelectedColour(null);
    setMinRating(null);
    setSearchText("");
    showToast("All filters cleared.");
  };

  // Filter & Sort Logic for the Catalog page
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Search filter
        if (searchText) {
          const matchName = product.name.toLowerCase().includes(searchText.toLowerCase());
          const matchCat = product.category.toLowerCase().includes(searchText.toLowerCase());
          if (!matchName && !matchCat) return false;
        }

        // Category filter
        const isAnyCatChecked = selectedCategories.Jewellery || selectedCategories.Dresses;
        if (isAnyCatChecked) {
          if (product.category === "Jewellery" && !selectedCategories.Jewellery) return false;
          if (product.category === "Dresses" && !selectedCategories.Dresses) return false;
        }

        // Price range filter
        if (product.price > priceRange) return false;

        // Material filter
        const isAnyMatChecked =
          selectedMaterials.Gold ||
          selectedMaterials.Silver ||
          selectedMaterials.Diamond ||
          selectedMaterials.Platinum;
        if (isAnyMatChecked) {
          if (product.material === "Gold" && !selectedMaterials.Gold) return false;
          if (product.material === "Silver" && !selectedMaterials.Silver) return false;
          if (product.material === "Diamond" && !selectedMaterials.Diamond) return false;
          if (product.material === "Platinum" && !selectedMaterials.Platinum) return false;
        }

        // Size filter
        if (selectedSize && product.size !== selectedSize) return false;

        // Color filter
        if (selectedColour && product.colour !== selectedColour) return false;

        // Rating filter
        if (minRating && product.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Price: Low to High") {
          return a.price - b.price;
        } else if (sortBy === "Price: High to Low") {
          return b.price - a.price;
        } else if (sortBy === "Customer Rating") {
          return b.rating - a.rating;
        }
        // "Newest First" (Default) - sorted by descending ID
        return b.id - a.id;
      });
  }, [searchText, selectedCategories, priceRange, selectedMaterials, selectedSize, selectedColour, minRating, sortBy]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      showToast("Thank you for joining the Inner Circle!");
      setNewsletterEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  // Helper for rendering star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.9 1.54-.9 1.84 0l1.286 3.967a1 1 0 00.95.69h4.162c.9 0 1.275 1.15.5 1.63l-3.368 2.448a1 1 0 00-.36 1.118l1.287 3.966c.3.9-.74 1.65-1.5 1.12l-3.368-2.448a1 1 0 00-1.17 0l-3.368 2.448c-.76.53-1.8-.22-1.5-1.12l1.287-3.966a1 1 0 00-.36-1.118L2.065 9.214c-.775-.48-.4-1.63.5-1.63h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <div key={i} className="relative w-3.5 h-3.5">
            <svg className="absolute top-0 left-0 w-3.5 h-3.5 text-slate-200 fill-slate-200" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.9 1.54-.9 1.84 0l1.286 3.967a1 1 0 00.95.69h4.162c.9 0 1.275 1.15.5 1.63l-3.368 2.448a1 1 0 00-.36 1.118l1.287 3.966c.3.9-.74 1.65-1.5 1.12l-3.368-2.448a1 1 0 00-1.17 0l-3.368 2.448c-.76.53-1.8-.22-1.5-1.12l1.287-3.966a1 1 0 00-.36-1.118L2.065 9.214c-.775-.48-.4-1.63.5-1.63h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
            <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
              <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.9 1.54-.9 1.84 0l1.286 3.967a1 1 0 00.95.69h4.162c.9 0 1.275 1.15.5 1.63l-3.368 2.448a1 1 0 00-.36 1.118l1.287 3.966c.3.9-.74 1.65-1.5 1.12l-3.368-2.448a1 1 0 00-1.17 0l-3.368 2.448c-.76.53-1.8-.22-1.5-1.12l1.287-3.966a1 1 0 00-.36-1.118L2.065 9.214c-.775-.48-.4-1.63.5-1.63h4.162a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-slate-200 fill-slate-200" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.9 1.54-.9 1.84 0l1.286 3.967a1 1 0 00.95.69h4.162c.9 0 1.275 1.15.5 1.63l-3.368 2.448a1 1 0 00-.36 1.118l1.287 3.966c.3.9-.74 1.65-1.5 1.12l-3.368-2.448a1 1 0 00-1.17 0l-3.368 2.448c-.76.53-1.8-.22-1.5-1.12l1.287-3.966a1 1 0 00-.36-1.118L2.065 9.214c-.775-.48-.4-1.63.5-1.63h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 select-none antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A1B2D] text-white px-5 py-3 shadow-lg border-l-4 border-[#C5A85C] flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-1 bg-transparent border-0 cursor-pointer">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#0A1B2D]">
              Glow<span className="text-[#C5A85C]">Drape</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => setSelectedProduct(null)} className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer">Home</button>
            <button onClick={() => setSelectedProduct(null)} className={`text-[15px] font-semibold py-1 bg-transparent border-0 cursor-pointer ${!selectedProduct ? "text-slate-900 border-b-2 border-[#C5A85C]" : "text-slate-600 hover:text-slate-900"}`}>Shop</button>
            <button onClick={() => showToast("About section coming soon!")} className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer">About</button>
            <button onClick={() => showToast("Contact section coming soon!")} className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer">Contact</button>
          </nav>

          {/* Icons Action Area */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Input Box */}
            <div className="relative flex items-center">
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    if (selectedProduct) setSelectedProduct(null); // Return to catalog when searching
                  }}
                  className="mr-2 px-3 py-1.5 border border-slate-200 outline-none text-sm w-40 sm:w-56 focus:border-slate-400 focus:ring-0 transition-all rounded-none"
                  autoFocus
                />
              )}
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchText("");
                }}
                className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-full"
                aria-label="Search"
              >
                {isSearchOpen ? (
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => showToast(`Your wishlist has ${wishlistItems.length} items.`)}
              className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-full bg-transparent border-0 cursor-pointer"
              aria-label="Wishlist"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute top-0.5 right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#C5A85C] text-[10px] font-bold text-white ring-2 ring-white">
                {wishlistItems.length}
              </span>
            </button>

            {/* Account */}
            <button
              onClick={() => showToast("Profile system coming soon!")}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-full bg-transparent border-0 cursor-pointer"
              aria-label="Account"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => showToast(`Opening your Shopping Bag (${cartItems.length} items)...`)}
              className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-full bg-transparent border-0 cursor-pointer"
              aria-label="Cart"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0.5 right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#C5A85C] text-[10px] font-bold text-white ring-2 ring-white">
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* CONDITIONAL RENDERING CONTENT */}
      {selectedProduct === null ? (
        <>
          {/* CATALOG / BROWSE VIEW */}

          {/* Hero Section */}
          <section className="relative w-full bg-[#0A1B2D] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Hero Left Content */}
              <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 sm:py-24">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight max-w-xl">
                  Shop Our Collection — Discover Premium Jewellery & Fashion
                </h1>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setSelectedCategories({ Jewellery: true, Dresses: false });
                      showToast("Filtered by Jewellery!");
                    }}
                    className="bg-[#C5A85C] hover:bg-[#b5974b] text-white font-semibold text-xs tracking-wider uppercase px-8 py-3.5 transition-colors duration-200 cursor-pointer border-0"
                  >
                    SHOP JEWELLERY
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategories({ Jewellery: false, Dresses: true });
                      showToast("Filtered by Dresses!");
                    }}
                    className="border border-white/80 hover:border-white hover:bg-white/5 text-white font-semibold text-xs tracking-wider uppercase px-8 py-3.5 transition-colors duration-200 cursor-pointer bg-transparent"
                  >
                    SHOP DRESSES
                  </button>
                </div>
              </div>

              {/* Hero Right Image */}
              <div className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-auto min-h-[350px]">
                <img
                  src="/images/jewellery.png"
                  alt="Sparkling Premium Blue Sapphire Gemstones"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B2D] via-transparent to-transparent lg:block hidden w-20"></div>
              </div>
            </div>
          </section>

          {/* Browse Categories Circle Row */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between border-b border-slate-100 pb-5 mb-10">
              <div>
                <h2 className="text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">
                  BROWSE CATEGORIES
                </h2>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-slate-900 mt-2">
                  Explore curated premium pieces from master artisans.
                </p>
              </div>
              <button
                onClick={handleClearAllFilters}
                className="text-xs font-semibold text-slate-900 hover:text-[#C5A85C] inline-flex items-center gap-1 transition-colors group cursor-pointer bg-transparent border-0"
              >
                View All
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
              {categoriesList.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (cat.category === "Jewellery") {
                      setSelectedCategories({ Jewellery: true, Dresses: false });
                    } else {
                      setSelectedCategories({ Jewellery: false, Dresses: true });
                    }
                    showToast(`Filtered by ${cat.name}`);
                  }}
                  className="group cursor-pointer text-center"
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md ring-0 ring-offset-0 ring-[#C5A85C] group-hover:ring-4 group-hover:ring-offset-2 transition-all duration-300">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Bar */}
          <section className="w-full bg-[#0A1B2D] text-[#D1B464] border-t border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                <div className="flex flex-col items-center justify-center p-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">1,240+</span>
                  <span className="mt-1 text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#C5A85C]/80 uppercase">
                    JEWELLERY PIECES
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">850+</span>
                  <span className="mt-1 text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#C5A85C]/80 uppercase">
                    DESIGNER DRESSES
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">45</span>
                  <span className="mt-1 text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#C5A85C]/80 uppercase">
                    NEW ARRIVALS DAILY
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">15k</span>
                  <span className="mt-1 text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#C5A85C]/80 uppercase">
                    HAPPY CLIENTS
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Filters Sidebar & Products Grid */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">

              {/* Sidebar Filters */}
              <aside className="lg:col-span-1 mb-8 lg:mb-0">
                <div className="border border-slate-200 bg-white p-6 sticky top-24 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                    <span className="text-sm font-bold tracking-wider text-slate-900 uppercase">FILTERS</span>
                    <button
                      onClick={handleClearAllFilters}
                      className="text-xs font-semibold text-[#C5A85C] hover:text-[#b5974b] underline transition-colors cursor-pointer bg-transparent border-0"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Category filter */}
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-4">CATEGORY</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={selectedCategories.Jewellery}
                            onChange={(e) =>
                              setSelectedCategories((prev) => ({ ...prev, Jewellery: e.target.checked }))
                            }
                            className="h-4 w-4 rounded-none border-slate-300 text-[#C5A85C] focus:ring-[#C5A85C]"
                          />
                          <span>Jewellery</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">(152)</span>
                      </label>
                      <label className="flex items-center justify-between text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={selectedCategories.Dresses}
                            onChange={(e) =>
                              setSelectedCategories((prev) => ({ ...prev, Dresses: e.target.checked }))
                            }
                            className="h-4 w-4 rounded-none border-slate-300 text-[#C5A85C] focus:ring-[#C5A85C]"
                          />
                          <span>Dresses</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">(96)</span>
                      </label>
                    </div>
                  </div>

                  {/* Price range */}
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-4">PRICE RANGE</h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min={500}
                        max={100000}
                        step={500}
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C5A85C]"
                      />
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <div className="border border-slate-200 px-3 py-2 bg-slate-50 w-[45%] text-center font-mono">
                          ₹500
                        </div>
                        <span className="text-slate-400">—</span>
                        <div className="border border-slate-200 px-3 py-2 bg-slate-50 w-[45%] text-center font-mono">
                          ₹{priceRange.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material filter */}
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-4">MATERIAL</h4>
                    <div className="space-y-3">
                      {(["Gold", "Silver", "Diamond", "Platinum"] as const).map((mat) => (
                        <label key={mat} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMaterials[mat]}
                            onChange={(e) =>
                              setSelectedMaterials((prev) => ({ ...prev, [mat]: e.target.checked }))
                            }
                            className="h-4 w-4 rounded-none border-slate-300 text-[#C5A85C] focus:ring-[#C5A85C]"
                          />
                          <span>{mat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size buttons */}
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-4">SIZE</h4>
                    <div className="flex flex-wrap gap-2">
                      {(["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                          className={`h-9 w-10 border text-xs font-medium cursor-pointer transition-all ${selectedSize === size
                              ? "border-[#0A1B2D] bg-[#0A1B2D] text-white"
                              : "border-slate-200 text-slate-600 hover:border-slate-400 bg-white"
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color dots */}
                  <div className="border-b border-slate-200 pb-6 mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-4">COLOUR</h4>
                    <div className="flex items-center gap-3">
                      {[
                        { id: "navy", colorClass: "bg-[#0B2545]" },
                        { id: "gold", colorClass: "bg-[#C5A85C]" },
                        { id: "red", colorClass: "bg-[#A61C1C]" },
                        { id: "green", colorClass: "bg-[#0F5132]" },
                        { id: "white", colorClass: "bg-[#FFFFFF] border border-slate-300" },
                      ].map((swatch) => (
                        <button
                          key={swatch.id}
                          onClick={() => setSelectedColour(selectedColour === swatch.id ? null : swatch.id)}
                          className={`h-7 w-7 rounded-full cursor-pointer transition-transform duration-200 ${swatch.colorClass} ${selectedColour === swatch.id ? "ring-2 ring-offset-2 ring-slate-800 scale-110" : "hover:scale-105"
                            }`}
                          title={swatch.id}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-4">CUSTOMER RATING</h4>
                    <label className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={minRating === 4}
                        onChange={(e) => setMinRating(e.target.checked ? 4 : null)}
                        className="h-4 w-4 rounded-full border-slate-300 text-[#C5A85C] focus:ring-[#C5A85C]"
                      />
                      <div className="flex items-center gap-1">
                        <span className="flex items-center gap-0.5">
                          {renderStars(4)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium ml-1">& Above</span>
                      </div>
                    </label>
                  </div>

                </div>
              </aside>

              {/* Main Catalog Product Grid */}
              <main className="lg:col-span-3 flex flex-col">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-5 gap-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Showing 1-{filteredProducts.length} of {initialProducts.length} products
                  </span>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="hidden sm:flex items-center gap-2.5 border-r border-slate-200 pr-4">
                      <button className="p-1 text-slate-800 cursor-pointer bg-transparent border-0" title="Grid View">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer bg-transparent border-0" title="List View">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 tracking-wider">SORT BY:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-slate-400 bg-white"
                      >
                        <option>Newest First</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Customer Rating</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filter tags bar */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                    ₹500 - ₹{priceRange.toLocaleString("en-IN")}
                    <button
                      onClick={() => setPriceRange(100000)}
                      className="text-slate-400 hover:text-slate-600 ml-0.5 cursor-pointer bg-transparent border-0"
                      title="Remove Price Filter"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {selectedSize && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                      Size: {selectedSize}
                      <button
                        onClick={() => setSelectedSize(null)}
                        className="text-slate-400 hover:text-slate-600 ml-0.5 cursor-pointer bg-transparent border-0"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {selectedColour && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 capitalize">
                      Colour: {selectedColour}
                      <button
                        onClick={() => setSelectedColour(null)}
                        className="text-slate-400 hover:text-slate-600 ml-0.5 cursor-pointer bg-transparent border-0"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Grid Lists */}
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-200">
                    <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="font-semibold text-slate-800 text-base">No Products Found</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-xs">
                      Your active filters didn't return any matches. Try clearing some selections.
                    </p>
                    <button
                      onClick={handleClearAllFilters}
                      className="mt-5 text-xs font-bold text-white bg-[#0A1B2D] hover:bg-slate-800 px-6 py-2.5 transition-colors uppercase cursor-pointer border-0"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
                    {filteredProducts.map((product) => {
                      const isFavorite = wishlistItems.includes(product.id);
                      return (
                        <article key={product.id} className="group relative flex flex-col justify-between">
                          <div
                            onClick={() => setSelectedProduct(product)}
                            className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 shadow-sm border border-slate-100 cursor-pointer"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {product.tag && (
                              <span className="absolute top-3 left-3 bg-[#0B2545] text-white text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase">
                                {product.tag}
                              </span>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Avoid opening the detail page
                                handleToggleWishlist(product.id, product.name);
                              }}
                              className="absolute top-3 right-3 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:text-[#C5A85C] transition-colors border-0 cursor-pointer"
                              title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                              {isFavorite ? (
                                <svg className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              )}
                            </button>
                          </div>

                          <div className="pt-4 flex flex-col flex-1 justify-between">
                            <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                              <h3 className="font-serif text-base font-semibold text-slate-800 group-hover:text-[#C5A85C] transition-colors line-clamp-1">
                                {product.name}
                              </h3>

                              <div className="mt-1 flex items-center flex-wrap gap-2.5">
                                <span className="font-semibold text-slate-900">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                                  {product.discount}
                                </span>
                              </div>

                              <div className="mt-2.5 flex items-center gap-1">
                                <div className="flex items-center gap-0.5">
                                  {renderStars(product.rating)}
                                </div>
                                <span className="text-xs text-slate-400 font-medium ml-1">
                                  ({product.reviewsCount})
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                                {product.material}
                              </span>
                              <button
                                onClick={() => handleAddToCart(product.id, product.name)}
                                className="text-xs font-bold text-[#C5A85C] hover:text-[#b5974b] tracking-wider uppercase transition-colors bg-transparent border-0 cursor-pointer"
                              >
                                ADD TO CART
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                  <div className="mt-16 flex flex-col items-center gap-4">
                    <span className="text-xs font-semibold text-slate-500 italic">
                      Scroll to discover more premium pieces...
                    </span>

                    <div className="flex items-center gap-2">
                      <button className="h-9 w-9 border border-slate-200 hover:border-slate-400 text-slate-500 flex items-center justify-center transition-colors bg-transparent cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="h-9 w-9 border border-[#0A1B2D] bg-[#0A1B2D] text-white text-xs font-bold flex items-center justify-center border-0 cursor-pointer">
                        1
                      </button>
                      <button
                        onClick={() => showToast("Loading Page 2...")}
                        className="h-9 w-9 border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-medium flex items-center justify-center transition-colors bg-transparent cursor-pointer"
                      >
                        2
                      </button>
                      <button
                        onClick={() => showToast("Loading Page 3...")}
                        className="h-9 w-9 border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-medium flex items-center justify-center transition-colors bg-transparent cursor-pointer"
                      >
                        3
                      </button>
                      <span className="text-slate-400 text-xs px-1">...</span>
                      <button
                        onClick={() => showToast("Loading Page 10...")}
                        className="h-9 w-9 border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-medium flex items-center justify-center transition-colors bg-transparent cursor-pointer"
                      >
                        10
                      </button>
                      <button className="h-9 w-9 border border-slate-200 hover:border-slate-400 text-slate-500 flex items-center justify-center transition-colors bg-transparent cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

              </main>
            </div>
          </section>

          {/* Double Featured Banner Section */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Bridal Card */}
              <div className="relative group overflow-hidden h-[450px] sm:h-[500px] shadow-lg">
                <img
                  src="/images/bridal.png"
                  alt="Model showcasing elaborate gold jewelry bridal collection"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>

                <div className="absolute bottom-10 left-10 right-10 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-3xl font-bold tracking-tight">Bridal Collection</h3>
                  <p className="mt-2 text-sm text-slate-200/90 font-medium">
                    Ethereal designs for your most sacred moments.
                  </p>
                  <button
                    onClick={() => {
                      // Switch to the signature Bridal Jewelry Set details directly!
                      const item = initialProducts.find(p => p.id === 9);
                      if (item) setSelectedProduct(item);
                      showToast("Explore Bridal Collection!");
                    }}
                    className="mt-6 self-start border border-white hover:bg-white hover:text-slate-900 text-white font-semibold text-xs tracking-wider uppercase px-7 py-3 transition-colors duration-200 cursor-pointer bg-transparent"
                  >
                    EXPLORE
                  </button>
                </div>
              </div>

              {/* Festive Card */}
              <div className="relative group overflow-hidden h-[450px] sm:h-[500px] shadow-lg">
                <img
                  src="/images/festive.png"
                  alt="Festive collection Indian gold designs"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>

                <div className="absolute bottom-10 left-10 right-10 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-3xl font-bold tracking-tight">Festive Collection</h3>
                  <p className="mt-2 text-sm text-slate-200/90 font-medium">
                    Celebrate traditions with a modern silhouette.
                  </p>
                  <button
                    onClick={() => {
                      // Filter by Dresses to simulate explore
                      setSelectedCategories({ Jewellery: false, Dresses: true });
                      showToast("Explore Festive Dresses Collection!");
                    }}
                    className="mt-6 self-start border border-white hover:bg-white hover:text-slate-900 text-white font-semibold text-xs tracking-wider uppercase px-7 py-3 transition-colors duration-200 cursor-pointer bg-transparent"
                  >
                    EXPLORE
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* Testimonials */}
          <section className="w-full bg-[#0A1B2D] text-white">
            <div className="mx-auto max-w-4xl px-6 py-20 text-center flex flex-col items-center">
              <h2 className="text-xs font-bold tracking-[0.25em] text-[#C5A85C] uppercase">
                PATRON STORIES
              </h2>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                {renderStars(5)}
              </div>

              <div className="mt-8 min-h-[120px] max-w-2xl">
                <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-slate-200/90">
                  "{testimonials[currentTestimonialIndex].quote}"
                </p>
              </div>

              <span className="mt-6 text-xs font-bold tracking-widest text-[#C5A85C] uppercase">
                — {testimonials[currentTestimonialIndex].author}
              </span>

              <div className="mt-10 flex items-center justify-center gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonialIndex(idx)}
                    className={`h-1 cursor-pointer rounded-full border-0 transition-all duration-350 ${currentTestimonialIndex === idx ? "w-10 bg-[#C5A85C]" : "w-6 bg-slate-600 hover:bg-slate-400"
                      }`}
                    aria-label={`Testimonial slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* PRODUCT DETAIL VIEW */}
          <div className="bg-slate-50 py-4 border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs gap-3">
              {/* Breadcrumb path */}
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <button onClick={() => setSelectedProduct(null)} className="hover:text-slate-800 bg-transparent border-0 cursor-pointer">Shop</button>
                <span>/</span>
                <span className="text-slate-400 capitalize">{selectedProduct.category}</span>
                <span>/</span>
                <span className="text-slate-800 font-semibold line-clamp-1 max-w-[200px]">{selectedProduct.name}</span>
              </div>
              {/* Back to collections button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-800 hover:text-[#C5A85C] font-bold uppercase tracking-wider flex items-center gap-1.5 bg-transparent border-0 cursor-pointer text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Shop
              </button>
            </div>
          </div>

          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Left Column: Image Gallery */}
              <div className="lg:col-span-6 flex flex-col gap-6">

                {/* Main Product Frame */}
                <div className="relative w-full aspect-square bg-[#0A1B2D] p-6 border-4 border-[#C5A85C] shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={activeDetailImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-none"
                  />

                  {/* Wishlist button */}
                  <button
                    onClick={() => handleToggleWishlist(selectedProduct.id, selectedProduct.name)}
                    className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:text-[#C5A85C] transition-colors border-0 cursor-pointer"
                  >
                    {wishlistItems.includes(selectedProduct.id) ? (
                      <svg className="w-5.5 h-5.5 text-red-500 fill-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-3 gap-4">
                  {(selectedProduct.thumbnails || [
                    selectedProduct.image,
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80"
                  ]).map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDetailImage(thumb)}
                      className={`aspect-square overflow-hidden bg-slate-100 border-2 cursor-pointer transition-all ${activeDetailImage === thumb
                          ? "border-[#C5A85C] ring-2 ring-[#C5A85C]/20"
                          : "border-slate-200 hover:border-slate-400"
                        }`}
                    >
                      <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Information & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                <div>
                  {/* Signature Collection Tag */}
                  <span className="text-xs font-bold tracking-[0.25em] text-[#C5A85C] uppercase block mb-1">
                    {selectedProduct.id === 9 ? "SIGNATURE COLLECTION" : "PREMIUM COLLECTION"}
                  </span>

                  {/* Product Title */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                    {selectedProduct.name}
                  </h1>

                  {/* Rating summary */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {renderStars(selectedProduct.rating)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 ml-1">{selectedProduct.rating}</span>
                    <span className="text-xs text-slate-400 font-medium">({selectedProduct.reviewsCount} Genuine Reviews)</span>
                  </div>

                  {/* Pricing and discounts */}
                  <div className="mt-6 flex items-baseline gap-4 flex-wrap">
                    <span className="font-serif text-3xl font-bold text-slate-900">
                      ₹{selectedProduct.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-base text-slate-400 line-through">
                      ₹{selectedProduct.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                      {selectedProduct.discount}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-amber-800 font-medium">
                    ⓘ Price inclusive of all taxes and shipping.
                  </p>

                  {/* Stock banner */}
                  <div className="mt-6 bg-[#C5A85C] text-[#0A1B2D] px-4 py-3.5 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    In Stock — Ready for expedited delivery
                  </div>

                  {/* Description text */}
                  <p className="mt-6 text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedProduct.description || "Indulge in pure elegance. Handcrafted with fine materials and designed for premium comfort and statement luxury style."}
                  </p>

                  {/* Metal finish swatches */}
                  <div className="mt-8">
                    <span className="text-xs font-bold text-slate-700 tracking-wider uppercase block mb-3.5">
                      CHOOSE METAL FINISH
                    </span>
                    <div className="flex items-center gap-3">
                      {[
                        { id: "purple", name: "Purple Gemstone", class: "bg-purple-400 ring-purple-600" },
                        { id: "gold", name: "Rose Gold Plated", class: "bg-amber-200 ring-[#C5A85C]" },
                        { id: "red", name: "Crimson Ruby Set", class: "bg-red-500 ring-red-700" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setChosenFinish(item.id);
                            showToast(`Selected Finish: ${item.name}`);
                          }}
                          className={`h-9 w-9 rounded-full cursor-pointer transition-transform duration-200 ${item.class} ${chosenFinish === item.id ? "ring-4 ring-offset-2 scale-110" : "hover:scale-105"
                            }`}
                          title={item.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity Counter Selector */}
                  <div className="mt-8 flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-700 tracking-wider uppercase">QUANTITY:</span>
                    <div className="flex items-center border border-slate-200 bg-white">
                      <button
                        onClick={() => setProductQuantity((prev) => Math.max(1, prev - 1))}
                        className="h-10 w-10 text-slate-600 hover:bg-slate-50 text-lg font-semibold flex items-center justify-center transition-colors bg-transparent border-0 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-sm font-semibold text-slate-800">
                        {productQuantity}
                      </span>
                      <button
                        onClick={() => setProductQuantity((prev) => prev + 1)}
                        className="h-10 w-10 text-slate-600 hover:bg-slate-50 text-lg font-semibold flex items-center justify-center transition-colors bg-transparent border-0 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct.id, selectedProduct.name, productQuantity)}
                    className="bg-[#0A1B2D] hover:bg-[#071421] text-white font-bold text-xs tracking-wider uppercase py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors border-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    ADD TO CART
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct.id, selectedProduct.name, productQuantity);
                      showToast("Proceeding to checkout with your purchase...");
                    }}
                    className="bg-[#C5A85C] hover:bg-[#b5974b] text-[#0A1B2D] font-bold text-xs tracking-wider uppercase py-4 cursor-pointer transition-colors border-0"
                  >
                    BUY NOW
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-y-4 gap-x-2 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Free Insured Shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                    </svg>
                    30-Day Easy Returns
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    BIS Hallmarked Gold
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certified Diamonds
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Description Section (Craftsmanship & Heritage) */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-[#081421] text-white p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="lg:w-3/5 space-y-6">
                <span className="text-xs font-bold text-[#C5A85C] tracking-widest uppercase">Description</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Craftsmanship & Heritage
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Each GlowDrape Diamond Pendant is a masterpiece of precision and artistry. Our master jewelers spend over 24 hours hand-setting each individual diamond to ensure maximum light refraction and brilliance. The central floral motif symbolizes eternal growth and timeless beauty.
                </p>
                <div className="space-y-3.5 pt-4">
                  {[
                    "Sourced from conflict-free, ethical mines.",
                    "Individually inspected for clarity and cut.",
                    "Adjustable chain length for versatile styling."
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                      <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-2/5 w-full relative aspect-[4/3] max-w-md overflow-hidden bg-slate-800">
                <img
                  src="/images/products/p2.jpg.jpeg"
                  alt="Craftsmanship loose diamonds detail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-[#C5A85C] text-[#0A1B2D] p-8 md:p-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#0A1B2D]/20 pb-6 mb-8 gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">Customer Reviews</h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      {renderStars(5)}
                    </span>
                    <span className="text-sm font-bold">4.8 out of 5</span>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Review submission is coming soon!")}
                  className="bg-[#0A1B2D] hover:bg-[#071421] text-white font-bold text-xs tracking-wider uppercase px-6 py-3 border-0 cursor-pointer transition-colors whitespace-nowrap"
                >
                  WRITE A REVIEW
                </button>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Ananya Sharma",
                    title: "Exquisite and Brilliant!",
                    quote: "The sparkle on this pendant is unlike anything I've seen in this price range. It looks far more expensive than it is. Perfect for my anniversary dinner!",
                    helpful: 12
                  },
                  {
                    name: "Vikram Malhotra",
                    title: "Great gift option",
                    quote: "Bought this for my daughter's graduation. The packaging was stunning and it arrived exactly on time. She absolutely loves the delicate design.",
                    helpful: 8
                  },
                  {
                    name: "Priya V.",
                    title: "Pure Elegance",
                    quote: "I wear it everyday to work. It's subtle yet presence-making. The 18k gold has a very rich tone. GlowDrape never disappoints with quality.",
                    helpful: 24
                  }
                ].map((review, idx) => (
                  <div key={idx} className="bg-white p-6 shadow-md text-slate-800 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{review.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Purchaser</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {renderStars(5)}
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mt-4 leading-tight">"{review.title}"</h4>
                      <p className="text-xs.5 text-slate-600 mt-2 leading-relaxed italic">
                        "{review.quote}"
                      </p>
                    </div>

                    <button
                      onClick={() => showToast(`Voted review helpful (${review.helpful + 1} helpful votes total).`)}
                      className="mt-6 self-start text-[10px] font-bold text-[#C5A85C] hover:text-[#b5974b] bg-transparent border-0 cursor-pointer flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => showToast("Displaying all 128 customer reviews...")}
                  className="font-bold text-xs tracking-wider uppercase text-[#0A1B2D] hover:underline bg-transparent border-0 cursor-pointer inline-flex items-center gap-1"
                >
                  VIEW ALL REVIEWS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Recommendations Area */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-center text-slate-800 mb-10">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  id: 1,
                  name: "Diamond Stud Earrings",
                  price: 3299,
                  image: "/images/products/p6.jpg.jpeg"
                },
                {
                  id: 3,
                  name: "Ivory Eden Anarkali",
                  price: 5999,
                  image: "/images/products/t1.jpg.jpeg"
                },
                {
                  id: 9, // Loop back to the main set
                  name: "Premium Tiered Gharara Suit",
                  price: 8499,
                  image: "/images/products/p11.jpg.jpeg"
                },
                {
                  id: 2,
                  name: "Split Shank Solitaire Ring",
                  price: 4199,
                  image: "/images/products/p8.jpg.jpeg"
                }
              ].map((rec) => {
                // Try to find full product info, otherwise create fallback
                const fullProd = initialProducts.find(p => p.id === rec.id) || {
                  id: rec.id,
                  name: rec.name,
                  price: rec.price,
                  image: rec.image,
                  originalPrice: rec.price + 1000,
                  discount: "10% OFF",
                  rating: 4.5,
                  reviewsCount: 30,
                  category: "Jewellery",
                  material: "Gold"
                } as Product;

                return (
                  <div key={rec.id} className="group flex flex-col justify-between">
                    <div
                      onClick={() => setSelectedProduct(fullProd)}
                      className="relative w-full aspect-square overflow-hidden bg-slate-100 shadow-sm border border-slate-100 cursor-pointer"
                    >
                      <img src={rec.image} alt={rec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="pt-4 flex flex-col flex-1 justify-between">
                      <div onClick={() => setSelectedProduct(fullProd)} className="cursor-pointer">
                        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-[#C5A85C] transition-colors line-clamp-1">
                          {rec.name}
                        </h3>
                        <span className="font-semibold text-slate-900 block mt-1">
                          ₹{rec.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="mt-3.5 pt-1.5 border-t border-slate-100">
                        <button
                          onClick={() => handleAddToCart(rec.id, rec.name)}
                          className="text-xs font-bold text-[#C5A85C] hover:text-[#b5974b] tracking-wider uppercase transition-colors bg-transparent border-0 cursor-pointer"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Newsletter Signup (Common for both pages) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#C5A85C] text-white rounded-none py-14 px-6 sm:px-12 lg:px-20 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-sm font-bold tracking-[0.25em] text-[#0A1B2D] uppercase">
              JOIN THE INNER CIRCLE
            </h2>
            <p className="mt-3.5 text-sm sm:text-base font-medium text-slate-50 leading-relaxed">
              Get 10% Off Your First Order and stay updated with our latest luxury drops.
            </p>

            <form onSubmit={handleSubscribe} className="mt-8 flex w-full flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 border-0 outline-none text-slate-800 text-sm bg-white placeholder-slate-400 font-medium focus:ring-2 focus:ring-[#0A1B2D]"
              />
              <button
                type="submit"
                className="bg-[#0A1B2D] hover:bg-[#071421] text-white font-semibold text-xs tracking-wider uppercase px-8 py-3.5 transition-colors duration-200 whitespace-nowrap cursor-pointer border-0"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer (Common for both pages) */}
      <footer className="w-full bg-[#081321] text-slate-400 border-t border-slate-900 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-16">
            {/* Column 1 - Brand */}
            <div className="lg:col-span-2 space-y-6">
              <button onClick={() => setSelectedProduct(null)} className="font-serif text-3xl font-bold tracking-tight text-white bg-transparent border-0 cursor-pointer">
                Glow<span className="text-[#C5A85C]">Drape</span>
              </button>
              <p className="text-sm text-slate-400/90 leading-relaxed max-w-xs">
                Handpicked jewellery and timeless fashion crafted for every special moment. Quality and elegance at the heart of everything we do.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4.5 pt-2">
                {/* Whatsapp */}
                <a href="#" className="text-slate-400 hover:text-white transition-colors" title="WhatsApp">
                  <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.016 14.12 1.01 11.999 1.01c-5.441 0-9.866 4.372-9.87 9.802 0 1.714.47 3.387 1.365 4.842l-.993 3.63 3.738-.971.173.102c1.478.877 3.122 1.34 4.805 1.34zm8.283-7.533c-.26-.13-1.53-.757-1.768-.844-.239-.086-.41-.13-.58.13-.17.26-.66.837-.81.999-.148.163-.298.182-.557.052-.26-.13-1.096-.405-2.088-1.286-.772-.689-1.293-1.54-1.443-1.8-.15-.26-.016-.4.113-.53.118-.12.26-.3.39-.45.13-.15.17-.26.26-.43.08-.18.04-.33-.02-.46-.06-.13-.58-1.393-.8-1.916-.21-.52-.42-.45-.58-.45-.15 0-.33-.02-.5-.02-.18 0-.46.06-.7.33-.24.26-.92.9-.92 2.2 0 1.29.94 2.54 1.07 2.71.13.17 1.85 2.824 4.47 3.962.63.27 1.11.43 1.49.55.63.2 1.21.17 1.66.1.5-.07 1.53-.63 1.74-1.23.21-.6.21-1.12.15-1.23-.07-.11-.26-.17-.52-.3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-slate-400 hover:text-white transition-colors" title="Instagram">
                  <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="text-slate-400 hover:text-white transition-colors" title="Facebook">
                  <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                {/* Youtube */}
                <a href="#" className="text-slate-400 hover:text-white transition-colors" title="YouTube">
                  <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 - Company */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase">Company</h4>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">About Us</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Our Story</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Careers</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Press</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Sustainability</a>
            </div>

            {/* Column 3 - Shop */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase">Shop</h4>
              <button onClick={() => setSelectedProduct(null)} className="text-[13.5px] hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer font-sans text-slate-400">Jewellery</button>
              <button onClick={() => setSelectedProduct(null)} className="text-[13.5px] hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer font-sans text-slate-400">Sarees</button>
              <button onClick={() => setSelectedProduct(null)} className="text-[13.5px] hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer font-sans text-slate-400">Bridal Edit</button>
              <button onClick={() => setSelectedProduct(null)} className="text-[13.5px] hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer font-sans text-slate-400">Festive</button>
              <button onClick={() => showToast("Gift card portal opening soon!")} className="text-[13.5px] hover:text-white transition-colors text-left bg-transparent border-0 cursor-pointer font-sans text-slate-400">Gift Cards</button>
            </div>

            {/* Column 4 - Help */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase">Help</h4>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Shipping</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Returns</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">Size Guide</a>
              <a href="#" className="text-[13.5px] hover:text-white transition-colors">FAQs</a>
            </div>

          </div>

          {/* Bottom Footer Info Bar */}
          <div className="border-t border-slate-900 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <span>© 2026 GlowDrape.</span>

            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}