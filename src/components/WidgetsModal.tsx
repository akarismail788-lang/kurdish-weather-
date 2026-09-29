import React, { useState } from 'react';
import { WeatherData, TempUnit } from '../types/weather';
import { toFahrenheit } from '../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { 
  Smartphone, 
  X, 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Droplets,
  Wind,
  Sun
} from 'lucide-react';

interface WidgetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: WeatherData;
  tempUnit: TempUnit;
}

export const WidgetsModal: React.FC<WidgetsModalProps> = ({
  isOpen,
  onClose,
  weather,
  tempUnit,
}) => {
  const [selectedWidget, setSelectedWidget] = useState<'hero' | 'minimal' | 'strip'>('hero');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { current, daily, hourly, city } = weather;
  const today = daily[0];

  const formatTemp = (celsius: number) => {
    const val = tempUnit === 'F' ? toFahrenheit(celsius) : Math.round(celsius);
    return `${val}°`;
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-t-[36px] sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] text-slate-100 animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Layers size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                ویجێتەکانی سەر شاشەی سەرەکی (Home Screen Widgets)
              </h2>
              <span className="text-[11px] text-slate-400">
                دیزاینی گلاسمۆرفیزمی تایبەت بۆ شاشەی مۆبایل و تابلێت
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Widget Size Selector Tabs */}
        <div className="flex items-center gap-1.5 py-3 shrink-0">
          {[
            { id: 'hero', label: 'ویجێتی گەورە (4x2 Hero)' },
            { id: 'minimal', label: 'ویجێتی چوارگۆشە (2x2)' },
            { id: 'strip', label: 'ویجێتی کاتژمێری (4x1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedWidget(tab.id as typeof selectedWidget)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer text-center ${
                selectedWidget === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Widget Preview Canvas */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-2">
          {/* Simulated Android Desktop Wallpaper Background */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/70 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[220px]">
            {/* Ambient blur blob */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            {/* 1. 4x2 Hero Widget */}
            {selectedWidget === 'hero' && (
              <div className="w-full max-w-sm rounded-[28px] p-4 glass-panel border border-white/25 shadow-2xl relative overflow-hidden text-right">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-white">{city.nameKu}</span>
                      <span className="text-[10px] text-cyan-300 font-bold px-1.5 py-0.2 rounded bg-cyan-500/20">زیندوو</span>
                    </div>
                    <span className="text-[11px] text-slate-300 block mt-0.5">{current.descriptionKu}</span>
                  </div>

                  <WeatherIcon
                    name={
                      current.weatherCode === 0 ? (current.isDay ? 'Sun' : 'Moon') :
                      current.weatherCode <= 2 ? (current.isDay ? 'CloudSun' : 'CloudMoon') :
                      current.weatherCode >= 71 ? 'Snowflake' :
                      current.weatherCode >= 51 ? 'CloudRain' :
                      current.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
                    }
                    size={38}
                    className="w-10 h-10"
                  />
                </div>

                <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-white/10">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-white tabular-nums tracking-tighter">
                      {formatTemp(current.temperature).replace('°', '')}
                    </span>
                    <span className="text-xl font-light text-cyan-300 mr-1">°{tempUnit}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="inline-flex items-center gap-0.5 text-amber-300">
                      <ArrowUp size={12} /> {today ? formatTemp(today.tempMax) : '--'}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-cyan-300">
                      <ArrowDown size={12} /> {today ? formatTemp(today.tempMin) : '--'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-300 mt-2.5 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Droplets size={11} className="text-blue-400" /> {current.humidity}% شێ
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={11} className="text-teal-400" /> {current.windSpeed} کم/ک
                  </span>
                  <span className="flex items-center gap-1">
                    <Sun size={11} className="text-amber-400" /> UV {current.uvIndex}
                  </span>
                </div>
              </div>
            )}

            {/* 2. 2x2 Minimal Widget */}
            {selectedWidget === 'minimal' && (
              <div className="w-40 h-40 rounded-[32px] p-4 glass-panel border border-white/25 shadow-2xl flex flex-col justify-between text-right">
                <div className="flex items-center justify-between">
                  <WeatherIcon
                    name={
                      current.weatherCode === 0 ? (current.isDay ? 'Sun' : 'Moon') :
                      current.weatherCode <= 2 ? (current.isDay ? 'CloudSun' : 'CloudMoon') :
                      current.weatherCode >= 71 ? 'Snowflake' :
                      current.weatherCode >= 51 ? 'CloudRain' :
                      current.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
                    }
                    size={32}
                    className="w-8 h-8"
                  />
                  <span className="text-xs font-black text-white">{city.nameKu}</span>
                </div>

                <div>
                  <div className="text-3xl font-black text-white tabular-nums leading-none">
                    {formatTemp(current.temperature)}
                  </div>
                  <span className="text-[10px] text-slate-300 block mt-1 truncate">
                    {current.descriptionKu}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10 pt-1">
                  <span>ب: {today ? formatTemp(today.tempMax) : '--'}</span>
                  <span>ن: {today ? formatTemp(today.tempMin) : '--'}</span>
                </div>
              </div>
            )}

            {/* 3. 4x1 Hourly Strip Widget */}
            {selectedWidget === 'strip' && (
              <div className="w-full max-w-sm rounded-[24px] p-3 glass-panel border border-white/25 shadow-2xl">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-bold text-white">{city.nameKu} · کاتژمێری</span>
                  <span className="text-xs font-bold text-cyan-300">{formatTemp(current.temperature)}</span>
                </div>
                <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
                  {hourly.slice(0, 5).map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center py-1 px-1 rounded-xl bg-white/5 text-center">
                      <span className="text-[9px] text-slate-300">{i === 0 ? 'ئێستا' : h.formattedTime.split(' ')[0]}</span>
                      <div className="my-1">
                        <WeatherIcon
                          name={
                            h.weatherCode === 0 ? (h.isDay ? 'Sun' : 'Moon') :
                            h.weatherCode <= 2 ? (h.isDay ? 'CloudSun' : 'CloudMoon') :
                            h.weatherCode >= 71 ? 'Snowflake' :
                            h.weatherCode >= 51 ? 'CloudRain' : 'Cloud'
                          }
                          size={18}
                          className="w-4 h-4"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-white tabular-nums">{formatTemp(h.temperature)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action & Info */}
          <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">چۆنیەتی زیادکردن بۆ شاشە:</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'کۆپی کرا ✓' : 'کۆپیکردنی ویجێت'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              دەست لەسەر شاشەی سەرەکی مۆبایلەکەت دابگرە، دواتر بچۆ بەشی (Widgets) و لە بەشی «Kurdish Weather» ویجێتی دڵخوازی خۆت هەڵبژێرە.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
