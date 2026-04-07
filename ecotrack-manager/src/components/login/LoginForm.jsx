import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import BorderGlow from '../BorderGlow';

export default function LoginForm({ onToggle }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Access Granted', 'Initializing high-speed link...');
        setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
      } else {
        toast.error('Authentication Failed', result.error);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('System Error', 'Could not establish secure connection');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 truck-collectible">

      <div className="space-y-4">
        <BorderGlow className="w-full" borderRadius={16} glowRadius={20} glowIntensity={0.8} backgroundColor="transparent" colors={['#10b981', '#34d399', '#059669']}>
          <div className="group relative w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-primary transition-colors" />
          <input
            type="email"
            name="email"
            required
            placeholder="Network ID (Email)"
            className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-4 text-sm font-sans font-bold text-[var(--text-main)] placeholder-[var(--text-muted)] focus:bg-[var(--card-bg)] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
          />
        </div>
        </BorderGlow>

        <BorderGlow className="w-full" borderRadius={16} glowRadius={20} glowIntensity={0.8} backgroundColor="transparent" colors={['#10b981', '#34d399', '#059669']}>
          <div className="group relative w-full">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-primary transition-colors" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            placeholder="Security Access Key"
            className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-12 text-sm font-sans font-bold text-[var(--text-main)] placeholder-[var(--text-muted)] focus:bg-[var(--card-bg)] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] focus:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setShowPassword((prev) => !prev); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 z-10 text-content-muted hover:text-content-main transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        </BorderGlow>
      </div>

      <div className="flex items-center justify-between px-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded-md border-border bg-base/10 text-primary focus:ring-primary/20" />
          <span className="text-xs font-bold text-content-muted group-hover:text-content-main transition-colors">Remember device</span>
        </label>
        <button type="button" className="text-xs font-bold text-primary/80 hover:text-primary transition-colors uppercase tracking-widest">Forgot Key?</button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="premium-btn w-full py-4 bg-primary rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Access System <ArrowRight className="w-4 h-4" /></>}
      </button>

      <div className="text-center pt-4">
        <p className="text-xs font-bold text-content-muted">
          New operator? <span onClick={onToggle} className="text-primary hover:underline cursor-pointer">Register Credentials</span>
        </p>
      </div>
    </form>
  );
}

export function RegisterForm({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <BorderGlow className="w-full" borderRadius={16} glowRadius={20} glowIntensity={0.8} backgroundColor="transparent" colors={['#10b981', '#34d399', '#059669']}>
          <div className="group relative w-full">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-4 text-sm font-sans font-bold text-[var(--text-main)] placeholder-[var(--text-muted)] focus:bg-[var(--card-bg)] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
          />
        </div>
        </BorderGlow>
        <BorderGlow className="w-full" borderRadius={16} glowRadius={20} glowIntensity={0.8} backgroundColor="transparent" colors={['#10b981', '#34d399', '#059669']}>
          <div className="group relative w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-primary transition-colors" />
          <input
            type="email"
            required
            placeholder="Corporate Email"
            className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-4 text-sm font-sans font-bold text-[var(--text-main)] placeholder-[var(--text-muted)] focus:bg-[var(--card-bg)] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
          />
        </div>
        </BorderGlow>
        <BorderGlow className="w-full" borderRadius={16} glowRadius={20} glowIntensity={0.8} backgroundColor="transparent" colors={['#10b981', '#34d399', '#059669']}>
          <div className="group relative w-full">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-primary transition-colors" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Create Secure Key"
            className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-12 text-sm font-sans font-bold text-[var(--text-main)] placeholder-[var(--text-muted)] focus:bg-[var(--card-bg)] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
          />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setShowPassword((prev) => !prev); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 z-10 text-content-muted hover:text-content-main transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        </BorderGlow>
      </div>

      <button
        type="submit"
        className="premium-btn w-full py-4 bg-primary rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
      >
        Initialize Account <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center pt-4">
        <p className="text-xs font-bold text-content-muted">
          Existing operator? <span onClick={onToggle} className="text-primary hover:underline cursor-pointer">Back to Login</span>
        </p>
      </div>
    </form>
  );
}
