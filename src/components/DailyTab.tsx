import React, { useState } from 'react';
import { DailyForecastItem, TempUnit, SpeedUnit } from '../types/weather';
import { toFahrenheit, toMph } from '../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { CalendarDays, Sunrise, Sunset, Wind, Droplets, ChevronDown, ChevronUp } from 'lucide-react';

interface DailyTabProps {
  daily: DailyForecastItem[];
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
}

export const DailyTab: React.FC<DailyTabProps> = ({
  daily,
  tempUnit,
  speedUnit,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const formatTemp = (celsius: number) => {
    const val = tempUnit === 'F' ? toFahrenheit(celsius) : Math.round(celsius);
    return `${val}°`;
  };

  const formatSpeed = (kmh: number) => {
    const val = speedUnit === 'mph' ? toMph(kmh) : Math.round(kmh);
    const unitText = speedUnit === 'mph' ? 'میل/ک' : 'کم/ک';
    return `${val} ${unitText}`;
  };

  // Find overall min and max across all 7 days to calculate proportional temperature gradient bars
  const allMins = daily.map(d => d.tempMin);
  const allMaxs = daily.map(d => d.tempMax);
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const globalRange = Math.max(1, globalMax - globalMin);

  return (
    <div className="space-y-4 px-4 pb-20 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-3xl p-4 glass-panel border border-white/15 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <CalendarDays size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              پێشبینی کەشوهەوای ٧ ڕۆژی داهاتوو
            </h2>
            <p className="text-[11px] text-slate-300">
              پلەی گەرمی پێشبینیکراو و ئەگەری بارانبارین
            </p>
          </div>
        </div>
      </div>

      {/* 2. 7-Day Interactive List */}
      <div className="space-y-2.5">
        {daily.map((item, idx) => {
          const isExpanded = expandedIndex === idx;

          // Proportional range bar calculations
          const leftPercent = Math.max(0, Math.min(100, ((item.tempMin - globalMin) / globalRange) * 100));
          const rightPercent = Math.max(0, Math.min(100, ((globalMax - item.tempMax) / globalRange) * 100));
          const barWidth = Math.max(12, 100 - leftPercent - rightPercent);

          return (
            <div
              key={idx}
              className={`rounded-3xl transition-all overflow-hidden border ${
                isExpanded
                  ? 'bg-slate-900/80 border-cyan-500/40 shadow-lg'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              {/* Main Day Row Trigger */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-right cursor-pointer group"
              >
                {/* Left: Day & Icon & Kurdish Description */}
                <div className="flex items-center gap-3 min-w-[120px]">
                  <WeatherIcon
                    name={
                      item.weatherCode === 0 ? 'Sun' :
                      item.weatherCode <= 2 ? 'CloudSun' :
                      item.weatherCode >= 71 ? 'Snowflake' :
                      item.weatherCode >= 51 ? 'CloudRain' :
                      item.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
                    }
                    size={26}
                    className="w-7 h-7 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {item.dayKu}
                    </div>
                    <span className="text-[11px] text-slate-300 block">
                      {item.descriptionKu}
                    </span>
                  </div>
                </div>

                {/* Middle: Temperature Range Bar */}
                <div className="hidden sm:flex flex-1 items-center gap-3 px-6">
                  <span className="text-xs text-slate-400 font-medium tabular-nums min-w-[32px] text-left">
                    {formatTemp(item.tempMin)}
                  </span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 shadow-sm"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${barWidth}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white tabular-nums min-w-[32px] text-right">
                    {formatTemp(item.tempMax)}
                  </span>
                </div>

                {/* Right: Rain % & Temperature & Chevron */}
                <div className="flex items-center gap-3">
                  {item.precipitationProbabilityMax > 0 && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-300 tabular-nums">
                      <Droplets size={12} />
                      <span>{item.precipitationProbabilityMax}%</span>
                    </div>
                  )}

                  {/* Compact Temp for mobile */}
                  <div className="sm:hidden text-left tabular-nums text-xs">
                    <span className="font-bold text-white ml-1.5">{formatTemp(item.tempMax)}</span>
                    <span className="text-slate-400">{formatTemp(item.tempMin)}</span>
                  </div>

                  <div className="text-slate-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              {/* Proportional Range Bar for Mobile View (visible when screen is narrow) */}
              <div className="sm:hidden px-4 pb-2 -mt-1 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 tabular-nums">
                  {formatTemp(item.tempMin)}
                </span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${barWidth}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-bold text-white tabular-nums">
                  {formatTemp(item.tempMax)}
                </span>
              </div>

              {/* Expanded Card Details (Sun, Wind, Rain, Advice) */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-white/10 bg-white/[0.02] text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
                    {/* Sunrise */}
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-center gap-1 text-amber-300 mb-1">
                        <Sunrise size={15} />
                        <span className="text-[11px] font-medium">خۆرهەڵاتن</span>
                      </div>
                      <span className="font-bold text-white tabular-nums text-xs">
                        {item.sunrise}
                      </span>
                    </div>

                    {/* Sunset */}
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                        <Sunset size={15} />
                        <span className="text-[11px] font-medium">خۆرئاوابوون</span>
                      </div>
                      <span className="font-bold text-white tabular-nums text-xs">
                        {item.sunset}
                      </span>
                    </div>

                    {/* Rain amount */}
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                        <Droplets size={15} />
                        <span className="text-[11px] font-medium">بڕی باران</span>
                      </div>
                      <span className="font-bold text-white tabular-nums text-xs">
                        {item.precipitationSum > 0 ? `${item.precipitationSum} ملم` : 'هیچ'}
                      </span>
                    </div>

                    {/* Max Wind */}
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-center gap-1 text-teal-400 mb-1">
                        <Wind size={15} />
                        <span className="text-[11px] font-medium">بەرزترین با</span>
                      </div>
                      <span className="font-bold text-white tabular-nums text-xs">
                        {formatSpeed(item.windSpeedMax)}
                      </span>
                    </div>
                  </div>

                  {/* Kurdish summary advice for that day */}
                  <div className="mt-3 p-3 rounded-2xl bg-cyan-950/30 border border-cyan-800/30 text-[11px] text-cyan-200 leading-relaxed">
                    💡 پێشبینی: ڕۆژی {item.dayKu} کەشوهەوا {item.descriptionKu} دەبێت لەگەڵ پلەی گەرمی نێوان {formatTemp(item.tempMin)} بۆ {formatTemp(item.tempMax)}.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
