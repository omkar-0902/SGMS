import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Map, Settings, LogOut, Menu, X, Bell, ChevronDown, Activity, Award, Zap, Shield, Search, Check, AlertTriangle, Info, Sun, Moon, Users, Plus, Sparkles, Cpu, MessageSquare, HelpCircle, Send, Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('eco-theme') || 'dark');
  const { user, logout } = useAuth();

  // Derive display values from the JWT-decoded user object
  const displayName = user?.name || user?.email?.split('@')[0] || 'Admin';
  const displayEmail = user?.email || '';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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
    { name: 'Collectors', icon: Users, path: '/collectors', showAdd: true },
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

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Neural connection established. I am Eco-Bot, your operational intelligence layer. How can we optimize your ecosystem today?' }
  ]);

  const faqs = [
    { q: "Expand Personnel", icon: Users, a: "Go to the 'Collectors' tab and click 'Add Collector'. We will generate temporary access tokens for your field operatives immediately." },
    { q: "Network Pulse", icon: Activity, a: "The 'Live Tracker' layer provides a real-time visualization of all collector nodes and pickup telemetry across your zones." },
    { q: "Efficiency Metrics", icon:Cpu, a: "Our algorithms calculate efficiency by cross-referencing fulfillment time against high-priority pickup density on your active paths." },
    { q: "Shift Dynamics", icon: Clock, a: "Operational windows can be reconfigured in the 'Shift Timing' module. Note that changes propagate to field units in real-time." }
  ];

  const handleFaqClick = (faq) => {
    if (isTyping) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: faq.q }]);
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', content: faq.a }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-base overflow-hidden font-poppins text-content-main">
      {/* Eco-Assistant Chat Window (Premium Redesign) */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20, y: 100 }}
            className="fixed bottom-24 left-6 z-[60] w-96 glass-dropdown rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden bg-[#0A0F1E]/90 backdrop-blur-3xl h-[600px]"
          >
            {/* AI Header */}
            <div className="p-8 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5 relative flex items-center justify-between shrink-0">
               <div className="flex items-center gap-4">
                 <div className="relative">
                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500">
                       <Cpu className="w-7 h-7 text-white" />
                    </div>
                    {/* Activity Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#0A0F1E] flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-content-main dark:text-white uppercase tracking-[0.3em] mb-1 flex items-center gap-2">
                       Eco-Bot <Sparkles className="w-3 h-3 text-primary" />
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-400/50 animate-pulse" />
                       <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">Neural Link Active</span>
                    </div>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <button 
                   onClick={() => {
                     setChatMessages([{ role: 'assistant', content: 'Neural connection established. I am Eco-Bot, your operational intelligence layer. How can we optimize your ecosystem today?' }]);
                     setIsTyping(false);
                   }} 
                   className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-content-muted hover:text-primary"
                   title="Reset Neural Core"
                 >
                    <Cpu className="w-5 h-5" />
                 </button>
                 <button onClick={() => setShowChat(false)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                    <X className="w-5 h-5 text-content-muted" />
                 </button>
               </div>

               {/* Decorative background neural lines - fixed overlay blocking clicks */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8 scroll-smooth">
               {chatMessages.map((msg, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 10, scale: 0.98 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ duration: 0.4 }}
                   className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                    <div className={`relative group max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                       {msg.role === 'assistant' && (
                         <div className="absolute -left-3 top-0 w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] font-black text-emerald-400">AI</div>
                       )}
                       <div className={`p-5 rounded-[2rem] text-[13px] font-medium leading-relaxed shadow-sm transition-all ${
                         msg.role === 'user' 
                           ? 'bg-gradient-to-br from-primary to-emerald-600 text-white rounded-tr-none' 
                           : 'bg-white/[0.03] border border-white/5 text-content-main rounded-tl-none group-hover:bg-white/[0.05]'
                       }`}>
                          {msg.content}
                       </div>
                       <div className={`mt-2 text-[9px] font-bold uppercase tracking-widest text-content-muted/50 ${msg.role === 'user' ? 'text-right' : 'text-left ml-2'}`}>
                          {msg.role === 'user' ? 'Operator' : 'Eco-Intelligence'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </div>
                 </motion.div>
               ))}
               
               {isTyping && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-3xl flex items-center gap-2">
                       {[0, 1, 2].map(dot => (
                         <motion.div
                           key={dot}
                           animate={{ scale: [1, 1.5, 1] }}
                           transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }}
                           className="w-1.5 h-1.5 rounded-full bg-primary/50"
                         />
                       ))}
                       <span className="text-[10px] font-black text-primary/50 uppercase tracking-widest ml-1">Analyzing...</span>
                    </div>
                 </motion.div>
               )}
            </div>

            {/* Neural Insights / Suggestion Area */}
            <div className="p-8 pt-0 shrink-0">
               <div className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                     <Cpu className="w-3 h-3" /> System Capabilities
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {faqs.map((faq, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleFaqClick(faq)}
                        disabled={isTyping}
                        className="group relative flex flex-col items-start p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-left disabled:opacity-50 overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Send className="w-3 h-3 text-primary" />
                        </div>
                        <faq.icon className="w-4 h-4 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black text-content-main uppercase tracking-widest group-hover:text-primary transition-colors">{faq.q}</span>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  isActive ? 'bg-primary/10 text-primary' : 'text-content-muted hover:text-content-main hover:bg-surface/50 dark:hover:bg-surface/50'
                } hover-surface`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                )}
                <item.icon className="w-5 h-5 min-w-[20px] transition-transform duration-300 group-hover:scale-110" />
                {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
                {isSidebarOpen && item.showAdd && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate('/collectors?add=true');
                    }}
                    className="ml-auto p-1.5 hover:bg-primary/20 rounded-lg transition-all hover:scale-110 active:scale-95 group/add"
                    title="Add New Collector"
                  >
                    <Plus className="w-4 h-4 text-primary group-hover/add:rotate-90 transition-transform" />
                  </button>
                )}
              </Link>
            );
          })}
        </nav>

        {isSidebarOpen && (
          <div className="px-5 pb-8 mt-auto group/assistant">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               onClick={() => setShowChat(!showChat)}
               className="rounded-[2.5rem] bg-gradient-to-br from-surface/50 to-surface border border-border shadow-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/40 hover:shadow-primary/5 hover:-translate-y-1 dark:from-white/5 dark:to-transparent"
            >
               {/* Premium Layered Glowing Accents */}
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-[40px] opacity-0 group-hover/assistant:opacity-100 transition-opacity duration-700 rounded-full" />
               <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-emerald-500/10 blur-[30px] opacity-0 group-hover/assistant:opacity-100 transition-opacity duration-700 rounded-full" />

               <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    className="relative mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                     <img 
                       src="/mascot.png" 
                       alt="Eco Mascot" 
                       className="w-32 h-auto object-contain drop-shadow-[0_15px_30px_rgba(16,185,129,0.2)] group-hover/assistant:scale-110 transition-transform duration-500"
                     />
                     <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-surface dark:border-[#0A0F1E] shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  </motion.div>
                  
                  <h4 className="text-sm font-black text-content-main leading-tight mb-2 tracking-tight group-hover/assistant:text-primary transition-colors">
                     Let's optimize your <br/> network pulse.
                  </h4>
                  
                  <p className="text-[10px] font-bold text-content-muted leading-relaxed max-w-[140px] mb-4">
                     Ask me about your team's live telemetry or efficiency goals.
                  </p>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover/assistant:bg-primary group-hover/assistant:text-white transition-all duration-300">
                     <Sparkles className="w-3 h-3 group-hover/assistant:animate-spin" />
                     <span className="text-[9px] font-black uppercase tracking-[0.1em]">Engage Eco-Bot</span>
                  </div>
               </div>

               {/* Sub-surface grid pattern for AI feel */}
               <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />
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
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-content-muted hover:text-content-main transition-colors hover-surface"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-content-muted hover:text-content-main hover:bg-surface transition-all flex items-center justify-center hover-surface"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2.5 rounded-xl border transition-all relative ${
                  showNotifications ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-surface/50 border-border text-content-muted hover:text-content-main hover-surface'
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
                        <div key={n.id} className="p-3 rounded-2xl bg-base/5 border border-border flex items-center gap-3 group hover:bg-surface transition-all cursor-pointer hover-surface">
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

            {/* ── Profile Button (top-right) ── */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className={`flex items-center gap-3 p-1.5 pr-4 rounded-xl border transition-all ${
                  showProfileDropdown ? 'bg-primary/20 border-primary/30' : 'bg-surface/50 border-border hover:bg-surface hover-surface'
                }`}
              >
                {/* Avatar bubble with initials from JWT */}
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 text-sm">
                  {initials}
                </div>
                <div className="hidden md:block text-left">
                  {/* Display name derived from JWT sub field */}
                  <p className="text-xs font-black text-content-main leading-tight capitalize">{displayName}</p>
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
                    {/* Dropdown header — shows real name + email from JWT */}
                    <div className="px-4 py-3 border-b border-border mb-2">
                       <p className="text-[10px] font-black text-content-muted uppercase tracking-widest">Active Account</p>
                       <p className="text-sm font-black text-content-main mt-0.5 capitalize">{displayName}</p>
                       <p className="text-[10px] font-medium text-content-muted mt-0.5 truncate">{displayEmail}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface text-red-500 transition-all font-black uppercase tracking-widest text-sm hover-surface">
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
