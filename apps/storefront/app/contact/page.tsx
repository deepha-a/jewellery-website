"use client";

import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { Mail, Phone, MapPin, Clock, CheckCircle2, X } from "lucide-react";

export default function ContactPage() {
  // Form input field state handlers
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Submission toast popup indicator state
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API form processing verification logs
    console.log("Submitting support ticket:", { name, email, subject, message });
    
    // Display popup message confirmation notice
    setShowToast(true);
    
    // Clear inputs back to baseline configurations
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    // Automatically fade notification out after 4 seconds
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen py-16 px-4 md:px-8 lg:px-12 relative">
        
        {/* Success Form Submit Feedback Notification Alert */}
        {showToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl border border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <p className="text-xs font-medium tracking-wide">Thank you! Your message has been sent successfully.</p>
            <button 
              type="button" 
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-white transition-colors pl-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header Description Section Banner */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Contact Us</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Have questions about our premium jewellery collections or elegant ethnic apparel? Reach out to the GlowDrape concierge service team.
            </p>
          </div>

          {/* Core Content Splitting Column Layout Grid Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box Side Information Panel Contact Profiles Block */}
            <div className="lg:col-span-5 bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] rounded-xl p-8 space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">Get In Touch</h2>
                  <p className="text-xs text-gray-400 mt-0.5">We typically reply within 24 operational business hours.</p>
                </div>

                {/* Vertical Stack Matrix Row Blocks */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] border border-[#F3EAD8] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-[#B48A36]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Support</h3>
                      <a href="mailto:support@glowdrape.com" className="text-sm font-semibold text-[#0F172A] hover:underline mt-0.5 block">
                        support@glowdrape.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] border border-[#F3EAD8] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#B48A36]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Call Concierge</h3>
                      <p className="text-sm font-semibold text-[#0F172A] mt-0.5">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] border border-[#F3EAD8] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#B48A36]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Headquarters</h3>
                      <p className="text-sm font-medium text-gray-600 leading-snug mt-0.5">
                        1200 Luxury Plaza, Cathedral Road,<br />Chennai, 600100, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours Sub Section Card */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-xl">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#334155]">Showroom Operations Timeline</p>
                  <p className="text-gray-500 mt-0.5">Mon - Sat: 10:00 AM to 08:00 PM IST</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Structural Support Email Form Grid Block */}
            <div className="lg:col-span-7 bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] rounded-xl p-8 md:p-10">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">Send Us a Message</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill out your detailed requirements or order issues below.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Dual Field Matrix Inputs row grids row items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#334155]">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 border border-[#CBD5E1] rounded-lg text-[#334155] bg-white placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#B48A36] focus:border-[#B48A36]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#334155]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Your email contact"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 border border-[#CBD5E1] rounded-lg text-[#334155] bg-white placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#B48A36] focus:border-[#B48A36]"
                    />
                  </div>
                </div>

                {/* Form Field Subject Input Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#334155]">Subject Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jewellery customization options, delivery updates"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-[#CBD5E1] rounded-lg text-[#334155] bg-white placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#B48A36] focus:border-[#B48A36]"
                  />
                </div>

                {/* Form Field Detailed Message Input Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#334155]">Message Inquiry</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your comprehensive queries here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-[#CBD5E1] rounded-lg text-[#334155] bg-white placeholder-[#94A3B8] resize-none focus:outline-none focus:ring-1 focus:ring-[#B48A36] focus:border-[#B48A36]"
                  />
                </div>

                {/* Form Action Submissions Button Trigger Group */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#0F172A] rounded-lg hover:bg-[#1E293B] transition-colors shadow-sm uppercase"
                  >
                    Submit Query
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}