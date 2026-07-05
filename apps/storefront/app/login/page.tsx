"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StorefrontLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    router.push("/homepage");
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Password reset link has been sent to your registered email address.");
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-white text-gray-900 font-sans overflow-hidden cursor-default select-none">
      
      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3.5 md:px-12 flex-shrink-0">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-[#0f1d3a]">GlowDrape</span>
        </div>
        <nav className="hidden items-center space-x-8 text-sm font-medium text-gray-700 md:flex">
          <Link href="/homepage" className="transition-colors duration-200 hover:text-yellow-500 cursor-pointer">Home</Link>
          <Link href="/homepage" className="transition-colors duration-200 hover:text-yellow-500 cursor-pointer">Shop</Link>
          <Link href="/homepage" className="transition-colors duration-200 hover:text-yellow-500 cursor-pointer">About</Link>
          <Link href="/homepage" className="transition-colors duration-200 hover:text-yellow-500 cursor-pointer">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4 text-gray-700">
          <Link href="/homepage" className="relative p-1 transition-colors duration-200 hover:text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold">0</span>
          </Link>
          <Link href="/homepage" className="relative p-1 transition-colors duration-200 hover:text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold">0</span>
          </Link>
          <div className="border-b-2 border-[#0f1d3a] pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0f1d3a]"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          </div>
        </div>
      </header>

      {/* --- CENTRAL MAIN BODY --- */}
      <main className="flex flex-1 items-center justify-center bg-[#6e7b8c] p-4 flex-shrink-0 overflow-hidden">
        <div className="flex w-full max-w-4xl h-full max-h-[460px] overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
          
          {/* Left Panel */}
          <div className="relative hidden w-1/2 flex-col justify-end p-6 md:flex h-full">
            <div className="absolute inset-0 bg-gray-900/30 z-10" />
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" alt="Jewellery" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-20 text-white">
              <h2 className="text-2xl font-bold tracking-tight">Elevate Your Style</h2>
              <p className="mt-1 text-[11px] text-gray-200 leading-normal">Discover timeless jewellery and exquisite fashion crafted for every occasion.</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full p-6 md:w-1/2 md:p-8 flex flex-col justify-center h-full overflow-hidden">
            <div>
              <h3 className="text-xl font-bold text-[#0f1d3a] tracking-tight">Welcome Back</h3>
              <p className="text-[11px] text-gray-500">Sign in to continue shopping.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
              <div>
                <label className="block text-[11px] font-semibold text-[#0f1d3a]">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }} 
                  placeholder="Enter your email" 
                  className={`mt-1 block w-full rounded-md border px-3 py-1.5 text-xs focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`} 
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-[11px] font-semibold text-[#0f1d3a]">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }} 
                    placeholder="Enter your password" 
                    className={`mt-1 block w-full rounded-md border px-3 py-1.5 pr-10 text-xs focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 outline-none bg-transparent cursor-pointer"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.822 7.822 3 3m-3-3-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="mr-1.5 h-3 w-3 rounded border-gray-300" /> Remember Me
                </label>
                <button type="button" onClick={handleForgotPassword} className="font-semibold text-[#0f1d3a] hover:text-yellow-500 text-[11px] bg-transparent border-none outline-none cursor-pointer">
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-[#0f1d3a] py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#162952] cursor-pointer">Login</button>
              
              <div className="relative flex items-center py-0.5">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-[9px] uppercase tracking-wider text-gray-400 font-bold">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* FIXED: Reinserted Google Colorful Logo Icon Button */}
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.494 12.275c0-.825-.069-1.644-.213-2.438H12v4.613h6.444a5.5 5.5 0 0 1-2.388 3.619v3.006h3.856c2.256-2.075 3.581-5.131 3.581-8.8z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.956-1.075 7.944-2.925l-3.856-3.006c-1.069.719-2.438 1.156-4.088 1.156-3.144 0-5.806-2.125-6.756-4.988H1.238v3.106A12 12 0 0 0 12 24z"/>
                  <path fill="#FBBC05" d="M5.244 14.238A7.16 7.16 0 0 1 4.875 12c0-.781.131-1.544.369-2.238V6.656H1.238A12 12 0 0 0 0 12c0 1.925.456 3.744 1.238 5.344l4.006-3.106z"/>
                  <path fill="#EA4335" d="M12 4.75c1.763 0 3.344.606 4.588 1.794l3.444-3.444A11.93 11.93 0 0 0 12 0 12 12 0 0 0 1.238 6.656l4.006 3.106c.95-2.863 3.613-4.988 6.756-4.988z"/>
                </svg>
                <span className="text-[11px] font-semibold">Continue with Google</span>
              </button>
            </form>

            <div className="mt-3 text-center text-[11px] text-gray-500">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-bold text-[#0f1d3a] hover:text-yellow-500 transition-colors text-[11px]">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-2 text-center text-[11px] font-medium text-gray-800 flex-shrink-0">
        <p className="mb-0.5">© 2026 GlowDrape.</p>
      </footer>
    </div>
  );
}