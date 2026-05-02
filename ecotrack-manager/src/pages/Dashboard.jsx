import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inbox, CheckCircle2, XCircle, Activity, Calendar, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { mockSettings } from '../data/mockData';
import { getDashboardStats } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

export default function Dashboard() {
  const [savedSettings, setSavedSettings] = useState(mockSettings);
  const [settings, setSettings] = useState(savedSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [stats, setStats] = useState({ total: 0, collected: 0, failed: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        toast.error('Sync Error', 'Could not fetch live operational stats');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
    
    // Auto-refresh every 30 seconds for live feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeChange = (key, value) => {
    setSettings(prev => ({ ...prev, workingHours: { ...prev.workingHours, [key]: value } }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSavedSettings(settings);
    setTimeout(() => setHasChanges(false), 500);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 22 } } };

  const collectionRate = stats.total > 0 ? Math.round((stats.collected / stats.total) * 100) : 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show"
      className="p-6 lg:p-8 space-y-6 relative overflow-hidden font-poppins min-h-screen"
    >
      {/* Background Glows */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Header ── */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-content-main tracking-tight">
            Operations <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-content-muted mt-1 font-medium text-sm">Real-time overview for today's collection activity</p>
        </div>
        <div className="glass-panel px-4 py-2.5 rounded-2xl border border-border flex items-center gap-2 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-xs font-black text-content-muted uppercase tracking-wide">{today}</span>
        </div>
      </motion.div>

      {/* ── Top Row: 4 Stat Cards ── */}
      <motion.div variants={item} className="grid grid-cols-2 xl:grid-cols-4 gap-4 relative z-10">

        {/* Total Pickup Requests */}
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-5 rounded-3xl border border-primary/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] font-black text-primary/70 bg-primary/10 px-2 py-1 rounded-full border border-primary/20 uppercase tracking-wider">Total</span>
          </div>
          <p className="text-3xl font-black text-primary">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.total}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Pickup Requests</p>
        </motion.div>

        {/* Today's Collected */}
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-5 rounded-3xl border border-emerald-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-[10px] font-black">Collected</span>
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.collected}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Collected Today</p>
        </motion.div>

        {/* Today's Not Collected */}
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-5 rounded-3xl border border-rose-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex items-center gap-1 text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
              <ArrowDownRight className="w-3 h-3" />
              <span className="text-[10px] font-black">Missed</span>
            </div>
          </div>
          <p className="text-3xl font-black text-rose-400">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.failed}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Not Collected</p>
        </motion.div>

        {/* Active Requests */}
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-5 rounded-3xl border border-amber-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span className="text-[10px] font-black">Live</span>
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.active}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Active Today</p>
        </motion.div>
      </motion.div>

      {/* ── Bottom Row: Collection Summary + Shift Timing ── */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">

        {/* Collection Summary visual panel - spans 3 */}
        <div className="lg:col-span-3 glass-card p-7 rounded-3xl border border-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-content-main">Today's Collection Summary</h2>
              <p className="text-xs text-content-muted font-medium">Breakdown of pickup statuses</p>
            </div>
          </div>

          {/* Progress bar visual */}
          <div className="space-y-5">
            {/* Collected bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-xs font-bold text-content-main">Collected</span>
                </div>
                <span className="text-xs font-black text-emerald-400">{stats.collected} <span className="text-content-muted font-medium">pickups</span></span>
              </div>
              <div className="w-full h-2.5 bg-base/10 rounded-full overflow-hidden border border-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total > 0 ? (stats.collected / stats.total) * 100 : 0}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                />
              </div>
            </div>

            {/* Active bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="text-xs font-bold text-content-main">Active</span>
                </div>
                <span className="text-xs font-black text-amber-400">{stats.active} <span className="text-content-muted font-medium">requests</span></span>
              </div>
              <div className="w-full h-2.5 bg-base/10 rounded-full overflow-hidden border border-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total > 0 ? (stats.active / stats.total) * 100 : 0}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* Missed bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="text-xs font-bold text-content-main">Missed</span>
                </div>
                <span className="text-xs font-black text-rose-400">{stats.failed} <span className="text-content-muted font-medium">pickups</span></span>
              </div>
              <div className="w-full h-2.5 bg-base/10 rounded-full overflow-hidden border border-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total > 0 ? (stats.failed / stats.total) * 100 : 0}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Rate badge */}
          <div className="mt-6 flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <span className="text-xs font-black text-content-muted uppercase tracking-widest">Collection Rate</span>
            <span className="text-xl font-black text-primary">{collectionRate}%</span>
          </div>
        </div>

        {/* Shift Timing - spans 2 */}
        <div className="lg:col-span-2 glass-card p-7 rounded-3xl border border-primary/20 relative overflow-hidden flex flex-col bg-gradient-to-br from-primary/5 to-transparent">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center eco-glow">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-content-main tracking-tight">Shift Timing</h2>
              <p className="text-xs text-content-muted font-bold uppercase tracking-widest">Today's working hours</p>
            </div>
          </div>

          <div className="space-y-5 flex-1">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Shift Start
              </label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                <input
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) => handleTimeChange('start', e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-[var(--card-bg)] border-2 border-primary/40 rounded-2xl text-content-main text-base font-extrabold font-mono tracking-widest focus:border-primary focus:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em] px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">TO</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Shift End
              </label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                <input
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) => handleTimeChange('end', e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-[var(--card-bg)] border-2 border-primary/40 rounded-2xl text-content-main text-base font-extrabold font-mono tracking-widest focus:border-primary focus:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex-1 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                hasChanges ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40' : 'bg-base/10 text-content-muted cursor-not-allowed opacity-40'
              }`}
            >
              Save
            </button>
            <button
              onClick={() => { setSettings(savedSettings); setHasChanges(false); }}
              disabled={!hasChanges}
              className="px-5 py-3.5 rounded-2xl text-content-muted font-black transition-all border-2 border-border disabled:opacity-30 text-xs uppercase tracking-widest hover:border-primary/30 hover:text-primary"
            >
              Reset
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
