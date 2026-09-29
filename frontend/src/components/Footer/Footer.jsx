import React from 'react';
import { CheckCircle2, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-2 text-xs text-[var(--color-text-muted)] font-medium bg-[var(--color-surface)]">
      {/* Left: App Info */}
      <div className="flex items-center gap-4">
        <p>&copy; {currentYear} ComplianceOS India</p>
        <span className="text-[var(--color-border-subtle)]">|</span>
        <div className="flex items-center gap-1.5">
          <Globe size={14} className="text-[var(--color-primary)]" />
          <span>FSSAI V.2025.04.1 Standard</span>
        </div>
      </div>

      {/* Right: Status Info */}
      <div className="flex items-center gap-6 mt-2 md:mt-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse"></div>
          <span>Cloud Sync Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-[var(--color-primary)]" />
          <span>Legally Encrypted Logbook</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;