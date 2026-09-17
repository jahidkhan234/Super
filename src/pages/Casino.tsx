import { Coins, Filter, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface Game {
  game_code: string;
  game_name: string;
  provider_code: string;
  banner?: string;
  [key: string]: any;
}

interface Provider {
  code: string;
  name: string;
  [key: string]: any;
}

export default function Casino() {
  const [games, setGames] = useState<Game[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("PRAGMATIC");
  const [searchQuery, setSearchQuery] = useState("");
  const [launchingGame, setLaunchingGame] = useState<string | null>(null);
  const { user, requireAuth } = useAuth();

  // Fetch Providers once
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const provRes = await fetch("/api/nexusggr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "provider_list" })
        });
        const provText = await provRes.text();
        let provData;
        try {
          provData = JSON.parse(provText);
        } catch (e) {
          provData = { error: "Failed to parse backend proxy response." };
        }
        
        if (provData.error) {
          setErrorMsg("Nexus API is blocking requests from this server. Please test locally or configure IP whitelist.");
        } else {
          if (provData && provData.providers) {
            setProviders(provData.providers);
            if (provData.providers.length > 0) {
              setSelectedProvider(provData.providers[0].code);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  // Fetch Games when provider changes
  useEffect(() => {
    if (!selectedProvider) return;
    
    const fetchGames = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const gameRes = await fetch("/api/nexusggr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "game_list", provider_code: selectedProvider })
        });
        const gameText = await gameRes.text();
        let gameData;
        try {
          gameData = JSON.parse(gameText);
        } catch (e) {
          gameData = { error: "Failed to parse backend proxy response." };
        }

        if (gameData.error) {
           // Wait, already handled in providers if blocked, but just in case
           if (!errorMsg) setErrorMsg("Failed to load games from API.");
        } else {
          if (gameData && gameData.games) setGames(gameData.games);
          else if (Array.isArray(gameData)) setGames(gameData);
          else setGames([]);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedProvider]);

  const handlePlayGame = (game: Game) => {
    requireAuth(async () => {
      if (!user) return; // Should not happen if requireAuth works
      
      setLaunchingGame(game.game_code);
      try {
        const payload = {
          method: "game_launch",
          user_code: user.username,
          provider_code: selectedProvider || game.provider_code || game.provider,
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
          // Open in same tab
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

  const filteredGames = games.filter(game => {
    const nameStr = game.game_name || game.name || "";
    return nameStr.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6 p-4 container mx-auto min-h-screen">
      <div className="w-full h-32 md:h-48 bg-gradient-to-r from-purple-900 to-[#1A242D] rounded-xl flex items-center p-8 border border-purple-500/30">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Live Casino & Slots</h1>
          <p className="text-purple-200 text-sm md:text-base">Experience the thrill of a real casino from home.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex overflow-x-auto gap-2 pb-2 w-full md:w-auto scrollbar-hide">
          {providers.map((prov, i) => {
            const code = prov.code || prov.id || prov.name;
            const name = prov.name || prov.code || prov.id;
            return (
              <button 
                key={i} 
                onClick={() => setSelectedProvider(code)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${selectedProvider === code ? "bg-yellow-500 text-black" : "bg-[#1A242D] text-gray-400 hover:text-white border border-[#2A343D]"}`}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input 
              type="text" 
              placeholder="Search games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A242D] border border-[#2A343D] rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
          <button className="bg-[#1A242D] border border-[#2A343D] p-2 rounded-lg text-gray-400 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      ) : errorMsg ? (
        <div className="text-center py-20 text-red-400 bg-red-900/20 border border-red-500/30 rounded-xl">
          <p>{errorMsg}</p>
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No games found. Try adjusting your search or provider.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
          {filteredGames.map((game, i) => (
            <div key={i} onClick={() => handlePlayGame(game)} className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square bg-[#1A242D] border border-[#2A343D] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 z-20 transition-opacity flex items-center justify-center">
                <button 
                  className="px-6 py-2 bg-yellow-500 rounded-full font-bold text-black hover:scale-105 transition-transform flex items-center gap-2"
                  disabled={launchingGame === game.game_code}
                >
                  {launchingGame === game.game_code ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : null}
                  {launchingGame === game.game_code ? "Loading..." : "Play"}
                </button>
              </div>
              
              <div className="h-full w-full relative bg-[#2A343D]">
                 <img 
                    src={game.banner || game.image || game.img || game.url || "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=200&auto=format&fit=crop"} 
                    alt={game.game_name || game.name} 
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" 
                    onError={(e) => {
                      // Fallback image if banner fails to load
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=200&auto=format&fit=crop";
                    }}
                 />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 z-30 pointer-events-none">
                <div className="text-[10px] text-yellow-500 font-medium mb-1 uppercase tracking-wider">{selectedProvider || game.provider_code || game.provider || "Unknown"}</div>
                <div className="text-sm font-bold text-white truncate">{game.game_name || game.name || "Unknown Game"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
