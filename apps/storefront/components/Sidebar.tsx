'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  Box, 
  Heart, 
  MapPin, 
  CreditCard, 
  Lock, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Define the navigation links to keep the JSX clean
  const accountLinks = [
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'My Orders', href: '/orders', icon: Box },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Addresses', href: '/addresses', icon: MapPin },
    { name: 'Payment Methods', href: '/payment-methods', icon: CreditCard },
  ];

  const securityLinks = [
    { name: 'Change Password', href: '/change-password', icon: Lock },
  ];

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-xs mb-5 w-full">
        <div className="flex items-center gap-2.5">
          <User className="w-5 h-5 text-[#2A3B50]" />
          <span className="font-bold text-sm text-[#2A3B50]">Account Settings</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span className="text-xs font-semibold">Menu</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Aside Panel */}
      <aside 
        className={`
          flex-shrink-0 bg-white rounded-xl border border-gray-100 py-6 shadow-xs
          fixed md:sticky top-0 left-0 bottom-0 z-50 md:z-auto h-screen md:h-auto
          transition-transform duration-300 md:transition-none md:transform-none
          ${isOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0 w-0 md:w-[260px]'}
          ${isOpen ? 'block p-6' : 'hidden md:block'}
        `}
      >
        {/* Mobile Close Bar */}
        <div className="md:hidden flex justify-between items-center pb-4 border-b border-gray-150 mb-5">
          <span className="font-extrabold text-slate-800 text-sm">Account Settings</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Overview Section */}
        <div className="mb-8">
          <h3 className="px-6 text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
            Account Overview
          </h3>
          <nav className="flex flex-col gap-0.5">
            {accountLinks.map((link) => {
              const Icon = link.icon;
              // Check if path is active (e.g. either exact match or subroute)
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-xs transition-all border-l-4 rounded-r-lg ${
                    isActive 
                      ? 'border-[#D4AF37] bg-slate-50/50 text-[#2A3B50] font-bold' 
                      : 'border-transparent text-gray-500 hover:bg-slate-50/30 hover:text-[#2A3B50] font-semibold'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#2A3B50]' : 'text-gray-450'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="px-6 text-[10px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
            Security
          </h3>
          <nav className="flex flex-col gap-0.5">
            {securityLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-xs transition-all border-l-4 rounded-r-lg ${
                    isActive 
                      ? 'border-[#D4AF37] bg-slate-50/50 text-[#2A3B50] font-bold' 
                      : 'border-transparent text-gray-500 hover:bg-slate-50/30 hover:text-[#2A3B50] font-semibold'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#2A3B50]' : 'text-gray-455'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-6 pt-6 border-t border-gray-100">
          <button 
            onClick={() => {
              setIsOpen(false);
              alert('Logout clicked');
            }}
            className="flex items-center gap-3 py-2 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}