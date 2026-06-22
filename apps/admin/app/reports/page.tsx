"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- FAKE DATA ---------------- */

const revenueData = [
  { month: "Jan", revenue: 50000 },
  { month: "Feb", revenue: 85000 },
  { month: "Mar", revenue: 76000 },
  { month: "Apr", revenue: 110000 },
  { month: "May", revenue: 145000 },
  { month: "Jun", revenue: 105000 },
  { month: "Jul", revenue: 95000 },
  { month: "Aug", revenue: 93000 },
  { month: "Sep", revenue: 128000 },
  { month: "Oct", revenue: 155000 },
  { month: "Nov", revenue: 180000 },
  { month: "Dec", revenue: 180000 },
];

const monthlySales = [
  { month: "January", orders: 98, revenue: "₹95,000", customers: 85, growth: "+5%" },
  { month: "February", orders: 124, revenue: "₹1,25,000", customers: 103, growth: "+9%" },
  { month: "March", orders: 142, revenue: "₹1,48,000", customers: 120, growth: "+12%" },
  { month: "April", orders: 128, revenue: "₹1,32,000", customers: 110, growth: "+7%" },
  { month: "May", orders: 156, revenue: "₹1,58,000", customers: 134, growth: "+10%" },
  { month: "June", orders: 168, revenue: "₹1,72,000", customers: 142, growth: "+11%" },
];

const topProducts = [
  { product: "Diamond Ring", category: "JEWELLERY", sold: 142, revenue: "₹3,25,000" },
  { product: "Silver Necklace", category: "JEWELLERY", sold: 118, revenue: "₹2,45,000" },
  { product: "Party Wear Dress", category: "DRESSES", sold: 94, revenue: "₹1,85,000" },
  { product: "Gold Earrings", category: "JEWELLERY", sold: 82, revenue: "₹1,62,000" },
  { product: "Bridal Lehenga", category: "DRESSES", sold: 56, revenue: "₹1,40,000" },
];

/* ---------------- PAGE ---------------- */

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar placeholder if separate layout not present */}
      {/* Remove if already in layout.tsx */}
      {/* 
      <aside className="w-64 bg-blue-900 h-screen fixed left-0 top-0"></aside>
      */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-500">
              Monitor business performance and generate reports.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-white border px-4 py-2 rounded-lg">
              Export PDF
            </button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
              Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl border mb-6">
          <div className="flex gap-4">
            <select className="border rounded px-4 py-2">
              <option>Last 30 Days</option>
            </select>

            <select className="border rounded px-4 py-2">
              <option>All Reports</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <Card title="Total Revenue" value="₹12,45,000" growth="+12%" />

          <Card title="Total Orders" value="1,248" growth="+8%" />

          <Card title="Customers" value="2,548" growth="+15%" />

          <Card title="Average Order Value" value="₹998" growth="+5%" />

        </div>

        {/* Charts */}
        <div className="grid grid-cols-12 gap-6 mb-6">

          {/* Line Chart */}
          <div className="col-span-8 bg-white rounded-xl border p-5">
            <h2 className="font-semibold mb-4">Revenue Overview</h2>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fake Donut */}
          <div className="col-span-4 bg-white rounded-xl border p-5">
            <h2 className="font-semibold mb-6">
              Order Status Distribution
            </h2>

            <div className="flex flex-col items-center">

              <div className="w-40 h-40 rounded-full border-[18px] border-blue-700 flex items-center justify-center">

                <div className="text-center">
                  <p className="text-2xl font-bold">1248</p>
                  <p className="text-xs text-gray-500">TOTAL ORDERS</p>
                </div>

              </div>

              <div className="mt-6 space-y-2 text-sm">

                <p>● Delivered (70%)</p>
                <p>● Processing (20%)</p>
                <p>● Shipped (8%)</p>
                <p>● Cancelled (2%)</p>

              </div>

            </div>
          </div>

        </div>

        {/* Monthly Sales Table */}
        <div className="bg-white rounded-xl border p-5 mb-6">

          <h2 className="font-semibold mb-4">
            Monthly Sales Report
          </h2>

          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-3">MONTH</th>
                <th>ORDERS</th>
                <th>REVENUE</th>
                <th>CUSTOMERS</th>
                <th>GROWTH</th>
              </tr>
            </thead>

            <tbody>
              {monthlySales.map((item, index) => (
                <tr key={index} className="border-b">

                  <td className="py-3">{item.month}</td>
                  <td>{item.orders}</td>
                  <td>{item.revenue}</td>
                  <td>{item.customers}</td>
                  <td className="text-green-600">{item.growth}</td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border p-5">

          <h2 className="font-semibold mb-4">
            Top Selling Products
          </h2>

          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-3">PRODUCT</th>
                <th>CATEGORY</th>
                <th>UNITS SOLD</th>
                <th>REVENUE</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((item, index) => (
                <tr key={index} className="border-b">

                  <td className="py-3">{item.product}</td>

                  <td>{item.category}</td>

                  <td>{item.sold}</td>

                  <td className="font-semibold">
                    {item.revenue}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  );
}

/* ---------- CARD ---------- */

function Card({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-4">

      <p className="text-gray-500 text-sm">{title}</p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

      <p className="text-green-600 text-sm mt-2">
        {growth} vs last period
      </p>

    </div>
  );
}