"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-[#111827] rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-end p-10 bg-[url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f')] bg-cover bg-center">
          <div className="bg-black/50 p-6 rounded-xl text-white">
            <h2 className="text-3xl font-bold">Join GlowDrape</h2>
            <p className="text-xs text-gray-300 mt-1">
              Create account & explore premium jewellery
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-10">

          {/* TITLE INSIDE BOX */}
          <h1 className="text-xl font-bold text-white mb-6 text-center">
            Create Account
          </h1>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded bg-[#0b1220] text-white border border-gray-700 focus:border-white outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-[#0b1220] text-white border border-gray-700 focus:border-white outline-none"
            />

            <input
              type="tel"
              placeholder="Mobile"
              className="w-full px-4 py-3 rounded bg-[#0b1220] text-white border border-gray-700 focus:border-white outline-none"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-10 rounded bg-[#0b1220] text-white border border-gray-700 focus:border-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 pr-10 rounded bg-[#0b1220] text-white border border-gray-700 focus:border-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* REMEMBER */}
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-white"
              />
              Remember me
            </label>

            <button className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition">
              Sign Up
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3 text-gray-500 text-xs">
            <div className="flex-1 border-t border-gray-700"></div>
            OR
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* GOOGLE */}
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded hover:bg-gray-900 transition">
            <FcGoogle size={18} />
            Continue with Google
          </button>

          {/* LOGIN */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}