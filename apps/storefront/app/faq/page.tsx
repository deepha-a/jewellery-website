"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQPage() {
  // Track which accordion item ID is currently expanded (null if all are closed)
  const [openId, setOpenId] = useState<number | null>(1); // Defaults first item open

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  // Structured GlowDrape dataset matching product segments
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Are your jewellery pieces certified and authentic?",
      answer: "Yes, absolute authenticity is our core standard. All our gold and diamond jewellery is completely BIS Hallmarked and comes with authentic diamond grading certificates from recognized third-party labs like IGI or GIA.",
    },
    {
      id: 2,
      question: "What is your standard shipping timeline within India?",
      answer: "We offer free standard shipping on all orders over ₹1,999. Orders are usually processed within 24 to 48 hours and arrive at your doorstep within 3-5 operational business days.",
    },
    {
      id: 3,
      question: "What is your return and exchange policy?",
      answer: "We offer a hassle-free 7-day return policy for unused products in their original packaging with security tags intact. Custom-tailored ethnic dresses or altered jewelry pieces cannot be returned.",
    },
    {
      id: 4,
      question: "Can I customize a ring or bridal dress sizing?",
      answer: "Absolutely! We provide bespoke sizing options for our bridal wear and luxury collections. Please use our contact form or reach out directly to our concierge team with your custom measurements.",
    },
    {
      id: 5,
      question: "What secure payment modes do you accept?",
      answer: "We accept all major secure transaction channels including credit/debit cards, Net Banking, UPI systems via Razorpay, and convenient Cash on Delivery (COD) services for select pin codes.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Header Title Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Frequently Asked Questions</h1>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Find instant solutions regarding your orders, product specifications, shipping timelines, and customizations.
            </p>
          </div>

          {/* Interactive Accordion Matrix */}
          <div className="space-y-3">
            {faqData.map((faq) => {
              const isOpen = openId === faq.id;
              
              return (
                <div 
                  key={faq.id} 
                  className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.015)] overflow-hidden transition-all duration-200"
                >
                  {/* Accordion Trigger Header Bar */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <HelpCircle className={`w-4 h-4 flex-shrink-0 ${isOpen ? "text-[#B48A36]" : "text-gray-400"}`} />
                      <span className="text-xs md:text-sm font-semibold text-[#1E293B]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "transform rotate-180 text-[#B48A36]" : ""
                      }`} 
                    />
                  </button>

                  {/* Accordion Smooth Body Wrapper */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 border-t border-gray-50/50" : "max-h-0 pointer-events-none"
                    }`}
                  >
                    <div className="p-5 text-xs md:text-sm text-gray-500 leading-relaxed bg-[#FAFCFF]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer banner routing to Contact form */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4">
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#B48A36]" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#0F172A]">Still have lingering queries?</h3>
              <p className="text-xs text-gray-400">Our customer satisfaction team is always here to assist you.</p>
            </div>
            <div className="pt-1">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wide text-white bg-[#0F172A] rounded-lg hover:bg-[#1E293B] transition-colors shadow-sm uppercase"
              >
                Need help? Contact Us
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}