"use client";

import React, { useState } from "react";
import { 
  Store, 
  Truck, 
  Receipt, 
  CreditCard, 
  Bell, 
  ShieldCheck,
  CheckCircle2,
  X
} from "lucide-react";

type TabId = "store" | "shipping" | "tax" | "payment" | "notification" | "roles";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AdminSettingsMain() {
  const [activeTab, setActiveTab] = useState<TabId>("store");
  
  // Toast Notification State
  const [toast, setToast] = useState<{ show: boolean; message: string } | null>(null);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast(null), 4000); // Auto close after 4 seconds
  };

  // State configurations matching GlowDrape business logic
  // 1. Store Settings States
  const [storeName, setStoreName] = useState("GlowDrape");
  const [storeEmail, setStoreEmail] = useState("contact@glowdrape.com");
  const [contactNumber, setContactNumber] = useState("+91 98765 43210");
  const [storeAddress, setStoreAddress] = useState("1200 Luxury Plaza, Chennai, 600100, India");

  // 2. Shipping Settings States
  const [freeShippingMin, setFreeShippingMin] = useState("1999");
  const [standardShippingFee, setStandardShippingFee] = useState("150");
  const [estimatedDelivery, setEstimatedDelivery] = useState("3-5 Days");

  // 3. Tax Settings States
  const [gstJewellery, setGstJewellery] = useState("3");
  const [gstApparel, setGstApparel] = useState("12");
  const [pricesIncludeTax, setPricesIncludeTax] = useState(true);

  // 4. Payment Gateways States
  const [enableRazorpay, setEnableRazorpay] = useState(true);
  const [razorpayMode, setRazorpayMode] = useState("test");
  const [enableCOD, setEnableCOD] = useState(false);

  // 5. Notification System States
  const [notifyOrderPlaced, setNotifyOrderPlaced] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyNewUser, setNotifyNewUser] = useState(false);

  // 6. Roles & Permissions Array
  const [roles, setRoles] = useState([
    { name: "Super Admin", usersCount: 2, badgeColor: "bg-[#EFF6FF] text-[#1D4ED8]" },
    { name: "Manager", usersCount: 3, badgeColor: "bg-[#F0FDF4] text-[#16A34A]" },
    { name: "Support Agent", usersCount: 4, badgeColor: "bg-[#FEF9C3] text-[#A16207]" },
  ]);

  const navigationItems: NavItem[] = [
    { id: "store", label: "Store Settings", icon: Store },
    { id: "shipping", label: "Shipping Settings", icon: Truck },
    { id: "tax", label: "Tax Settings", icon: Receipt },
    { id: "payment", label: "Payment Settings", icon: CreditCard },
    { id: "notification", label: "Notification Settings", icon: Bell },
    { id: "roles", label: "Roles & Permissions", icon: ShieldCheck },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Dynamically message depending on active panel tab layout
    const formattedTabName = navigationItems.find((n) => n.id === activeTab)?.label;
    showToast(`${formattedTabName || "Settings"} updated successfully!`);
  };

  return (
    <div className="space-y-6 w-full relative">
      
      {/* Dynamic Pop-Up Success Toast Notification Notification Layout */}
      {toast?.show && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 border border-gray-800">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <p className="text-xs font-medium tracking-wide">{toast.message}</p>
          <button 
            type="button" 
            onClick={() => setToast(null)}
            className="text-gray-400 hover:text-white transition-colors pl-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Info Banner */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Settings</h1>
        <p className="text-sm text-[#64748B] mt-0.5">
          Manage system configuration and preferences.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sub-Navigation Card */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <p className="text-[11px] font-bold tracking-wider text-[#94A3B8] uppercase px-3 mb-3">
            Configuration
          </p>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isSelected = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    isSelected
                      ? "bg-[#EFF6FF] text-[#1D4ED8]"
                      : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isSelected ? "text-[#1D4ED8]" : "text-[#64748B]"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Dynamic Form Container Dashboard Workspace Block */}
        <main className="lg:col-span-8 xl:col-span-9 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden">
          <form onSubmit={handleSave} className="flex flex-col h-full">
            
            {/* Dynamic Form Content Body Router Structure */}
            <div className="p-6 md:p-8 space-y-6 flex-1">
              
              {/* TAB 1: STORE SETTINGS */}
              {activeTab === "store" && (
                <>
                  <div>
                    <h2 className="text-base font-bold text-[#1E293B]">Store Settings</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Configure your primary storefront details.</p>
                  </div>
                  <div className="space-y-4 max-w-xl">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Store Name</label>
                      <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Store Email</label>
                      <input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Contact Number</label>
                      <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Store Address</label>
                      <textarea rows={3} value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] resize-none focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: SHIPPING SETTINGS */}
              {activeTab === "shipping" && (
                <>
                  <div>
                    <h2 className="text-base font-bold text-[#1E293B]">Shipping Settings</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Manage regional logistics margins and targets.</p>
                  </div>
                  <div className="space-y-4 max-w-xl">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Free Shipping Minimum Threshold Target Amount (₹)</label>
                      <input type="number" value={freeShippingMin} onChange={(e) => setFreeShippingMin(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Standard Flat Rate Delivery Fee (₹)</label>
                      <input type="number" value={standardShippingFee} onChange={(e) => setStandardShippingFee(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Estimated Standard Duration Timeline</label>
                      <input type="text" value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 3: TAX SETTINGS */}
              {activeTab === "tax" && (
                <>
                  <div>
                    <h2 className="text-base font-bold text-[#1E293B]">Tax Settings</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Configure tax rules for accounting metrics.</p>
                  </div>
                  <div className="space-y-4 max-w-xl">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Jewellery Segment GST Rate (%)</label>
                      <input type="number" value={gstJewellery} onChange={(e) => setGstJewellery(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#334155]">Dresses / Ethnic Wear Apparel GST Rate (%)</label>
                      <input type="number" value={gstApparel} onChange={(e) => setGstApparel(e.target.value)} className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]" />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <input type="checkbox" id="pricesIncludeTax" checked={pricesIncludeTax} onChange={(e) => setPricesIncludeTax(e.target.checked)} className="w-4 h-4 text-[#1D4ED8] border-[#CBD5E1] rounded" />
                      <label htmlFor="pricesIncludeTax" className="text-xs font-semibold text-[#334155] cursor-pointer">Catalog Product Display Prices Already Include GST/Taxes</label>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 4: PAYMENT GATEWAYS */}
              {activeTab === "payment" && (
                <>
                  <div>
                    <h2 className="text-base font-bold text-[#1E293B]">Payment Settings</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Toggle active transaction systems.</p>
                  </div>
                  <div className="space-y-5 max-w-xl">
                    <div className="p-4 border border-[#E2E8F0] rounded-xl space-y-3 bg-[#F8FAFC]">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#1E293B]">Enable Razorpay Integration Gateway</label>
                        <input type="checkbox" checked={enableRazorpay} onChange={(e) => setEnableRazorpay(e.target.checked)} className="w-4 h-4" />
                      </div>
                      {enableRazorpay && (
                        <div className="space-y-2 pt-1 border-t border-[#E2E8F0]">
                          <label className="text-[10px] uppercase tracking-wider font-bold text-[#64748B]">Operational Sandbox Environment Mode</label>
                          <select value={razorpayMode} onChange={(e) => setRazorpayMode(e.target.value)} className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded bg-white">
                            <option value="test">Test Mode (Sandbox Environment)</option>
                            <option value="live">Live Production Key Integration</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E293B]">Allow Cash On Delivery (COD) Options</label>
                      <input type="checkbox" checked={enableCOD} onChange={(e) => setEnableCOD(e.target.checked)} className="w-4 h-4" />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 5: NOTIFICATION MANAGEMENT */}
              {activeTab === "notification" && (
                <>
                  <div>
                    <h2 className="text-base font-bold text-[#1E293B]">Notification Settings</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Choose which events trigger internal warnings.</p>
                  </div>
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg">
                      <span className="text-xs font-medium text-[#334155]">Email Alert on incoming order checkout placements</span>
                      <input type="checkbox" checked={notifyOrderPlaced} onChange={(e) => setNotifyOrderPlaced(e.target.checked)} className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg">
                      <span className="text-xs font-medium text-[#334155]">System Alert on critical low product inventory stock tracking</span>
                      <input type="checkbox" checked={notifyLowStock} onChange={(e) => setNotifyLowStock(e.target.checked)} className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg">
                      <span className="text-xs font-medium text-[#334155]">Email alert on new customer registration logs</span>
                      <input type="checkbox" checked={notifyNewUser} onChange={(e) => setNotifyNewUser(e.target.checked)} className="w-4 h-4" />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 6: ROLES & PERMISSIONS */}
              {activeTab === "roles" && (
                <>
                  <div>
                    <h2 className="text-base font-bold text-[#1E293B]">Roles & Permissions</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Overview of team access classification groupings.</p>
                  </div>
                  <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-semibold text-[#64748B]">
                          <th className="p-3">Access Tier Profile Role</th>
                          <th className="p-3">Assigned Accounts Count</th>
                          <th className="p-3 text-right">Status View</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                        {roles.map((role, idx) => (
                          <tr key={idx} className="hover:bg-[#F8FAFC]">
                            <td className="p-3 font-semibold">{role.name}</td>
                            <td className="p-3 text-gray-500">{role.usersCount} Active Users</td>
                            <td className="p-3 text-right">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${role.badgeColor}`}>
                                Configured
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

            </div>

            {/* Sticky Shared Actions Footer Block */}
            <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  showToast("Changes discarded.");
                }}
                className="px-4 py-1.5 text-xs font-medium bg-white border border-[#CBD5E1] text-[#475569] rounded-md hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-medium bg-[#1E3A8A] text-white rounded-md hover:bg-[#172554] transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
}