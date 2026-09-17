import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Check, X, Clock, RefreshCw, Save } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"transactions" | "settings">("transactions");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Settings State
  const [marqueeText, setMarqueeText] = useState("Super Scatter-এ ৫০০ ফ্রি স্পিন, 💰 COMBO Slots-এ ৩% ক্যাশব্যাক!");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bonusText, setBonusText] = useState("৳৭,০০০");
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (!db) return;
    
    // Fetch Transactions
    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTransactions(data);
      setLoading(false);
    });

    // Fetch Settings
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, "settings", "general"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.marqueeText) setMarqueeText(data.marqueeText);
          if (data.bannerUrl) setBannerUrl(data.bannerUrl);
          if (data.bonusText) setBonusText(data.bonusText);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();

    return () => unsubscribe();
  }, []);

  if (user?.role !== "admin") {
    return <div className="p-10 text-center text-white">Access Denied. You must be an admin.</div>;
  }

  const handleUpdateStatus = async (txId: string, status: "approved" | "rejected", uid: string, amount: number, type: string) => {
    try {
      await updateDoc(doc(db, "transactions", txId), { status });
      if (status === "approved") {
        const balanceChange = type === "deposit" ? amount : -amount;
        await updateDoc(doc(db, "users", uid), {
          balance: increment(balanceChange)
        });
      }
      alert(`Transaction ${status} successfully!`);
    } catch (error) {
      console.error(error);
      alert("Error updating transaction");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await setDoc(doc(db, "settings", "general"), {
        marqueeText,
        bannerUrl,
        bonusText,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#243e62] min-h-screen text-white p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      {/* Tabs */}
      <div className="flex bg-[#1f3451] rounded-lg p-1 mb-4 border border-white/10">
        <button 
          onClick={() => setActiveTab("transactions")}
          className={`flex-1 py-2 text-center rounded-md font-bold text-sm transition-colors ${activeTab === "transactions" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          Transactions
        </button>
        <button 
          onClick={() => setActiveTab("settings")}
          className={`flex-1 py-2 text-center rounded-md font-bold text-sm transition-colors ${activeTab === "settings" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          Site Settings
        </button>
      </div>

      {activeTab === "transactions" ? (
        <div className="bg-[#1f3451] rounded-lg shadow-xl overflow-hidden border border-white/10">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-bold text-lg">Transactions</h2>
            <button onClick={() => window.location.reload()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2b4461] text-xs uppercase text-gray-300">
                  <th className="p-3">User</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Account/TrxID</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="p-4 text-center text-gray-400">Loading...</td></tr>
                ) : transactions.length === 0 ? (
                  <tr><td colSpan={7} className="p-4 text-center text-gray-400">No transactions found.</td></tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-white/5 text-sm hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="font-bold">{tx.username}</div>
                        <div className="text-xs text-gray-400">{tx.uid.slice(0,6)}...</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${tx.type === 'deposit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {tx.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 uppercase">{tx.method}</td>
                      <td className="p-3 font-bold">৳{tx.amount?.toLocaleString()}</td>
                      <td className="p-3 font-mono text-xs">{tx.accountOrTrxId}</td>
                      <td className="p-3">
                        {tx.status === 'pending' && <span className="flex items-center gap-1 text-yellow-500"><Clock size={14}/> Pending</span>}
                        {tx.status === 'approved' && <span className="flex items-center gap-1 text-green-500"><Check size={14}/> Approved</span>}
                        {tx.status === 'rejected' && <span className="flex items-center gap-1 text-red-500"><X size={14}/> Rejected</span>}
                      </td>
                      <td className="p-3">
                        {tx.status === 'pending' && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleUpdateStatus(tx.id, 'approved', tx.uid, tx.amount, tx.type)}
                              className="p-1.5 bg-green-600 hover:bg-green-500 rounded text-white transition-colors"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(tx.id, 'rejected', tx.uid, tx.amount, tx.type)}
                              className="p-1.5 bg-red-600 hover:bg-red-500 rounded text-white transition-colors"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#1f3451] rounded-lg shadow-xl overflow-hidden border border-white/10 p-5">
          <h2 className="font-bold text-lg mb-4">Website Appearance Settings</h2>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Hero Banner Image URL (Optional)</label>
              <input 
                type="text" 
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="w-full bg-[#2b4461] border border-white/10 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">Leave empty to use the default gradient background.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Progressive Bonus Text</label>
              <input 
                type="text" 
                value={bonusText}
                onChange={(e) => setBonusText(e.target.value)}
                placeholder="৳৭,০০০"
                className="w-full bg-[#2b4461] border border-white/10 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Marquee Ticker Text (Scrolling Text)</label>
              <textarea 
                value={marqueeText}
                onChange={(e) => setMarqueeText(e.target.value)}
                rows={3}
                className="w-full bg-[#2b4461] border border-white/10 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <button 
              type="submit"
              disabled={savingSettings}
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded shadow flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {savingSettings ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
