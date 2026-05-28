'use client';

import React from 'react';

export const PexyLogo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">✨</span>
      </div>
      {/* Logo Text */}
      <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Pexy
      </span>
    </div>
  );
};

export const PexyMascot = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-4xl',
    xl: 'w-20 h-20 text-5xl'
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <span className="text-white font-bold">✨</span>
    </div>
  );
};

export const PexyLogoAnimated = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Main Logo */}
      <div className="relative">
        {/* Gradient background that rotates */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        
        {/* Actual content */}
        <div className="relative bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl p-6 flex flex-col items-center gap-2">
          <div className="text-5xl">✨</div>
          <div className="text-white font-bold text-lg">Pexy AI</div>
          <div className="text-white text-xs text-center">Your AI Co-Pilot</div>
        </div>
      </div>
    </div>
  );
};

export const PexyIconSimple = () => {
  return (
    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
      <span className="text-white text-2xl font-bold">P</span>
    </div>
  );
};

export const PexyLettermark = () => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pexy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      <rect width="64" height="64" rx="12" fill="url(#pexy-gradient)" />
      
      <text x="32" y="48" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">
        P
      </text>
    </svg>
  );
};

export const PexyWordmark = () => {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      <rect x="10" y="20" width="40" height="40" rx="8" fill="url(#text-gradient)" />
      <text x="30" y="55" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">✨</text>
      
      <text x="65" y="58" fontSize="32" fontWeight="bold" fill="url(#text-gradient)" fontFamily="Arial, sans-serif">
        Pexy AI
      </text>
    </svg>
  );
};
