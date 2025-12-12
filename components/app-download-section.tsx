'use client';

import { useState } from 'react';
import { Smartphone, QrCode, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple QR Code SVG Component (Demo)
function DemoQRCode() {
  return (
    <div className="w-32 h-32 bg-white p-3 rounded-lg shadow-lg">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="black"
      >
        {/* QR Code Pattern - Simplified demo pattern */}
        {/* Top-left corner */}
        <rect x="10" y="10" width="30" height="30" fill="black" />
        <rect x="15" y="15" width="20" height="20" fill="white" />
        <rect x="20" y="20" width="10" height="10" fill="black" />
        
        {/* Top-right corner */}
        <rect x="60" y="10" width="30" height="30" fill="black" />
        <rect x="65" y="15" width="20" height="20" fill="white" />
        <rect x="70" y="20" width="10" height="10" fill="black" />
        
        {/* Bottom-left corner */}
        <rect x="10" y="60" width="30" height="30" fill="black" />
        <rect x="15" y="65" width="20" height="20" fill="white" />
        <rect x="20" y="70" width="10" height="10" fill="black" />
        
        {/* Alignment pattern */}
        <rect x="40" y="40" width="20" height="20" fill="black" />
        <rect x="45" y="45" width="10" height="10" fill="white" />
        <rect x="47" y="47" width="6" height="6" fill="black" />
        
        {/* Data modules - random pattern */}
        <rect x="10" y="45" width="5" height="5" fill="black" />
        <rect x="20" y="45" width="5" height="5" fill="black" />
        <rect x="30" y="45" width="5" height="5" fill="black" />
        <rect x="50" y="10" width="5" height="5" fill="black" />
        <rect x="50" y="20" width="5" height="5" fill="black" />
        <rect x="50" y="30" width="5" height="5" fill="black" />
        <rect x="60" y="45" width="5" height="5" fill="black" />
        <rect x="70" y="45" width="5" height="5" fill="black" />
        <rect x="80" y="45" width="5" height="5" fill="black" />
        <rect x="45" y="65" width="5" height="5" fill="black" />
        <rect x="55" y="65" width="5" height="5" fill="black" />
        <rect x="65" y="65" width="5" height="5" fill="black" />
        <rect x="75" y="65" width="5" height="5" fill="black" />
        <rect x="85" y="65" width="5" height="5" fill="black" />
        <rect x="10" y="75" width="5" height="5" fill="black" />
        <rect x="20" y="75" width="5" height="5" fill="black" />
        <rect x="30" y="75" width="5" height="5" fill="black" />
        <rect x="50" y="75" width="5" height="5" fill="black" />
        <rect x="60" y="75" width="5" height="5" fill="black" />
        <rect x="70" y="75" width="5" height="5" fill="black" />
        <rect x="80" y="75" width="5" height="5" fill="black" />
        <rect x="85" y="10" width="5" height="5" fill="black" />
        <rect x="85" y="20" width="5" height="5" fill="black" />
        <rect x="85" y="30" width="5" height="5" fill="black" />
        <rect x="85" y="85" width="5" height="5" fill="black" />
        <rect x="75" y="85" width="5" height="5" fill="black" />
        <rect x="65" y="85" width="5" height="5" fill="black" />
        <rect x="55" y="85" width="5" height="5" fill="black" />
        <rect x="45" y="85" width="5" height="5" fill="black" />
        <rect x="35" y="85" width="5" height="5" fill="black" />
        <rect x="25" y="85" width="5" height="5" fill="black" />
        <rect x="15" y="85" width="5" height="5" fill="black" />
      </svg>
    </div>
  );
}

export function AppDownloadSection() {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | null>(null);

  const platforms = [
    {
      id: 'ios' as const,
      name: 'iOS App',
      icon: Apple,
    },
    {
      id: 'android' as const,
      name: 'Android App',
      icon: Smartphone,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 text-white"
    >
      {/* Left - Text Content */}
      <div className="text-center md:text-left max-w-md">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          Download the app
        </h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          Install the app and start searching smarter. Get instant notifications, save favorites, and access exclusive listings.
        </p>
      </div>

      {/* Middle - QR Code with Overlay */}
      <div className="flex flex-col items-center gap-2 relative">
        <div className="relative w-32 h-32">
          <AnimatePresence mode="wait">
            {selectedPlatform ? (
              <motion.div
                key="qr-code"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <DemoQRCode />
              </motion.div>
            ) : (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border-2 border-white/30"
              >
                <div className="text-center px-4">
                  <QrCode className="w-8 h-8 mx-auto mb-2 text-white/80" />
                  <p className="text-white text-sm font-medium">Select a platform</p>
                  <p className="text-white/70 text-xs mt-1">to view QR code</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {selectedPlatform && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/70 text-xs font-medium"
          >
            Scan to download
          </motion.p>
        )}
      </div>

      {/* Right - Platform Links */}
      <div className="flex flex-col gap-3 items-center md:items-start">
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          const isSelected = selectedPlatform === platform.id;
          
          return (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`flex items-center gap-2 transition-all duration-200 ${
                isSelected
                  ? 'text-white scale-105'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                isSelected
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-white/10 hover:bg-white/15'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
