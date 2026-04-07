import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now();
    const newToast = {
      id,
      type: toast.type || 'info', // success, error, warning, info
      title: toast.title,
      message: toast.message,
      duration: toast.duration || 5000,
    };

    setToasts(prev => [...prev, newToast]);

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title, message, options = {}) => {
    return addToast({ type: 'success', title, message, ...options });
  }, [addToast]);

  const error = useCallback((title, message, options = {}) => {
    return addToast({ type: 'error', title, message, ...options });
  }, [addToast]);

  const warning = useCallback((title, message, options = {}) => {
    return addToast({ type: 'warning', title, message, ...options });
  }, [addToast]);

  const info = useCallback((title, message, options = {}) => {
    return addToast({ type: 'info', title, message, ...options });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, warning, info, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-8 right-8 z-[100] space-y-4 max-w-sm w-full">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const icons = {
    success: (
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ),
    error: (
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    ),
    warning: (
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    ),
    info: (
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
  };

  return (
    <div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`glass-card p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border flex items-start gap-4 group cursor-pointer relative overflow-hidden`}
      onClick={() => onRemove(toast.id)}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-30" />
      <div className="flex-shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-black text-content-main uppercase tracking-tight mb-1">{toast.title}</p>
        <p className="text-xs text-content-muted font-medium leading-relaxed">{toast.message}</p>
      </div>
      <button className="text-content-muted hover:text-content-main opacity-0 group-hover:opacity-100 transition-all">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
