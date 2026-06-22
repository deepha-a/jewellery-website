export type PaymentStatus = "Paid" | "Pending" | "Refunded";
export type OrderStatus = "Delivered" | "Processing" | "Pending" | "Shipped" | "Cancelled";

export interface OrderProduct {
  product: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface TimelineEvent {
  label: string;
  time: string;
  done: boolean;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  itemCount: number;
  amount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  products: OrderProduct[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  transactionId: string;
  shippingAddress: string;
  timeline: TimelineEvent[];
}

export const ORDERS: Order[] = [
  {
    id: "ORD-1024",
    customer: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9876543210",
    date: "15 Jun 2026",
    itemCount: 3,
    amount: 4250,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    products: [
      { product: "Diamond Ring", sku: "RNG-101", quantity: 1, price: 2500, total: 2500 },
      { product: "Silver Necklace", sku: "NCK-205", quantity: 1, price: 1750, total: 1750 },
    ],
    subtotal: 4250,
    shipping: 100,
    discount: 100,
    total: 4250,
    paymentMethod: "UPI",
    transactionId: "TXN10245689",
    shippingAddress: "12 Anna Nagar,\nChennai, Tamil Nadu",
    timeline: [
      { label: "Order Placed", time: "15 Jun 2026 - 09:15 AM", done: true },
      { label: "Payment Confirmed", time: "15 Jun 2026 - 09:17 AM", done: true },
      { label: "Processing", time: "15 Jun 2026 - 10:30 AM", done: true },
    ],
  },
  {
    id: "ORD-1023",
    customer: "Rohan Kumar",
    email: "rohan@gmail.com",
    phone: "+91 9123456789",
    date: "15 Jun 2026",
    itemCount: 2,
    amount: 2899,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    products: [
      { product: "Gold Bracelet", sku: "BRC-302", quantity: 1, price: 1999, total: 1999 },
      { product: "Pearl Earrings", sku: "EAR-108", quantity: 1, price: 900, total: 900 },
    ],
    subtotal: 2899,
    shipping: 100,
    discount: 0,
    total: 2999,
    paymentMethod: "Credit Card",
    transactionId: "TXN10234567",
    shippingAddress: "45 MG Road,\nBangalore, Karnataka",
    timeline: [
      { label: "Order Placed", time: "15 Jun 2026 - 11:00 AM", done: true },
      { label: "Payment Confirmed", time: "15 Jun 2026 - 11:02 AM", done: true },
      { label: "Processing", time: "15 Jun 2026 - 12:00 PM", done: false },
    ],
  },
  {
    id: "ORD-1022",
    customer: "Anitha Devi",
    email: "anitha@gmail.com",
    phone: "+91 9988776655",
    date: "14 Jun 2026",
    itemCount: 1,
    amount: 1499,
    paymentStatus: "Pending",
    orderStatus: "Pending",
    products: [
      { product: "Rose Gold Ring", sku: "RNG-205", quantity: 1, price: 1499, total: 1499 },
    ],
    subtotal: 1499,
    shipping: 100,
    discount: 0,
    total: 1599,
    paymentMethod: "Net Banking",
    transactionId: "TXN10223344",
    shippingAddress: "8 Gandhi Street,\nChennai, Tamil Nadu",
    timeline: [
      { label: "Order Placed", time: "14 Jun 2026 - 03:00 PM", done: true },
      { label: "Awaiting Payment", time: "14 Jun 2026 - 03:01 PM", done: false },
    ],
  },
  {
    id: "ORD-1021",
    customer: "Vikram Singh",
    email: "vikram@gmail.com",
    phone: "+91 9876012345",
    date: "14 Jun 2026",
    itemCount: 4,
    amount: 6120,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    products: [
      { product: "Sapphire Pendant", sku: "PND-401", quantity: 2, price: 1500, total: 3000 },
      { product: "Ruby Stud Earrings", sku: "EAR-211", quantity: 1, price: 2100, total: 2100 },
      { product: "Chain Bracelet", sku: "BRC-099", quantity: 1, price: 1020, total: 1020 },
    ],
    subtotal: 6120,
    shipping: 0,
    discount: 200,
    total: 5920,
    paymentMethod: "Debit Card",
    transactionId: "TXN10215678",
    shippingAddress: "22 Lajpat Nagar,\nNew Delhi",
    timeline: [
      { label: "Order Placed", time: "14 Jun 2026 - 09:00 AM", done: true },
      { label: "Payment Confirmed", time: "14 Jun 2026 - 09:05 AM", done: true },
      { label: "Processing", time: "14 Jun 2026 - 10:00 AM", done: true },
      { label: "Shipped", time: "14 Jun 2026 - 02:00 PM", done: true },
    ],
  },
  {
    id: "ORD-1020",
    customer: "Meera Iyer",
    email: "meera@gmail.com",
    phone: "+91 9567890123",
    date: "13 Jun 2026",
    itemCount: 2,
    amount: 3400,
    paymentStatus: "Refunded",
    orderStatus: "Cancelled",
    products: [
      { product: "Emerald Necklace", sku: "NCK-312", quantity: 1, price: 2200, total: 2200 },
      { product: "Gold Bangle", sku: "BNG-115", quantity: 1, price: 1200, total: 1200 },
    ],
    subtotal: 3400,
    shipping: 100,
    discount: 0,
    total: 3500,
    paymentMethod: "UPI",
    transactionId: "TXN10201122",
    shippingAddress: "15 Juhu Beach Road,\nMumbai, Maharashtra",
    timeline: [
      { label: "Order Placed", time: "13 Jun 2026 - 02:00 PM", done: true },
      { label: "Payment Confirmed", time: "13 Jun 2026 - 02:03 PM", done: true },
      { label: "Cancelled", time: "13 Jun 2026 - 04:00 PM", done: true },
      { label: "Refund Initiated", time: "13 Jun 2026 - 04:30 PM", done: true },
    ],
  },
  {
    id: "ORD-1019",
    customer: "Arjun Patel",
    email: "arjun@gmail.com",
    phone: "+91 9823456789",
    date: "13 Jun 2026",
    itemCount: 1,
    amount: 999,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    products: [
      { product: "Silver Anklet", sku: "ANK-088", quantity: 1, price: 999, total: 999 },
    ],
    subtotal: 999,
    shipping: 100,
    discount: 100,
    total: 999,
    paymentMethod: "UPI",
    transactionId: "TXN10199900",
    shippingAddress: "67 Satellite Road,\nAhmedabad, Gujarat",
    timeline: [
      { label: "Order Placed", time: "13 Jun 2026 - 11:00 AM", done: true },
      { label: "Payment Confirmed", time: "13 Jun 2026 - 11:02 AM", done: true },
      { label: "Processing", time: "13 Jun 2026 - 12:00 PM", done: true },
      { label: "Shipped", time: "13 Jun 2026 - 03:00 PM", done: true },
      { label: "Delivered", time: "14 Jun 2026 - 10:00 AM", done: true },
    ],
  },
  {
    id: "ORD-1018",
    customer: "Kavya Nair",
    email: "kavya@gmail.com",
    phone: "+91 9745678901",
    date: "12 Jun 2026",
    itemCount: 5,
    amount: 8750,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    products: [
      { product: "Diamond Solitaire", sku: "RNG-501", quantity: 1, price: 5000, total: 5000 },
      { product: "Platinum Chain", sku: "CHN-202", quantity: 1, price: 1800, total: 1800 },
      { product: "Gemstone Bracelet", sku: "BRC-401", quantity: 1, price: 950, total: 950 },
      { product: "Drop Earrings", sku: "EAR-310", quantity: 2, price: 500, total: 1000 },
    ],
    subtotal: 8750,
    shipping: 0,
    discount: 500,
    total: 8250,
    paymentMethod: "Credit Card",
    transactionId: "TXN10188800",
    shippingAddress: "3 Marine Drive,\nKochi, Kerala",
    timeline: [
      { label: "Order Placed", time: "12 Jun 2026 - 10:00 AM", done: true },
      { label: "Payment Confirmed", time: "12 Jun 2026 - 10:05 AM", done: true },
      { label: "Processing", time: "12 Jun 2026 - 11:00 AM", done: true },
      { label: "Shipped", time: "12 Jun 2026 - 04:00 PM", done: true },
      { label: "Delivered", time: "14 Jun 2026 - 09:00 AM", done: true },
    ],
  },
  {
    id: "ORD-1017",
    customer: "Sanjay Gupta",
    email: "sanjay@gmail.com",
    phone: "+91 9912345678",
    date: "12 Jun 2026",
    itemCount: 2,
    amount: 2250,
    paymentStatus: "Pending",
    orderStatus: "Processing",
    products: [
      { product: "Gold Stud Earrings", sku: "EAR-120", quantity: 1, price: 1500, total: 1500 },
      { product: "Silver Ring", sku: "RNG-080", quantity: 1, price: 750, total: 750 },
    ],
    subtotal: 2250,
    shipping: 100,
    discount: 0,
    total: 2350,
    paymentMethod: "Net Banking",
    transactionId: "TXN10177700",
    shippingAddress: "89 Sitapur Road,\nLucknow, Uttar Pradesh",
    timeline: [
      { label: "Order Placed", time: "12 Jun 2026 - 08:00 AM", done: true },
      { label: "Awaiting Payment", time: "12 Jun 2026 - 08:01 AM", done: false },
    ],
  },
];
