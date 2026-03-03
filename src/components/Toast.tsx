import React, { useEffect } from 'react';

export type ToastProps = {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-rose-500' : 'bg-primary';
    const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className={`${bgColor} text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 min-w-[300px]`}>
                <span className="material-icons-round">{icon}</span>
                <span className="font-semibold text-sm flex-1">{message}</span>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center">
                    <span className="material-icons-round text-sm">close</span>
                </button>
            </div>
        </div>
    );
};

export default Toast;
