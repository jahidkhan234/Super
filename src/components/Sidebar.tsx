import { Link, useLocation } from "react-router-dom";
import { 
  Home, Flame, X, Gamepad2, Rocket, 
  Spade, Trophy, MonitorPlay, Coins, Ghost, 
  Ticket, ListOrdered, Crown, Users, LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const navItems = [
    { path: "/", label: "হোম", icon: Home },
    { path: "/#hot", label: "হট গেম", icon: Flame },
    { path: "/casino", label: "স্লট", icon: Gamepad2 }, // Typically mapped to slots
    { path: "/#crash", label: "ক্র্যাশ", icon: Rocket },
    { path: "/casino", label: "ক্যাসিনো", icon: Spade },
    { path: "/sports", label: "স্পোর্টস", icon: Trophy },
    { path: "/#arcade", label: "আর্কেড", icon: MonitorPlay },
    { path: "/#table", label: "টেবিল", icon: Coins },
    { path: "/#lottery", label: "লটারি", icon: Ticket },
    { path: "/#fishing", label: "ফিশিং", icon: Ghost }, // Ghost as a placeholder for fishing
  ];

  const bottomItems = [
    { path: "/promotions", label: "প্রোমোশন", icon: GiftIcon },
    { path: "/#winners", label: "বিজয়ীদের তালিকা", icon: TrophyIcon },
    { path: "/#vip", label: "ভিআইপি প্রোগ্রাম", icon: CrownIcon },
    { path: "/#referral", label: "রেফারেল", icon: UsersIcon },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-[#2b4461] z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#243e62]">
          <div className="flex items-baseline bg-white px-2 py-0.5 rounded-sm">
            <span className="text-red-600 font-extrabold text-lg tracking-tight">Super</span>
            <span className="text-[#243e62] font-extrabold text-lg tracking-tight ml-0.5">baj</span>
            <span className="text-red-600 font-extrabold text-lg tracking-tight">i</span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-white/10 ${
                    location.pathname === item.path ? "bg-white/10 font-bold" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#243e62]">
                    <item.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="my-2 border-t border-white/10"></div>
          
          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#243e62]">
                    <item.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {user && (
          <div className="border-t border-white/10 bg-[#1f3451]">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-4 text-white hover:bg-white/5 transition-colors"
            >
              <LogOut size={20} className="text-red-400" />
              <span className="font-semibold text-red-400">লগ আউট</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// Helper icons for the second list
function GiftIcon(props: any) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>;
}
function TrophyIcon(props: any) {
  return <Trophy {...props} />;
}
function CrownIcon(props: any) {
  return <Crown {...props} />;
}
function UsersIcon(props: any) {
  return <Users {...props} />;
}
