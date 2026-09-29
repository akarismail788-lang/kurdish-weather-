/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, ShieldCheck, Check } from 'lucide-react';

interface OfflineBannerProps {
  onRetry: () => void;
  lastUpdatedStr?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ onRetry, lastUpdatedStr }) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  const handleManualRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setTimeout(() => setIsRetrying(false), 800);
    }
  };

  return (
    <div className="mx-3 my-2 p-2.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between shadow-lg backdrop-blur-md animate-fadeIn z-30 relative">
      <div className="flex items-center gap-2 pr-1">
        <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
          <WifiOff size={15} />
        </div>
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <span>دۆخی ئۆفلاین (هێڵی ئینتەرنێت پچڕاوە)</span>
            <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-normal">
              <ShieldCheck size={10} />
              <span>داتای ئەنکریپتکراو</span>
            </span>
          </div>
          <span className="text-[10px] text-amber-200/80">
            زانیارییە پاشەکەوتکراوەکان بەکاردەهێنرێن {lastUpdatedStr ? `(کاتی نوێکردنەوە: ${lastUpdatedStr})` : ''}
          </span>
        </div>
      </div>

      <button
        onClick={handleManualRetry}
        disabled={isRetrying}
        className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm shrink-0"
      >
        <RefreshCw size={12} className={isRetrying ? 'animate-spin' : ''} />
        <span>دووبارە</span>
      </button>
    </div>
  );
};
