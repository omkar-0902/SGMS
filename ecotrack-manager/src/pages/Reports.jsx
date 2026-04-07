import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Download, Filter, Search, CheckCircle, 
  XCircle, Clock, MapPin, Truck
} from 'lucide-react';
import { mockRequests } from '../data/mockData';

export default function Reports() {
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = mockRequests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      request.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.houseId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 shadow-sm" />;
      case 'pending':
        return <Clock className="w-5 h-5 shadow-sm" />;
      case 'missed':
        return <XCircle className="w-5 h-5 shadow-sm" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'pending':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'missed':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-base/20 text-content-muted border-border';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 relative overflow-hidden font-poppins">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl lg:text-4xl font-extrabold text-content-main tracking-tight"
          >
            Collection <span className="text-gradient">Reports</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-content-muted mt-2 font-medium"
          >
            Detailed logs of all collection requests and activities
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="premium-btn flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
        >
          <Download className="w-5 h-5" />
          Export Data
        </motion.button>
      </div>

      {/* Filters Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-[2.5rem] p-8 shadow-2xl relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-content-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search address or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-base/5 border border-border rounded-xl text-content-main placeholder:text-content-muted/50 focus:bg-surface focus:border-primary/50 transition-all outline-none text-sm font-bold"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2 bg-base/5 border border-border rounded-xl px-4 py-1.5 focus-within:border-primary/50 transition-all">
            <Calendar className="w-5 h-5 text-primary" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex-1 bg-transparent py-2 text-content-main text-sm font-bold outline-none cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-base/5 border border-border rounded-xl px-4 py-1.5 focus-within:border-primary/50 transition-all">
            <Filter className="w-5 h-5 text-primary" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 bg-transparent py-2 text-content-main text-sm font-bold outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="missed">Missed</option>
            </select>
          </div>

          {/* Area Filter */}
          <div className="flex items-center gap-2 bg-base/5 border border-border rounded-xl px-4 py-1.5 focus-within:border-primary/50 transition-all">
            <MapPin className="w-5 h-5 text-primary" />
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="flex-1 bg-transparent py-2 text-content-main text-sm font-bold outline-none cursor-pointer"
            >
              <option value="all">All Sectors</option>
              <option value="sector15">Sector 15</option>
              <option value="sector17">Sector 17</option>
              <option value="sector19">Sector 19</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary - Placeholder */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 opacity-40 grayscale"
      >
        {[
          { label: 'Completed', count: '-', color: 'text-primary', bg: 'bg-primary/10', icon: CheckCircle },
          { label: 'Pending', count: '-', color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock },
          { label: 'Missed', count: '-', color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle },
          { label: 'Total Logs', count: '-', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Calendar },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-3xl p-5 border border-border flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-content-muted uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.count}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table Section - Coming Soon State */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-[2.5rem] shadow-2xl border border-primary/20 overflow-hidden relative z-10 flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-surface to-primary/5"
      >
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
         
         <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-8 relative eco-glow">
           <div className="absolute inset-0 rounded-3xl border border-primary/30 animate-ping opacity-20" />
           <Clock className="w-10 h-10 text-primary" />
         </div>

         <h2 className="text-3xl font-black text-content-main mb-3 uppercase tracking-tighter">Under <span className="text-primary">Construction</span></h2>
         
         <p className="text-sm font-medium text-content-muted max-w-md text-center leading-relaxed">
           The profound analytics and extensive collection reports engine is currently being forged. Premium insights available in the next deployment cycle.
         </p>

         <div className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full bg-base/10 border border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-black text-content-muted uppercase tracking-widest">Module Maintenance Active</span>
         </div>
      </motion.div>
    </div>
  );
}
