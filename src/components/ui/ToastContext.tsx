import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MaterialIcon } from '../MaterialIcon';

export type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-lg shadow-xl border ${
                t.type === 'success' 
                  ? 'bg-white border-green-200 text-stone-900' 
                  : t.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-stone-900 border-stone-800 text-white'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                t.type === 'success' ? 'bg-green-100 text-green-700' :
                t.type === 'error' ? 'bg-red-200 text-red-800' :
                'bg-stone-800 text-stone-300'
              }`}>
                <MaterialIcon 
                  name={t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'info'} 
                  className="text-[18px]" 
                />
              </div>
              <p className="font-sans text-sm font-semibold pr-4">{t.message}</p>
              <button 
                onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))}
                className="ml-auto opacity-50 hover:opacity-100 transition-opacity"
              >
                <MaterialIcon name="close" className="text-[16px]" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
