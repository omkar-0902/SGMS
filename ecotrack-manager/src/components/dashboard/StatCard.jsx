import { motion } from 'framer-motion';

export default function StatCard({ label, value, change, trend, icon: Icon, color = 'emerald' }) {
  const colorMap = {
    emerald: 'text-primary bg-primary/10 border-primary/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden group border border-border"
    >
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 ${colorMap[color].split(' ')[0]}`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorMap[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-content-muted uppercase tracking-[0.2em]">{label}</p>
            <h3 className="text-3xl font-black text-content-main mt-1 tracking-tighter">{value}</h3>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border tracking-wider ${
            trend === 'up' 
              ? 'bg-primary/10 text-primary border-primary/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 relative h-10 w-full opacity-30 group-hover:opacity-60 transition-opacity">
         {/* Simple visualization SVG line placeholder */}
         <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path 
              d="M0 15 Q 10 5, 20 12 T 40 8 T 60 15 T 80 5 T 100 12" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className={colorMap[color].split(' ')[0]} 
            />
         </svg>
      </div>
    </motion.div>
  );
}
