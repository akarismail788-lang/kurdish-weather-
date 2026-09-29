import React from 'react';
import { MapPin, Navigation, RefreshCw, Settings, ChevronDown, Bell } from 'lucide-react';
import { KurdistanCity } from '../types/weather';

interface TopAppBarProps {
  currentCity: KurdistanCity;
  onOpenCityPicker: () => void;
  onUseCurrentLocation: () => void;
  onRefresh: () => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  isRefreshing: boolean;
  isLocating: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentCity,
  onOpenCityPicker,
  onUseCurrentLocation,
  onRefresh,
  onOpenSettings,
  onOpenNotifications,
  unreadNotificationsCount,
  isRefreshing,
  isLocating,
}) => {
  return (
    <header className="shrink-0 z-30 w-full px-3 sm:px-4 pt-1.5 pb-2 flex items-center justify-between pointer-events-auto bg-slate-950/50 backdrop-blur-md border-b border-white/5">
      {/* Zone 1: City Selector Trigger */}
      <button
        onClick={onOpenCityPicker}
        className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-xl border border-white/15 transition-all text-right cursor-pointer group shadow-sm max-w-[190px] sm:max-w-none"
        title="گۆڕینی شار"
      >
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform shrink-0">
          <MapPin size={16} />
        </div>
        <div className="flex flex-col text-right truncate">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight truncate">
              {currentCity.nameKu}
            </span>
            <ChevronDown size={13} className="text-slate-300 group-hover:translate-y-0.5 transition-transform shrink-0" />
          </div>
          <span className="text-[10px] text-slate-300/80 font-normal leading-tight truncate">
            {currentCity.regionKu}
          </span>
        </div>
      </button>

      {/* Zone 2: Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Smart Notifications Button with unread badge */}
        <button
          onClick={onOpenNotifications}
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center text-slate-200 hover:text-cyan-300 backdrop-blur-xl transition-all cursor-pointer"
          title="ئاگادارکردنەوە زیرەکەکان"
        >
          <Bell size={15} />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse">
              {unreadNotificationsCount > 9 ? '+9' : unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* GPS Current Location button */}
        <button
          onClick={onUseCurrentLocation}
          disabled={isLocating}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all cursor-pointer ${
            isLocating
              ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 animate-pulse'
              : 'bg-white/10 hover:bg-white/15 active:scale-95 border-white/15 text-slate-200 hover:text-white'
          }`}
          title="دۆزینەوەی شوێنی من (GPS)"
        >
          <Navigation size={15} className={isLocating ? 'animate-spin' : ''} />
        </button>

        {/* Live Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all cursor-pointer ${
            isRefreshing
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              : 'bg-white/10 hover:bg-white/15 active:scale-95 border-white/15 text-slate-200 hover:text-white'
          }`}
          title="نوێکردنەوەی هەموو زانیارییەکان"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-cyan-400' : ''} />
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white backdrop-blur-xl transition-all cursor-pointer"
          title="ڕێکخستنەکان"
        >
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
};
