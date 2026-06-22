"use client";

import Link from "next/link";
import { orders } from "../lib/fake-orders";

export default function OrdersPage() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">Orders</h1>

      <p className="text-gray-500 mt-2">
        Manage customer orders and fulfillment.
      </p>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4 mt-8">

        <Stat title="Total Orders" value="1248" />
        <Stat title="Pending" value="42" />
        <Stat title="Processing" value="87" />
        <Stat title="Delivered" value="1119" />

      </div>

      {/* Search */}

      <div className="bg-white rounded-lg p-4 mt-8 border">

        <input
          placeholder="Search order ID or customer..."
          className="border rounded px-4 py-2 w-full"
        />

      </div>

      {/* Table */}

      <div className="bg-white border rounded-lg mt-6 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm text-gray-500">

              <th className="p-4">ORDER ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>ITEMS</th>
              <th>AMOUNT</th>
              <th>PAYMENT</th>
              <th>STATUS</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 text-blue-600">

                  <Link href={`/orders/${order.id}`}>
                    #{order.id}
                  </Link>

                </td>

                <td>{order.customer}</td>

                <td>{order.date}</td>

                <td>{order.items}</td>

                <td>₹{order.amount}</td>

                <td>

                  <StatusBadge text={order.payment} />

                </td>

                <td>

                  <StatusBadge text={order.status} />

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border rounded-lg p-6">

      <p className="text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold mt-2">{value}</h2>

    </div>
  );
}

function StatusBadge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
      {text}
    </span>
  );
}

