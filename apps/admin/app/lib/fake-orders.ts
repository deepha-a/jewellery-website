export const orders = [
    {
        id: "ORD-1024",
        customer: "Priya Sharma",
        date: "15 Jun 2026",
        items: 3,
        amount: 4250,
        payment: "Paid",
        status: "Delivered",

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

        shipping: 100,
        discount: 100,

        customerInfo: {
            email: "priya@gmail.com",
            phone: "+91 9876543210",
        },

        address: "12 Anna Nagar, Chennai, Tamil Nadu",

        timeline: [
            "Order Placed",
            "Payment Confirmed",
            "Processing",
        ],
    },

    {
        id: "ORD-1023",
        customer: "Rohan Kumar",
        date: "15 Jun 2026",
        items: 2,
        amount: 2899,
        payment: "Paid",
        status: "Processing",
    },

    {
        id: "ORD-1022",
        customer: "Anitha Devi",
        date: "14 Jun 2026",
        items: 1,
        amount: 1499,
        payment: "Pending",
        status: "Pending",
    },

    {
        id: "ORD-1021",
        customer: "Vikram Singh",
        date: "14 Jun 2026",
        items: 4,
        amount: 6120,
        payment: "Paid",
        status: "Shipped",
    },
];