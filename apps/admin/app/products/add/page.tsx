export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Space */}
      

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Products &gt; Add Product
            </p>

            <h1 className="text-3xl font-bold text-black mt-2">
              Add Product
            </h1>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 border border-gray-300 bg-white rounded-lg text-black">
              Cancel
            </button>

            <button className="px-5 py-2 bg-blue-700 text-white rounded-lg">
              Save Product
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-5">
                Basic Information
              </h2>

              <label className="block mb-2 font-medium text-black">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Luxury Silk Curtain"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />

              <label className="block mt-5 mb-2 font-medium text-black">
                Description
              </label>

              <textarea
                rows={6}
                placeholder="Enter product description..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />
            </div>

            {/* Pricing & Inventory */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pricing */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h2 className="text-lg font-semibold text-black mb-5">
                  Pricing
                </h2>

                <label className="block mb-2 text-black">
                  Base Price
                </label>

                <input
                  type="number"
                  placeholder="₹0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />

                <label className="block mt-5 mb-2 text-black">
                  Discounted Price
                </label>

                <input
                  type="number"
                  placeholder="₹0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />
              </div>

              {/* Inventory */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h2 className="text-lg font-semibold text-black mb-5">
                  Inventory
                </h2>

                <label className="block mb-2 text-black">
                  SKU
                </label>

                <input
                  type="text"
                  placeholder="SKU-001"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />

                <label className="block mt-5 mb-2 text-black">
                  Initial Quantity
                </label>

                <input
                  type="number"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Product Status */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Product Status
              </h2>

              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black">
                <option>Published</option>
                <option>Draft</option>
              </select>

              <p className="text-sm text-gray-500 mt-3">
                Published products are visible to customers.
              </p>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Category
              </h2>

              <label className="block mb-2 text-black">
                Main Category
              </label>

              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black">
                <option>Select Category</option>
                <option>Jewellery</option>
                <option>Dresses</option>
                <option>Accessories</option>
              </select>

              <label className="block mt-5 mb-2 text-black">
                Tags
              </label>

              <input
                type="text"
                placeholder="Add tags..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />

              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black">
                  Premium
                </span>

                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black">
                  Trending
                </span>

                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black">
                  New
                </span>
              </div>
            </div>

            {/* Product Images */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Product Images
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="text-5xl mb-3">📷</div>

                <p className="text-black font-medium mb-3">
                  Upload Product Image
                </p>

                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Upload Image
                </button>

                <p className="text-sm text-gray-500 mt-3">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}