import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#151D24] border-t border-[#2A343D] pt-12 pb-24 md:pb-12 text-sm text-gray-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-yellow-500">About SuperBaji</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">Responsible Gaming</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-yellow-500">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">FAQ</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">Payment Methods</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">Rules & Regulations</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-base">Payment Methods</h3>
            <div className="flex gap-4 flex-wrap">
              <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-white">bKash</div>
              <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-white">Nagad</div>
              <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-white">Rocket</div>
              <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-white">Crypto</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#2A343D] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 SuperBaji. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>18+ Play Responsibly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
