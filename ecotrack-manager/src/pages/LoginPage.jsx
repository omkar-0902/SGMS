import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Recycle, Leaf, Sprout, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginForm, { RegisterForm } from '../components/login/LoginForm';

const floatingElements = [
  { Icon: Recycle, size: 160, left: '2%', top: '15%', duration: 45, delay: 0 },
  { Icon: Leaf, size: 200, left: '82%', top: '5%', duration: 55, delay: 2 },
  { Icon: Sprout, size: 180, left: '75%', top: '70%', duration: 50, delay: 5 },
  { Icon: Trash2, size: 140, left: '8%', top: '75%', duration: 48, delay: 1 },
  { Icon: Recycle, size: 100, left: '42%', top: '25%', duration: 42, delay: 4 },
  { Icon: Leaf, size: 130, left: '48%', top: '85%', duration: 38, delay: 3 },
];

const EcoBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Very faint repeating dot pattern to add texture */}
    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:40px_40px]" />

    {/* Floating Eco Icons */}
    {floatingElements.map((el, i) => (
      <motion.div
        key={i}
        className="absolute text-primary opacity-[0.06] blur-[3px]"
        style={{ left: el.left, top: el.top }}
        animate={{
          y: [0, -50, 0, 50, 0],
          x: [0, 30, 0, -30, 0],
          rotate: [0, 45, -45, 0]
        }}
        transition={{
          duration: el.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: el.delay
        }}
      >
        <el.Icon size={el.size} strokeWidth={1} />
      </motion.div>
    ))}
  </div>
);

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-mesh font-poppins text-content-main`}>
      {/* Cinematic Borders */}
      <div className="cinematic-border top" />
      <div className="cinematic-border bottom" />

      {/* Subtle Enhanced Eco Background */}
      <EcoBackground />

      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow opacity-30 z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow opacity-30 z-0" />

      <div className="relative z-10 w-full max-w-[1000px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Brand/Info Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center shadow-2xl shadow-primary/20">
              <Zap className="w-7 h-7 text-white fill-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-content-main">
              ECO<span className="text-primary font-black">TRACK</span>
            </h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter text-content-main">
              The Future of <br />
              <span className="text-gradient">Smart Waste</span>
            </h2>
            <p className="text-lg text-content-muted font-medium max-w-md leading-relaxed">
              Enterprise-grade operational intelligence for modern urban waste ecosystems. Optimize, reward, and track in real-time.
            </p>
          </div>


        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-10 lg:p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <AnimatePresence mode="wait">
              {!isRegister ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-10 text-center lg:text-left">
                    <h3 className="text-3xl font-black text-content-main mb-2">Welcome Back</h3>
                    <p className="text-sm text-content-muted font-medium tracking-wide">Enter your credentials to access your dashboard</p>
                  </div>
                  <LoginForm onToggle={() => setIsRegister(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-10 text-center lg:text-left">
                    <h3 className="text-3xl font-black text-content-main mb-2">Create Account</h3>
                    <p className="text-sm text-content-muted font-medium tracking-wide">Start managing your city infrastructure today</p>
                  </div>
                  <RegisterForm onToggle={() => setIsRegister(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-[10px] font-black text-content-muted uppercase tracking-[0.4em]">EcoTrack Infrastructure Solutions © 2026</p>
      </div>

    </div>
  );
}
