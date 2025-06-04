
import React from 'react';

interface ProfileSectionProps {
  darkMode: boolean;
}

const ProfileSection = ({ darkMode }: ProfileSectionProps) => {
  return (
    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
      darkMode 
        ? 'bg-white/10 border-white/20 text-white' 
        : 'bg-white/30 border-white/40 text-gray-800'
    }`}>
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
        R
      </div>
      <span className="font-medium">Hi, Raiyan 👋</span>
    </div>
  );
};

export default ProfileSection;
