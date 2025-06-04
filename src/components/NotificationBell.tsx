
import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
  count: number;
  darkMode: boolean;
}

const NotificationBell = ({ count, darkMode }: NotificationBellProps) => {
  return (
    <div className="relative">
      <button className={`p-3 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-110 ${
        darkMode 
          ? 'bg-white/10 hover:bg-white/20 text-white' 
          : 'bg-white/30 hover:bg-white/50 text-gray-800'
      }`}>
        <Bell size={20} />
      </button>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
