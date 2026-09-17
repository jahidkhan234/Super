import { Flame } from "lucide-react";

export default function Sports() {
  return (
    <div className="flex flex-col gap-6 p-4 container mx-auto min-h-screen">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-red-500" fill="currentColor" />
        <h1 className="text-2xl font-bold text-white">Sports Betting</h1>
      </div>
      
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {["Cricket", "Football", "Tennis", "Basketball", "Esports", "Kabaddi"].map((sport, i) => (
          <button key={i} className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${i === 0 ? "bg-yellow-500 text-black" : "bg-[#1A242D] text-gray-400 hover:text-white border border-[#2A343D]"}`}>
            {sport}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-2">
        {/* Main Matches */}
        <div className="lg:col-span-3 space-y-4">
          {[1, 2, 3, 4, 5].map((match) => (
            <div key={match} className="bg-[#1A242D] rounded-xl border border-[#2A343D] p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-gray-500 transition-colors cursor-pointer">
              <div className="flex flex-col w-full md:w-1/3">
                <div className="text-xs text-gray-400 mb-2">Cricket • IPL 2026 • Today, 19:30</div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">Chennai Super Kings</span>
                  <span className="text-yellow-500 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Royal Challengers</span>
                  <span className="text-yellow-500 font-bold">0</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full md:w-1/2 md:ml-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 text-center mb-1">1</span>
                  <button className="bg-[#0F1923] hover:bg-[#2A343D] py-3 rounded font-bold text-white border border-[#2A343D]">1.85</button>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 text-center mb-1">X</span>
                  <button className="bg-[#0F1923] hover:bg-[#2A343D] py-3 rounded font-bold text-gray-400 border border-[#2A343D]">-</button>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 text-center mb-1">2</span>
                  <button className="bg-[#0F1923] hover:bg-[#2A343D] py-3 rounded font-bold text-white border border-[#2A343D]">2.10</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Betslip Sidebar */}
        <div className="hidden lg:block">
          <div className="bg-[#1A242D] rounded-xl border border-[#2A343D] overflow-hidden sticky top-20">
            <div className="bg-[#2A343D] p-4 font-bold text-center">Bet Slip</div>
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
              <span className="mb-2">Your betslip is empty</span>
              <span className="text-sm">Click on odds to add a bet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
