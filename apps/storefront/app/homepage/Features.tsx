import { FiTruck, FiRotateCcw, FiShield, FiAward } from 'react-icons/fi';

export default function Features() {
  const points = [
    { icon: <FiTruck className="text-[#D4AF37]" size={24} />, title: "Free Shipping", desc: "On orders above ₹999" },
    { icon: <FiRotateCcw className="text-[#D4AF37]" size={24} />, title: "Easy Returns", desc: "7-day return policy" },
    { icon: <FiShield className="text-[#D4AF37]" size={24} />, title: "Secure Payments", desc: "100% safe checkout" },

  ];

  return (
    <div className="w-full bg-white border-b border-gray-100 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {points.map((p, idx) => (
          <div key={idx} className="flex items-center space-x-3 border-r last:border-0 border-gray-100 pr-2">
            <div>{p.icon}</div>
            <div>
              <h4 className="text-xs font-bold text-[#0B2240]">{p.title}</h4>
              <p className="text-[11px] text-gray-500 font-medium">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}