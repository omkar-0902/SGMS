import { motion } from 'framer-motion';
import { Trash2, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

const queue = [
  { id: 'Q1', bin: 'Sector 4 - Bin #402', capacity: '92%', priority: 'Critical', time: '12 mins' },
  { id: 'Q2', bin: 'Market Sq - Bin #128', capacity: '85%', priority: 'High', time: '24 mins' },
  { id: 'Q3', bin: 'Railway St - Bin #567', capacity: '78%', priority: 'Medium', time: '45 mins' },
  { id: 'Q4', bin: 'Green Park - Bin #092', capacity: '65%', priority: 'Low', time: '1.2 hrs' },
];

export default function WasteQueue({ limit = 4 }) {
  return (
    <div className="space-y-4 font-poppins">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black text-content-muted uppercase tracking-[0.2em]">Priority Pickups</span>
        <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 tracking-widest uppercase">Optimized Path</span>
      </div>

      {queue.slice(0, limit).map((item, i) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative flex items-center justify-between p-4 bg-base/5 border border-border rounded-2xl hover:bg-surface transition-all cursor-pointer overflow-hidden shadow-sm"
        >
          {/* Progress background indicator */}
          <div 
            className="absolute left-0 bottom-0 h-1 bg-primary/20 transition-all duration-1000" 
            style={{ width: item.capacity }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              item.priority === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 
              item.priority === 'High' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20' : 'bg-primary/20 text-primary border border-primary/20'
            }`}>
              {parseInt(item.capacity) > 90 ? <AlertTriangle className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-black text-content-main leading-none mb-1 group-hover:text-primary transition-colors">{item.bin}</p>
              <div className="flex items-center gap-2">
                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border tracking-widest ${
                   item.priority === 'Critical' ? 'bg-red-500 text-white border-red-600' : 
                   item.priority === 'High' ? 'bg-amber-500 text-black border-amber-600' : 'bg-base/30 text-content-muted border-border'
                 }`}>
                   {item.priority}
                 </span>
                 <div className="flex items-center gap-1 text-[10px] text-content-muted font-bold">
                   <Clock className="w-3 h-3 text-primary" /> {item.time}
                 </div>
              </div>
            </div>
          </div>
          
          <div className="text-right relative z-10">
             <p className={`text-sm font-black ${parseInt(item.capacity) > 80 ? 'text-red-500' : 'text-primary'}`}>
               {item.capacity}
             </p>
             <p className="text-[9px] text-content-muted font-black uppercase tracking-tighter">Capacity</p>
          </div>
        </motion.div>
      ))}

      <button className="w-full py-4 text-[10px] font-black text-primary hover:text-white transition-all uppercase tracking-[4px] border border-dashed border-primary/40 rounded-2xl hover:border-primary hover:bg-primary hover:shadow-xl hover:shadow-primary/20 group mt-2">
        <span className="flex items-center justify-center gap-2">
          Calculate Full Route <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  );
}
