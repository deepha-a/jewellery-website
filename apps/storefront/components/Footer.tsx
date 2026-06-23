import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function footer() {
  return (
    <footer className="w-full bg-[#2A3B50] text-white pt-16 pb-6 px-6 md:px-12 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-600 pb-12">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-white">Glow</span>
            <span className="text-[#D4AF37]">Drape</span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Handpicked jewellery and timeless fashion crafted for every special moment. Quality and elegance at the heart of everything we do.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 text-xl text-gray-300">
            <a href="#" className="hover:text-[#D4AF37] transition"><FaWhatsapp /></a>
            <a href="#" className="hover:text-[#D4AF37] transition"><FaInstagram /></a>
            <a href="#" className="hover:text-[#D4AF37] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#D4AF37] transition"><FaYoutube /></a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4 tracking-wider uppercase text-sm">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition">Our Story</Link></li>
            <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition">Press</Link></li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4 tracking-wider uppercase text-sm">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#" className="hover:text-white transition">Jewellery</Link></li>
            <li><Link href="#" className="hover:text-white transition">Sarees</Link></li>
            <li><Link href="#" className="hover:text-white transition">Bridal Edit</Link></li>
            <li><Link href="#" className="hover:text-white transition">Festive</Link></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4 tracking-wider uppercase text-sm">Help</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition">Shipping</Link></li>
            <li><Link href="#" className="hover:text-white transition">Returns</Link></li>
            <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        <p>© 2026 GlowDrape.</p>
        <div className="flex space-x-6">
          <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}