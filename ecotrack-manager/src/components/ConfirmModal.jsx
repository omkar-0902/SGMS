import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'warning',
  confirmText = 'Confirm Action',
  cancelText = 'Cancel'
}) {
  const icons = {
    warning: <AlertTriangle className="w-8 h-8" />,
    info: <Info className="w-8 h-8" />,
    success: <CheckCircle className="w-8 h-8" />,
    error: <XCircle className="w-8 h-8" />,
  };

  const colors = {
    warning: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    info: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    success: 'text-primary bg-primary/10 border-primary/20',
    error: 'text-red-500 bg-red-500/10 border-red-500/20',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative glass-card rounded-[3rem] p-10 max-w-md w-full shadow-3xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-base/5 hover:bg-red-500/10 rounded-xl transition-all group"
            >
              <X className="w-5 h-5 text-content-muted group-hover:text-red-500" />
            </button>

            {/* Icon */}
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border ${colors[type]} shadow-2xl`}>
              {icons[type]}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-black text-content-main text-center mb-3 tracking-tight uppercase">
              {title}
            </h3>
            <p className="text-content-muted text-center mb-10 font-medium leading-relaxed">
              {message}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${
                  type === 'warning' || type === 'error'
                    ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600'
                    : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'
                } hover:scale-[1.02] active:scale-[0.98]`}
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 px-6 bg-base/10 hover:bg-base/20 text-content-muted font-black text-sm uppercase tracking-widest rounded-2xl transition-all border border-border"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
