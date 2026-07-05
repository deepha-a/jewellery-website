"use client";

import React from "react";
import { ArrowUpRight, AlertCircle, Users, ShoppingBag, IndianRupee } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtext: string;
  subtextClass: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface OrderRow {
  id: string;
  customer: string;
  amount: string;
  status: "Delivered" | "Processing" | "Pending" | "Cancelled";
}

interface StockRow {
  name: string;
  count: number;
}

export default function AdminDashboardMain() {
  // Mock Data matching image_953fe9.png exactly
  const recentOrders: OrderRow[] = [
    { id: "#GD-10248", customer: "Priya", amount: "₹4,250", status: "Delivered" },
    { id: "#GD-10247", customer: "Rohan", amount: "₹4,250", status: "Processing" },
    { id: "#GD-10246", customer: "Aditi", amount: "₹4,250", status: "Pending" },
    { id: "#GD-10245", customer: "Karan", amount: "₹4,250", status: "Delivered" },
    { id: "#GD-10244", customer: "Neha", amount: "₹4,250", status: "Cancelled" },
  ];

  const lowStockProducts: StockRow[] = [
    { name: "Rose Gold Hoop Earrings", count: 3 },
    { name: "Silver Charm Bracelet", count: 8 },
    { name: "Pearl Drop Necklace", count: 2 },
    { name: "Kundan Choker Set", count: 4 },
    { name: "Embroidered Silk Dupatta", count: 6 },
  ];

  const statusColors = {
    Delivered: "bg-[#DCFCE7] text-[#15803D]",
    Processing: "bg-[#DBEAFE] text-[#1D4ED8]",
    Pending: "bg-[#FEF9C3] text-[#A16207]",
    Cancelled: "bg-[#FEE2E2] text-[#B91C1C]",
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B]">
      {/* Title Header Block */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Overview of your store performance</p>
      </div>

      {/* Grid Row 1: Top Metrics Grid Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value="₹2,45,000"
          subtext="+12% this month"
          subtextClass="text-[#16A34A]"
          icon={IndianRupee}
        />
        <MetricCard
          title="Orders Today"
          value="84"
          subtext="+8 today"
          subtextClass="text-[#16A34A]"
          icon={ShoppingBag}
        />
        <MetricCard
          title="New Customers"
          value="35"
          subtext="+5 today"
          subtextClass="text-[#16A34A]"
          icon={Users}
        />
        <MetricCard
          title="Pending Orders"
          value="12"
          subtext="Requires attention"
          subtextClass="text-[#DC2626]"
          icon={AlertCircle}
        />
      </div>

      {/* Grid Row 2: Graph Framework Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Overview - Custom Vector Path Simulation Line Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#475569]">Revenue Overview</h2>
            <span className="text-xs text-[#94A3B8]">Last 12 months</span>
          </div>
          
          {/* Simulated Graph Framework */}
          <div className="relative w-full h-44 flex flex-col justify-between pt-2">
            {/* Grid Line Marks */}
            {[200, 150, 100, 50, 0].map((val) => (
              <div key={val} className="flex items-center w-full text-[10px] text-[#94A3B8]">
                <span className="w-8 flex-shrink-0">${val}k</span>
                <div className="w-full border-b border-dashed border-[#E2E8F0]" />
              </div>
            ))}
            
            {/* Overlay Vector SVG Line */}
            <svg className="absolute left-8 right-0 bottom-6 w-[calc(100%-2rem)] h-[calc(100%-2.5rem)] overflow-visible">
              <path
                d="M 0 80 Q 25 30 50 40 T 100 65 T 150 20 T 200 10 T 250 35 T 300 15"
                fill="none"
                stroke="#1E3A8A"
                strokeWidth="2.5"
                className="w-full"
              />
            </svg>
          </div>
          {/* Months labels footer matrix */}
          <div className="flex justify-between pl-8 text-[10px] text-[#94A3B8] font-medium pt-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Order Status - Custom Vector Ring Segment Doughnut Grid Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">Order Status</h2>
          
          {/* Pie Wrapper Framework */}
          <div className="relative flex items-center justify-center h-40">
            <svg width="140" height="140" viewBox="0 0 42 42" className="transform -rotate-90">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
              {/* Green: Delivered segment */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#16A34A" strokeWidth="5" strokeDasharray="55 100" strokeDashoffset="0" />
              {/* Purple/Blue: Processing segment */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#6366F1" strokeWidth="5" strokeDasharray="20 100" strokeDashoffset="-55" />
              {/* Yellow: Pending segment */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#EAB308" strokeWidth="5" strokeDasharray="15 100" strokeDashoffset="-75" />
              {/* Red: Cancelled segment */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#DC2626" strokeWidth="5" strokeDasharray="10 100" strokeDashoffset="-90" />
            </svg>
            <div className="absolute bg-white rounded-full w-20 h-20 shadow-inner flex items-center justify-center" />
          </div>

          {/* Label Configurations */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-[#475569] font-medium pt-2">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#16A34A]" /> Delivered</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#6366F1]" /> Processing</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EAB308]" /> Pending</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#DC2626]" /> Cancelled</div>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Actionable Data Tables Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Recent Orders Data Container */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="p-4 flex justify-between items-center border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#1E293B]">Recent Orders</h2>
            <button type="button" className="text-xs text-[#1D4ED8] font-medium hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
                  <th className="p-3">Order Id</th>
                  <th className="p-3">Customers</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8FAFC] text-[#334155]">
                    <td className="p-3 font-medium text-[#475569]">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3 font-semibold">{order.amount}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts Monitoring Container */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="p-4 flex justify-between items-center border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#1E293B]">Low Stock Products</h2>
            <button type="button" className="text-xs text-[#1D4ED8] font-medium hover:underline">Manage</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
                  <th className="p-3">Products</th>
                  <th className="p-3 text-right">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {lowStockProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC] text-[#334155]">
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.count <= 3 ? "bg-[#FEE2E2] text-[#B91C1C]" : "bg-[#FEF9C3] text-[#713F12]"
                      }`}>
                        {product.count} left
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-component layout pattern for high metric reusability
function MetricCard({ title, value, subtext, subtextClass, icon: IconComponent }: MetricCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-xs text-[#64748B] font-medium tracking-wide">{title}</p>
        <h3 className="text-xl font-bold tracking-tight text-[#0F172A]">{value}</h3>
        <p className={`text-[11px] font-medium ${subtextClass}`}>{subtext}</p>
      </div>
      <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]">
        <IconComponent className="w-4 h-4 text-[#64748B]" />
      </div>
    </div>
  );
}