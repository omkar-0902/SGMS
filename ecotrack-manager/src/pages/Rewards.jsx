import { motion } from 'framer-motion';
import { 
  Award, Star, TrendingUp, Target, CheckCircle, 
  ChevronRight, Gift, Trophy, Shield, Zap
} from 'lucide-react';

export default function Rewards() {


  return (
    <div className="p-6 lg:p-8 space-y-8 relative overflow-hidden font-poppins">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-content-main tracking-tight">
            Reward <span className="text-gradient">System</span>
          </h1>
          <p className="text-content-muted mt-2 font-medium">Incentivizing sustainable waste management records</p>
        </div>
      </div>

      {/* Coming Soon State */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-[2.5rem] shadow-2xl border border-primary/20 overflow-hidden relative z-10 flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-surface to-primary/5"
      >
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
         
         <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-8 relative eco-glow">
           <div className="absolute inset-0 rounded-3xl border border-primary/30 animate-ping opacity-20" />
           <Award className="w-10 h-10 text-primary" />
         </div>

         <h2 className="text-3xl font-black text-content-main mb-3 uppercase tracking-tighter">Under <span className="text-primary">Construction</span></h2>
         
         <p className="text-sm font-medium text-content-muted max-w-md text-center leading-relaxed">
           The gamified residential reward tracking system is currently being forged. Premium incentives and leaderboards available in the next deployment cycle.
         </p>

         <div className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full bg-base/10 border border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-black text-content-muted uppercase tracking-widest">Module Maintenance Active</span>
         </div>
      </motion.div>
    </div>
  );
}
