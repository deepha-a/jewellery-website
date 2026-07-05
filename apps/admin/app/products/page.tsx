import Link from "next/link";
export default function ProductsPage() {
  const products = [
  {
    name: "Diamond Ring",
    sku: "RNG-101",
    category: "Jewellery",
    price: "₹4,999",
    stock: 24,
    status: "Active",
  },
  {
    name: "Party Wear Dress",
    sku: "DRS-205",
    category: "Dresses",
    price: "₹2,499",
    stock: 8,
    status: "Active",
  },
  {
    name: "Gold Necklace",
    sku: "NCK-301",
    category: "Jewellery",
    price: "₹8,999",
    stock: 3,
    status: "Low Stock",
  },
  {
    name: "Silver Bracelet",
    sku: "BRC-401",
    category: "Jewellery",
    price: "₹1,999",
    stock: 15,
    status: "Active",
  },
  {
    name: "Wedding Saree",
    sku: "SAR-501",
    category: "Clothing",
    price: "₹12,999",
    stock: 5,
    status: "Low Stock",
  },
  {
    name: "Hand Bag",
    sku: "BAG-601",
    category: "Accessories",
    price: "₹2,299",
    stock: 18,
    status: "Active",
  },
  {
    name: "Leather Wallet",
    sku: "WAL-701",
    category: "Accessories",
    price: "₹999",
    stock: 35,
    status: "Active",
  },
  {
    name: "Smart Watch",
    sku: "SWT-801",
    category: "Electronics",
    price: "₹6,499",
    stock: 12,
    status: "Active",
  },
  {
    name: "Wireless Earbuds",
    sku: "EAR-901",
    category: "Electronics",
    price: "₹3,499",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Sports Shoes",
    sku: "SHO-1001",
    category: "Footwear",
    price: "₹4,299",
    stock: 22,
    status: "Active",
  },
  {
    name: "Cotton T-Shirt",
    sku: "TSH-1101",
    category: "Clothing",
    price: "₹799",
    stock: 40,
    status: "Active",
  },
  {
    name: "Sunglasses",
    sku: "SUN-1201",
    category: "Accessories",
    price: "₹1,499",
    stock: 0,
    status: "Out of Stock",
  },
];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Placeholder */}
      

      {/* Main Content */}
      <div className="flex-1 p-8 text-black overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Products</h1>
            <p className="text-gray-700 mt-1">
              Manage your product catalog and inventory
            </p>
          </div>

         <Link
          href="/products/add"
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg font-medium"
         >
          + Add Product
         </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6 border">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-400 rounded-lg px-4 py-2 text-black placeholder:text-gray-500"
            />

            <select className="border border-gray-400 rounded-lg px-4 py-2 text-black">
              <option>All Categories</option>
            </select>

            <select className="border border-gray-400 rounded-lg px-4 py-2 text-black">
              <option>All Status</option>
            </select>

            <select className="border border-gray-400 rounded-lg px-4 py-2 text-black">
              <option>All Stock</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border">
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="font-bold text-lg">Product List</h2>
            <span className="text-gray-800 font-medium">
              {products.length} Products
            </span>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </th>

                <th className="text-left p-4 font-semibold">IMAGE</th>
                <th className="text-left p-4 font-semibold">PRODUCT</th>
                <th className="text-left p-4 font-semibold">SKU</th>
                <th className="text-left p-4 font-semibold">CATEGORY</th>
                <th className="text-left p-4 font-semibold">PRICE</th>
                <th className="text-left p-4 font-semibold">STOCK</th>
                <th className="text-left p-4 font-semibold">STATUS</th>
                <th className="text-left p-4 font-semibold">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </td>

                  <td className="p-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-medium">
                      IMG
                    </div>
                  </td>

                  <td className="p-4 font-medium">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.sku}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4 font-medium">
                    {product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3 text-lg">
                      <button className="hover:scale-110">
                        👁️
                      </button>

                      <button className="hover:scale-110">
                        ✏️
                      </button>

                      <button className="hover:scale-110">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}