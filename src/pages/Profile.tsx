import { Wallet, Eye, RefreshCw, Smartphone, List, Download, CreditCard, Gift, Trophy, ArrowUpRight, ArrowDownLeft, FileText, Settings, HelpCircle, Mail, MessageCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col bg-[#243e62] min-h-screen text-white pb-6">
      {/* Top Wallets */}
      <div className="grid grid-cols-2 gap-px bg-[#1f3451] mb-2">
        <div className="bg-[#2b4461] p-3 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] text-gray-300">মেইন ওয়ালেট</span>
            <RefreshCw size={12} className="text-gray-400" />
            <Eye size={14} className="text-gray-400 ml-auto" />
          </div>
          <div className="font-bold text-lg">৳ {(user?.balance || 0).toLocaleString()}</div>
        </div>
        <div className="bg-[#2b4461] p-3 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] text-gray-300">বোনাস ওয়ালেট</span>
            <RefreshCw size={12} className="text-gray-400" />
            <Download size={14} className="text-gray-400 ml-auto" />
          </div>
          <div className="font-bold text-lg">৳ 0</div>
        </div>
      </div>

      {/* Funds Section */}
      <div className="mb-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2b4461]/50 border-l-4 border-white">
          <span className="font-bold text-[15px]">তহবিল</span>
        </div>
        <div className="grid grid-cols-4 bg-[#2b4461] py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <CreditCard size={20} className="text-red-500" />
            </div>
            <span className="text-[11px]">ডিপোজিট</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight size={20} className="text-red-500" />
            </div>
            <span className="text-[11px]">উত্তোলন</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Wallet size={20} className="text-red-500" />
            </div>
            <span className="text-[11px]">বোনাস ওয়ালেট</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <RefreshCw size={20} className="text-red-500" />
            </div>
            <span className="text-[11px]">ফ্রি স্পিন</span>
          </div>
        </div>
      </div>

      {/* Promos Section */}
      <div className="mb-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2b4461]/50 border-l-4 border-white">
          <span className="font-bold text-[15px]">আমার প্রচার</span>
        </div>
        <div className="grid grid-cols-4 bg-[#2b4461] py-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Gift size={20} className="text-red-500" />
            </div>
            <span className="text-[11px] leading-tight">রিয়েল-টাইম<br/>বোনাস</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Users size={20} className="text-red-500" />
            </div>
            <span className="text-[11px] leading-tight">রেফার বোনাস</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Trophy size={20} className="text-red-500" />
            </div>
            <span className="text-[11px] leading-tight">বিজয়ীদের<br/>তালিকা</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <List size={20} className="text-red-500" />
            </div>
            <div className="absolute top-0 right-3 w-3 h-3 bg-red-500 rounded-full border border-[#2b4461]"></div>
            <span className="text-[11px] leading-tight">দৈনিক স্ট্রিক<br/>চ্যালেঞ্জ</span>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="mb-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2b4461]/50 border-l-4 border-white">
          <span className="font-bold text-[15px]">হিস্ট্রি</span>
        </div>
        <div className="grid grid-cols-3 bg-[#2b4461] py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <FileText size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">বাজি রেকর্ডস</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <RefreshCw size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">টার্নওভার</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <ArrowDownLeft size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">লেনদেনের...</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mb-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2b4461]/50 border-l-4 border-white">
          <span className="font-bold text-[15px]">প্রোফাইল</span>
        </div>
        <div className="grid grid-cols-3 bg-[#2b4461] py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <User size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">ব্যক্তিগত তথ্য</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Settings size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px] leading-tight">পাসওয়ার্ড পরিবর্তন<br/>করুন।</span>
          </div>
          <div className="flex flex-col items-center gap-2 relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Mail size={20} className="text-[#2b4461]" />
            </div>
            <div className="absolute -top-1 right-6 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">20</div>
            <span className="text-[11px]">ইনবক্স</span>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2b4461]/50 border-l-4 border-white">
          <span className="font-bold text-[15px]">যোগাযোগ করুন</span>
        </div>
        <div className="grid grid-cols-4 bg-[#2b4461] py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <HelpCircle size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">লাইভ চ্যাট</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <MessageCircle size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">Telegram</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Mail size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">Support Email</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <MessageCircle size={20} className="text-[#2b4461]" />
            </div>
            <span className="text-[11px]">Facebook</span>
          </div>
        </div>
      </div>

      {/* Admin Section (Visible only to admins) */}
      {user?.role === "admin" && (
        <div className="mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border-l-4 border-yellow-500">
            <span className="font-bold text-[15px] text-yellow-500">অ্যাডমিন প্যানেল</span>
          </div>
          <div className="bg-[#2b4461] py-4 px-4">
            <a href="/admin" className="w-full bg-yellow-600 text-white font-bold py-3 rounded-md shadow-lg flex justify-center items-center gap-2 hover:bg-yellow-500 transition-colors">
              ম্যানেজ ডিপোজিট/উইথড্র
            </a>
          </div>
        </div>
      )}

      <button onClick={handleLogout} className="mx-3 py-3 flex items-center justify-center gap-2 bg-[#1f3451] text-white/80 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors">
        <LogOut size={18} />
        <span>লগ আউট</span>
      </button>
    </div>
  );
}

// Icons needed that might not be imported properly
function User(props: any) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function Users(props: any) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
