import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notification } = useApp();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#1C1E1B] text-white shadow-xl rounded-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {notification.type === 'info' ? (
        <Info className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      )}
      <span className="text-xs font-medium tracking-wide">{notification.message}</span>
    </div>
  );
};
