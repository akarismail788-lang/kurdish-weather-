import React from 'react';
import { AirQualityData } from '../types/weather';
import { ShieldCheck, Wind, Sun, Heart, AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface AirQualityTabProps {
  airQuality: AirQualityData;
}

export const AirQualityTab: React.FC<AirQualityTabProps> = ({ airQuality }) => {
  const { usAqi, pm2_5, pm10, ozone, nitrogenDioxide, sulphurDioxide, carbonMonoxide, dust, uvIndex, statusKu, summaryKu, color } = airQuality;

  // Calculate percentage of US AQI gauge (0 - 300)
  const aqiPercentage = Math.min(100, Math.max(0, (usAqi / 300) * 100));

  // UV risk description
  const uvLevelKu =
    uvIndex <= 2 ? 'نزم و بێ مەترسی' :
    uvIndex <= 5 ? 'مامناوەند' :
    uvIndex <= 7 ? 'بەرز' :
    uvIndex <= 10 ? 'زۆر بەرز' : 'مەترسیدار';

  return (
    <div className="space-y-4 px-4 pb-20 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Main Air Quality Gauge Card */}
      <div className="rounded-3xl p-6 glass-panel border border-white/20 shadow-lg relative overflow-hidden text-center">
        {/* Subtle ambient light */}
        <div 
          className="absolute -top-16 inset-x-0 h-40 opacity-20 blur-3xl rounded-full pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            <h2 className="text-sm font-bold text-white">
              کوالیتی و خاوێنیی هەوا (AQI)
            </h2>
          </div>
          <span 
            className="text-xs font-bold px-2.5 py-1 rounded-full border"
            style={{ 
              backgroundColor: `${color}20`, 
              borderColor: `${color}60`, 
              color: color 
            }}
          >
            {statusKu}
          </span>
        </div>

        {/* Big AQI Number */}
        <div className="my-2">
          <div className="text-6xl font-black text-white tabular-nums drop-shadow-sm">
            {usAqi}
          </div>
          <span className="text-xs text-slate-300 font-medium">
            پێوەری جیهانی US AQI
          </span>
        </div>

        {/* Progress Bar Gauge */}
        <div className="w-full max-w-xs mx-auto mt-4 mb-2">
          <div className="h-3 w-full rounded-full bg-white/10 relative overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-700 shadow-sm"
              style={{
                width: `${Math.max(8, aqiPercentage)}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-medium px-1">
            <span>٠ (زۆرباش)</span>
            <span>٥٠ (باش)</span>
            <span>١٠٠ (مامناوەند)</span>
            <span>١٥٠+ (پیسبوو)</span>
          </div>
        </div>

        {/* Kurdish Summary Text */}
        <p className="text-xs text-slate-200 mt-4 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/10">
          {summaryKu}
        </p>
      </div>

      {/* 2. UV Index Meter Card */}
      <div className="rounded-3xl p-5 glass-panel border border-white/15">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sun size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              تیشکی سەروو بنەوشەیی (UV Index)
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            {uvLevelKu}
          </span>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="text-4xl font-black text-white tabular-nums">
            {uvIndex} <span className="text-sm font-normal text-slate-400">/ ١١</span>
          </div>
          <div className="flex-1 text-xs text-slate-300 leading-relaxed">
            {uvIndex <= 2
              ? 'مەترسی نییە، دەتوانیت بەبێ کێشە لە دەرەوە بیت.'
              : uvIndex <= 5
              ? 'تیشک لە ئاستی مامناوەندە، چاویلکەی خۆر باشە.'
              : 'تیشک بەهێزە! تکایە کرێمی دژەخۆر، کڵاو، و چاویلکە بەکاربهێنە.'}
          </div>
        </div>
      </div>

      {/* 3. Detailed Pollutant Compounds */}
      <div className="rounded-3xl p-5 glass-panel border border-white/15">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 px-1">
          گەردیلە و پێکهاتە سەرەکییەکانی هەوا
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {/* PM2.5 */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">PM2.5 (گەردیلەی ورد)</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {pm2_5} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">ئاستی سەلامەت</span>
          </div>

          {/* PM10 */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">PM10 (تۆزوخۆڵ)</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {pm10} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-medium">ئاسایی</span>
          </div>

          {/* O3 Ozone */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">O₃ (ئۆزۆن)</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {ozone} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-300 font-medium">مامناوەند</span>
          </div>

          {/* NO2 */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">NO₂ (دووەم ئۆکسیدی نایترۆجین)</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {nitrogenDioxide} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">نزم</span>
          </div>

          {/* SO2 */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">SO₂ (دووەم ئۆکسیدی گۆگرد)</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {sulphurDioxide} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">بێ مەترسی</span>
          </div>

          {/* Dust */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block mb-0.5">تۆزی بیابان (Dust)</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {dust} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-medium">بێ کێشە</span>
          </div>
        </div>
      </div>

      {/* 4. Kurdish Health & Lifestyle Guidance */}
      <div className="rounded-3xl p-5 glass-panel border border-white/15">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 px-1">
          ڕێنمایی تەندروستی بۆ ژیانی ڕۆژانە
        </h3>

        <div className="space-y-2.5 text-xs text-slate-200">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <CheckCircle size={16} />
            </div>
            <div>
              <span className="font-bold block text-white">وەرزش و ڕاکردنی دەرەوە</span>
              <span className="text-slate-300 text-[11px]">گونجاو و لەبارە بۆ هەموو جۆرە ڕاهێنانێکی وەرزشی لە ناو سروشتدا.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
              <Wind size={16} />
            </div>
            <div>
              <span className="font-bold block text-white">هەواگۆڕکێی ماڵ و پەنجەرەکان</span>
              <span className="text-slate-300 text-[11px]">کردنەوەی پەنجەرە لە بەیانیاندا یارمەتیدەرە لە پاکبوونەوەی هەوای ژوور.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <Heart size={16} />
            </div>
            <div>
              <span className="font-bold block text-white">کەسانی تووشبووی ڕەبۆ و حەساسیەت</span>
              <span className="text-slate-300 text-[11px]">ئەگەر پلەی گەرما زۆر نزم بوو، دەم و لووتتان دابپۆشن بۆ پاراستنی کۆئەندامی هەناسە.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
