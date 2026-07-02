'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Check, CheckCircle2, ChevronRight, HelpCircle, Mail, MapPin, Truck, Box } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = (params?.id as string) || 'GD202600128';
  
  // Check if we are viewing the delivered order or processing order
  const isDelivered = id === 'GD202600117';

  // Stepper logic states
  // Steps: 1 (Confirmed), 2 (Processing), 3 (Shipped), 4 (Delivered)
  const steps = [
    { title: 'Order Confirmed', desc: 'Received & validated', status: 'completed' },
    { title: 'Processing', desc: 'Being prepared', status: isDelivered ? 'completed' : 'active' },
    { title: 'Shipped', desc: 'In transit', status: isDelivered ? 'completed' : 'pending' },
    { title: 'Delivered', desc: 'Handed over', status: isDelivered ? 'completed' : 'pending' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-[#2A3B50]">
      <Navbar />

      {/* Breadcrumbs Bar */}
      <div className="border-b border-gray-150 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Link href="/cart" className="hover:text-[#D4AF37] transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <Link href="/checkout" className="hover:text-[#D4AF37] transition-colors">Checkout</Link>
          <ChevronRight size={12} />
          <span className="text-[#2A3B50] font-bold">Order Confirmation</span>
        </div>
      </div>

      <main className="flex-grow py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Order Placed Successful Alert Box */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-xs text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-[#00A360] border border-emerald-100 shadow-2xs">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
                Order Placed Successfully
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-700">Ananya</span>! Your order has been received and is being prepared with care.
              </p>
            </div>

            {/* Metadata Info Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 max-w-2xl mx-auto text-left mt-6">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Order ID</span>
                <span className="text-xs font-extrabold text-slate-850 mt-1 block">#{id}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Date</span>
                <span className="text-xs font-extrabold text-slate-850 mt-1 block">22 June 2026</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Payment</span>
                <span className="text-xs font-extrabold text-slate-850 mt-1 block">UPI</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Est. Delivery</span>
                <span className="text-xs font-extrabold text-[#00A360] mt-1 block">27 June 2026</span>
              </div>
            </div>
          </div>

          {/* Stepper Status Tracking Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
              Order Status
            </h3>

            {/* Steps Container */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
              
              {/* Stepper horizontal progress line for desktop */}
              <div className="hidden md:block absolute left-8 right-8 top-[15px] h-[3px] bg-slate-100 z-0">
                <div 
                  className="h-full bg-[#2A3B50] transition-all duration-500" 
                  style={{ width: isDelivered ? '100%' : '33.33%' }}
                />
              </div>

              {steps.map((step, index) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';
                const isPending = step.status === 'pending';

                return (
                  <div key={index} className="flex md:flex-col items-center gap-4 md:gap-2 z-10 w-full md:w-auto md:text-center relative">
                    {/* Step Icon Indicator */}
                    <div 
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300
                        ${isCompleted ? 'bg-[#2A3B50] border-[#2A3B50] text-white shadow-2xs' : ''}
                        ${isActive ? 'bg-[#D4AF37] border-[#D4AF37] text-white animate-pulse' : ''}
                        ${isPending ? 'bg-white border-slate-200 text-slate-400' : ''}
                      `}
                    >
                      {isCompleted ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Step Labels */}
                    <div className="text-left md:text-center">
                      <h4 className={`text-xs font-bold ${isPending ? 'text-slate-400' : 'text-slate-800'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                        {step.desc}
                      </p>
                    </div>

                    {/* Vertical line indicator for mobile */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden absolute left-[15px] top-8 bottom-[-24px] w-[3px] bg-slate-100">
                        <div 
                          className="w-full bg-[#2A3B50]" 
                          style={{ height: isCompleted ? '100%' : '0%' }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

          {/* Details Split Layout (Order Summary & Address) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left side: Order Summary */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 border-b border-gray-50 pb-3">
                  Order Summary
                </h3>

                {/* Items List */}
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" 
                        alt="Sterling Silver Pendant" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">Sterling Silver Pendant</h4>
                      <span className="text-[10px] text-gray-450 font-medium block mt-0.5">Qty: 1</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">₹10,837</span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" 
                        alt="Diamond Stud Earrings" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">Diamond Stud Earrings</h4>
                      <span className="text-[10px] text-gray-450 font-medium block mt-0.5">Qty: 1</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">₹3,299</span>
                  </div>
                </div>
              </div>

              {/* Summary calculations */}
              <div className="border-t border-gray-100 mt-6 pt-5 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-450 font-semibold">Subtotal</span>
                  <span className="font-extrabold text-slate-800">₹14,136</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-450 font-semibold">Shipping</span>
                  <span className="font-extrabold text-[#00A360]">Free</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-450 font-semibold">Discount</span>
                  <span className="font-extrabold text-rose-500">-₹1,000</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-dashed border-gray-100 pt-3">
                  <span className="text-slate-800 font-bold">Total</span>
                  <span className="font-black text-[#2A3B50]">₹13,136</span>
                </div>
              </div>
            </div>

            {/* Right side: Address & Help */}
            <div className="md:col-span-5 flex flex-col gap-6">
              
              {/* Delivery Address Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs flex-grow">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#D4AF37]" />
                  Delivery Address
                </h3>
                <div className="space-y-1.5 text-xs text-slate-650 leading-relaxed font-semibold">
                  <p className="font-extrabold text-slate-800 text-sm">Ananya Sharma</p>
                  <p>702, Silver Oaks Residency,</p>
                  <p>Linking Road, Bandra West,</p>
                  <p>Mumbai, Maharashtra - 400050, India</p>
                  <p className="pt-2 text-slate-400 font-bold">Phone: +91 98XXX X5432</p>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-[#2A3B50] rounded-xl p-5 text-white shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#D4AF37]">
                  <HelpCircle size={14} />
                  Need Help?
                </h3>
                <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                  Our luxury concierge team is available 24/7 for any questions regarding your order.
                </p>
                <a 
                  href="mailto:support@glowdrape.com"
                  className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline"
                >
                  <Mail size={12} />
                  support@glowdrape.com
                </a>
              </div>

            </div>

          </div>

          {/* Action button row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => alert(`Tracking order #${id}... Status updates are standard.`)}
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#bfa032] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Track Order
            </button>
            <Link
              href="/orders"
              className="px-6 py-2.5 border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-colors shadow-2xs"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 text-slate-450 hover:text-slate-800 text-xs font-bold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
