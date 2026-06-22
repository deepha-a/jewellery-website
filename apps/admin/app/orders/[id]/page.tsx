import { notFound } from "next/navigation";

const orders = [
    {
        id: "ORD-1024",
        orderDate: "15 Jun 2026",
        orderStatus: "PROCESSING",
        paymentStatus: "PAID",

        customer: {
            name: "Priya Sharma",
            email: "priya@gmail.com",
            phone: "+91 9876543210",
        },

        products: [
            {
                name: "Diamond Ring",
                sku: "RNG-101",
                quantity: 1,
                price: 2500,
                total: 2500,
            },
            {
                name: "Silver Necklace",
                sku: "NCK-205",
                quantity: 1,
                price: 1750,
                total: 1750,
            },
        ],

        payment: {
            method: "UPI",
            transactionId: "TXN10245689",
            amountPaid: 4250,
        },

        summary: {
            subtotal: 4250,
            shipping: 100,
            discount: 100,
            total: 4250,
        },

        shippingAddress: {
            street: "12 Anna Nagar",
            city: "Chennai",
            state: "Tamil Nadu",
        },

        timeline: [
            "Order Placed",
            "Payment Confirmed",
            "Processing",
        ],
    },
];

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function OrderDetails({ params }: PageProps) {
    const { id } = await params;

    const order = orders.find((o) => o.id === id);

    if (!order) return notFound();

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Order Details
                    </h1>
                    <p className="text-gray-500 mt-1">
                        View and manage customer order information.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-50">
                        Print Invoice
                    </button>

                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Update Status
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* LEFT COLUMN */}
                <div className="col-span-8 space-y-6">

                    {/* Order Information */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Order Information
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div>
                                <p className="text-gray-500 text-sm">Order ID</p>
                                <p className="font-semibold">#{order.id}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Order Date</p>
                                <p className="font-semibold">{order.orderDate}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Order Status</p>
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm">
                                    {order.orderStatus}
                                </span>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Payment Status</p>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                                    {order.paymentStatus}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Ordered Products */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Ordered Products
                        </h2>

                        <table className="w-full">

                            <thead className="border-b">
                                <tr className="text-left text-gray-500 text-sm">
                                    <th className="pb-3">PRODUCT</th>
                                    <th className="pb-3">SKU</th>
                                    <th className="pb-3">QTY</th>
                                    <th className="pb-3">PRICE</th>
                                    <th className="pb-3">TOTAL</th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.products.map((product, index) => (
                                    <tr key={index} className="border-b">

                                        <td className="py-4 font-medium">
                                            {product.name}
                                        </td>

                                        <td>{product.sku}</td>

                                        <td>{product.quantity}</td>

                                        <td>₹{product.price}</td>

                                        <td className="font-semibold">
                                            ₹{product.total}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>₹{order.summary.subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span>₹{order.summary.shipping}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Discount</span>
                                <span className="text-red-500">
                                    -₹{order.summary.discount}
                                </span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₹{order.summary.total}</span>
                            </div>

                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Shipping Address
                        </h2>

                        <p>{order.shippingAddress.street}</p>
                        <p className="text-gray-600">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="col-span-4 space-y-6">

                    {/* Customer Information */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Customer Information
                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Customer Name</span>
                                <span>{order.customer.name}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Email</span>
                                <span>{order.customer.email}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Phone</span>
                                <span>{order.customer.phone}</span>
                            </div>

                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Payment Information
                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment Method</span>
                                <span>{order.payment.method}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Transaction ID</span>
                                <span>{order.payment.transactionId}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Amount Paid</span>
                                <span>₹{order.payment.amountPaid}</span>
                            </div>

                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="font-semibold text-lg mb-4">
                            Order Timeline
                        </h2>

                        <div className="space-y-4">
                            {order.timeline.map((step, index) => (
                                <div key={index} className="flex gap-3 items-center">

                                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>

                                    <span>{step}</span>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}