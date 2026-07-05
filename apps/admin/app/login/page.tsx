"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // State for form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; password?: string } = {};

    // 1. Check if boxes are empty
    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    // 2. Compulsory '@' symbol verification for email
    if (email && !email.includes("@")) {
      newErrors.email = "Please enter a valid email address containing '@'.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col md:flex-row bg-white overflow-y-auto cursor-default">
      
      {/* Left Panel: Branding */}
      <div className="flex w-full flex-col justify-between bg-[#151382] p-8 text-white md:w-[40%] md:p-16">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">GlowDrape</h1>
        </div>
        
        <div className="my-auto py-12 md:py-0">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Jewellery & Fashion<br />Management Platform
          </h2>
          <p className="mt-4 text-sm text-blue-200 max-w-sm">
            Manage products, inventory, orders, customers and reports from a single dashboard.
          </p>
        </div>
        
        <div className="hidden md:block"></div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex w-full items-center justify-center p-8 md:w-[60%] md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your credentials to continue
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`mt-1 block w-full rounded-md border px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm cursor-text ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-[#2f2cb9] focus:ring-[#2f2cb9]"
                  }`}
                  placeholder="admin@glowdrape.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`mt-1 block w-full rounded-md border px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm cursor-text ${
                    errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-[#2f2cb9] focus:ring-[#2f2cb9]"
                  }`}
                  placeholder="********"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#2f2cb9] focus:ring-[#2f2cb9] cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-700 select-none cursor-pointer">
                  Remember Me
                </label>
              </div>

              <div>
                <a href="#" className="font-medium text-[#2f2cb9] hover:underline cursor-pointer">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#2f2cb9] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#24219e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2cb9] transition-colors cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}