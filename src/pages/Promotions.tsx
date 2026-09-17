import { Gift, Calendar } from "lucide-react";

export default function Promotions() {
  const promos = [
    {
      title: "150% First Deposit Bonus",
      desc: "Get up to ৳10,000 on your first deposit for Sports and Casino.",
      type: "Welcome",
      color: "bg-blue-500",
      code: "WELCOME150"
    },
    {
      title: "Daily 5% Unlimited Cashback",
      desc: "Play any Live Casino or Slot games and get 5% cashback every day.",
      type: "Casino",
      color: "bg-purple-500",
      code: "CASHBACK5"
    },
    {
      title: "Weekly Sports Reload",
      desc: "Get a 50% reload bonus up to ৳5,000 every Monday for Sports betting.",
      type: "Sports",
      color: "bg-green-500",
      code: "RELOAD50"
    },
    {
      title: "Refer a Friend Bonus",
      desc: "Invite your friends and get ৳500 for each successful referral.",
      type: "General",
      color: "bg-yellow-500",
      code: "REFER500"
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-4 container mx-auto min-h-screen">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="text-yellow-500" fill="currentColor" />
        <h1 className="text-2xl font-bold text-white">Promotions</h1>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {["All", "Welcome Bonus", "Sports", "Casino", "VIP"].map((cat, i) => (
          <button key={i} className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${i === 0 ? "bg-yellow-500 text-black" : "bg-[#1A242D] text-gray-400 hover:text-white border border-[#2A343D]"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((promo, i) => (
          <div key={i} className="bg-[#1A242D] rounded-xl border border-[#2A343D] overflow-hidden group">
            <div className={`h-32 ${promo.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
              <Gift size={48} className="text-white/30 absolute -right-4 -bottom-4 transform rotate-12" />
              <h3 className="text-2xl font-bold text-white relative z-10 text-center px-4 shadow-black/50 drop-shadow-md">{promo.title}</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2 py-1 bg-[#2A343D] text-gray-300 rounded uppercase tracking-wider">{promo.type}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12}/> Valid till Dec 2026</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 h-10">{promo.desc}</p>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between bg-[#0F1923] border border-[#2A343D] p-3 rounded-lg border-dashed">
                  <span className="text-xs text-gray-500">Promo Code:</span>
                  <span className="font-mono font-bold text-yellow-500 tracking-wider">{promo.code}</span>
                </div>
                <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                  Claim Bonus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
