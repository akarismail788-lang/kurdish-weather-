import React from 'react';
import { 
  WeatherData, 
  TempUnit, 
  SpeedUnit 
} from '../types/weather';
import { 
  toFahrenheit, 
  toMph, 
  getKurdishWindDirection 
} from '../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Sun, 
  Eye, 
  Thermometer, 
  Sunrise, 
  Sunset, 
  Sparkles,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Info,
  Layers,
  Heart,
  ShieldAlert
} from 'lucide-react';

interface HomeTabProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
  onSelectHourlyTab: () => void;
  onSelectDailyTab: () => void;
  onOpenWidgets?: () => void;
  onOpenNotifications?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  weather,
  tempUnit,
  speedUnit,
  onSelectHourlyTab,
  onSelectDailyTab,
  onOpenWidgets,
  onOpenNotifications,
}) => {
  const { current, hourly, daily, insights, city } = weather;

  const formatTemp = (celsius: number) => {
    const val = tempUnit === 'F' ? toFahrenheit(celsius) : Math.round(celsius);
    return `${val}°`;
  };

  const formatSpeed = (kmh: number) => {
    const val = speedUnit === 'mph' ? toMph(kmh) : Math.round(kmh);
    const unitText = speedUnit === 'mph' ? 'میل/ک' : 'کم/ک';
    return `${val} ${unitText}`;
  };

  const today = daily[0];

  // Determine if severe weather conditions are active
  const isSevere = current.weatherCode >= 95 || current.precipitation > 2.0 || current.temperature <= 1;

  return (
    <div className="space-y-4 px-4 pb-24 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Severe Weather Alert Banner if condition is critical */}
      {isSevere && (
        <div 
          onClick={onOpenNotifications}
          className="rounded-3xl p-3.5 bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)] flex items-center justify-between cursor-pointer transition-all hover:border-rose-400 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 animate-pulse">
              <ShieldAlert size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-rose-300">ئاگاداری کەشی سەخت لە {city.nameKu}</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </div>
              <span className="text-[10px] text-slate-300">
                {current.weatherCode >= 95 
                  ? 'هەورەتریشقەی بەهێز و زریان لە ئاسمانی ناوچەکەدا'
                  : current.precipitation > 2.0 
                  ? 'شەپۆلی بارانی بەخوڕ و لێزمە'
                  : 'شەپۆلی سەرما و بەستەڵەکی زستانە'}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-rose-300 font-bold group-hover:translate-x-[-2px] transition-transform">
            وردەکاری ←
          </span>
        </div>
      )}

      {/* 2. Hero Weather Card with Hyper-Realistic Glassmorphism */}
      <div className="relative overflow-hidden rounded-[36px] p-6 glass-panel border border-white/20 shadow-[0_16px_50px_rgba(0,0,0,0.45)] text-center flex flex-col items-center justify-center">
        {/* Diffuse Atmospheric Radial Glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        {/* Top Badges: Kurdish City Status & Widgets shortcut */}
        <div className="w-full flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 border border-white/15">
            کەشی ئێستا · {city.regionKu}
          </span>
          {onOpenWidgets && (
            <button
              onClick={onOpenWidgets}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-full border border-white/10 transition-colors cursor-pointer"
              title="بینینی ویجێتەکانی مۆبایل"
            >
              <Layers size={11} className="text-cyan-400" />
              <span>ویجێت</span>
            </button>
          )}
        </div>

        {/* Big Fluid Animated Weather Icon */}
        <div className="my-1.5 relative">
          <WeatherIcon 
            name={
              current.weatherCode === 0 ? (current.isDay ? 'Sun' : 'Moon') :
              current.weatherCode <= 2 ? (current.isDay ? 'CloudSun' : 'CloudMoon') :
              current.weatherCode >= 71 ? 'Snowflake' :
              current.weatherCode >= 51 ? 'CloudRain' :
              current.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
            } 
            size={76} 
            className="w-20 h-20"
          />
        </div>

        {/* Hero Current Temperature with Kurdish Typography */}
        <div className="flex items-start justify-center my-0.5">
          <span className="text-7xl sm:text-8xl font-black tracking-tighter text-white tabular-nums drop-shadow-md">
            {formatTemp(current.temperature).replace('°', '')}
          </span>
          <span className="text-3xl font-light text-cyan-300 mt-2 mr-1">
            °{tempUnit}
          </span>
        </div>

        {/* Kurdish Condition Description */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-1 drop-shadow-sm">
          {current.descriptionKu}
        </h2>

        {/* Feels like & High/Low Metadata with clean typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs text-slate-300 font-semibold bg-white/5 py-1.5 px-3 rounded-2xl border border-white/10">
          <span>هەستپێکراو: {formatTemp(current.apparentTemperature)}</span>
          <span aria-hidden="true" className="text-cyan-400/60">·</span>
          <span className="inline-flex items-center gap-0.5 text-amber-300 font-bold">
            <ArrowUp size={12} /> {today ? formatTemp(today.tempMax) : '--'}
          </span>
          <span aria-hidden="true" className="text-cyan-400/60">·</span>
          <span className="inline-flex items-center gap-0.5 text-cyan-300 font-bold">
            <ArrowDown size={12} /> {today ? formatTemp(today.tempMin) : '--'}
          </span>
        </div>
      </div>

      {/* 3. Predictive Analytics & Smart Meteorology Insights */}
      {insights.length > 0 && (
        <div className="space-y-2">
          {insights.map((insight) => {
            const isWarning = insight.severity === 'warning';
            const isPositive = insight.severity === 'positive';

            return (
              <div
                key={insight.id}
                className={`rounded-3xl p-3.5 backdrop-blur-xl border transition-all ${
                  isWarning
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-200 shadow-sm'
                    : isPositive
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200 shadow-sm'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                      isWarning
                        ? 'bg-amber-500/20 text-amber-300'
                        : isPositive
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    {isWarning ? (
                      <AlertTriangle size={18} />
                    ) : isPositive ? (
                      <Sparkles size={18} />
                    ) : (
                      <Info size={18} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <h3 className="text-xs font-bold tracking-tight mb-0.5 text-white">
                      {insight.titleKu}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      {insight.descriptionKu}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Quick 24h Hourly Forecast Strip with Micro Proportional Bars */}
      <div className="rounded-3xl p-4 glass-panel border border-white/15 shadow-md">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              پێشبینی کاتژمێری (٢٤ کاتژمێر)
            </h3>
          </div>
          <button
            onClick={onSelectHourlyTab}
            className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            بینینی هەمووی ←
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 pt-1 -mx-1 px-1">
          {hourly.slice(0, 14).map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-between min-w-[66px] py-3 px-2 rounded-2xl transition-all ${
                idx === 0
                  ? 'bg-cyan-500/25 border border-cyan-400/50 shadow-md ring-1 ring-cyan-400/30'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] font-semibold text-slate-300 select-none">
                {idx === 0 ? 'ئێستا' : item.formattedTime.split(' ')[0]}
              </span>

              <div className="my-2">
                <WeatherIcon
                  name={
                    item.weatherCode === 0 ? (item.isDay ? 'Sun' : 'Moon') :
                    item.weatherCode <= 2 ? (item.isDay ? 'CloudSun' : 'CloudMoon') :
                    item.weatherCode >= 71 ? 'Snowflake' :
                    item.weatherCode >= 51 ? 'CloudRain' :
                    item.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
                  }
                  size={24}
                  className="w-6 h-6"
                />
              </div>

              <span className="text-xs font-black text-white tabular-nums">
                {formatTemp(item.temperature)}
              </span>

              {item.precipitationProbability > 0 ? (
                <span className="text-[9px] font-bold text-cyan-300 mt-1 tabular-nums">
                  {item.precipitationProbability}%
                </span>
              ) : (
                <span className="text-[9px] text-transparent mt-1 select-none">
                  0%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Vital Meteorological Metrics Grid (8-Metrics) */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            وردەکاری و پێوەرەکانی کەشوهەوا
          </h3>
          <button
            onClick={onSelectDailyTab}
            className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            پێشبینی ٧ ڕۆژە ←
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Humidity */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">شێی هەوا</span>
              <Droplets size={16} className="text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {current.humidity}%
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              خاڵی شەونم: {formatTemp(current.dewPoint)}
            </span>
          </div>

          {/* 2. Wind Speed & Direction */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">خێرایی و ئاڕاستەی با</span>
              <Wind size={16} className="text-teal-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {formatSpeed(current.windSpeed)}
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1 truncate">
              {getKurdishWindDirection(current.windDirection)} · تاوەبا: {formatSpeed(current.windGusts)}
            </span>
          </div>

          {/* 3. UV Index */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">تیشکی سەروو بنەوشەیی</span>
              <Sun size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {current.uvIndex} <span className="text-xs font-normal text-slate-300">لە ١١</span>
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              {current.uvIndex <= 2 ? 'نزم و بێ مەترسی' : current.uvIndex <= 5 ? 'مامناوەند' : 'بەرز و بەهێز'}
            </span>
          </div>

          {/* 4. Air Pressure */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">پەستانی هەوا</span>
              <Gauge size={16} className="text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {current.pressure} <span className="text-xs font-normal text-slate-300">hPa</span>
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              {current.pressure > 1013 ? 'پەستانی بەرز (جێگیر)' : 'پەستانی ئاسایی'}
            </span>
          </div>

          {/* 5. Visibility */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">مەودای بینین</span>
              <Eye size={16} className="text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {current.visibility} <span className="text-xs font-normal text-slate-300">کم</span>
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              {current.visibility >= 10 ? 'ئاسۆی زۆر ڕوون' : 'بینینی سنووردار'}
            </span>
          </div>

          {/* 6. Cloud Cover */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">پۆشەری هەور</span>
              <Thermometer size={16} className="text-rose-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {current.cloudCover}%
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              {current.cloudCover < 20 ? 'ئاسمانی زۆر ساماڵ' : current.cloudCover < 70 ? 'پەڵەهەوری پەرش' : 'ئاسمانی هەوراوی'}
            </span>
          </div>

          {/* 7. Sunrise */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">خۆرهەڵاتن</span>
              <Sunrise size={16} className="text-amber-300" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {today?.sunrise || '05:45'}
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              بەرەبەیان لە کوردستان
            </span>
          </div>

          {/* 8. Sunset */}
          <div className="rounded-3xl p-3.5 glass-panel border border-white/10 flex flex-col justify-between text-right">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold">خۆرئاوابوون</span>
              <Sunset size={16} className="text-orange-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {today?.sunset || '18:20'}
            </div>
            <span className="text-[10px] text-slate-300/90 mt-1">
              ئێوارەی فێنک
            </span>
          </div>
        </div>
      </div>

      {/* 6. Akar Ismail's Official Silver Credit Distinction Footer Card */}
      <div className="rounded-3xl p-4.5 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-700/60 shadow-[0_4px_25px_rgba(192,192,192,0.06)] text-center flex flex-col items-center justify-center space-y-1.5 mt-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-200 font-bold">
          <Heart size={13} className="text-rose-500 fill-rose-500" />
          <span>ئەم ئەپە لەلایەن « <strong className="bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#94A3B8] bg-clip-text text-transparent font-black tracking-wide drop-shadow-[0_1px_4px_rgba(192,192,192,0.45)]">ئاکار ئیسماعیل (Akar Ismail)</strong> » دیزاین کراوە و دروست کراوە</span>
        </div>
        <p className="text-[10px] text-slate-400 font-normal">
          تایبەت بە پێشکەشکردنی داتای کەشوهەوا و بوومەلەرزەی خێرا بە زمانی دایک بۆ خەڵکی خۆشەویستی کوردستان
        </p>
      </div>
    </div>
  );
};
