"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("upi");
  const [shipping, setShipping] = useState("standard");

  const items = [
    {
      name: "Sterling Silver Pendant",
      variant: "Rose Gold Finish",
      price: 10837,
      qty: 1,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Diamond Stud Earrings",
      variant: "0.25 ct 14K Gold",
      price: 3299,
      qty: 1,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shippingCharge = shipping === "express" ? 199 : 0;
  const discount = 1000;

  const total = subtotal + shippingCharge - discount;

  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <p className="text-sm text-gray-500">
            Cart &gt; Checkout
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Checkout
          </h1>

          <p className="text-gray-600 mt-2">
            Complete your order details below — your bag is reserved for
            15 minutes.
          </p>

          {/* Progress */}

          <div className="flex justify-between items-center mt-10 mb-10">

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>

              <span className="mt-2 text-sm">
                Cart
              </span>
            </div>

            <div className="flex-1 h-1 bg-yellow-500 mx-3"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#0B2240] text-white flex items-center justify-center font-bold">
                2
              </div>

              <span className="mt-2 font-semibold">
                Checkout
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-300 mx-3"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                3
              </div>

              <span className="mt-2 text-sm">
                Payment
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-300 mx-3"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                4
              </div>

              <span className="mt-2 text-sm">
                Success
              </span>
            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="lg:col-span-2 space-y-8">

              {/* Delivery Address */}

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-6">
                  Delivery Address
                </h2>

                <div className="border rounded-lg p-5 bg-yellow-50">

                  <div className="flex justify-between">

                    <div>

                      <p className="font-semibold">
                        Ananya Sharma
                      </p>

                      <p className="text-gray-600 mt-2">
                        Flat 304, Green Valley Apartments,
                        Linking Road,
                        Mumbai,
                        Maharashtra 400050
                      </p>

                      <p className="mt-2">
                        +91 9876543210
                      </p>

                    </div>

                    <button className="text-blue-700 font-semibold">
                      Edit
                    </button>

                  </div>

                </div>

                <button className="mt-5 w-full border rounded-lg py-3 hover:bg-gray-100">
                  + Add New Address
                </button>

              </div>

              {/* Contact */}

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-6">
                  Contact Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="font-semibold">
                      Full Name
                    </label>

                    <input
                      className="w-full border rounded-lg p-3 mt-2"
                      defaultValue="Ananya Sharma"
                    />

                  </div>

                  <div>

                    <label className="font-semibold">
                      Mobile Number
                    </label>

                    <input
                      className="w-full border rounded-lg p-3 mt-2"
                      defaultValue="+91 9876543210"
                    />

                  </div>

                  <div>

                    <label className="font-semibold">
                      Email Address
                    </label>

                    <input
                      className="w-full border rounded-lg p-3 mt-2"
                      defaultValue="ananya@example.com"
                    />

                  </div>

                  <div>

                    <label className="font-semibold">
                      Alternate Mobile
                    </label>

                    <input
                      className="w-full border rounded-lg p-3 mt-2"
                      placeholder="Optional"
                    />

                  </div>

                </div>

              </div>
              {/* Shipping Method */}

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-6">
                  Shipping Method
                </h2>

                <div className="space-y-4">

                  <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        checked={shipping === "standard"}
                        onChange={() => setShipping("standard")}
                      />

                      <div>
                        <p className="font-semibold">
                          Standard Delivery
                        </p>

                        <p className="text-gray-500 text-sm">
                          3–5 Business Days
                        </p>

                      </div>

                    </div>

                    <span className="font-bold text-green-600">
                      FREE
                    </span>

                  </label>

                  <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        checked={shipping === "express"}
                        onChange={() => setShipping("express")}
                      />

                      <div>

                        <p className="font-semibold">
                          Express Delivery
                        </p>

                        <p className="text-gray-500 text-sm">
                          1–2 Business Days
                        </p>

                      </div>

                    </div>

                    <span className="font-bold">
                      ₹199
                    </span>

                  </label>

                </div>

              </div>

              {/* Payment */}

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-bold mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4">

                  <label className="block border rounded-lg p-4">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        checked={payment === "upi"}
                        onChange={() => setPayment("upi")}
                      />

                      <span className="font-semibold">
                        UPI
                      </span>

                    </div>

                    {payment === "upi" && (

                      <div className="mt-4 flex gap-3">

                        <input
                          placeholder="username@upi"
                          className="flex-1 border rounded-lg p-3"
                        />

                        <button className="bg-blue-700 text-white px-5 rounded-lg">
                          Verify
                        </button>

                      </div>

                    )}

                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-4">

                    <input
                      type="radio"
                      checked={payment === "card"}
                      onChange={() => setPayment("card")}
                    />

                    Credit / Debit Card

                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-4">

                    <input
                      type="radio"
                      checked={payment === "bank"}
                      onChange={() => setPayment("bank")}
                    />

                    Net Banking

                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-4">

                    <input
                      type="radio"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                    />

                    Cash On Delivery

                  </label>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div>

              <div className="bg-white rounded-xl shadow p-6 sticky top-24">

                <h2 className="text-xl font-bold mb-5">
                  Order Summary
                </h2>

                <div className="space-y-5">

                  {items.map((item, index) => (

                    <div
                      key={index}
                      className="flex gap-4"
                    >

                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.variant}
                        </p>

                        <p className="mt-2">
                          Qty : {item.qty}
                        </p>

                      </div>

                      <p className="font-bold">
                        ₹{item.price.toLocaleString()}
                      </p>

                    </div>

                  ))}

                  <div className="border-t pt-5 space-y-3">

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shippingCharge === 0
                          ? "Free"
                          : `₹${shippingCharge}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>
                        -₹{discount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-xl font-bold border-t pt-4">
                      <span>Total</span>
                      <span>
                        ₹{total.toLocaleString()}
                      </span>
                    </div>

                  </div>

                  <button className="w-full bg-[#0B2240] hover:bg-[#08182d] text-white py-4 rounded-lg font-semibold mt-6">

                    PLACE ORDER

                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    Secured by 256-bit SSL Encryption
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Features */}

          <div className="grid md:grid-cols-4 gap-5 mt-16">

            <div className="bg-white rounded-lg shadow p-5 text-center">
              🚚
              <h3 className="font-bold mt-2">
                Free Shipping
              </h3>
              <p className="text-gray-500 text-sm">
                On orders above ₹999
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-5 text-center">
              ↩️
              <h3 className="font-bold mt-2">
                Easy Returns
              </h3>
              <p className="text-gray-500 text-sm">
                7-day return policy
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-5 text-center">
              🔒
              <h3 className="font-bold mt-2">
                Secure Payments
              </h3>
              <p className="text-gray-500 text-sm">
                100% Safe Checkout
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-5 text-center">
              💎
              <h3 className="font-bold mt-2">
                Certified Quality
              </h3>
              <p className="text-gray-500 text-sm">
                BIS Hallmarked
              </p>
            </div>

          </div>
          </div>
      </main>

      <Footer />
    </>
  );
}