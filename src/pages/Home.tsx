import { Link } from "react-router-dom";
import { PlayCircle, Trophy, Loader2, Volume2, Flame, Gamepad2, Rocket, Spade, MonitorPlay, Coins, Ticket, Ghost } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [balance, setBalance] = useState<string | null>(null);
  const [popularGames, setPopularGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [launchingGame, setLaunchingGame] = useState<string | null>(null);
  const { user, requireAuth } = useAuth();

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const payload = {
          method: "game_list",
          provider_code: "PRAGMATIC"
        };
        const res = await fetch("/api/nexusggr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const text = await res.text();
        const data = JSON.parse(text);
        if (data.status === 1 && data.games) {
          setPopularGames(data.games.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularGames();
  }, []);

  const handlePlayGame = (game: any) => {
    requireAuth(async () => {
      if (!user) return;
      
      if (!game.game_code) {
        alert("This is a placeholder game. Please select a real game from the API.");
        return;
      }
      
      setLaunchingGame(game.game_code);
      try {
        const payload = {
          method: "game_launch",
          user_code: user.username,
          provider_code: game.provider_code || game.provider || "PRAGMATIC",
          game_code: game.game_code,
          lang: "en",
          lobby_url: window.location.origin
        };
        
        const res = await fetch("/api/nexusggr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch(e) {
          data = { status: 0, msg: "Failed to parse proxy response" };
        }
        
        if (data.status === 1 && data.launch_url) {
          window.location.href = data.launch_url;
        } else {
          alert(`Failed to launch game: ${data.msg || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Launch error:", error);
        alert("Failed to launch game.");
      } finally {
        setLaunchingGame(null);
      }
    });
  };

  const categories = [
    { name: "হট গেম", icon: Flame, color: "text-red-500", active: true },
    { name: "স্লট", icon: Gamepad2, color: "text-gray-700" },
    { name: "ক্র্যাশ", icon: Rocket, color: "text-red-500" },
    { name: "ক্যাসিনো", icon: Spade, color: "text-gray-700" },
    { name: "স্পোর্টস", icon: Trophy, color: "text-gray-700" },
    { name: "আর্কেড", icon: MonitorPlay, color: "text-gray-700" },
    { name: "টেবিল", icon: Coins, color: "text-gray-700" },
    { name: "লটারি", icon: Ticket, color: "text-gray-700" },
  ];

  return (
    <div className="flex flex-col bg-[#243e62] min-h-screen">
      
      {/* Hero Banner Placeholder (like screenshot) */}
      <div className="w-full h-40 bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h2 className="text-2xl font-black italic shadow-black drop-shadow-md">৳৭,০০০</h2>
            <p className="text-sm font-bold shadow-black drop-shadow-md">প্রগ্রেসিভ বোনাস</p>
          </div>
        </div>
        {/* Pagination dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          <div className="w-4 h-1 bg-white rounded-full"></div>
          <div className="w-4 h-1 bg-white/50 rounded-full"></div>
          <div className="w-4 h-1 bg-white/50 rounded-full"></div>
          <div className="w-4 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="flex items-center bg-[#1f3451] py-1.5 px-3 border-y border-white/10 overflow-hidden">
        <Volume2 size={18} className="text-gray-300 mr-2 shrink-0" />
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-[marquee_20s_linear_infinite] text-[#e87060] text-xs font-medium">
            Super Scatter-এ ৫০০ ফ্রি স্পিন, 💰 COMBO Slots-এ ৩% ক্যাশব্যাক!
          </div>
        </div>
      </div>

      {/* Horizontal Category Scroll */}
      <div className="bg-[#315783] py-3 overflow-x-auto scrollbar-hide border-b border-white/5">
        <div className="flex gap-4 px-4 min-w-max">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${cat.active ? 'bg-white shadow-[0_0_10px_rgba(255,0,0,0.5)]' : 'bg-white'}`}>
                <cat.icon size={24} className={cat.color} />
                {cat.active && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full border border-white"></div>
                )}
              </div>
              <span className={`text-[11px] font-bold ${cat.active ? 'text-white' : 'text-white/80'}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Games Section */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-white rounded-full"></div>
          <h2 className="text-white font-bold text-lg">হট গেম</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-white" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {popularGames.map((game, i) => (
              <div 
                key={i} 
                onClick={() => handlePlayGame(game)} 
                className="group relative rounded-md overflow-hidden cursor-pointer aspect-[3/4] bg-[#1f3451] border border-white/10 flex flex-col items-center shadow-lg transition-transform hover:scale-105"
              >
                <div className="w-full flex-1 p-2 flex items-center justify-center relative overflow-hidden">
                   {game.banner ? (
                     <img src={game.banner} alt={game.game_name} className="absolute inset-0 w-full h-full object-cover object-center" />
                   ) : (
                     <div className="w-16 h-16 bg-[#2a4569] rounded-full flex items-center justify-center border-2 border-yellow-500 shadow-inner z-10">
                        <Gamepad2 size={28} className="text-yellow-500" />
                     </div>
                   )}
                   {/* Gradient overlay for text readability at bottom */}
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1f3451] via-[#1f3451]/80 to-transparent"></div>
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 z-20 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                  <button 
                    className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-lg disabled:opacity-50"
                    disabled={launchingGame === game.game_code}
                  >
                    {launchingGame === game.game_code ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <PlayCircle size={20} fill="currentColor" />
                    )}
                  </button>
                </div>
                
                <div className="w-full text-center pb-2 z-10">
                  <div className="text-[10px] text-white/90 font-medium truncate px-1">
                    {game.game_name || game.name || "Unknown Game"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Floating Action Buttons (Like Screenshot) */}
      <div className="fixed right-2 bottom-20 flex flex-col gap-3 z-40">
        <button className="w-12 h-12 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden bg-[#243e62] border-2 border-yellow-500">
           {/* Wheel Graphic Placeholder */}
           <div className="w-full h-full bg-gradient-to-tr from-yellow-500 via-orange-400 to-red-500 flex items-center justify-center">
             <Trophy size={20} className="text-white" />
           </div>
        </button>
        <button className="w-12 h-12 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-gradient-to-b from-orange-400 to-red-600 border border-white/20 flex flex-col items-center justify-center text-white">
           <Ticket size={20} />
        </button>
      </div>
    </div>
  );
}
