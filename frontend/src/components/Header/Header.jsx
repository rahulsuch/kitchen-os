import { useSelector } from 'react-redux';
import { Menu, Bell, User, ShieldCheck, Search } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  console.log(user)

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white">
      {/* Left: Sidebar Toggle & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search logs or docs..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-64"
          />
        </div>
      </div>

      {/* Center: Compliance Status Indicator */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-200">
        <ShieldCheck size={18} className="text-green-600" />
        <span className="text-sm font-semibold text-green-700">Audit Ready: 98% Score</span>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-tight">{user?.fullname || 'Loading...'}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">FSSAI Supervisor</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-inner">
            {user?.name?.charAt(0) || <User size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;