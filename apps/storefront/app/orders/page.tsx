'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar'; 
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer'; 
import { Search, MapPin, Truck, Star, ArrowRight, RotateCcw, AlertTriangle, ExternalLink } from 'lucide-react';

interface Order {
  id: string;
  product: string;
  sku: string;
  image: string;
  price: number;
  qty: number;
  date: string;
  deliveredDate?: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'>('All');

  const orders: Order[] = [
    {
      id: 'GD202600128',
      product: 'Sterling Silver Pendant',
      sku: 'RNG-101',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop',
      price: 10837,
      qty: 1,
      date: '22 June 2026',
      status: 'Processing',
    },
    {
      id: 'GD202600117',
      product: 'Diamond Stud Earrings',
      sku: 'ERG-411',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
      price: 3299,
      qty: 2,
      date: '15 June 2026',
      deliveredDate: '18 June 2026',
      status: 'Delivered',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      activeFilter === 'All' ? true : order.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    if (status === 'Processing') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Processing
        </span>
      );
    }
    if (status === 'Shipped') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Shipped
        </span>
      );
    }
    if (status === 'Delivered') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> Delivered
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Cancelled
      </span>
    );
  };

  const handleBuyAgain = (orderId: string) => {
    alert(`Order ${orderId} added to cart for quick repurchase.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-[#2A3B50]">
      <Navbar />

      <main className="flex-grow py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Section */}
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

            {/* Filter controls + Search box */}
            <div className="flex flex-wrap justify-between items-center gap-5 mb-8">
              <div className="flex flex-wrap gap-2.5">
                {(['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-5 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#2A3B50] bg-[#2A3B50] text-white shadow-xs'
                          : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-[#2A3B50]'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2.5 pr-4 pl-10 rounded-full border border-gray-200 bg-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Orders Cards List */}
            <div className="flex flex-col gap-6">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-xs p-5 gap-6 border border-gray-100 hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="shrink-0 w-full lg:w-40 h-48 lg:h-40 rounded-lg bg-gray-100 overflow-hidden relative">
                    <img 
                      src={order.image} 
                      alt={order.product} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start md:items-center mb-2 flex-wrap gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-bold text-gray-400 tracking-wide uppercase">
                          Order #{order.id}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-lg font-extrabold text-slate-800">
                        ₹{order.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-0 -mt-1 md:-mt-2 gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-905 mb-1">
                          {order.product}
                        </h3>
                        <p className="text-xs text-gray-450 font-medium">
                          Ordered on {order.date} • {order.qty} Item{order.qty > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mt-1 md:mt-0">
                        {order.status === 'Delivered' && order.deliveredDate
                          ? `Delivered on ${order.deliveredDate}`
                          : 'Inclusive of taxes'}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 border-t border-gray-50 pt-4 flex-wrap gap-4">
                      <div className="flex gap-3 w-full sm:w-auto">
                        {order.status === 'Processing' ? (
                          <Link 
                            href={`/orders/${order.id}?track=true`}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#2A3B50] hover:bg-[#1f2b3b] text-white transition-all shadow-xs"
                          >
                            <Truck size={13} />
                            Track Order
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleBuyAgain(order.id)}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#2A3B50] hover:bg-[#1f2b3b] text-white transition-all shadow-xs cursor-pointer"
                          >
                            <RotateCcw size={13} />
                            Buy Again
                          </button>
                        )}
                        <Link 
                          href={`/orders/${order.id}`}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold border border-gray-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                        >
                          View Details
                        </Link>
                      </div>

                      {order.status === 'Delivered' && (
                        <Link 
                          href={`/reviews?writeOrder=${order.id}`} 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#D4AF37] transition-colors"
                        >
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          Write a Review
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-xl p-16 text-center shadow-xs">
                  <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm font-semibold">No orders found matching this filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}