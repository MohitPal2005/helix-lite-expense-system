import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, CheckSquare, Bell, User, LogOut, Receipt, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MainLayout() {
  const { user, logout, openAuthModal } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: <Home className="w-5 h-5" /> },
    { name: 'Submit Claim', path: '/app/submit', icon: <FileText className="w-5 h-5" /> },
    { name: 'Review Queue', path: '/app/review', icon: <CheckSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-[#0B132B] text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-2 rounded-lg">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">Helix<span className="text-blue-400">Lite</span></h1>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        {/* Added Explicit Back to Website Button */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200 w-full"
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">Back to Website</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.name || 'Helix System'}
          </h2>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-blue-600 transition"><Bell className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              {user ? (
                <>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <button onClick={() => { logout(); navigate('/'); }} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 mt-1">
                      <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={openAuthModal} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}