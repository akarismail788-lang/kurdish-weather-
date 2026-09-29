import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isMockupMode: boolean;
  onToggleMockup: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isMockupMode,
  onToggleMockup,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start text-slate-100 selection:bg-cyan-500/30">
      {/* Desktop View Switcher Control */}
      <aside aria-label="شاشە و ئامێر" className="hidden lg:flex fixed top-4 left-4 z-50 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-xl text-xs text-slate-300">
        <span className="text-[11px] text-slate-400 font-medium">شێوازی پیشاندان:</span>
        <button
          onClick={onToggleMockup}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs font-medium cursor-pointer ${
            isMockupMode
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
          title="شێوازی ئەندرۆید"
        >
          <Smartphone size={14} />
          <span>ئەندرۆید</span>
        </button>
        <button
          onClick={onToggleMockup}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs font-medium cursor-pointer ${
            !isMockupMode
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
          title="تەواوی شاشە"
        >
          <Monitor size={14} />
          <span>تەواوی شاشە</span>
        </button>
      </aside>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isMockupMode
            ? 'lg:my-4 lg:max-w-[440px] lg:h-[920px] lg:rounded-[50px] lg:border-[8px] lg:border-slate-800 lg:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col h-screen'
            : 'max-w-4xl h-screen relative flex flex-col overflow-hidden'
        }`}
      >
        {/* Android Status Bar */}
        <div
          dir="ltr"
          className="shrink-0 z-40 w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs font-medium text-white/90 select-none bg-black/40 backdrop-blur-sm pointer-events-none"
        >
          {/* Time (Left side on Android LTR status bar) */}
          <span className="font-semibold text-[13px] tracking-tight tabular-nums">
            {currentTime || '12:30'}
          </span>

          {/* Android Punch Hole Camera (Mockup mode only) */}
          {isMockupMode && (
            <div className="w-4 h-4 rounded-full bg-black/95 border border-slate-700/60 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900/90" />
            </div>
          )}

          {/* Status Icons (Right side) */}
          <div className="flex items-center gap-2 text-white/80">
            <div className="flex items-end gap-0.5 h-3">
              <div className="w-0.5 h-1 bg-white/90 rounded-sm" />
              <div className="w-0.5 h-1.5 bg-white/90 rounded-sm" />
              <div className="w-0.5 h-2.5 bg-white/90 rounded-sm" />
              <div className="w-0.5 h-3 bg-white/90 rounded-sm" />
            </div>
            <Wifi size={13} className="text-white/90" />
            <div className="flex items-center gap-1">
              <Battery size={14} className="text-white/90" />
            </div>
          </div>
        </div>

        {/* Dynamic Full Height Body (Header -> Scrollable Content -> Persistent Bottom Nav) */}
        <div className="flex-1 min-h-0 w-full relative flex flex-col overflow-hidden">
          {children}
        </div>

        {/* Android Gesture Navigation Pill at Bottom */}
        <div className="shrink-0 w-full pt-1 pb-2 flex justify-center items-center pointer-events-none select-none z-40 bg-black/40 backdrop-blur-sm">
          <div className="w-28 h-1 rounded-full bg-white/40 shadow-sm" />
        </div>
      </div>
    </div>
  );
};
