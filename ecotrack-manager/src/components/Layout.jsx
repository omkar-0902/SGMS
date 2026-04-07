import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Map, Settings, LogOut, Menu, X, Bell, ChevronDown, Activity, Award, Zap, Shield, Search, Check, AlertTriangle, Info, Sun, Moon, Users
} from 'lucide-react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('eco-theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('eco-theme', theme);
  }, [theme]);


  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Tracker', icon: Map, path: '/tracking' },
    { name: 'Collection Reports', icon: Activity, path: '/reports' },
    { name: 'Reward System', icon: Award, path: '/rewards' },
    { name: 'Collectors', icon: Users, path: '/collectors' },
  ];

  const notifications = [
    { id: 1, title: 'Low Efficiency', type: 'warning', time: '10m ago' },
    { id: 2, title: 'Target Achieved', type: 'success', time: '1h ago' },
    { id: 3, title: 'Maintenance', type: 'info', time: '3h ago' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => navigate('/login');

  return (
    <div className="flex h-screen bg-base overflow-hidden font-poppins text-content-main">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="relative z-50 bg-surface/30 backdrop-blur-3xl border-r border-border flex flex-col transition-all duration-500 ease-[0.22, 1, 0.36, 1]"
      >
        <div className="h-20 flex items-center px-6 mb-8">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-black text-content-main tracking-tighter"
              >
                ECO<span className="text-primary">TRACK</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-content-muted hover:text-content-main hover:bg-surface/50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                )}
                <item.icon className="w-5 h-5 min-w-[20px] transition-transform duration-300 group-hover:scale-110" />
                {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {isSidebarOpen && (
          <div className="p-4 mt-auto">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="rounded-[2rem] bg-gradient-to-t from-primary/10 to-transparent p-4 flex flex-col items-center justify-center border border-primary/20 relative overflow-hidden group"
            >
               {/* Faint background glow for the mascot to fit the eco-theme */}
               <div className="absolute inset-0 bg-primary/20 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
               <motion.img 
                 src="/mascot.png" 
                 alt="Eco Mascot" 
                 className="w-full max-w-[200px] object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:drop-shadow-[0_0_30px_rgba(16,185,129,0.6)] relative z-10 origin-bottom"
                 animate={{ rotate: [0, 8, -8, 8, 0] }}
                 transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
               />
               <p className="text-[10px] font-black tracking-widest text-primary uppercase mt-4 relative z-10">Eco-Assistant</p>
            </motion.div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-mesh relative">
        <header className="sticky top-0 z-40 h-20 bg-surface/30 backdrop-blur-3xl border-b border-border px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-content-muted hover:text-content-main transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-content-muted hover:text-content-main hover:bg-surface transition-all flex items-center justify-center"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2.5 rounded-xl border transition-all relative ${
                  showNotifications ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-surface/50 border-border text-content-muted hover:text-content-main'
                }`}
              >
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-base" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 glass-dropdown rounded-[2rem] overflow-hidden z-50 border border-border p-4 shadow-3xl"
                  >
                    <div className="flex items-center justify-between mb-4 px-2">
                       <p className="text-xs font-black text-content-main uppercase tracking-widest">Recent Alerts</p>
                       <button className="text-[10px] text-primary font-bold hover:underline">Clear All</button>
                    </div>
                    <div className="space-y-2">
                      {notifications.map(n => (
                        <div key={n.id} className="p-3 rounded-2xl bg-base/5 border border-border flex items-center gap-3 group hover:bg-surface transition-all cursor-pointer">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                             n.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
                             n.type === 'success' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                           }`}>
                             {n.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : 
                              n.type === 'success' ? <Check className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                           </div>
                           <div className="flex-1">
                             <p className="text-[11px] font-bold text-content-main mb-0.5">{n.title}</p>
                             <p className="text-[9px] text-content-muted">{n.time}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-[1px] bg-border mx-2" />

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className={`flex items-center gap-3 p-1.5 pr-4 rounded-xl border transition-all ${
                  showProfileDropdown ? 'bg-primary/20 border-primary/30' : 'bg-surface/50 border-border hover:bg-surface'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">JD</div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-black text-content-main leading-tight">John Doe</p>
                  <p className="text-[10px] font-bold text-content-muted uppercase tracking-widest">Administrator</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-content-muted transition-transform duration-300 ${showProfileDropdown ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 glass-dropdown rounded-[1.5rem] overflow-hidden z-50 origin-top-right border border-border py-2"
                  >
                    <div className="px-4 py-3 border-b border-border mb-2">
                       <p className="text-[10px] font-black text-content-muted uppercase tracking-widest">Active Account</p>
                       <p className="text-sm font-bold text-content-main mt-1">john.doe@ecotrack.ai</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface text-red-500 transition-all font-black uppercase tracking-widest text-sm">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
