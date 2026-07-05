export default function CreateCouponPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Marketing &gt; Coupons &gt; Create Coupon
            </p>

            <h1 className="text-3xl font-bold text-black mt-2">
              Create Coupon
            </h1>

            <p className="text-gray-600 mt-1">
              Create promotional coupons for your customers.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 border border-gray-300 bg-white rounded-lg text-black">
              Cancel
            </button>

            <button className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg">
              Save Coupon
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="col-span-2 space-y-6">

            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-5">
                Coupon Information
              </h2>

              <label className="block mb-2 font-medium text-black">
                Coupon Code
              </label>

              <input
                type="text"
                placeholder="WELCOME20"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />

              <label className="block mt-5 mb-2 font-medium text-black">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Enter coupon description..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-5">
                Discount Details
              </h2>

              <div className="grid grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-black">
                    Discount Type
                  </label>

                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-black">
                    Discount Value
                  </label>

                  <input
                    type="number"
                    placeholder="10"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-black">
                    Minimum Order
                  </label>

                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-black">
                    Maximum Discount
                  </label>

                  <input
                    type="number"
                    placeholder="500"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Right Section */}
          <div className="space-y-6">

            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Coupon Status
              </h2>

              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Validity
              </h2>

              <label className="block mb-2 text-black">
                Start Date
              </label>

              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />

              <label className="block mt-5 mb-2 text-black">
                Expiry Date
              </label>

              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Usage Limit
              </h2>

              <input
                type="number"
                placeholder="100"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
              />

              <p className="text-sm text-gray-500 mt-3">
                Leave empty for unlimited usage.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}