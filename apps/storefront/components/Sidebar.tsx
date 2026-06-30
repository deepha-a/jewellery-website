'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiUser, 
  FiBox, 
  FiHeart, 
  FiMapPin, 
  FiCreditCard, 
  FiLock, 
  FiLogOut 
} from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();

  // Define the navigation links to keep the JSX clean
  const accountLinks = [
    { name: 'My Profile', href: '/profile', icon: FiUser },
    { name: 'My Orders', href: '/orders', icon: FiBox },
    { name: 'Wishlist', href: '/wishlist', icon: FiHeart },
    { name: 'Addresses', href: '/addresses', icon: FiMapPin },
    { name: 'Payment Methods', href: '/payment-methods', icon: FiCreditCard },
  ];

  const securityLinks = [
    { name: 'Change Password', href: '/change-password', icon: FiLock },
  ];

  return (
    <aside className="w-full md:w-[260px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 py-6">
      
      {/* Account Overview Section */}
      <div className="mb-8">
        <h3 className="px-6 text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase">
          Account Overview
        </h3>
        <nav className="flex flex-col">
          {accountLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors border-l-4 ${
                  isActive 
                    ? 'border-[#D4AF37] bg-gray-50 text-[#2A3B50] font-semibold' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-[#2A3B50] font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2A3B50]' : 'text-gray-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Security Section */}
      <div>
        <h3 className="px-6 text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase">
          Security
        </h3>
        <nav className="flex flex-col">
          {securityLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors border-l-4 ${
                  isActive 
                    ? 'border-[#D4AF37] bg-gray-50 text-[#2A3B50] font-semibold' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-[#2A3B50] font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2A3B50]' : 'text-gray-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-6 pt-6 border-t border-gray-100">
        <button className="flex items-center gap-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors w-full text-left">
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}