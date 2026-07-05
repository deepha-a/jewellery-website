'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { FiTrash2, FiHeart } from 'react-icons/fi';
import { IoCheckmarkSharp } from 'react-icons/io5';

interface CartItem {
  id: string;
  name: string;
  category: string;
  variant: string;
  image: string;
  price: number;
  quantity: number;
  inStock: boolean;
  savedForLater: boolean;
}

interface RecommendedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Diamond Pendant',
    category: 'GLOWDRAPE ATELIER',
    variant: 'White Gold',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 4499,
    quantity: 1,
    inStock: true,
    savedForLater: false,
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    category: 'GLOWDRAPE FEMME',
    variant: 'Silver',
    image: 'https://images.unsplash.com/photo-1509941943102-10c232535736?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 5999,
    quantity: 1,
    inStock: true,
    savedForLater: false,
  },
  {
    id: '3',
    name: 'Designer Dress',
    category: 'GLOWDRAPE COUTURE',
    variant: 'Maroon',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 3999,
    quantity: 1,
    inStock: true,
    savedForLater: false,
  },
];

const mockRecommendedProducts: RecommendedProduct[] = [
  {
    id: '1',
    name: 'Emerald Drop Earrings',
    category: 'GLOWDRAPE ATELIER',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 2999,
  },
  {
    id: '2',
    name: 'Rose Gold Bracelet',
    category: 'GLOWDRAPE FEMME',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 4499,
  },
  {
    id: '3',
    name: 'Silver Charm Anklet',
    category: 'GLOWDRAPE ATELIER',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 1799,
  },
  {
    id: '4',
    name: 'Velvet Party Gown',
    category: 'GLOWDRAPE COUTURE',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    price: 7999,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState('600100 - Chennai');

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shipping = 0; // Free Shipping
  const tax = Math.round((subtotal - couponDiscount) * 0.18); // 18% GST
  const total = subtotal - couponDiscount + shipping + tax;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleSaveForLater = (id: string) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, savedForLater: !item.savedForLater } : item
    ));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'GLOWSAVE14') {
      setAppliedCoupon({ code: couponCode, discount: 14 });
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Delivery Location Bar */}
      <div className="bg-[#1A2A3A] text-white py-3 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm md:text-base">📍 Delivering to {deliveryLocation}</span>
          </div>
          <button className="text-[#D4AF37] text-sm font-semibold hover:underline">
            CHANGE
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <p className="text-gray-600 mb-6">Review your selected products</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 md:p-6 flex gap-4 md:gap-6 border border-gray-100 hover:border-gray-200 transition"
                  >
                    {/* Product Image */}
                    <div className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="grow">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{item.name}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{item.category}</p>
                      <p className="text-xs text-gray-600 mt-1">Variant: {item.variant}</p>
                      <p className={`text-xs mt-1 ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {item.inStock ? '✓ In stock' : 'Out of stock'}
                      </p>

                      {/* Price */}
                      <p className="text-lg font-semibold text-gray-900 mt-3">₹{item.price.toLocaleString('en-IN')}</p>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-3 mt-4">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center space-x-4 mt-4 text-xs md:text-sm">
                        <button
                          onClick={() => handleSaveForLater(item.id)}
                          className={`flex items-center space-x-1 ${
                            item.savedForLater ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                          } transition`}
                        >
                          <FiHeart size={16} />
                          <span>Save for later</span>
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition"
                        >
                          <FiTrash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gift Message Card */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 border border-gray-100 flex items-center justify-between cursor-pointer hover:border-gray-200 transition">
                <div>
                  <h3 className="font-semibold text-gray-900">Add a gift message</h3>
                  <p className="text-sm text-gray-500 mt-1">Personalize your order with a complimentary handwritten note.</p>
                </div>
                <span className="text-2xl shrink-0">🎁</span>
              </div>

              {/* Luxury Packaging Card */}
              <div className="bg-white rounded-lg p-6 border border-gray-100 flex items-center justify-between cursor-pointer hover:border-gray-200 transition">
                <div>
                  <h3 className="font-semibold text-gray-900">Complimentary luxury packaging</h3>
                  <p className="text-sm text-gray-500 mt-1">Every order arrives in a signature GlowDrape box with elegant packaging.</p>
                </div>
                <span className="text-2xl shrink-0">✨</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-100 sticky top-24 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Summary Items */}
              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-900 font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span className="text-green-600 font-medium">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST Included)</span>
                  <span className="text-gray-900 font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#D4AF37]">₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Coupon Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon"
                    className="grow px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#D4AF37] text-gray-900 font-semibold rounded text-sm hover:bg-[#C4A027] transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-green-600 mt-2">✓ {appliedCoupon.code} applied: ₹{couponDiscount.toLocaleString('en-IN')} off</p>
                )}
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-[#D4AF37] text-gray-900 font-bold py-3 rounded-lg hover:bg-[#C4A027] transition mb-4">
                PROCEED TO CHECKOUT
              </button>

              {/* SSL Badge */}
              <div className="text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                  <span>🔒</span>
                  <span>100% secure 256-bit SSL encrypted checkout</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-[#1A2A3A] text-white py-8 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📦</span>
            <div>
              <p className="font-semibold text-sm">Free Shipping</p>
              <p className="text-xs text-gray-400">On orders above ₹999</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">↩️</span>
            <div>
              <p className="font-semibold text-sm">Easy Returns</p>
              <p className="text-xs text-gray-400">7-day return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold text-sm">Secure Payments</p>
              <p className="text-xs text-gray-400">100% safe checkout</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-sm">Certified Quality</p>
              <p className="text-xs text-gray-400">ISO guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recommended For You</h2>
          <a href="/shop" className="text-[#D4AF37] font-semibold hover:underline">
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {mockRecommendedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                <h3 className="font-semibold text-gray-900 mt-2 text-sm line-clamp-2">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 mt-3">₹{product.price.toLocaleString('en-IN')}</p>
                <button className="w-full bg-[#D4AF37] text-gray-900 font-bold py-2 rounded mt-4 hover:bg-[#C4A027] transition text-sm">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
