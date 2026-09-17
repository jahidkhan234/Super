import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Deposit() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState<number | "">("");
  const [trxId, setTrxId] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const methods = [
    { id: "bkash", name: "বিকাশ", icon: "৳", color: "bg-pink-500", bonus: "+4%", number: "017XXXXXXXX (Personal)" },
    { id: "nagad", name: "নগদ", icon: "N", color: "bg-orange-500", bonus: "+4%", number: "019XXXXXXXX (Personal)" },
    { id: "rocket", name: "রকেট", icon: "R", color: "bg-purple-600", bonus: "+4%", number: "018XXXXXXXX (Personal)" },
  ];

  const presetAmounts = [2000, 5000, 10000, 15000, 20000, 50000, 1000, 100];

  const selectedMethodDetails = methods.find(m => m.id === selectedMethod);

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    
    if (!amount || Number(amount) < 200) {
      alert("Minimum amount is ৳200");
      return;
    }

    if (activeTab === "deposit" && !trxId.trim()) {
      alert("Please enter Transaction ID");
      return;
    }

    if (activeTab === "withdraw" && !withdrawAccount.trim()) {
      alert("Please enter your account number");
      return;
    }

    if (activeTab === "withdraw" && Number(amount) > (user.balance || 0)) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);
    try {
      if (!db) {
        alert("Firebase is not configured. Demo request successful.");
        setTrxId("");
        setWithdrawAccount("");
        setAmount("");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "transactions"), {
        uid: user.uid,
        username: user.username,
        type: activeTab,
        method: selectedMethod,
        amount: Number(amount),
        accountOrTrxId: activeTab === "deposit" ? trxId : withdrawAccount,
        status: "pending",
        createdAt: new Date().toISOString()
      });

      alert(`Your ${activeTab} request has been submitted successfully!`);
      setTrxId("");
      setWithdrawAccount("");
      setAmount("");
    } catch (error: any) {
      console.error(error);
      alert("Error submitting request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#243e62] min-h-screen text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#2b4461]">
        <div className="w-6"></div>
        <h1 className="font-bold text-lg">ফান্ডস</h1>
        <button><X size={24} className="text-white/70" /></button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#2b4461] p-2 gap-2">
        <button 
          onClick={() => { setActiveTab("deposit"); setAmount(""); }}
          className={`flex-1 py-2 text-center rounded-md font-bold text-sm transition-colors ${activeTab === "deposit" ? "bg-[#3b82f6] text-white" : "bg-[#1f3451] text-gray-400"}`}
        >
          ডিপোজিট
        </button>
        <button 
          onClick={() => { setActiveTab("withdraw"); setAmount(""); }}
          className={`flex-1 py-2 text-center rounded-md font-bold text-sm transition-colors ${activeTab === "withdraw" ? "bg-[#3b82f6] text-white" : "bg-[#1f3451] text-gray-400"}`}
        >
          উইথড্র
        </button>
      </div>

      <div className="p-3">
        {/* Payment Methods */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3 border-l-4 border-white pl-2">
            <span className="font-bold text-[15px]">পেমেন্ট পদ্ধতি</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {methods.map((method) => (
              <button 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative bg-[#1f3451] border rounded-md p-3 flex flex-col items-center justify-center gap-2 transition-all overflow-hidden ${
                  selectedMethod === method.id ? "border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.3)] bg-[#2b4461]" : "border-[#2a4569]"
                }`}
              >
                {selectedMethod === method.id && (
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-l-[20px] border-b-[#3b82f6] border-l-transparent">
                    <Check size={10} className="absolute bottom-[-20px] right-0 text-white translate-x-0 -translate-y-0.5" />
                  </div>
                )}
                {method.bonus && activeTab === "deposit" && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-bl-md">
                    {method.bonus}
                  </div>
                )}
                <div className={`w-8 h-8 rounded-full ${method.color} flex items-center justify-center text-white font-bold`}>
                  {method.icon}
                </div>
                <span className="text-[11px] font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions based on Tab */}
        <div className="bg-[#1f3451] border border-white/10 rounded-md p-4 mb-4">
          <h3 className="text-sm font-bold mb-2 text-yellow-500">
            {activeTab === "deposit" ? "কীভাবে ডিপোজিট করবেন?" : "কীভাবে উইথড্র করবেন?"}
          </h3>
          {activeTab === "deposit" ? (
            <div className="text-xs text-gray-300 space-y-1">
              <p>১. নিচে দেয়া নাম্বারে ক্যাশ আউট/সেন্ড মানি করুন।</p>
              <p className="font-bold text-white bg-[#2b4461] inline-block px-2 py-1 rounded border border-white/5 my-1">
                এজেন্ট নাম্বার: {selectedMethodDetails?.number}
              </p>
              <p>২. ট্রানজেকশন আইডি (TrxID) এবং পরিমাণ নিচে দিন।</p>
            </div>
          ) : (
            <div className="text-xs text-gray-300 space-y-1">
              <p>আপনার ব্যক্তিগত {selectedMethodDetails?.name} নাম্বার এবং টাকার পরিমাণ নিচে দিন।</p>
              <p>আমাদের এডমিন চেক করে আপনার পেমেন্ট পাঠিয়ে দিবে।</p>
            </div>
          )}
        </div>

        {/* Amount & Input Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 border-l-4 border-white pl-2">
            <span className="font-bold text-[15px]">অ্যামাউন্ট ও তথ্য</span>
            <span className="text-xs text-gray-400">৳ ২০০ - ৳ ৫০,০০০</span>
          </div>

          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="পরিমাণ (৳)"
            className="w-full bg-[#1f3451] border border-[#2a4569] rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#3b82f6] transition-colors mb-3"
          />

          <div className="grid grid-cols-4 gap-2 mb-4">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className="bg-[#1f3451] border border-[#2a4569] py-2 rounded-md text-xs font-medium hover:border-[#3b82f6] transition-colors"
              >
                {amt.toLocaleString('en-US')}
              </button>
            ))}
          </div>

          {activeTab === "deposit" ? (
            <input 
              type="text" 
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="Transaction ID (TrxID)"
              className="w-full bg-[#1f3451] border border-[#2a4569] rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#3b82f6] transition-colors mb-4"
            />
          ) : (
            <input 
              type="text" 
              value={withdrawAccount}
              onChange={(e) => setWithdrawAccount(e.target.value)}
              placeholder={`আপনার ${selectedMethodDetails?.name} নাম্বার`}
              className="w-full bg-[#1f3451] border border-[#2a4569] rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#3b82f6] transition-colors mb-4"
            />
          )}

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md shadow-[0_4px_10px_rgba(37,99,235,0.4)] flex justify-center items-center gap-2 hover:bg-blue-500 transition-colors"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {activeTab === "deposit" ? "ডিপোজিট করুন" : "উইথড্র করুন"}
          </button>
        </div>
      </div>
    </div>
  );
}
