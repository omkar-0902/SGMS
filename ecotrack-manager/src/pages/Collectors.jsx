import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, X, ShieldAlert, CheckCircle, User, Phone, Key, Loader2 } from 'lucide-react';
import { createCollector, getCollectors } from '../services/api';
import { useToast } from '../contexts/ToastContext';

export default function Collectors() {
  const [collectors, setCollectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('form'); // 'form' | 'credentials'
  
  // Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  
  // Generated Credentials State
  const [generatedId, setGeneratedId] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  const toast = useToast();

  useEffect(() => {
    fetchCollectors();
    
    // Check for "add" query param to auto-open modal
    if (searchParams.get('add') === 'true') {
      setIsModalOpen(true);
      // Clean up the URL
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  const fetchCollectors = async () => {
    try {
      const data = await getCollectors();
      // Ensure data is an array
      setCollectors(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('System Error', 'Could not fetch collectors list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValue = newName.trim();
    const phoneValue = newPhone.trim();

    if (!nameValue || !phoneValue) {
      toast.error('Validation Error', 'Please provide both name and contact number.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Call biological backend API
      const response = await createCollector({
        name: nameValue,
        phone: phoneValue
      });
      
      if (!response) throw new Error("Empty response from server");

      // Response shape: { collectorId: "...", password: "..." }
      setGeneratedId(response.collectorId || response.id);
      setGeneratedPassword(response.password || response.pass || "GENERATED");
      
      // Move to credentials display step
      setModalStep('credentials');
      toast.success('Registration Data Generated', 'Please secure the credentials below.');
    } catch (error) {
      const displayMsg = error.message.includes('403') 
        ? "Access Denied (403): Your account cannot perform this action." 
        : (error.message || 'Could not connect to operations backend');
      toast.error('Registration Failed', displayMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishAndSave = async () => {
    // Copy to clipboard for the user
    try {
      const textToCopy = `Collector ID: ${generatedId}\nOne-Time Password: ${generatedPassword}`;
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Stored in Clipboard', 'Credentials have been copied successfully.');
    } catch (err) {
      console.error('Clipboard failed', err);
    }

    // Refresh the list from server
    fetchCollectors();
    
    // Reset and close
    setModalStep('form');
    setNewName('');
    setNewPhone('');
    setIsModalOpen(false);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setTimeout(() => {
      setModalStep('form');
      setNewName('');
      setNewPhone('');
    }, 300);
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
            Manage <span className="text-gradient">Collectors</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-content-muted mt-2 font-medium"
          >
            Register and oversee on-ground waste collection personnel
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="premium-btn flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add Collector
        </motion.button>
      </div>

      {/* Table Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-[2.5rem] shadow-2xl border border-border overflow-hidden relative z-10 min-h-[300px]"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-base/5 border-b border-border">
                <th className="px-8 py-5 text-left text-[10px] font-black text-content-muted uppercase tracking-[0.2em] w-[40%]">Collector Info</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-content-muted uppercase tracking-[0.2em] w-[30%]">Collector ID</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-content-muted uppercase tracking-[0.2em] w-[30%]">Contact Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                   <td colSpan="3" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                         <Loader2 className="w-8 h-8 text-primary animate-spin" />
                         <p className="text-[10px] font-black uppercase tracking-widest text-content-muted">Synchronizing personnel roster...</p>
                      </div>
                   </td>
                </tr>
              ) : collectors.length > 0 ? (
                collectors.map((collector, index) => (
                  <motion.tr
                    key={collector.collectorId || collector.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-primary/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary font-black shadow-sm border border-border">
                          {collector.name?.charAt(0) || 'C'}
                        </div>
                        <span className="text-sm font-black text-content-main group-hover:text-primary transition-colors">{collector.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-sm font-black text-content-muted uppercase tracking-widest">{collector.collectorId || collector.id}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <span className="text-sm font-bold text-content-main">{collector.phone || collector.contact}</span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center">
                    <p className="text-content-muted font-bold tracking-widest uppercase text-xs">No collectors registered in this zone</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal / Mini Display */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={modalStep === 'form' && !isSubmitting ? handleClose : null}
              className="absolute inset-0 bg-base/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-card relative z-10 w-full max-w-md rounded-[2.5rem] p-8 shadow-3xl border border-border overflow-hidden"
            >
              {modalStep === 'form' ? (
                <>
                  {!isSubmitting && (
                    <button onClick={handleClose} className="absolute top-6 right-6 p-2 rounded-xl bg-base/50 text-content-muted hover:text-content-main hover:bg-surface transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-black text-content-main tracking-tighter">Add Collector</h2>
                    <p className="text-xs font-medium text-content-muted mt-1">Register a new field operative to the system.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-content-muted pl-1">Full Name</label>
                       <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted group-focus-within:text-primary transition-colors" />
                         <input 
                           type="text" 
                           placeholder="e.g. KAMLESH"
                           required
                           disabled={isSubmitting}
                           value={newName}
                           onChange={e => setNewName(e.target.value)}
                           className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border dark:bg-base/50 rounded-2xl text-content-main placeholder:text-content-muted/30 focus:border-primary focus:bg-primary/5 dark:focus:bg-primary/10 outline-none font-bold transition-all disabled:opacity-50"
                         />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-content-muted pl-1">Phone Number</label>
                       <div className="relative group">
                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted group-focus-within:text-primary transition-colors" />
                         <input 
                           type="tel" 
                           placeholder="e.g. 1876543210"
                           required
                           disabled={isSubmitting}
                           value={newPhone}
                           onChange={e => setNewPhone(e.target.value)}
                           className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border dark:bg-base/50 rounded-2xl text-content-main placeholder:text-content-muted/30 focus:border-primary focus:bg-primary/5 dark:focus:bg-primary/10 outline-none font-bold transition-all disabled:opacity-50"
                         />
                       </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full mt-4 premium-btn py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                       {isSubmitting ? (
                         <>
                           <Loader2 className="w-5 h-5 animate-spin" />
                           Encrypting Credentials...
                         </>
                       ) : (
                         'Generate Credentials'
                       )}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                  
                  {/* Warning Header */}
                  <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-8">
                     <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 leading-tight">
                        WARNING: THIS CAN ONLY BE VIEWED ONCE. Please copy these details now.
                     </p>
                  </div>
                  
                  <div className="text-center mb-8">
                     <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 mx-auto mb-4 relative eco-glow">
                        <CheckCircle className="w-8 h-8 text-emerald-500 relative z-10" />
                     </div>
                     <h2 className="text-2xl font-black text-content-main tracking-tight">Collector Registered</h2>
                     <p className="text-xs font-bold text-content-muted uppercase tracking-widest mt-2">{newName}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                     <div className="p-4 rounded-2xl bg-base/5 border border-border group hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-content-muted mb-1 flex items-center gap-2 relative z-10"><User className="w-3 h-3"/> Collector ID</p>
                        <p className="text-xl font-bold tracking-widest text-content-main relative z-10">{generatedId}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-base/5 border border-border group hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-content-muted mb-1 flex items-center gap-2 relative z-10"><Key className="w-3 h-3"/> One-Time Password</p>
                        <p className="text-xl font-bold tracking-wider text-content-main relative z-10">{generatedPassword}</p>
                     </div>
                  </div>
                  
                  <button onClick={handleFinishAndSave} className="w-full premium-btn py-4 bg-content-main text-base rounded-2xl font-black uppercase tracking-widest shadow-xl">
                     OKAY, I COPIED IT
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
