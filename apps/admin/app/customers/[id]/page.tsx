"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Order = {
  id: string;
  date: string;
  items: number;
  amount: string;
  status: "Delivered" | "Cancelled";
};

const orders: Order[] = [
  {
    id: "#ORD-1024",
    date: "15 Jun 2026",
    items: 3,
    amount: "₹4,250",
    status: "Delivered",
  },
  {
    id: "#ORD-998",
    date: "02 Jun 2026",
    items: 2,
    amount: "₹2,850",
    status: "Delivered",
  },
  {
    id: "#ORD-942",
    date: "18 May 2026",
    items: 1,
    amount: "₹1,450",
    status: "Delivered",
  },
  {
    id: "#ORD-887",
    date: "01 May 2026",
    items: 4,
    amount: "₹5,200",
    status: "Cancelled",
  },
];

const activity = [
  {
    title: "Placed Order #ORD-1024",
    date: "15 Jun 2026",
  },
  {
    title: "Updated Shipping Address",
    date: "10 Jun 2026",
  },
  {
    title: "Placed Order #ORD-998",
    date: "02 Jun 2026",
  },
  {
    title: "Account Created",
    date: "12 Jan 2025",
  },
];

export default function CustomerDetailsPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6">

      {/* Header */}
      <div className="mb-6">
        <Link
          href="/customers"
          className="text-xs text-blue-600 flex items-center gap-1 mb-2"
        >
          <ArrowLeft size={14} />
          Back to Customers
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[30px] font-bold text-gray-800">
              Customer Details
            </h1>
            <p className="text-sm text-gray-500">
              View and manage customer information.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="border border-red-300 bg-red-50 text-red-600 text-xs px-4 py-2 rounded-md font-medium">
              Block Customer
            </button>

            <button className="bg-[#1e40af] text-white text-xs px-4 py-2 rounded-md font-medium">
              Edit Customer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          ["TOTAL ORDERS", "12"],
          ["TOTAL SPENT", "₹24,500"],
          ["AVERAGE ORDER VALUE", "₹2,041"],
          ["LAST PURCHASE", "15 Jun 2026"],
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-5"
          >
            <p className="text-[11px] text-gray-400 font-semibold">
              {item[0]}
            </p>
            <h3 className="text-2xl font-bold mt-2 text-gray-800">
              {item[1]}
            </h3>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-5">

        {/* LEFT SIDE */}
        <div className="col-span-8 space-y-5">

          {/* Customer Profile */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b text-sm font-semibold">
              Customer Profile
            </div>

            <div className="p-6 flex gap-6">

              <div className="w-14 h-14 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-lg">
                P
              </div>

              <div className="grid grid-cols-2 gap-x-20 gap-y-5 flex-1 text-sm">

                <div>
                  <p className="text-gray-400 text-xs">Customer Name</p>
                  <p className="font-medium">Priya Sharma</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="font-medium">priya@gmail.com</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="font-medium">+91 9876543210</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Customer Since</p>
                  <p className="font-medium">January 2025</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs mb-1">Status</p>
                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b text-sm font-semibold">
              Order History
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[11px]">
                <tr>
                  <th className="text-left px-5 py-3">Order ID</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Items</th>
                  <th className="text-left px-5 py-3">Amount</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">

                    <td className="px-5 py-4 font-medium">
                      {order.id}
                    </td>

                    <td className="px-5 py-4">
                      {order.date}
                    </td>

                    <td className="px-5 py-4">
                      {order.items}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {order.amount}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-blue-600 text-sm font-medium cursor-pointer">
                      View
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-4 space-y-5">

          {/* Saved Address */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b text-sm font-semibold">
              Saved Addresses
            </div>

            <div className="p-5 text-sm space-y-5">

              <div>
                <p className="font-medium mb-1">⌂ Home</p>
                <p className="text-gray-500 text-xs">
                  12 Anna Nagar, Chennai, Tamil Nadu - 600040
                </p>
              </div>

              <div>
                <p className="font-medium mb-1">◉ Office</p>
                <p className="text-gray-500 text-xs">
                  Tidel Park, Chennai, Tamil Nadu - 600113
                </p>
              </div>

            </div>
          </div>

          {/* Customer Activity */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b text-sm font-semibold">
              Customer Activity
            </div>

            <div className="p-5 space-y-5">
              {activity.map((item, index) => (
                <div key={index} className="flex gap-3">

                  <div className="w-3 h-3 rounded-full border-2 border-blue-600 mt-1"></div>

                  <div>
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-400">
                      {item.date}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}