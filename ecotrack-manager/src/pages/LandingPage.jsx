import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap, MapPin, Users, BarChart3, Award, Clock, Truck,
  ArrowRight, CheckCircle2, ChevronDown, Recycle, Leaf,
  Sprout, Trash2, Activity, TrendingUp, ArrowUpRight,
  Shield, Inbox, Star, Play, ArrowDownRight, XCircle
} from 'lucide-react';
import LoginModal from '../components/login/LoginModal';

/* ─── Scroll-reveal hook ───────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '', direction = 'up' }) {
  const [ref, visible] = useReveal();
  const dirs = {
    up:    { hidden: { opacity: 0, y: 36 },   show: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -36 },  show: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 36 },   show: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
    fade:  { hidden: { opacity: 0 },           show: { opacity: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      variants={dirs[direction]}
      initial="hidden"
      animate={visible ? 'show' : 'hidden'}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Badge({ label, color = 'green' }) {
  const colors = {
    green: 'border-primary/30 bg-primary/10 text-primary',
    rose:  'border-rose-500/30 bg-rose-500/10 text-rose-400',
    blue:  'border-blue-500/30 bg-blue-500/10 text-blue-400',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  };
  return (
    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.22em] ${colors[color]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}

/* ─── NAVBAR ───────────────────────────────────────────── */
function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        scrolled ? 'py-2.5 bg-[#020617]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-emerald-300 flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-white">
            ECO<span className="text-primary">TRACK</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <a href="#problem"  className="hover:text-primary transition-colors">Problem</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how"      className="hover:text-primary transition-colors">How It Works</a>
          <a href="#preview"  className="hover:text-primary transition-colors">Preview</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onLogin} className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors px-3 py-2">
            Login
          </button>
          <button onClick={onLogin} className="premium-btn flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/25 hover:shadow-primary/45">
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */
const floatIcons = [
  { Icon: Recycle, size: 130, style: { left: '2%',  top: '20%' }, dur: 50, delay: 0  },
  { Icon: Leaf,    size: 160, style: { right: '3%', top: '10%' }, dur: 58, delay: 2  },
  { Icon: Sprout,  size: 140, style: { right: '7%', top: '58%' }, dur: 54, delay: 5  },
  { Icon: Trash2,  size: 110, style: { left: '5%',  top: '65%' }, dur: 46, delay: 1  },
  { Icon: Recycle, size: 80,  style: { left: '38%', top: '12%' }, dur: 40, delay: 3  },
  { Icon: Leaf,    size: 90,  style: { left: '44%', top: '82%' }, dur: 44, delay: 4  },
];

function HeroSection({ onLogin }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-16">
      {/* BG Orbs */}
      <div className="absolute top-[-15%] left-[-12%] w-[650px] h-[650px] bg-primary/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-8%]  w-[550px] h-[550px] bg-blue-500/8  rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%]  right-[12%]   w-[350px] h-[350px] bg-violet-500/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:36px_36px] pointer-events-none" />

      {/* Floating icons */}
      {floatIcons.map((el, i) => (
        <motion.div key={i} className="absolute text-primary opacity-[0.05] blur-[2px] pointer-events-none" style={el.style}
          animate={{ y: [0, -35, 0, 35, 0], x: [0, 18, 0, -18, 0], rotate: [0, 25, -25, 0] }}
          transition={{ duration: el.dur, repeat: Infinity, ease: 'easeInOut', delay: el.delay }}>
          <el.Icon size={el.size} strokeWidth={1} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-6">
          <Badge label="Smart Waste Management Platform" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }}
          className="text-5xl sm:text-7xl lg:text-[90px] font-black tracking-tight leading-[1.05] text-white mb-5">
          The Intelligent<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-teal-400">
            Waste Operations
          </span><br />
          Command Center
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          EcoTrack empowers municipal operations teams with real-time pickup tracking,
          automated collector dispatch, live field maps, and a citizen rewards engine —
          all in one unified dashboard.
        </motion.p>

        {/* Hero image visual */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.32 }}
          className="relative mb-10 mx-auto max-w-3xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/25 via-transparent to-blue-500/15 blur-xl scale-105 opacity-60" />
          <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
            <img src="/hero_visual.png" alt="EcoTrack Operations Dashboard" className="w-full h-56 sm:h-72 object-cover object-center opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-[#020617]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Live Operations Active</span>
              </div>
              <div className="bg-[#020617]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ecotrack.app/dashboard</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.46 }}
          className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-12">
          {[
            { value: '98%', label: 'Collection Rate' },
            { value: '4.2K+', label: 'Daily Pickups' },
            { value: '< 8min', label: 'Avg Response' },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-2xl py-4 px-3 border border-white/5 text-center">
              <p className="text-xl sm:text-2xl font-black text-primary">{s.value}</p>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Trusted by strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center items-center gap-6 text-slate-700">
          {['Municipal Corp. Delhi', 'BMC Mumbai', 'BBMP Bengaluru', 'GHMC Hyderabad'].map(city => (
            <div key={city} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3 text-primary/50" />
              {city}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.35em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-primary/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PROBLEM + SOLUTION (merged) ──────────────────────── */
function ProblemSolutionSection() {
  const problems = [
    { icon: Trash2,    color: 'rose',   title: 'Missed Pickups',       desc: 'Collectors skip routes with zero accountability. Garbage piles up while supervisors remain unaware.' },
    { icon: MapPin,    color: 'amber',  title: 'No Field Visibility',  desc: 'No live view of where collectors are, which zones are done, or what\'s been missed until it\'s too late.' },
    { icon: BarChart3, color: 'violet', title: 'Zero Data Insights',   desc: 'Decisions run on guesswork. Without analytics, budget is wasted and efficiency tanks across zones.' },
    { icon: Users,     color: 'blue',   title: 'Uncoordinated Teams',  desc: 'Routes, shifts, and handoffs managed via phone calls and paper logs — a recipe for operational chaos.' },
  ];
  const cMap = {
    rose:   { bdr:'border-rose-500/20',   ic:'text-rose-400   bg-rose-500/10   border-rose-500/20',   glow:'from-rose-500/5'    },
    amber:  { bdr:'border-amber-500/20',  ic:'text-amber-400  bg-amber-500/10  border-amber-500/20',  glow:'from-amber-500/5'   },
    violet: { bdr:'border-violet-500/20', ic:'text-violet-400 bg-violet-500/10 border-violet-500/20', glow:'from-violet-500/5'  },
    blue:   { bdr:'border-blue-500/20',   ic:'text-blue-400   bg-blue-500/10   border-blue-500/20',   glow:'from-blue-500/5'    },
  };

  const flowSteps = [
    { icon: Inbox,   label: 'Citizen Request',     desc: 'Pickup raised via app or web portal' },
    { icon: Truck,   label: 'Smart Dispatch',       desc: 'Nearest collector auto-assigned' },
    { icon: MapPin,  label: 'Live Field Tracking',  desc: 'Real-time location on operations map' },
    { icon: Award,   label: 'Reward & Close',       desc: 'Points issued, collection logged' },
  ];

  return (
    <section id="problem" className="relative py-20 px-6 overflow-hidden">
      <div className="absolute right-[-8%] top-[15%]  w-[450px] h-[450px] bg-rose-500/5   rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-[-8%]  bottom-[5%] w-[500px] h-[500px] bg-primary/6   rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ── Problem ── */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
            <Reveal direction="left">
              <Badge label="The Problem" color="rose" />
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mt-3">
                Cities are drowning in<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                  unmanaged waste
                </span>
              </h2>
              <p className="mt-3 text-slate-400 font-medium text-sm leading-relaxed">
                Manual operations, disconnected teams, and zero real-time visibility make
                urban waste management a costly, inefficient daily crisis.
              </p>
            </Reveal>
            <Reveal direction="right">
              <div className="relative rounded-2xl overflow-hidden border border-rose-500/15 shadow-xl">
                <img src="/city_aerial.png" alt="Urban waste management challenge" className="w-full h-52 object-cover object-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/30 to-transparent" />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p, i) => {
              const c = cMap[p.color];
              return (
                <Reveal key={p.title} delay={i * 0.09} direction="up">
                  <motion.div whileHover={{ y: -6 }} transition={{ type:'spring', stiffness:300, damping:22 }}
                    className={`glass-card p-6 rounded-3xl border ${c.bdr} relative overflow-hidden group h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${c.ic}`}>
                      <p.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-white mb-1.5">{p.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{p.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── Divider Arrow ── */}
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="w-px h-10 bg-gradient-to-b from-rose-500/20 to-primary/40" />
          <div className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center eco-glow">
            <ArrowRight className="w-4 h-4 text-primary rotate-90" />
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-primary/40 to-primary/10" />
        </div>

        {/* ── Solution Flow ── */}
        <div>
          <Reveal className="text-center mb-10">
            <Badge label="The Solution" />
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mt-3">
              One platform. <span className="text-gradient">Total control.</span>
            </h2>
            <p className="mt-3 text-slate-400 font-medium max-w-lg mx-auto text-sm leading-relaxed">
              EcoTrack closes the loop from citizen request to verified pickup —
              every step tracked, logged, and optimized.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="hidden lg:block absolute top-[2.8rem] left-[12.5%] w-[75%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
            {flowSteps.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.1} direction="up">
                <div className="glass-card p-5 rounded-2xl border border-primary/12 flex flex-col items-center text-center relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center eco-glow">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center shadow-lg shadow-primary/40">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wide mb-1.5">{step.label}</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    { icon: MapPin,    title: 'Live Field Tracker',        desc: 'Satellite-linked map shows every active collector\'s position, route progress, and zone coverage in real time.', badge: 'Real-Time', color: 'emerald' },
    { icon: Users,     title: 'Collector Management',      desc: 'Register field operatives, generate secure ECO-ID credentials, assign shifts, and maintain a full personnel roster.', badge: 'Team', color: 'violet' },
    { icon: BarChart3, title: 'Performance Analytics',     desc: 'Visual breakdowns of rates, missed pickups, active requests, and completion trends — every decision data-backed.', badge: 'Analytics', color: 'amber' },
    { icon: Award,     title: 'Citizen Rewards Engine',    desc: 'Citizens earn points for verified pickup completions, driving engagement and regular waste reporting across the city.', badge: 'Engagement', color: 'rose' },
  ];
  const cMap = {
    emerald: { bdr:'border-emerald-500/18', bdg:'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', ic:'bg-emerald-500/10 text-emerald-400', glow:'from-emerald-500/5'  },
    blue:    { bdr:'border-blue-500/18',    bdg:'text-blue-400    bg-blue-500/10    border-blue-500/20',    ic:'bg-blue-500/10    text-blue-400',    glow:'from-blue-500/5'     },
    violet:  { bdr:'border-violet-500/18',  bdg:'text-violet-400  bg-violet-500/10  border-violet-500/20',  ic:'bg-violet-500/10  text-violet-400',  glow:'from-violet-500/5'   },
    amber:   { bdr:'border-amber-500/18',   bdg:'text-amber-400   bg-amber-500/10   border-amber-500/20',   ic:'bg-amber-500/10   text-amber-400',   glow:'from-amber-500/5'    },
    rose:    { bdr:'border-rose-500/18',    bdg:'text-rose-400    bg-rose-500/10    border-rose-500/20',    ic:'bg-rose-500/10    text-rose-400',    glow:'from-rose-500/5'     },
    teal:    { bdr:'border-teal-500/18',    bdg:'text-teal-400    bg-teal-500/10    border-teal-500/20',    ic:'bg-teal-500/10    text-teal-400',    glow:'from-teal-500/5'     },
  };

  return (
    <section id="features" className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.018] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-5%] w-[400px] h-[400px] bg-violet-500/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <Reveal direction="left">
            <div className="relative rounded-2xl overflow-hidden border border-primary/15 shadow-xl">
              <img src="/eco_features.png" alt="EcoTrack intelligent features" className="w-full h-52 object-cover object-center opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />
            </div>
          </Reveal>
          <Reveal direction="right">
            <Badge label="Features" />
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mt-3">
              Built for cities.<br />
              <span className="text-gradient">Engineered for speed.</span>
            </h2>
            <p className="mt-3 text-slate-400 font-medium text-sm leading-relaxed">
              Every feature was designed around the real operational challenges
              faced by municipal teams every single day.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const c = cMap[f.color];
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.09} direction="up">
                <motion.div whileHover={{ y: -7, scale: 1.01 }} transition={{ type:'spring', stiffness:300, damping:22 }}
                  className={`glass-card p-6 rounded-3xl border ${c.bdr} relative overflow-hidden group h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-11 h-11 rounded-2xl border border-current/20 flex items-center justify-center ${c.ic}`}>
                      <f.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${c.bdg}`}>{f.badge}</span>
                  </div>
                  <h3 className="text-sm font-black text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'City Admin Logs In',          icon: Shield,   desc: 'Access the EcoTrack Command Center via secure login. Role-based access ensures each team member sees only what\'s relevant to them.' },
    { num: '02', title: 'Collector Fleet Registered',  icon: Users,    desc: 'Field collectors are onboarded with auto-generated ECO-IDs. Shift timings configured and operatives are deployment-ready instantly.' },
    { num: '03', title: 'Pickup Requests Flow In',     icon: Inbox,    desc: 'Citizens submit requests through the companion app.' },
    { num: '04', title: 'Live Operations Begin',       icon: Activity, desc: 'The live map activates. Monitor every collector, track completions in real time, generate end-of-day reports — no spreadsheets needed.' },
  ];

  return (
    <section id="how" className="relative py-20 px-6 overflow-hidden">
      <div className="absolute left-[-8%] bottom-[10%] w-[450px] h-[450px] bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12">
          <Badge label="How It Works" />
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
            Up and running <span className="text-gradient">in four steps.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div whileHover={{ y: -4 }} transition={{ type:'spring', stiffness:300 }}
                className="glass-card p-6 rounded-3xl border border-primary/12 relative overflow-hidden group hover:border-primary/25 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className="text-5xl font-black text-primary/8 leading-none font-mono select-none">{step.num}</span>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center -mt-2.5">
                      <step.icon className="w-4.5 h-4.5 text-primary w-[18px] h-[18px]" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-black text-white mb-1.5">{step.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DASHBOARD PREVIEW ────────────────────────────────── */
function PreviewSection() {
  return (
    <section id="preview" className="relative py-20 px-6 overflow-hidden">
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-primary/7 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-10">
          <Badge label="Dashboard Preview" />
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
            See it in <span className="text-gradient">action.</span>
          </h2>
          <p className="mt-3 text-slate-400 font-medium max-w-lg mx-auto text-sm">
            A real-time command center giving operations teams total
            situational awareness — from pickup queue to live collector maps.
          </p>
        </Reveal>

        <Reveal direction="scale">
          <div className="relative">
            <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-primary/18 via-transparent to-blue-500/8 blur-xl scale-105 opacity-50" />
            <div className="relative glass-card rounded-[1.75rem] border border-primary/18 overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/[0.015]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/55" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/55" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/55" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="max-w-[220px] mx-auto h-5.5 h-[22px] rounded-md bg-white/5 border border-white/5 flex items-center justify-center px-3">
                    <span className="text-[9px] text-slate-600 font-mono">ecotrack.app/dashboard</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-black text-primary/75 uppercase tracking-widest">Live</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-white">Operations <span className="text-gradient">Dashboard</span></h2>
                    <p className="text-[10px] text-slate-500 font-medium">Real-time overview for today's collection activity</p>
                  </div>
                  <div className="glass-panel px-3 py-1.5 rounded-xl border border-border flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">Friday, May 2, 2026</span>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'Pickup Requests', value: '87', color: 'text-primary',    border: 'border-primary/20',       badge: 'Total',      icon: Inbox },
                    { label: 'Collected Today', value: '62', color: 'text-emerald-400', border: 'border-emerald-500/20', badge: '↑ Collected', icon: CheckCircle2 },
                    { label: 'Not Collected',   value: '11', color: 'text-rose-400',    border: 'border-rose-500/20',    badge: '↓ Missed',   icon: XCircle },
                    { label: 'Active Now',       value: '14', color: 'text-amber-400',  border: 'border-amber-500/20',   badge: '● Live',     icon: Activity },
                  ].map(card => (
                    <div key={card.label} className={`glass-card p-4 rounded-2xl border ${card.border} relative overflow-hidden`}>
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-20 text-current" style={{ color: 'currentColor' }} />
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-8 h-8 rounded-xl bg-current/10 border border-current/20 flex items-center justify-center" style={{ color: 'inherit' }}>
                          <card.icon className={`w-4 h-4 ${card.color}`} />
                        </div>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${card.color} border-current/20 bg-current/5`} style={{ borderColor: 'currentColor', backgroundColor: 'transparent' }}>
                          <span className={card.color}>{card.badge}</span>
                        </span>
                      </div>
                      <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">{card.label}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                  {/* Summary */}
                  <div className="lg:col-span-3 glass-card p-5 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <h3 className="text-xs font-black text-white uppercase tracking-widest">Today's Collection Summary</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Collected', pct: 71, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
                        { label: 'Active',    pct: 16, color: 'bg-amber-500',   textColor: 'text-amber-400' },
                        { label: 'Missed',    pct: 13, color: 'bg-rose-500',    textColor: 'text-rose-400' },
                      ].map(bar => (
                        <div key={bar.label}>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full inline-block ${bar.color}`} />
                              <span className="text-[10px] font-bold text-slate-300">{bar.label}</span>
                            </div>
                            <span className={`text-[10px] font-black ${bar.textColor}`}>{bar.pct}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${bar.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${bar.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/10">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Collection Rate</span>
                      <span className="text-base font-black text-primary">71%</span>
                    </div>
                  </div>

                  {/* Active collectors */}
                  <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-primary/18 bg-gradient-to-br from-primary/4 to-transparent">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-primary" />
                      <h3 className="text-xs font-black text-white uppercase tracking-widest">Active Collectors</h3>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Michael Chen',  id: 'ECO-C-4921', done: 8  },
                        { name: 'Sarah Jenkins', id: 'ECO-C-8832', done: 6  },
                        { name: 'Raj Patel',     id: 'ECO-C-2247', done: 11 },
                      ].map(c => (
                        <div key={c.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="w-7 h-7 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xs font-black flex-shrink-0">
                            {c.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black text-white truncate">{c.name}</p>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-wider">{c.id}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[9px] font-black text-primary/65">{c.done} done</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── TESTIMONIAL / TRUST BAR ──────────────────────────── */
function TrustSection() {
  const items = [
    { stat: '98%',   label: 'Collection Rate',     sub: 'across all active zones'      },
    { stat: '4.2K+', label: 'Pickups per Day',     sub: 'average across deployments'   },
    { stat: '< 8min',label: 'Avg Response Time',   sub: 'from request to dispatch'     },
    { stat: '3x',    label: 'Efficiency Increase', sub: 'vs. manual operations'        },
    { stat: '62+',   label: 'Active Collectors',   sub: 'manageable from one dashboard'},
    { stat: '0',     label: 'Spreadsheets Needed', sub: 'everything\'s automated'      },
  ];
  return (
    <section className="relative py-14 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="glass-card rounded-3xl border border-primary/15 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
            <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {items.map((item, i) => (
                <div key={item.label} className="text-center">
                  <p className="text-2xl lg:text-3xl font-black text-primary">{item.stat}</p>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest mt-1">{item.label}</p>
                  <p className="text-[9px] text-slate-600 font-medium mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ────────────────────────────────────────── */
function CTASection({ onLogin }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-primary to-emerald-300 mx-auto mb-6 shadow-2xl shadow-primary/40 eco-glow">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Ready to transform<br />
            <span className="text-gradient">your city's operations?</span>
          </h2>
          <p className="text-base text-slate-400 font-medium max-w-lg mx-auto leading-relaxed mb-8">
            Join municipal teams using EcoTrack to manage waste collection at scale —
            with real-time intelligence, not guesswork.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <button onClick={onLogin}
              className="premium-btn group flex items-center justify-center gap-2.5 px-9 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/40 hover:shadow-primary/60">
              <Zap className="w-4 h-4 fill-white" />
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onLogin}
              className="flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/8 text-slate-300 hover:border-primary/35 hover:text-primary transition-all duration-300">
              Login to Dashboard
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-600">
            {[
              { icon: Shield,      label: 'Secure & Private' },
              { icon: CheckCircle2,label: 'No Setup Required' },
              { icon: Star,        label: 'Municipal-Grade Reliability' },
              { icon: TrendingUp,  label: 'Scales With Your City' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <item.icon className="w-3.5 h-3.5 text-primary/40" />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="text-sm font-black tracking-tighter uppercase text-white">
            ECO<span className="text-primary">TRACK</span>
          </span>
        </div>
        <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">
          EcoTrack Infrastructure Solutions © 2026
        </p>
        <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Built for Smart Cities</p>
      </div>
    </footer>
  );
}

const AmbientBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#020617]" />
    
    <div className="absolute inset-0 opacity-[0.02]" 
         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], rotate: [0, 45, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-600/15 blur-[130px]" 
    />
    <motion.div 
      animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, -30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-600/15 blur-[150px]" 
    />
    <motion.div 
      animate={{ scale: [1, 1.5, 1], opacity: [0.03, 0.08, 0.03] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-white/10 blur-[130px]" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#01030a] via-[#020617]/50 to-transparent" />
    
    <div className="absolute inset-0 opacity-[0.025]" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
  </div>
);

/* ─── ROOT ─────────────────────────────────────────────── */
export default function LandingPage({ forceLoginOpen = false }) {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(forceLoginOpen);

  const handleLogin = () => setShowLoginModal(true);

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <>
      {/* Landing page — blurs + freezes when modal is open */}
      <div className={`min-h-screen relative font-poppins text-white overflow-x-hidden bg-[#020617] transition-[filter] duration-500 ${showLoginModal ? 'blur-[6px] brightness-50 pointer-events-none select-none' : ''}`}>
        <AmbientBackground />

        <Navbar onLogin={handleLogin} />
        <HeroSection onLogin={handleLogin} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <ProblemSolutionSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <FeaturesSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <HowItWorksSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <PreviewSection />

        <TrustSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />

        <CTASection onLogin={handleLogin} />
        <Footer />
      </div>

      {/* Login modal floats above everything */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
