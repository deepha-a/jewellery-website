"use html";
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Lock, 
  LogOut, 
  Edit3, 
  ChevronRight, 
  Bell, 
  ShieldCheck,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react';

// ================= GLOBAL WRAPPER COMPONENTS IMPORT =================
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';

// Custom Toast System Types
interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

export default function ProfilePage() {
  const router = useRouter();

  // Navigation / View State
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments'>('profile');
  
  // Inline Edit Mode States for Personal Info
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Ananya Sharma',
    email: 'ananya@gmail.com',
    mobileNumber: '+91 98765 43210',
    dob: '14 May 1995',
    gender: 'Female'
  });
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Ananya Sharma',
    tag: 'HOME',
    line1: '124, Emerald heights, 4th Floor, Jubilee Hills, Road No. 36',
    cityStateZip: 'Chennai, Tamil Nadu - 500033',
    mobile: '+91 98765 43210'
  });

  // Toast Alerts State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Trigger Toast Notification Helper
  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Profile Save Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempProfileData.fullName || tempProfileData.mobileNumber.length < 10) {
      showToast("Please check your input details and try again.", "error");
      return;
    }
    setProfileData({ ...tempProfileData });
    setIsEditingProfile(false);
    showToast("Profile updated successfully!", "success");
  };

  // Profile Cancel Handler
  const handleCancelProfile = () => {
    setTempProfileData({ ...profileData });
    setIsEditingProfile(false);
  };

  // Logout Handler with Success Toast & Navigation Redirect
  const handleLogout = () => {
    showToast("Logged out successfully. See you soon!", "success");
    
    // Smooth redirect sequence giving the user time to read the confirmation banner
    setTimeout(() => {
      router.push('/auth/login');
    }, 900); 
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased relative flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* Dynamic Toast Container */}
      <div className="fixed top-24 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`flex items-center justify-between p-4 rounded-xl shadow-xl border transition-all duration-300 animate-slide-in ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-slate-400 hover:text-slate-600 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Profile Base Container Zone */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8 flex-grow my-4">
        
        {/* ================= SIDEBAR NAVIGATION ================= */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-fit">
          {/* Account Overview Group */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Account Overview</h2>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'profile' 
                    ? 'bg-slate-50 text-slate-900 border-l-4 border-[#0F172A]' 
                    : 'text-slate-600 hover:bg-slate-50/50 hover:text-slate-900'
                }`}
              >
                <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'}`} />
                My Profile
              </button>
              
              <a href="/orders" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50/50 hover:text-slate-900 transition-all">
                <ShoppingBag className="w-4 h-4 text-slate-400" />
                My Orders
              </a>

              <a href="/wishlist" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50/50 hover:text-slate-900 transition-all">
                <Heart className="w-4 h-4 text-slate-400" />
                Wishlist
              </a>

              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'addresses' 
                    ? 'bg-slate-50 text-slate-900 border-l-4 border-[#0F172A]' 
                    : 'text-slate-600 hover:bg-slate-50/50 hover:text-slate-900'
                }`}
              >
                <MapPin className={`w-4 h-4 ${activeTab === 'addresses' ? 'text-slate-900' : 'text-slate-400'}`} />
                Addresses
              </button>

              <button 
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'payments' 
                    ? 'bg-slate-50 text-slate-900 border-l-4 border-[#0F172A]' 
                    : 'text-slate-600 hover:bg-slate-50/50 hover:text-slate-900'
                }`}
              >
                <CreditCard className={`w-4 h-4 ${activeTab === 'payments' ? 'text-slate-900' : 'text-slate-400'}`} />
                Payment Methods
              </button>
            </nav>
          </div>

          {/* Security Group */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Security</h2>
            <nav className="space-y-1">
              <a href="/profile/change-password" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50/50 hover:text-slate-900 transition-all">
                <Lock className="w-4 h-4 text-slate-400" />
                Change Password
              </a>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50/50 transition-all mt-4"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* ================= MAIN CONTENT PANE ================= */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Identity Block */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex items-center gap-5">
            <div className="w-16 h-16 bg-[#0B192C] text-white flex items-center justify-center rounded-full font-bold text-2xl tracking-wide">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">{profileData.fullName}</h1>
              <p className="text-sm text-slate-500">{profileData.email}</p>
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Member Since 2026
              </div>
            </div>
          </div>

          {/* Top Summary Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/orders" className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all group">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-all">
                <ShoppingBag className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Orders</span>
                <span className="text-xl font-bold text-slate-900">12</span>
              </div>
            </a>

            <a href="/wishlist" className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all group">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-all">
                <Heart className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Wishlist</span>
                <span className="text-xl font-bold text-slate-900">08</span>
              </div>
            </a>

            <button 
              onClick={() => setActiveTab('addresses')}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all text-left group w-full"
            >
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-all">
                <MapPin className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Saved Addresses</span>
                <span className="text-xl font-bold text-slate-900">02</span>
              </div>
            </button>
          </div>

          {/* DYNAMIC PANE RENDERING BASE TAB STATE */}
          {activeTab === 'profile' && (
            <>
              {/* Personal Information Module */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Personal Information</h3>
                  {!isEditingProfile ? (
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1E293B] transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleCancelProfile} 
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Full Name</label>
                      {isEditingProfile ? (
                        <input 
                          type="text" 
                          value={tempProfileData.fullName} 
                          onChange={(e) => setTempProfileData({...tempProfileData, fullName: e.target.value})}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B192C]"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profileData.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Email Address</label>
                      {isEditingProfile ? (
                        <input 
                          type="email" 
                          value={tempProfileData.email} 
                          onChange={(e) => setTempProfileData({...tempProfileData, email: e.target.value})}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B192C]"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profileData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                      {isEditingProfile ? (
                        <input 
                          type="text" 
                          value={tempProfileData.mobileNumber} 
                          onChange={(e) => setTempProfileData({...tempProfileData, mobileNumber: e.target.value})}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B192C]"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profileData.mobileNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Date of Birth</label>
                      {isEditingProfile ? (
                        <input 
                          type="text" 
                          value={tempProfileData.dob} 
                          onChange={(e) => setTempProfileData({...tempProfileData, dob: e.target.value})}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B192C]"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profileData.dob}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Gender</label>
                      {isEditingProfile ? (
                        <select 
                          value={tempProfileData.gender} 
                          onChange={(e) => setTempProfileData({...tempProfileData, gender: e.target.value})}
                          className="px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B192C] bg-white"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profileData.gender}</p>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Default Shipping Address Module */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Default Shipping Address</h3>
                  <button 
                    onClick={() => setActiveTab('addresses')} 
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 tracking-wide uppercase"
                  >
                    Manage Addresses
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{shippingAddress.name}</span>
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-bold text-[10px] rounded tracking-wide uppercase">
                          {shippingAddress.tag}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                        {shippingAddress.line1} <br />
                        {shippingAddress.cityStateZip}
                      </p>
                      <p className="text-sm text-slate-500">
                        <span className="font-medium text-slate-400">Mobile:</span> {shippingAddress.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings List Box */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Account Settings</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  <a href="/profile/change-password" className="flex items-center justify-between p-6 hover:bg-slate-50/40 transition-all group">
                    <div className="flex items-center gap-4">
                      <Lock className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Change Password</h4>
                        <p className="text-xs text-slate-400">Update your security credentials</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
                  </a>

                  {/* FIXED: Notification Settings now fires toast instead of mistakenly popping up Address Edit Component */}
                  <button 
                    onClick={() => showToast("Notification settings updated successfully.", "success")} 
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Notification Preferences</h4>
                        <p className="text-xs text-slate-400">Manage how you receive updates and alerts</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
                  </button>

                  <button 
                    onClick={() => showToast("Privacy preferences saved.", "success")} 
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Privacy Settings</h4>
                        <p className="text-xs text-slate-400">Control your personal data visibility</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* SIMULATED PANE FOR SAVED ADDRESS VIEW ARCHITECTURE */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-lg">Manage Addresses</h3>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold"
                >
                  Add New Address
                </button>
              </div>

              <div className="border border-amber-200 bg-amber-50/30 rounded-xl p-5 relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-slate-900">{shippingAddress.name}</span>
                  <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded tracking-wide">{shippingAddress.tag}</span>
                  <span className="text-xs font-medium text-amber-700 ml-auto bg-amber-100 px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{shippingAddress.line1}, {shippingAddress.cityStateZip}</p>
                <p className="text-xs text-slate-500">Mobile: {shippingAddress.mobile}</p>
                
                <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-wider pt-3 border-t border-slate-100">
                  <button onClick={() => setIsAddressModalOpen(true)} className="text-slate-600 hover:text-slate-900">Edit</button>
                  <button onClick={() => showToast("Address removed successfully.", "success")} className="text-rose-600 hover:text-rose-700">Delete</button>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATED PANE FOR PAYMENT METHODS VIEW ARCHITECTURE */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Saved Payment Methods</h3>
              <p className="text-sm text-slate-500">No payment methods saved yet. You can securely add credit/debit cards or link UPI accounts during checkout panels.</p>
            </div>
          )}

        </main>
      </div>

      {/* ================= SIMULATED MODAL OVERLAY ================= */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Modify Address Info</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
                <input type="text" defaultValue={shippingAddress.name} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Address Details</label>
                <textarea rows={3} defaultValue={shippingAddress.line1} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">City/State/Zip</label>
                  <input type="text" defaultValue={shippingAddress.cityStateZip} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Tag</label>
                  <input type="text" defaultValue={shippingAddress.tag} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsAddressModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
              <button 
                onClick={() => {
                  setIsAddressModalOpen(false);
                  showToast("New address added to your profile.", "success");
                }} 
                className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-xl"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Global Footer Ecosystem */}
      <Footer />

    </div>
  );
}



