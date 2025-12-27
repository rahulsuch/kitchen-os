import React from 'react';
import { CheckCircle2, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-2 text-xs text-gray-500 font-medium">
      {/* Left: App Info */}
      <div className="flex items-center gap-4">
        <p>&copy; {currentYear} ComplianceOS India</p>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1">
          <Globe size={14} />
          <span>FSSAI V.2025.04.1 Standard</span>
        </div>
      </div>

      {/* Right: Status Info */}
      <div className="flex items-center gap-6 mt-2 md:mt-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Cloud Sync Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-blue-500" />
          <span>Legally Encrypted Logbook</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;