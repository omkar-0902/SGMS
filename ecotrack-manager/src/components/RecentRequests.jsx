import { motion } from 'framer-motion';
import { MapPin, Clock, Truck, Home } from 'lucide-react';
import { mockRequests } from '../data/mockData';

export default function RecentRequests({ limit = 5 }) {
  // Sort by time (simulated)
  const sortedRequests = [...mockRequests]
    .sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt))
    .slice(0, limit);

  return (
    <div className="space-y-4">
      {sortedRequests.map((request, idx) => (
        <motion.div
          key={request.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="p-4 bg-base/5 border border-border rounded-2xl hover:bg-surface transition-all group flex items-start gap-4 cursor-pointer"
        >
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              request.status === 'completed' ? 'bg-primary/10 border-primary/20 text-primary' : 
              request.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}>
              {request.status === 'completed' ? <CheckCircle2 className="w-5 h-5 shadow-sm" /> : 
               request.status === 'pending' ? <Clock className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            </div>
            {request.status === 'pending' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface animate-pulse" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[11px] font-black text-content-main group-hover:text-primary transition-colors tracking-tight uppercase">
                {request.houseId}
              </h4>
              <span className="text-[9px] font-black text-content-muted flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date(request.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-[10px] text-content-muted font-medium truncate flex items-center gap-1.5 mb-2">
              <MapPin className="w-3 h-3 text-red-400" /> {request.address}
            </p>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-base border border-border flex items-center justify-center">
                    <Truck className="w-2.5 h-2.5 text-content-muted" />
                  </div>
                  <span className="text-[9px] font-black text-content-muted uppercase tracking-widest">{request.collectorId || 'Unassigned'}</span>
               </div>
               <span className={`text-[8px] font-black px-2 py-0.5 rounded-md border tracking-widest uppercase ${
                 request.status === 'completed' ? 'bg-primary/10 text-primary border-primary/20' : 
                 request.status === 'pending' ? 'bg-amber-500/20 text-amber-500 border-amber-500/20' : 'bg-red-500/20 text-red-500 border-red-500/20'
               }`}>
                 {request.status}
               </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CheckCircle2({ className }) {
  return <path className={className} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />;
}
