import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inbox, CheckCircle2, XCircle, Activity, Calendar, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2, Zap, Shield } from 'lucide-react';
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
      className="p-6 lg:p-8 pb-32 space-y-6 relative overflow-hidden font-poppins min-h-screen"
    >
      {/* Background Glows */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100" />

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
          className="glass-card p-5 rounded-3xl border border-primary/20 dark:border-primary/20 bg-surface/40 backdrop-blur-xl relative overflow-hidden group shadow-lg shadow-black/5 dark:shadow-none"
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
          className="glass-card p-5 rounded-3xl border border-emerald-500/20 dark:border-emerald-500/20 bg-surface/40 backdrop-blur-xl relative overflow-hidden group shadow-lg shadow-black/5 dark:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-[10px] font-black">Collected</span>
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-500 dark:text-emerald-400">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.collected}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Collected Today</p>
        </motion.div>

        {/* Today's Not Collected */}
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-5 rounded-3xl border border-rose-500/20 dark:border-rose-500/20 bg-surface/40 backdrop-blur-xl relative overflow-hidden group shadow-lg shadow-black/5 dark:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
            </div>
            <div className="flex items-center gap-1 text-rose-500 dark:text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
              <ArrowDownRight className="w-3 h-3" />
              <span className="text-[10px] font-black">Missed</span>
            </div>
          </div>
          <p className="text-3xl font-black text-rose-500 dark:text-rose-400">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.failed}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Not Collected</p>
        </motion.div>

        {/* Active Requests */}
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-5 rounded-3xl border border-amber-500/20 dark:border-amber-500/20 bg-surface/40 backdrop-blur-xl relative overflow-hidden group shadow-lg shadow-black/5 dark:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse inline-block" />
              <span className="text-[10px] font-black">Live</span>
            </div>
          </div>
          <p className="text-3xl font-black text-amber-500 dark:text-amber-400">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.active}
          </p>
          <p className="text-xs font-black text-content-muted uppercase tracking-widest mt-1">Active Today</p>
        </motion.div>
      </motion.div>

      {/* ── Bottom Row: Collection Summary + Shift Timing ── */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">

        {/* Collection Summary visual panel - spans 3 */}
        <div className="lg:col-span-3 group">
          <div className="h-full glass-card rounded-[2.5rem] border border-border relative overflow-hidden flex flex-col p-8 transition-all duration-700 bg-surface/40 backdrop-blur-3xl group-hover:bg-surface/60 group-hover:border-primary/20 shadow-xl shadow-black/5 dark:shadow-none">
            {/* Top decorative bar */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-content-main tracking-tight">Analytics Overview</h2>
                  <p className="text-[10px] font-black text-content-muted uppercase tracking-widest mt-1">Live Efficiency Tracking</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-content-muted uppercase tracking-widest mb-1 opacity-50">Performance</span>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-tighter">Above Average</div>
              </div>
            </div>

            {/* Progress bar visual */}
            <div className="space-y-8 flex-1 relative z-10">
              {/* Collected bar */}
              <div className="group/bar">
                <div className="flex justify-between items-end mb-3 px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[11px] font-bold text-content-muted uppercase tracking-widest group-hover/bar:text-content-main transition-colors">Collected Success</span>
                  </div>
                  <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">{stats.collected} <span className="text-[10px] text-content-muted uppercase ml-1">UNITS</span></span>
                </div>
                <div className="w-full h-3 bg-white/[0.03] rounded-full overflow-hidden border border-white/5 relative group-hover/bar:border-emerald-500/30 transition-all">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (stats.collected / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-1/2 h-full skew-x-[45deg] animate-[shine_3s_infinite]" />
                  </motion.div>
                </div>
              </div>

              {/* Active bar */}
              <div className="group/bar">
                <div className="flex justify-between items-end mb-3 px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <span className="text-[11px] font-bold text-content-muted uppercase tracking-widest group-hover/bar:text-content-main transition-colors">Active Operations</span>
                  </div>
                  <span className="text-xl font-black text-amber-400 font-mono tracking-tight">{stats.active} <span className="text-[10px] text-content-muted uppercase ml-1">STREAMS</span></span>
                </div>
                <div className="w-full h-3 bg-white/[0.03] rounded-full overflow-hidden border border-white/5 relative group-hover/bar:border-amber-500/30 transition-all">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (stats.active / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 rounded-full"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-1/2 h-full skew-x-[45deg] animate-[shine_3s_infinite_0.5s]" />
                  </motion.div>
                </div>
              </div>

              {/* Missed bar */}
              <div className="group/bar">
                <div className="flex justify-between items-end mb-3 px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    <span className="text-[11px] font-bold text-content-muted uppercase tracking-widest group-hover/bar:text-content-main transition-colors">Service Deficit</span>
                  </div>
                  <span className="text-xl font-black text-rose-400 font-mono tracking-tight">{stats.failed} <span className="text-[10px] text-content-muted uppercase ml-1">MISSED</span></span>
                </div>
                <div className="w-full h-3 bg-white/[0.03] rounded-full overflow-hidden border border-white/5 relative group-hover/bar:border-rose-500/30 transition-all">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (stats.failed / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-rose-600 via-rose-400 to-rose-300 rounded-full"
                  >
                     <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-1/2 h-full skew-x-[45deg] animate-[shine_3s_infinite_1s]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Rate badge & Meta info */}
            <div className="mt-10 flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/5 group-hover:bg-primary/5 group-hover:border-primary/10 transition-all duration-500 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                   <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-content-muted uppercase tracking-[0.2em]">Current Yield</p>
                   <p className="text-sm font-bold text-content-main">Optimized Pathing</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-primary font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">{collectionRate}%</span>
                <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest mt-1">Efficiency Scale</p>
              </div>
            </div>
            
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>
        </div>

        {/* Shift Timing - spans 2 */}
        <div className="lg:col-span-2 relative group h-full">
          {/* Main Card with premium layering */}
          <div className="h-full glass-card rounded-[2.5rem] border border-border relative overflow-hidden flex flex-col p-8 transition-all duration-700 bg-surface/40 backdrop-blur-3xl group-hover:bg-surface/60 group-hover:border-primary/20 group-hover:shadow-2xl shadow-xl shadow-black/5 dark:shadow-none">
            
            {/* Animated background highlights */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-1000" />
            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px]" />
            
            {/* Top decorative bar */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Header Section */}
            <div className="flex items-start justify-between mb-10 relative z-10">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/10 border border-primary/30 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-7 h-7 text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Configuration</p>
                  </div>
                  <h2 className="text-2xl font-black text-content-main tracking-tight group-hover:text-white transition-colors">Shift Timing</h2>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-content-muted uppercase tracking-widest mb-1 opacity-50">Status</span>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-tighter">Operational</div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 space-y-6 relative z-10">
              
              {/* Start Time Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center group/field p-4 rounded-3xl transition-all duration-500 hover:bg-white/[0.02]">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 group-hover/field:scale-105 transition-transform origin-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    Deployment Start
                  </label>
                  <p className="text-[10px] text-content-muted font-medium ml-3.5">Set the initial fleet activation time</p>
                </div>

                <div className="relative group/input cursor-pointer">
                  <input
                    type="time"
                    value={settings.workingHours.start}
                    onChange={(e) => handleTimeChange('start', e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    className="w-full pl-6 pr-12 py-4 bg-surface border-2 border-border shadow-inner dark:bg-base/80 rounded-2xl text-content-main text-lg font-black font-mono tracking-widest outline-none transition-all duration-300 group-hover/input:border-primary/50 group-hover/input:shadow-[0_0_20px_rgba(16,185,129,0.15)] focus:border-primary"
                  />
                  {/* Highlighting the clickable picker area */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center pointer-events-none group-hover/input:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* End Time Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center group/field p-4 rounded-3xl transition-all duration-500 hover:bg-white/[0.02]">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 group-hover/field:scale-105 transition-transform origin-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    Operations Cease
                  </label>
                  <p className="text-[10px] text-content-muted font-medium ml-3.5">Automatic termination of field activity</p>
                </div>

                <div className="relative group/input cursor-pointer">
                  <input
                    type="time"
                    value={settings.workingHours.end}
                    onChange={(e) => handleTimeChange('end', e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    className="w-full pl-6 pr-12 py-4 bg-surface border-2 border-border shadow-inner dark:bg-base/80 rounded-2xl text-content-main text-lg font-black font-mono tracking-widest outline-none transition-all duration-300 group-hover/input:border-primary/50 group-hover/input:shadow-[0_0_20px_rgba(16,185,129,0.15)] focus:border-primary"
                  />
                  {/* Highlighting the clickable picker area */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center pointer-events-none group-hover/input:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-12 relative z-10">
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`relative group/btn overflow-hidden flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 ${
                  hasChanges 
                  ? 'bg-primary text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-white/5 text-content-muted/30 cursor-not-allowed border border-white/5'
                }`}
              >
                <span className="relative z-10">Commit Changes</span>
                {hasChanges && <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />}
                {hasChanges && <motion.div layoutId="btnGlow" className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity" />}
              </button>
              
              <button
                onClick={() => { setSettings(savedSettings); setHasChanges(false); }}
                disabled={!hasChanges}
                className="px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-content-muted font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/20 hover:text-content-main active:scale-95 disabled:opacity-20 transition-all"
              >
                Reset
              </button>
            </div>
            
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
