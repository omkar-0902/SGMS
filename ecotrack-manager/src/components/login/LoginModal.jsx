import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Leaf, ArrowLeft, CheckCircle2 } from 'lucide-react';
import LoginForm, { RegisterForm } from './LoginForm';

const BRAND = '#42d19d';
const BRAND_DARK = '#0f2a1e';

export default function LoginModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-poppins px-4">
      {/* Blurred backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 z-0"
        style={{ background: 'rgba(1,3,10,0.65)', backdropFilter: 'blur(18px)' }}
        onClick={onClose}
      />

      {/* ── Auth Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[880px] z-10 rounded-[2.25rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] h-[560px]"
        style={{
          border: `1px solid rgba(66,209,157,0.25)`,
          boxShadow: `0 0 0 1px rgba(66,209,157,0.08), 0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(66,209,157,0.08)`,
        }}
      >
        {/* Card splits into LEFT (dark form) | RIGHT (brand color panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] h-full">

          {/* ─── LEFT: Dark Form Side ─── */}
          <div
            className="relative flex flex-col justify-center px-8 lg:px-12 py-12 h-full overflow-y-auto"
            style={{ background: '#0b1a12' }}
          >
            {/* Top glow accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, ${BRAND}55, transparent)` }} />

            {/* Subtle glow blob */}
            <div className="absolute top-[-10%] left-[-15%] w-64 h-64 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, rgba(66,209,157,0.09) 0%, transparent 70%)` }} />

            {/* ← Close */}
            <button
              onClick={onClose}
              className="absolute top-5 left-5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 group"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="group-hover:text-white transition-colors">Back</span>
            </button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #2db87a)`, boxShadow: `0 6px 20px rgba(66,209,157,0.35)` }}>
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">
                ECO<span style={{ color: BRAND }}>TRACK</span>
              </span>
            </motion.div>

            {/* Heading */}
            <div className="mb-7 overflow-hidden">
              <AnimatePresence mode="wait">
                {!isRegister ? (
                  <motion.div key="h-login"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
                    <p className="text-sm mt-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      Sign in to access your command center
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="h-reg"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
                    <p className="text-sm mt-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      Start managing your city's operations today
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {!isRegister ? (
                <motion.div key="f-login"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.32 }}>
                  <LoginForm onToggle={() => setIsRegister(true)} />
                </motion.div>
              ) : (
                <motion.div key="f-reg"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.32 }}>
                  <RegisterForm onToggle={() => setIsRegister(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── RIGHT: Brand Color Welcome Panel ─── */}
          <motion.div
            animate={{ opacity: 1 }}
            className="hidden lg:flex flex-col items-center justify-center px-10 py-12 relative overflow-hidden h-full"
            style={{ background: BRAND }}
          >
            {/* Inner pattern — diagonal lines */}
            <div className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${BRAND_DARK} 0px, ${BRAND_DARK} 1px, transparent 1px, transparent 14px)`,
              }} />

            {/* Glow blob center */}
            <div className="absolute top-[-10%] left-[20%] w-64 h-64 rounded-full -translate-x-1/2"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)' }} />

            {/* Left edge separator */}
            <div className="absolute left-0 top-[8%] h-[84%] w-[1px] opacity-30"
              style={{ background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)` }} />

            <AnimatePresence mode="wait">
              {!isRegister ? (
                <motion.div key="w-login"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, delay: 0.1 }}
                  className="relative text-center z-10">

                  {/* Big icon box */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-[1.75rem] flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
                    <Zap className="w-10 h-10 fill-current" style={{ color: BRAND_DARK }} />
                  </div>

                  <h2 className="text-4xl font-black uppercase tracking-tight leading-tight mb-3" style={{ color: BRAND_DARK }}>
                    Welcome<br />Back!
                  </h2>
                  <p className="text-sm font-semibold leading-relaxed max-w-[220px] mx-auto mb-8" style={{ color: 'rgba(15,42,30,0.7)' }}>
                    Your city's waste operations command center is live and ready.
                  </p>

                  <div className="flex flex-col gap-2.5 text-left">
                    {['Live Collector Tracking', 'Real-Time Pickup Queue', 'Performance Analytics', 'Citizen Rewards Engine'].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_DARK }} />
                        <span className="text-xs font-bold" style={{ color: BRAND_DARK }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="w-reg"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, delay: 0.1 }}
                  className="relative text-center z-10">

                  <div className="w-20 h-20 mx-auto mb-6 rounded-[1.75rem] flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
                    <Leaf className="w-10 h-10" style={{ color: BRAND_DARK }} />
                  </div>

                  <h2 className="text-4xl font-black uppercase tracking-tight leading-tight mb-3" style={{ color: BRAND_DARK }}>
                    Join<br />EcoTrack!
                  </h2>
                  <p className="text-sm font-semibold leading-relaxed max-w-[220px] mx-auto mb-8" style={{ color: 'rgba(15,42,30,0.7)' }}>
                    Register your operator account to launch your city's smart operations platform.
                  </p>

                  <div className="flex flex-col gap-2.5 text-left">
                    {['Instant ECO-ID Generation', 'Role-Based Access Control', 'Zero Setup Required', 'Scales With Your City'].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_DARK }} />
                        <span className="text-xs font-bold" style={{ color: BRAND_DARK }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
