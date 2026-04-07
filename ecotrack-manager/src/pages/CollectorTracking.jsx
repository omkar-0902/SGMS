import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Phone, Mail, Clock, X } from 'lucide-react';
import { mockCollectors } from '../data/mockData';
import LiveMap from '../components/LiveMap';

export default function CollectorTracking() {
  const [selectedCollector, setSelectedCollector] = useState(null);

  return (
    <div className="p-6 lg:p-8 space-y-8 relative overflow-hidden font-poppins">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl lg:text-4xl font-extrabold text-content-main tracking-tight"
        >
          Collector <span className="text-gradient">Tracking</span>
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-content-muted mt-2 font-medium"
        >
          Real-time monitoring of field collectors and their routes
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[2.5rem] p-6 shadow-2xl border border-border h-[calc(100vh-220px)] overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 eco-glow">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-content-main">Live Field Tracker</h2>
                <p className="text-xs text-content-muted font-medium uppercase tracking-widest">Real-Time Infrastructure Overlay</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-base/5 border border-border rounded-xl">
               <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-black text-content-main uppercase tracking-widest">Satellite Link Active</span>
            </div>
          </div>
          
          <div className="flex-1 rounded-3xl overflow-hidden border border-border shadow-inner relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
            <LiveMap />
          </div>
        </motion.div>
      </div>

      {/* Collector Detail Modal */}
      <AnimatePresence>
        {selectedCollector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-base/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCollector(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-[3rem] p-10 max-w-md w-full shadow-3xl border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <button
                onClick={() => setSelectedCollector(null)}
                className="absolute top-6 right-6 p-2 bg-base/10 hover:bg-red-500/10 rounded-xl transition-all group"
              >
                <X className="w-5 h-5 text-content-muted group-hover:text-red-500" />
              </button>

              <div className="text-center mb-10">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/20 rotate-3">
                    <Truck className="w-10 h-10 text-white -rotate-3" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-surface border-4 border-base rounded-full flex items-center justify-center">
                     <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
                <h4 className="text-2xl font-black text-content-main uppercase tracking-tight">{selectedCollector.name}</h4>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-1">{selectedCollector.id}</p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-base/5 rounded-2xl border border-border group hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-content-main">+91 98765 43210</span>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-base/5 rounded-2xl border border-border group hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-content-main truncate">{selectedCollector.name.split(' ')[0].toLowerCase()}@ecotrack.ai</span>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-base/5 rounded-2xl border border-border group hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-content-main uppercase tracking-tighter">Shift: 06:00 - 14:00</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 text-center group hover:bg-primary/20 transition-all cursor-default">
                  <p className="text-3xl font-black text-primary">{selectedCollector.completedToday}</p>
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mt-1">Completed</p>
                </div>
                <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20 text-center group hover:bg-amber-500/20 transition-all cursor-default">
                  <p className="text-3xl font-black text-amber-500">{selectedCollector.pendingToday}</p>
                  <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest mt-1">Pending</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
