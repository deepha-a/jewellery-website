"use log"
import Link from 'next/link';
import { FiSearch, FiHeart, FiShoppingBag, FiUser } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-tight">
        <span className="text-[#0B2240]">Glow</span>
        <span className="text-[#D4AF37]">Drape</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
        <Link href="/" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1">Home</Link>
        <Link href="/shop" className="hover:text-[#D4AF37] transition">Shop</Link>
        <Link href="/about" className="hover:text-[#D4AF37] transition">About</Link>
        <Link href="/contact" className="hover:text-[#D4AF37] transition">Contact</Link>
      </nav>

      {/* Action Icons */}
      <div className="flex items-center space-x-6 text-[#0B2240]">
        <button className="hover:text-[#D4AF37] transition">
          <FiSearch size={22} />
        </button>
        
        {/* Wishlist Icon with Badges */}
        <Link href="/wishlist" className="relative hover:text-[#D4AF37] transition">
          <FiHeart size={22} />
          <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </Link>

        {/* Cart Icon */}
        <Link href="/cart" className="relative hover:text-[#D4AF37] transition">
          <FiShoppingBag size={22} />
          <span className="absolute -top-2 -right-2 bg-[#0B2240] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </Link>

        {/* Profile Link */}
        <Link href="/login" className="hover:text-[#D4AF37] transition">
          <FiUser size={22} />
        </Link>
      </div>
    </header>
  );
}