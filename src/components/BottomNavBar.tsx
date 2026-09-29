import React from 'react';
import { 
  Home, 
  Clock, 
  CalendarDays, 
  Activity, 
  Newspaper, 
  Info 
} from 'lucide-react';

export type TabType = 'home' | 'hourly' | 'daily' | 'news' | 'earthquake' | 'about';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  hasRecentEarthquake?: boolean;
  hasUnreadNews?: boolean;
}

interface NavItem {
  id: TabType;
  labelKu: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelKu: 'سەرەکی', icon: Home },
  { id: 'hourly', labelKu: 'کاتژمێری', icon: Clock },
  { id: 'daily', labelKu: '٧ ڕۆژە', icon: CalendarDays },
  { id: 'news', labelKu: 'هەواڵی AI', icon: Newspaper },
  { id: 'earthquake', labelKu: 'بوومەلەرزە', icon: Activity },
  { id: 'about', labelKu: 'دەربارە', icon: Info },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  activeTab, 
  onTabChange,
  hasRecentEarthquake = true,
  hasUnreadNews = true,
}) => {
  return (
    <nav 
      aria-label="پەڕە سەرەکییەکان" 
      className="w-full px-2 sm:px-3 pb-2 pt-1 pointer-events-auto select-none shrink-0 z-40 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-transparent backdrop-blur-md"
    >
      <div className="max-w-md mx-auto rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.7)] px-1.5 py-1 flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const isEarthquake = item.id === 'earthquake';
          const isNews = item.id === 'news';
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-1 px-0.5 sm:px-1 rounded-2xl transition-all duration-300 min-h-[48px] cursor-pointer group ${
                isActive 
                  ? isEarthquake 
                    ? 'text-rose-400' 
                    : isNews
                    ? 'text-amber-300'
                    : 'text-cyan-300' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Glow Pill Background */}
              {isActive && (
                <div 
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isEarthquake
                      ? 'bg-rose-500/20 border border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : isNews
                      ? 'bg-amber-500/20 border border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-cyan-500/15 border border-cyan-400/35 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  }`} 
                />
              )}

              {/* Icon Container with Seismic / AI Badge */}
              <div className={`relative transition-transform duration-200 ${isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'}`}>
                <Icon 
                  size={19} 
                  className={
                    isActive 
                      ? isEarthquake 
                        ? 'drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]' 
                        : isNews
                        ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                        : 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : ''
                  } 
                />

                {/* Earthquake live pulse micro badge */}
                {isEarthquake && hasRecentEarthquake && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] animate-pulse" />
                )}

                {/* AI News fresh pulse micro badge */}
                {isNews && hasUnreadNews && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 transition-all select-none whitespace-nowrap ${
                  isActive 
                    ? isEarthquake 
                      ? 'font-black text-rose-300 scale-105' 
                      : isNews
                      ? 'font-black text-amber-200 scale-105'
                      : 'font-black text-cyan-200 scale-105' 
                    : 'text-slate-400 font-normal'
                }`}
              >
                {item.labelKu}
              </span>

              {/* Active Micro Dot */}
              {isActive && (
                <div 
                  className={`w-1 h-1 rounded-full mt-0.5 ${
                    isEarthquake 
                      ? 'bg-rose-400 shadow-[0_0_5px_#f43f5e]' 
                      : isNews
                      ? 'bg-amber-400 shadow-[0_0_5px_#fbbf24]'
                      : 'bg-cyan-400 shadow-[0_0_5px_#22d3ee]'
                  }`} 
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
