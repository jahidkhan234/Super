import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!auth) {
        // Mock login for preview without Firebase keys
        const mockUser = {
          uid: "mock-" + Date.now(),
          username: isLogin ? "DemoPlayer" : username,
          email,
          balance: 500,
          role: "user"
        };
        localStorage.setItem("mock_user", JSON.stringify(mockUser));
        window.location.reload();
        return;
      }

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        // Create user doc in Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
          username,
          email,
          balance: 0,
          role: "user",
          createdAt: new Date().toISOString()
        });
      }
      closeAuthModal();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#243e62] border border-white/10 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#1f3451]">
          <h2 className="text-xl font-bold text-white">{isLogin ? "লগইন করুন" : "নতুন একাউন্ট খুলুন"}</h2>
          <button onClick={closeAuthModal} className="text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">ইউজারনেম</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-white/40" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="আপনার নাম"
                    className="w-full bg-[#1f3451] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">ইমেইল</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-white/40" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#1f3451] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-white/40" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1f3451] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)] mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? "লগইন" : "রেজিস্টার")}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-white/60">
            {isLogin ? "একাউন্ট নেই?" : "আগে থেকেই একাউন্ট আছে?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-500 font-bold hover:underline"
            >
              {isLogin ? "নতুন একাউন্ট খুলুন" : "লগইন করুন"}
            </button>
          </div>
          
          {!auth && (
            <div className="mt-4 text-[10px] text-center text-red-400 border border-red-500/30 p-2 rounded">
              Firebase is not configured yet. This is running in Demo Mode.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
