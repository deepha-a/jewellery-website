import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar'; 
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer'; 

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-[#2A3B50]">
      
      <Navbar />

      {/* ADJUSTED: Matched padding and max-width to push the sidebar left and align with header/footer */}
      <main className="flex-grow py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Orders Content Area */}
          <div className="flex-grow w-full">
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 mb-8 font-medium flex gap-2 items-center">
              <span>My Account</span>
              <span>&gt;</span>
              <span className="text-[#D4AF37]">My Orders</span>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-[28px] font-bold mb-2">My Orders</h1>
              <p className="text-sm text-gray-500">View and manage your purchases from GlowDrape Luxury.</p>
            </div>

            {/* Controls Bar (Filters + Search) */}
            <div className="flex flex-wrap justify-between items-center gap-5 mb-8">
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2 rounded-full border border-[#2A3B50] bg-[#2A3B50] text-white text-sm font-medium transition-colors">
                  All
                </button>
                <button className="px-5 py-2 rounded-full border border-gray-300 bg-transparent text-gray-500 text-sm font-medium hover:bg-gray-100 transition-colors">
                  Processing
                </button>
                <button className="px-5 py-2 rounded-full border border-gray-300 bg-transparent text-gray-500 text-sm font-medium hover:bg-gray-100 transition-colors">
                  Shipped
                </button>
                <button className="px-5 py-2 rounded-full border border-gray-300 bg-transparent text-gray-500 text-sm font-medium hover:bg-gray-100 transition-colors">
                  Delivered
                </button>
                <button className="px-5 py-2 rounded-full border border-gray-300 bg-transparent text-gray-500 text-sm font-medium hover:bg-gray-100 transition-colors">
                  Cancelled
                </button>
              </div>

              <div className="relative w-full sm:w-[250px]">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full py-2.5 pr-4 pl-10 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Order Cards List */}
            <div className="flex flex-col gap-6">

              {/* Order Card 1: Processing */}
              <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-sm p-5 gap-6 border border-gray-200">
                <div className="shrink-0 w-full lg:w-40 h-48 lg:h-40 rounded-lg bg-gray-100 overflow-hidden relative">
                  {/* ADJUSTED: Fresh, reliable Unsplash link for a necklace */}
                  <img 
                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" 
                    alt="Sterling Silver Pendant" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start md:items-center mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-bold text-gray-500 tracking-wide">ORDER #GD202600128</span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Processing
                      </span>
                    </div>
                    <div className="text-lg font-bold mt-2 md:mt-0">₹10,837</div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-0 -mt-1 md:-mt-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Sterling Silver Pendant</h3>
                      <p className="text-sm text-gray-500">Ordered on 22 June 2026 • 1 Item</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 md:mt-0">Inclusive of taxes</div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold bg-[#2A3B50] text-white hover:opacity-90 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        Track Order
                      </button>
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Card 2: Delivered */}
              <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-sm p-5 gap-6 border border-gray-200">
                <div className="shrink-0 w-full lg:w-40 h-48 lg:h-40 rounded-lg bg-gray-100 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" alt="Diamond Stud Earrings" className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start md:items-center mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-bold text-gray-500 tracking-wide">ORDER #GD202600117</span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Delivered
                      </span>
                    </div>
                    <div className="text-lg font-bold mt-2 md:mt-0">₹3,299</div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-0 -mt-1 md:-mt-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Diamond Stud Earrings</h3>
                      <p className="text-sm text-gray-500">Ordered on 15 June 2026 • 2 Items</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 md:mt-0">Delivered on 18 June 2026</div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold bg-[#2A3B50] text-white hover:opacity-90 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                        Buy Again
                      </button>
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                    <Link href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#D4AF37] mt-4 sm:mt-0 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      Write a Review
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}