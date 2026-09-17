import { Home, Gift, CreditCard, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MobileNav() {
  const location = useLocation();
  const { user, openAuthModal } = useAuth();
  
  const navItems = [
    { path: "/", label: "হোম", icon: Home },
    { path: "/promotions", label: "প্রোমোশন", icon: Gift },
    { path: "/deposit", label: "ডিপোজিট", icon: CreditCard, requiresAuth: true },
    { path: "/profile", label: "মাই অ্যাকাউন্ট", icon: User, requiresAuth: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#1f304a] border-t border-[#2a4060] z-50 flex items-center justify-around px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        const handleClick = (e: React.MouseEvent) => {
          if (item.requiresAuth && !user) {
            e.preventDefault();
            openAuthModal();
          }
        };

        return (
          <Link 
            key={item.label}
            to={item.path}
            onClick={handleClick}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${
              isActive ? "text-[#5dade2]" : "text-[#8ba1b8] hover:text-[#5dade2]"
            }`}
          >
            {/* Notification dot for promo */}
            {item.path === "/promotions" && (
              <span className="absolute top-2 right-6 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
            
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "animate-pulse-slow" : ""} />
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
