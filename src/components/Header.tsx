import { Link } from "react-router-dom";
import { Menu, Smartphone, HeadphonesIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-[#243e62] sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-1.5 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center">
            {/* Logo recreation based on screenshot */}
            <div className="flex items-baseline bg-white px-2 py-0.5 rounded-sm">
              <span className="text-red-600 font-extrabold text-xl tracking-tight">Super</span>
              <span className="text-[#243e62] font-extrabold text-xl tracking-tight ml-0.5">baj</span>
              <span className="text-red-600 font-extrabold text-xl tracking-tight">i</span>
            </div>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 text-white">
          <button className="flex flex-col items-center justify-center gap-0.5 opacity-80 hover:opacity-100 transition-opacity">
            <Smartphone size={20} strokeWidth={1.5} />
            <span className="text-[10px]">App</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-0.5 opacity-80 hover:opacity-100 transition-opacity">
            <HeadphonesIcon size={20} strokeWidth={1.5} />
            <span className="text-[10px]">লাইভ চ্যাট</span>
          </button>
        </div>
      </div>
    </header>
  );
}
