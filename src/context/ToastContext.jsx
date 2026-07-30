import { createContext, useState, useContext, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });

    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span className="toast-icon">🐾</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}