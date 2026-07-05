import React from "react";
import Link from "next/link";
import { Search, Download, Eye, Pencil, Trash2 } from "lucide-react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  status: "Active" | "Blocked";
};

const customers: Customer[] = [
  {
    id: "priya",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9876543210",
    orders: 12,
    spent: "₹24,500",
    status: "Active",
  },
  {
    id: "rohan",
    name: "Rohan Kumar",
    email: "rohan@gmail.com",
    phone: "+91 9123456780",
    orders: 8,
    spent: "₹15,800",
    status: "Active",
  },
  {
    id: "anitha",
    name: "Anitha Devi",
    email: "anitha@gmail.com",
    phone: "+91 9988776655",
    orders: 2,
    spent: "₹2,500",
    status: "Blocked",
  },
  {
    id: "vikram",
    name: "Vikram Singh",
    email: "vikram@gmail.com",
    phone: "+91 8123455678",
    orders: 21,
    spent: "₹48,900",
    status: "Active",
  },
  {
    id: "sneha",
    name: "Sneha Patel",
    email: "sneha@gmail.com",
    phone: "+91 9001234567",
    orders: 5,
    spent: "₹9,200",
    status: "Active",
  },
  {
    id: "arjun",
    name: "Arjun Nair",
    email: "arjun@gmail.com",
    phone: "+91 9876512340",
    orders: 17,
    spent: "₹31,400",
    status: "Active",
  },
  {
    id: "meera",
    name: "Meera Iyer",
    email: "meera@gmail.com",
    phone: "+91 9090909090",
    orders: 1,
    spent: "₹850",
    status: "Blocked",
  },
  {
    id: "bharath",
    name: "Bharath",
    email: "karthik@gmail.com",
    phone: "+91 9345678901",
    orders: 9,
    spent: "₹18,600",
    status: "Active",
  },
];

const stats = [
  { label: "TOTAL CUSTOMERS", value: "2,548" },
  { label: "NEW THIS MONTH", value: "145" },
  { label: "ACTIVE CUSTOMERS", value: "2,320" },
  { label: "BLOCKED CUSTOMERS", value: "12" },
];

const CustomersPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500 text-sm">
            Manage customer accounts and activity.
          </p>
        </div>

        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-100">
          <Download size={16} />
          Export Customers
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border shadow-sm"
          >
            <p className="text-xs text-gray-400 font-semibold">
              {item.label}
            </p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl border shadow-sm p-4 mb-4 flex justify-between gap-4">
        <div className="flex items-center border rounded-lg px-3 flex-1">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search customer name, email or phone..."
            className="w-full p-2 outline-none text-sm"
          />
        </div>

        <select className="border rounded-lg px-4 text-sm bg-white">
          <option>All Customers</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b flex justify-between">
          <h3 className="font-semibold text-gray-700">Customer List</h3>
          <span className="text-sm text-gray-400">
            {customers.length} customers
          </span>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-5 py-3">Customer</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Phone</th>
              <th className="text-left px-5 py-3">Orders</th>
              <th className="text-left px-5 py-3">Total Spent</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Click customer name */}
                <td className="px-5 py-4">
                  <Link href={`/customers/${customer.id}`}>
                    <div className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                        {customer.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <span className="group-hover:text-blue-600">
                        {customer.name}
                      </span>
                    </div>
                  </Link>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {customer.email}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {customer.phone}
                </td>

                <td className="px-5 py-4">{customer.orders}</td>

                <td className="px-5 py-4 font-medium">
                  {customer.spent}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-3 text-gray-500">
                    
                    {/* Eye icon click */}
                    <Link href={`/customers/${customer.id}`}>
                      <Eye
                        size={16}
                        className="cursor-pointer hover:text-black"
                      />
                    </Link>

                    <Pencil
                      size={16}
                      className="cursor-pointer hover:text-black"
                    />

                    <Trash2
                      size={16}
                      className="cursor-pointer hover:text-red-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;