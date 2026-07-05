import Link from "next/link";
export default function CouponsPage() {
  const coupons = [
    {
      code: "WELCOME10",
      type: "Percentage",
      value: "10%",
      usage: 125,
      expiry: "31 Dec 2026",
      status: "Active",
    },
    {
      code: "SUMMER20",
      type: "Percentage",
      value: "20%",
      usage: 82,
      expiry: "15 Aug 2026",
      status: "Active",
    },
    {
      code: "FLAT500",
      type: "Fixed",
      value: "₹500",
      usage: 35,
      expiry: "01 Jul 2026",
      status: "Expired",
    },
    {
      code: "FESTIVE25",
      type: "Percentage",
      value: "25%",
      usage: 210,
      expiry: "15 Nov 2026",
      status: "Active",
    },
    {
      code: "NEWUSER50",
      type: "Fixed",
      value: "₹50",
      usage: 420,
      expiry: "31 Dec 2026",
      status: "Active",
    },
  ];

  return (
  <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8 text-black font-medium overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-black font-medium">
              Marketing &gt; Coupons
            </p>

            <h1 className="text-4xl font-bold text-black mt-2">
              Coupons
            </h1>

            <p className="text-black font-medium mt-1">
              Manage discount coupons and promotional offers
            </p>
          </div>

          <Link
            href="/coupons/create"
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
          >
            + Create Coupon
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h3 className="text-gray-900 text-sm font-semibold">
              Active Coupons
            </h3>

            <p className="text-3xl font-bold text-black mt-2">
              12
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h3 className="text-gray-900 text-sm font-semibold">
              Total Usage
            </h3>

            <p className="text-3xl font-bold text-black mt-2">
              872
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h3 className="text-gray-900 text-sm font-semibold">
              Expired Coupons
            </h3>

            <p className="text-3xl font-bold text-red-600 mt-2">
              5
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search coupons..."
              className="border-2 border-gray-400 rounded-lg px-4 py-3 text-black font-medium"
            />

            <select className="border-2 border-gray-400 rounded-lg px-4 py-3 text-black font-medium">
              <option>All Types</option>
              <option>Percentage</option>
              <option>Fixed</option>
            </select>

            <select className="border-2 border-gray-400 rounded-lg px-4 py-3 text-black font-medium">
              <option>All Status</option>
              <option>Active</option>
              <option>Expired</option>
            </select>
          </div>
        </div>

        {/* Coupon Table */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-black">
              Coupon List
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-bold text-black">
                  CODE
                </th>

                <th className="text-left p-4 font-bold text-black">
                  TYPE
                </th>

                <th className="text-left p-4 font-bold text-black">
                  VALUE
                </th>

                <th className="text-left p-4 font-bold text-black">
                  USAGE
                </th>

                <th className="text-left p-4 font-bold text-black">
                  EXPIRY
                </th>

                <th className="text-left p-4 font-bold text-black">
                  STATUS
                </th>

                <th className="text-left p-4 font-bold text-black">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-black font-semibold">
                    {coupon.code}
                  </td>

                  <td className="p-4 text-black">
                    {coupon.type}
                  </td>

                  <td className="p-4 text-black font-semibold">
                    {coupon.value}
                  </td>

                  <td className="p-4 text-black">
                    {coupon.usage}
                  </td>

                  <td className="p-4 text-black">
                    {coupon.expiry}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        coupon.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {coupon.status}
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