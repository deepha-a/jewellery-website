"use html";
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Heart, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  X 
} from 'lucide-react';

// ================= UPDATED GLOBAL WRAPPER COMPONENTS IMPORT =================
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';

// ================= TYPES & INTERFACES =================
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  masterCategory: 'Jewellery' | 'Dresses';
  subCategory: string;
  image: string;
  rating: number;
  inStock: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning';
  message: string;
}

// ================= MOCK DATA ARCHITECTURE (UPDATED WITH BALANCED SELECTIONS) =================
const MOCK_PRODUCTS: Product[] = [
  // --- JEWELLERY MAIN GRID TARGETS ---
  { id: '1', title: 'Pearl Strand Necklace', description: 'Timeless classic white pearl necklace', price: 100000, masterCategory: 'Jewellery', subCategory: 'Necklaces', image: '/images/products/p1.jpg.jpeg', rating: 5, inStock: true, isFeatured: true },
  { id: '2', title: 'Diamond Solitaire Ring', description: '18k White Gold flawless ring', price: 24499, masterCategory: 'Jewellery', subCategory: 'Rings', image: '/images/products/p2.jpg.jpeg', rating: 4, inStock: true },
  { id: '3', title: 'Royal Emerald Drop Earrings', description: 'Stunning emerald drops framed with pavé diamonds', price: 18500, masterCategory: 'Jewellery', subCategory: 'Earrings', image: '/images/products/p3.jpg.jpeg', rating: 5, inStock: true, isFeatured: true },
  { id: '4', title: 'Bridal Necklace Set', description: 'Full traditional wedding choker set', price: 28999, masterCategory: 'Jewellery', subCategory: 'Necklaces', image: '/images/products/p4.jpg.jpeg', rating: 5, inStock: true, isNewArrival: true },
  { id: '5', title: 'Sterling Silver Bracelet', description: 'Rhodium plated minimal statement', price: 2499, masterCategory: 'Jewellery', subCategory: 'Bracelets', image: '/images/products/p5.jpg.jpeg', rating: 4, inStock: true },
  { id: '6', title: 'Classic Gold Hoop Earrings', description: '14k solid yellow gold timeless everyday hoops', price: 4500, masterCategory: 'Jewellery', subCategory: 'Earrings', image: '/images/products/p6.jpg.jpeg', rating: 4, inStock: true },
  { id: '7', title: 'Precious Stone Pendant', description: 'Sapphire cluster with diamonds', price: 4298, masterCategory: 'Jewellery', subCategory: 'Pendants', image: '/images/products/p7.jpg.jpeg', rating: 5, inStock: true },
  { id: '8', title: 'Designer Minimalist Ring', description: 'Handcrafted ultra-thin solid gold', price: 7498, masterCategory: 'Jewellery', subCategory: 'Rings', image: '/images/products/p8.jpg.jpeg', rating: 3, inStock: true },
  
  // --- DRESSES MAIN GRID TARGETS ---
  { id: '9', title: 'Floral Linen Sun Dress', description: 'Breathable daytime premium linen silhouette', price: 3499, masterCategory: 'Dresses', subCategory: 'Casuals', image: '/images/products/p9.jpg.jpeg', rating: 4, inStock: true, isNewArrival: true },
  { id: '10', title: 'Anarkali Silk Festive Gown', description: 'Intricate gold zari embroidery with heavy borders', price: 12500, masterCategory: 'Dresses', subCategory: 'Ethnic Wear', image: '/images/products/p10.jpg.jpeg', rating: 5, inStock: true, isFeatured: true },
  { id: '11', title: 'Crimson Royal Bridal Lehenga', description: 'Heavy hand-woven heritage wedding ensemble', price: 85000, masterCategory: 'Dresses', subCategory: 'Bridal Collections', image: '/images/products/p11.jpg.jpeg', rating: 5, inStock: true },
  { id: '12', title: 'Boho Tiered Midi Dress', description: 'Relaxed cotton style with smocked detail', price: 2800, masterCategory: 'Dresses', subCategory: 'Casuals', image: '/images/products/p12.jpg.jpeg', rating: 4, inStock: false },

  // --- RECOMMENDATIONS TRACK ---
  { id: 'r1', title: 'Diamond Eternity Band', description: 'Platinum Round Brilliant Cut', price: 24500, masterCategory: 'Jewellery', subCategory: 'Rings', image: '/images/products/r1.jpg.jpeg', rating: 5, inStock: true },
  { id: 'r2', title: 'Pastel Organza Kurta Set', description: 'Hand-painted floral borders with lightweight dupatta', price: 4800, masterCategory: 'Dresses', subCategory: 'Ethnic Wear', image: '/images/products/r2.jpg.jpeg', rating: 4, inStock: true },
  { id: 'r3', title: 'Azure Sapphire Choker', description: 'Royal Blue Sapphire, Silver Base', price: 18799, masterCategory: 'Jewellery', subCategory: 'Necklaces', image: '/images/products/r3.jpg.jpeg', rating: 4, inStock: true },
  { id: 'r4', title: 'Ivory Satin Wedding Gown', description: 'Minimalist elegant floor-sweeping bridal line', price: 42000, masterCategory: 'Dresses', subCategory: 'Bridal Collections', image: '/images/products/r4.jpg.jpeg', rating: 5, inStock: true },
  
  // --- TRENDING FOOTER TRACK ---
  { id: 't1', title: 'Emerald Palazzo Suit', description: 'Luxurious silk custom fit festive set', price: 4200, masterCategory: 'Dresses', subCategory: 'Ethnic Wear', image: '/images/products/t1.jpg.jpeg', rating: 5, inStock: true },
  { id: 't2', title: 'Kundan Jhumka Earrings', description: 'Traditional gold plated heritage hair ornaments', price: 3800, masterCategory: 'Jewellery', subCategory: 'Earrings', image: '/images/products/t2.jpg.jpeg', rating: 5, inStock: true },
  { id: 't3', title: 'Lavender Georgette Frock', description: 'Elegant floor-length designer georgette flare', price: 6000, masterCategory: 'Dresses', subCategory: 'Casuals', image: '/images/products/t3.jpg.jpeg', rating: 4, inStock: true },
  { id: 't4', title: 'Pearl Hand Harness', description: 'BIS Hallmarked premium hand accessory', price: 9000, masterCategory: 'Jewellery', subCategory: 'Bracelets', image: '/images/products/t4.jpg.jpeg', rating: 5, inStock: true }
];

export default function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  // ================= STATE MANAGEMENT =================
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [availability, setAvailability] = useState<{ inStock: boolean; outOfStock: boolean }>({ inStock: true, outOfStock: true });
  const [minRating, setMinRating] = useState<number | null>(null);
  
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setSearchQuery(queryParam);
    if (queryParam) {
      const allSubCategories = ['Necklaces', 'Rings', 'Bracelets', 'Earrings', 'Pendants', 'Casuals', 'Ethnic Wear', 'Bridal Collections'];
      const matched = allSubCategories.find(sub => sub.toLowerCase() === queryParam.toLowerCase());
      if (matched) {
        setSelectedSubCategories([matched]);
      }
    }
  }, [queryParam]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      showToast("Please type a keyword to search.", "error");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const toggleSubCategory = (subCat: string) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCat) ? prev.filter(s => s !== subCat) : [...prev, subCat]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedSubCategories([]);
    setPriceRange(100000);
    setAvailability({ inStock: true, outOfStock: true });
    setMinRating(null);
    setSearchQuery('');
    router.push('/search');
    setCurrentPage(1);
  };

  // ================= DATA FILTERING PIPELINE =================
  const filteredProducts = useMemo(() => {
    // Exclude special tracking segments from the core dynamic list view
    let result = MOCK_PRODUCTS.filter(p => !p.id.startsWith('r') && !p.id.startsWith('t')); 

    if (queryParam) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(queryParam.toLowerCase()) || 
        p.masterCategory.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(queryParam.toLowerCase())
      );
    }

    if (selectedSubCategories.length > 0) {
      result = result.filter(p => selectedSubCategories.includes(p.subCategory));
    }

    result = result.filter(p => p.price <= priceRange);

    result = result.filter(p => {
      if (availability.inStock && p.inStock) return true;
      if (availability.outOfStock && !p.inStock) return true;
      return false;
    });

    if (minRating) {
      result = result.filter(p => p.rating >= minRating);
    }

    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);

    return result;
  }, [queryParam, selectedSubCategories, priceRange, availability, minRating, sortBy]);

  const itemsPerPage = 8;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased relative flex flex-col justify-between">
      <Navbar />

      {/* Toast Alert Canvas */}
      <div className="fixed top-24 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`flex items-center justify-between p-4 rounded-xl shadow-xl border transition-all duration-300 ${
              toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
              toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
              'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-600" />}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 md:p-8 grow space-y-12">
        
        {/* Search Input Block */}
        <div className="w-full flex flex-col gap-4 items-center border-b border-slate-100 pb-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search GlowDrape Collections..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-24 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-[#0B192C] text-sm"
            />
            <button type="submit" className="absolute right-2 px-4 py-1.5 bg-[#0B192C] text-white font-medium text-xs rounded-xl hover:bg-[#1E293B] transition-all">
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SIDEBAR CONFIGURATION ================= */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 h-fit sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h2>
              <button onClick={handleClearFilters} className="text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wide">
                Clear All
              </button>
            </div>

            {/* Jewellery Group */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3 bg-amber-500 rounded-xs"></span> Jewellery
              </h3>
              <div className="space-y-2 pl-3">
                {['Necklaces', 'Rings', 'Bracelets', 'Earrings', 'Pendants'].map((sub) => (
                  <label key={sub} className="flex items-center gap-3 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900">
                    <input 
                      type="checkbox" 
                      checked={selectedSubCategories.includes(sub)} 
                      onChange={() => toggleSubCategory(sub)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>

            {/* Dresses Group */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3 bg-[#0B192C] rounded-xs"></span> Dresses
              </h3>
              <div className="space-y-2 pl-3">
                {['Casuals', 'Ethnic Wear', 'Bridal Collections'].map((sub) => (
                  <label key={sub} className="flex items-center gap-3 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900">
                    <input 
                      type="checkbox" 
                      checked={selectedSubCategories.includes(sub)} 
                      onChange={() => toggleSubCategory(sub)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Slider Section */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Price Range</h3>
                <span className="text-xs font-bold text-slate-700">Max: ₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min={1000} 
                max={100000} 
                step={500} 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-100 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            {/* Availability Checks */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={availability.inStock} 
                    onChange={(e) => setAvailability({...availability, inStock: e.target.checked})}
                    className="rounded border-slate-300 text-amber-600 w-4 h-4"
                  />
                  In Stock
                </label>
                <label className="flex items-center gap-3 text-sm font-medium text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={availability.outOfStock} 
                    onChange={(e) => setAvailability({...availability, outOfStock: e.target.checked})}
                    className="rounded border-slate-300 text-amber-600 w-4 h-4"
                  />
                  Out of Stock
                </label>
              </div>
            </div>
          </aside>

          {/* ================= MAIN PRODUCTS PANEL ================= */}
          <main className="lg:col-span-9 space-y-6">
            
            <div className="bg-[#D9B44A]/90 p-4 rounded-xl flex items-center justify-between text-slate-900 shadow-sm border border-amber-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/40 rounded-lg p-0.5">
                  <button onClick={() => setViewLayout('grid')} className={`p-1.5 rounded-md transition-all ${viewLayout === 'grid' ? 'bg-white shadow text-slate-900' : 'text-slate-700 hover:text-slate-900'}`}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewLayout('list')} className={`p-1.5 rounded-md transition-all ${viewLayout === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-700 hover:text-slate-900'}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Showing {filteredProducts.length} Products Found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:outline-none shadow-sm cursor-pointer text-slate-800"
                >
                  <option value="Featured">Featured</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="w-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium text-sm">No items match your active filtration layouts.</p>
                <button onClick={handleClearFilters} className="mt-4 px-4 py-2 bg-[#0B192C] text-white rounded-xl text-xs font-semibold">Reset View</button>
              </div>
            ) : (
              <div className={viewLayout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
                {paginatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative flex ${viewLayout === 'grid' ? 'flex-col' : 'flex-row items-center p-4 gap-6'}`}
                  >
                    {product.isFeatured && <span className="absolute top-3 left-3 z-10 text-[9px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
                    {!product.inStock && <span className="absolute top-3 left-3 z-10 text-[9px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Out of Stock</span>}

                    <div className={`relative bg-slate-50 overflow-hidden ${viewLayout === 'grid' ? 'w-full aspect-square' : 'w-32 h-32 rounded-xl shrink-0'}`}>
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        unoptimized
                      />
                      <button 
                        onClick={() => showToast(`Added to your Wishlist!`, 'success')}
                        className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-xs rounded-full shadow hover:bg-white text-rose-500 transition-all"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div className="p-4 grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">{product.masterCategory} &rsaquo; {product.subCategory}</span>
                        <h4 onClick={() => router.push(`/product/${product.id}`)} className="text-sm font-bold text-slate-800 line-clamp-1 cursor-pointer hover:text-amber-600 transition-all">
                          {product.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
                        <span className="text-sm font-extrabold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                        <button 
                          disabled={!product.inStock}
                          onClick={() => showToast(`"${product.title}" successfully added to your bag.`, 'success')}
                          className={`p-2 rounded-xl transition-all ${product.inStock ? 'bg-slate-50 text-slate-700 hover:bg-[#0B192C] hover:text-white' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Base Row */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${currentPage === page ? 'bg-[#0B192C] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Recommended Panel Deck */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold tracking-wide text-slate-900">Recommended For You</h3>
            <p className="text-xs text-slate-400">Curated pieces that match your exquisite taste</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.filter(p => p.id.startsWith('r')).map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden p-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div onClick={() => router.push(`/product/${item.id}`)} className="relative aspect-square w-full bg-slate-50 rounded-xl overflow-hidden cursor-pointer">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-all duration-500" unoptimized />
                </div>
                <div className="pt-3 space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                    <button onClick={() => showToast("Item added to your shopping bag.", "success")} className="text-amber-600 p-1 bg-amber-50 rounded-lg hover:bg-amber-600 hover:text-white transition-all">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Circle Shortcut Toggles */}
        <div className="space-y-4 text-center bg-[#0B192C] text-white py-10 px-4 rounded-3xl shadow-xl">
          <h3 className="text-lg font-bold uppercase tracking-wider text-amber-400">Shop by Category</h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: 'Casuals', file: 'Casuals.jpg.jpeg' },
              { label: 'Rings', file: 'Rings.jpg.jpeg' },
              { label: 'Ethnic Wear', file: 'Ethnic-Wear.jpg.jpeg' },
              { label: 'Necklaces', file: 'Necklaces.jpg.jpeg' },
              { label: 'Earrings', file: 'Earrings.jpg.jpeg' },
              { label: 'Bridal Collections', file: 'Bridal-Collections.jpg.jpeg' }
            ].map((category) => (
              <button 
                key={category.label}
                onClick={() => {
                  setSearchQuery('');
                  router.push(`/search?q=${encodeURIComponent(category.label)}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-amber-500/30 group-hover:border-amber-400 overflow-hidden relative transition-all shadow-inner">
                  <Image src={`/images/categories/${category.file}`} alt={category.label} fill className="object-cover group-hover:scale-110 transition-all" unoptimized />
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-400 transition-all">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= THE SUMMER EDITION BANNER ================= */}
        <div className="w-full relative rounded-3xl overflow-hidden aspect-21/9 md:aspect-3/1 shadow-lg border border-slate-100 bg-teal-900 text-white flex items-center">
          <img src="/images/banners/summer-banner.jpg.jpeg" alt="Summer Drop Collection" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 pl-6 md:pl-16 space-y-2 max-w-xl">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-amber-400 uppercase">The Summer Edition</span>
            <h2 className="text-xl md:text-4xl font-extrabold leading-tight">Where summer meets <br />timeless style</h2>
            <p className="text-[10px] md:text-sm text-slate-200 line-clamp-2 md:line-clamp-none">Explore lightweight styles and radiant jewelry designed to keep you elegant all season long.</p>
            <button 
              onClick={() => router.push('/search?q=Casuals')} 
              className="mt-2 md:mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
            >
              Shop The Collection
            </button>
          </div>
        </div>

        {/* ================= TRENDING NOW SLIDER ================= */}
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-slate-200 pb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Trending Now</h3>
              <p className="text-xs text-slate-400">The pieces everyone is falling in love with</p>
            </div>
            <button onClick={() => router.push('/search')} className="text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider">View All Trending</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_PRODUCTS.filter(p => p.id.startsWith('t')).map((item) => (
              <div key={item.id} className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 flex flex-col justify-between group hover:border-amber-500 transition-all">
                <div onClick={() => router.push(`/product/${item.id}`)} className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-200 cursor-pointer">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-all duration-500" unoptimized />
                </div>
                <div className="pt-3 bg-white p-3 rounded-xl mt-2 flex flex-col justify-between gap-1 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                  <span className="text-xs font-extrabold text-amber-700">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Trust Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100 text-center">
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-50 shadow-xs">
            <span className="text-sm font-bold text-slate-800">Free Shipping</span>
            <span className="text-[10px] text-slate-400">On orders above ₹1,999</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-50 shadow-xs">
            <span className="text-sm font-bold text-slate-800">Easy Returns</span>
            <span className="text-[10px] text-slate-400">7-day hassle-free return policy</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-50 shadow-xs">
            <span className="text-sm font-bold text-slate-800">Secure Payments</span>
            <span className="text-[10px] text-slate-400">100% encrypted safe checkout</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-50 shadow-xs">
            <span className="text-sm font-bold text-slate-800">Certified Quality</span>
            <span className="text-[10px] text-slate-400">100% genuine BIS Hallmarked</span>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}