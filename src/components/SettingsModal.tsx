import React from 'react';
import { TempUnit, SpeedUnit } from '../types/weather';
import { AtmosphericMood, ThemePreference } from '../services/themeScheduler';
import { 
  X, 
  Settings, 
  Thermometer, 
  Wind, 
  Sparkles, 
  Check, 
  Database, 
  Globe, 
  Layers, 
  CloudLightning,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Flame,
  Sunrise,
  Sunset
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tempUnit: TempUnit;
  onSetTempUnit: (unit: TempUnit) => void;
  speedUnit: SpeedUnit;
  onSetSpeedUnit: (unit: SpeedUnit) => void;
  enableWeatherEffects: boolean;
  onToggleWeatherEffects: () => void;
  themePreference: ThemePreference;
  onSetThemePreference: (pref: ThemePreference) => void;
  forcedMood: AtmosphericMood | null;
  onSetForcedMood: (mood: AtmosphericMood | null) => void;
  onOpenWidgets: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  tempUnit,
  onSetTempUnit,
  speedUnit,
  onSetSpeedUnit,
  enableWeatherEffects,
  onToggleWeatherEffects,
  themePreference,
  onSetThemePreference,
  forcedMood,
  onSetForcedMood,
  onOpenWidgets,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-t-[36px] sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[88vh] text-slate-100 animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle for Mobile */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              ڕێکخستنە پێشکەوتووەکان
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 py-3 overflow-y-auto no-scrollbar pr-0.5">
          {/* 1. Smart Theme Scheduler & Atmosphere */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={17} className="text-amber-400" />
                <span className="text-xs font-bold text-white">شێوازی ڕووکار و کەش (Theme Scheduler)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'auto', label: 'خۆکار (کەشوهەوا و کات)' },
                { id: 'dark', label: 'شێوازی تاریک (شەو)' },
                { id: 'light', label: 'شێوازی ڕووناک (ڕۆژ)' },
                { id: 'aurora', label: 'شەبەنگی ئاسمانی' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSetThemePreference(t.id as ThemePreference);
                    onSetForcedMood(null);
                  }}
                  className={`py-2 px-2.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                    themePreference === t.id && forcedMood === null
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="truncate">{t.label}</span>
                  {themePreference === t.id && forcedMood === null && <Check size={14} />}
                </button>
              ))}
            </div>

            {/* Severe Weather Simulator & Demo Buttons */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] text-slate-400 block mb-1.5">تاقیکردنەوەی کەشە سەختەکان (Severe Weather Simulator):</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: null, label: 'ئاسایی' },
                  { id: 'storm', label: '⚡ زریان و تریشقە' },
                  { id: 'rain', label: '🌧️ لێزمەباران' },
                  { id: 'snow', label: '❄️ بەفربارین' },
                  { id: 'dust', label: '🌪️ تۆزوخۆڵ' },
                  { id: 'dawn', label: '🌅 خۆرهەڵاتن' },
                  { id: 'dusk', label: '🌇 خۆرئاوابوون' },
                ].map((m) => (
                  <button
                    key={String(m.id)}
                    onClick={() => onSetForcedMood(m.id as AtmosphericMood | null)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                      forcedMood === m.id
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Home Screen Widgets Preview Trigger */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                <Layers size={17} />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">ویجێتەکانی سەر شاشە (Widgets)</span>
                <span className="text-[10px] text-slate-300">دیزاینی 4x2 ،2x2 و 4x1 بۆ شاشەی مۆبایل</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenWidgets();
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              بینین
            </button>
          </div>

          {/* 3. Temperature Unit */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={17} className="text-rose-400" />
              <span className="text-xs font-bold text-white">یەکەی پلەی گەرمی</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSetTempUnit('C')}
                className={`py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  tempUnit === 'C'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <span>سیلیزی (°C)</span>
                {tempUnit === 'C' && <Check size={14} />}
              </button>

              <button
                onClick={() => onSetTempUnit('F')}
                className={`py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  tempUnit === 'F'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <span>فەهرەنهایت (°F)</span>
                {tempUnit === 'F' && <Check size={14} />}
              </button>
            </div>
          </div>

          {/* 4. Wind Speed Unit */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Wind size={17} className="text-teal-400" />
              <span className="text-xs font-bold text-white">یەکەی خێرایی با</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSetSpeedUnit('kmh')}
                className={`py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  speedUnit === 'kmh'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <span>کم / کاتژمێر</span>
                {speedUnit === 'kmh' && <Check size={14} />}
              </button>

              <button
                onClick={() => onSetSpeedUnit('mph')}
                className={`py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  speedUnit === 'mph'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <span>میل / کاتژمێر</span>
                {speedUnit === 'mph' && <Check size={14} />}
              </button>
            </div>
          </div>

          {/* 5. Live Atmospheric Particle Effects Toggle */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={17} className="text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white block">جووڵەی کەشوهەوای زیندوو</span>
                <span className="text-[10px] text-slate-400">نمایشکردنی باران، بەفر، تریشقە و تۆزوخۆڵ</span>
              </div>
            </div>

            <button
              onClick={onToggleWeatherEffects}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                enableWeatherEffects ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  enableWeatherEffects ? 'left-1' : 'left-7'
                }`}
              />
            </button>
          </div>

          {/* 6. Credits & Developer Distinction (Official Silver Theme) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950/85 to-slate-900/90 border border-slate-700/60 shadow-[0_4px_25px_rgba(192,192,192,0.06)] space-y-2 text-[11px] text-slate-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                <Globe size={14} className="text-cyan-400" />
                <span>كەشوهەوای کوردی (Kurdish Weather Pro)</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-[#C0C0C0] border border-[#C0C0C0]/30 shadow-sm">
                وەشانی 2.5
              </span>
            </div>
            <p className="leading-relaxed">
              دیزاین کراوە و دروست کراوە لەلایەن « <strong className="bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#94A3B8] bg-clip-text text-transparent font-black drop-shadow-[0_1px_4px_rgba(192,192,192,0.45)] tracking-wide">ئاکار ئیسماعیل (Akar Ismail)</strong> » بۆ خزمەتی نیشتمان و هاوڵاتیانی خۆشەویستی کوردستان.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
