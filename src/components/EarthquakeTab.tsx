import React, { useState } from 'react';
import { EarthquakeItem, EarthquakeStats } from '../types/earthquake';
import { 
  Activity, 
  RefreshCw, 
  ShieldAlert, 
  MapPin, 
  Flame, 
  Info, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Radio,
  Compass
} from 'lucide-react';

interface EarthquakeTabProps {
  items: EarthquakeItem[];
  stats: EarthquakeStats;
  isLoading: boolean;
  onRefresh: () => void;
}

type FilterType = 'all' | 'kurdistan' | 'mag3' | 'mag4';

export const EarthquakeTab: React.FC<EarthquakeTabProps> = ({
  items,
  stats,
  isLoading,
  onRefresh,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showSafetyGuide, setShowSafetyGuide] = useState<boolean>(false);
  const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeItem | null>(null);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filter === 'kurdistan') return item.isKurdistanRegion;
    if (filter === 'mag3') return item.magnitude >= 3.0;
    if (filter === 'mag4') return item.magnitude >= 4.0;
    return true;
  });

  return (
    <div className="space-y-4 px-4 pb-24 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Live Seismic Radar Header Card */}
      <div className="rounded-3xl p-5 glass-panel border border-white/20 shadow-xl relative overflow-hidden">
        {/* Pulsing Seismic Waves Effect */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-rose-500/15 blur-2xl pointer-events-none animate-pulse" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-rose-500/10 pointer-events-none" 
          style={{ 
            animationName: 'ping',
            animationDuration: '4s',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            animationIterationCount: 'infinite',
          }} 
        />

        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 relative">
              <Activity size={22} className="animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/30 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white tracking-tight">
                  چاودێری بوومەلەرزەی ڕاستەوخۆ
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <Radio size={10} className="animate-pulse" />
                  زیندوو
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                هێڵی زاگرۆس، کوردستان و ناوچەکانی دەوروبەر
              </p>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center text-slate-200 transition-all cursor-pointer ${
              isLoading ? 'opacity-50' : ''
            }`}
            title="نوێکردنەوەی داتا"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin text-rose-400' : ''} />
          </button>
        </div>

        {/* 2. Key 24h Seismic Metrics */}
        <div className="grid grid-cols-3 gap-2.5 mt-3.5 relative z-10">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">چالاکی ٢٤ کاتژمێر</span>
            <span className="text-lg font-black text-white tabular-nums">
              {stats.total24h}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">لە ناوچەکەدا</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">بەرزترین گوڕ</span>
            <span className="text-lg font-black text-rose-400 tabular-nums">
              {stats.maxMagnitude > 0 ? stats.maxMagnitude.toFixed(1) : '--'}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">ڕێختەر</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">لە کوردستان</span>
            <span className="text-lg font-black text-amber-300 tabular-nums">
              {stats.kurdistanCount}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">نزیکترین خاڵ</span>
          </div>
        </div>
      </div>

      {/* 3. Safety Guidance Accordion Toggle */}
      <div className="rounded-3xl glass-panel border border-white/15 overflow-hidden">
        <button
          onClick={() => setShowSafetyGuide(!showSafetyGuide)}
          className="w-full p-3.5 flex items-center justify-between text-right cursor-pointer hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldAlert size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                ڕێنماییەکانی بەرگری شارستانی لە کاتی بوومەلەرزەدا
              </span>
              <span className="text-[10px] text-slate-300">
                چۆن لە کاتی لەرزیندا خۆت و خێزانەکەت بپارێزیت؟
              </span>
            </div>
          </div>
          {showSafetyGuide ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {showSafetyGuide && (
          <div className="px-4 pb-4 pt-1 border-t border-white/10 bg-black/20 text-xs space-y-2.5 text-slate-200">
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-center text-xs shrink-0 flex items-center justify-center">١</span>
              <p className="leading-relaxed">
                <strong>دابنیشە، خۆت داپۆشە، دەست بگرە (Drop, Cover, Hold On):</strong> دەستبەجێ بچۆ ژێر مێزێکی بەهێز یان کونجی دیوار و سەر و ملت بە دەستەکانت بپارێزە.
              </p>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-center text-xs shrink-0 flex items-center justify-center">٢</span>
              <p className="leading-relaxed">
                <strong>دوورکەوتنەوە لە مەترسی:</strong> لە پەنجەرە، ئاوێنە، کەنتۆر، و لوسترای بەستراو دوور بکەوەرەوە تا لەرزینەکە کۆتایی دێت.
              </p>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-center text-xs shrink-0 flex items-center justify-center">٣</span>
              <p className="leading-relaxed">
                <strong>بەکارنەهێنانی بەرزکەرەوە (ئەسانسۆر):</strong> بە هیچ شێوەیەک ئەسانسۆر بەکارمەهێنە. پاش وەستانی لەرزینەکە، بە هێواشی لە ڕێی پەیژەوە بڕۆنە دەرەوە بۆ گۆڕەپانی کراوە.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Filters Segmented Bar */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'هەموو' },
            { id: 'kurdistan', label: 'کوردستان' },
            { id: 'mag3', label: 'گوڕی ٣+' },
            { id: 'mag4', label: 'گوڕی ٤+' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as FilterType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-400 font-medium tabular-nums shrink-0">
          {filteredItems.length} ڕووداو
        </span>
      </div>

      {/* 5. Live Earthquake List */}
      <div className="space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl p-8 glass-panel border border-white/10 text-center">
            <Activity size={32} className="mx-auto text-slate-500 mb-2 opacity-50" />
            <h3 className="text-sm font-bold text-slate-300">هیچ چالاکییەکی بەهێز تۆمار نەکراوە</h3>
            <p className="text-xs text-slate-400 mt-1">
              لە ئێستادا هیچ بوومەلەرزەیەک بەم پێوەرە لە ناوچەکەدا تۆمار نەکراوە.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSelected = selectedEarthquake?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedEarthquake(isSelected ? null : item)}
                className={`rounded-3xl transition-all border overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-rose-500/50 shadow-lg'
                    : 'glass-panel border-white/10 hover:border-white/20'
                }`}
              >
                <div className="p-3.5 flex items-center justify-between">
                  {/* Left: Magnitude Badge */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black text-white shrink-0 shadow-md border"
                      style={{
                        backgroundColor: `${item.color}25`,
                        borderColor: `${item.color}70`,
                        color: item.color,
                      }}
                    >
                      <span className="text-base leading-none tabular-nums font-black">
                        {item.magnitude.toFixed(1)}
                      </span>
                      <span className="text-[9px] font-medium opacity-80 mt-0.5">
                        ڕێختەر
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white block">
                          {item.placeKu}
                        </span>
                        {item.isKurdistanRegion && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            کوردستان
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{item.timeFormattedKu}</span>
                        <span>·</span>
                        <span>قووڵی: {item.depthKm} کم</span>
                        {item.distanceKm !== undefined && (
                          <>
                            <span>·</span>
                            <span>دووری: ~{item.distanceKm} کم</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right indicator */}
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      {item.intensityLabelKu}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/10 bg-white/[0.02] text-xs">
                    <div className="grid grid-cols-2 gap-2 text-center pt-2">
                      <div className="p-2 rounded-xl bg-white/5">
                        <span className="text-[10px] text-slate-400 block mb-0.5">شوێنی فەرمی تۆمارکراو:</span>
                        <span className="text-[11px] text-slate-200 font-medium">{item.placeOriginal}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5">
                        <span className="text-[10px] text-slate-400 block mb-0.5">هێڵی پانی و درێژی:</span>
                        <span className="text-[11px] text-slate-200 tabular-nums">
                          {item.latitude.toFixed(2)}°N, {item.longitude.toFixed(2)}°E
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed mt-2.5 bg-black/30 p-2.5 rounded-xl border border-white/5">
                      💡 پێگەی چاودێری: ئەم بوومەلەرزەیە لە قووڵایی {item.depthKm} کیلۆمەتر لە ژێر زەویدا ڕوویداوە. بەپێی پێوەری ڕێختەر بە گوڕی «{item.intensityLabelKu}» پۆلێن کراوە.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
