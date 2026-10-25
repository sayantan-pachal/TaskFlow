import React, { createContext, useContext, useState, useCallback } from "react";
import { CircleCheck, CircleX } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: "", type: null, visible: false });

    const showToast = useCallback((message, type = "error") => {
        setToast({ message, type, visible: true });

        // Auto-hide after 3 seconds (reduced from 4 for snappier UX)
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            {children}

            {/* Global Toast UI */}
            {toast.visible && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 px-4 py-3 min-w-70 max-w-[90vw] rounded-2xl shadow-2xl animate-toastDrop flex items-center gap-3 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800">
                    
                    {/* Themed Icon Container */}
                    <div className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full ${
                        toast.type === "success" 
                        ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                        : "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                    }`}>
                        {toast.type === "success" ? (
                            <CircleCheck size={18} strokeWidth={2.5} />
                        ) : (
                            <CircleX size={18} strokeWidth={2.5} />
                        )}
                    </div>

                    <span className="text-sm font-semibold text-slate-800 dark:text-gray-100">
                        {toast.message}
                    </span>
                </div>
            )}
        </ToastContext.Provider>
    );
};

// Custom Hook for easy access
export const useToast = () => useContext(ToastContext);