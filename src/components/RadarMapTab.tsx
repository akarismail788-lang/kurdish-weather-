import React, { useState } from 'react';
import { KurdistanCity, TempUnit } from '../types/weather';
import { KURDISTAN_CITIES } from '../data/kurdistanCities';
import { toFahrenheit } from '../services/weatherService';
import { 
  CloudRain, 
  Thermometer, 
  Wind, 
  MapPin, 
  Layers, 
  Search,
  Compass
} from 'lucide-react';

interface RadarMapTabProps {
  currentCity: KurdistanCity;
  onSelectCity: (city: KurdistanCity) => void;
  tempUnit: TempUnit;
}

type RadarLayer = 'precipitation' | 'temperature' | 'wind';

export const RadarMapTab: React.FC<RadarMapTabProps> = ({
  currentCity,
  onSelectCity,
  tempUnit,
}) => {
  const [activeLayer, setActiveLayer] = useState<RadarLayer>('precipitation');
  const [regionFilter, setRegionFilter] = useState<'all' | 'bashur' | 'rojhilat' | 'rojava' | 'bakur'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatTemp = (celsius: number) => {
    const val = tempUnit === 'F' ? toFahrenheit(celsius) : Math.round(celsius);
    return `${val}°`;
  };

  // Filter cities by region & search
  const filteredCities = KURDISTAN_CITIES.filter((city) => {
    const matchesRegion = regionFilter === 'all' || city.regionKey === regionFilter;
    const matchesSearch =
      !searchQuery ||
      city.nameKu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-4 px-4 pb-20 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Radar Map Visualizer Container */}
      <div className="rounded-3xl glass-panel border border-white/20 shadow-xl overflow-hidden relative">
        {/* Layer Selector Bar at Top of Map */}
        <div className="p-3 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers size={16} className="text-cyan-400" />
            <span className="text-xs font-bold text-white">ڕاداری کەشوهەوا</span>
          </div>

          {/* Layer Segmented Control */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px]">
            <button
              onClick={() => setActiveLayer('precipitation')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeLayer === 'precipitation'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <CloudRain size={13} />
              <span>باران و هەور</span>
            </button>
            <button
              onClick={() => setActiveLayer('temperature')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeLayer === 'temperature'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Thermometer size={13} />
              <span>پلەی گەرمی</span>
            </button>
            <button
              onClick={() => setActiveLayer('wind')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeLayer === 'wind'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wind size={13} />
              <span>با</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Map Canvas Simulation */}
        <div className="h-64 sm:h-80 w-full relative bg-gradient-to-br from-[#0b1728] via-[#091220] to-[#040912] overflow-hidden select-none">
          {/* Topographical Grid Lines */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Dynamic Radar Layers based on activeLayer */}
          {activeLayer === 'precipitation' && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Animated Radar Sweep Cone */}
              <div 
                className="absolute inset-0 origin-center opacity-30 pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(6, 182, 212, 0.4) 0deg, rgba(6, 182, 212, 0) 60deg, transparent 360deg)',
                  animationName: 'spin',
                  animationDuration: '8s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              />
              {/* Rain clouds blob 1 over Zagros mountains */}
              <div className="absolute top-1/4 right-1/4 w-44 h-36 rounded-full bg-cyan-400/25 blur-2xl animate-pulse" />
              {/* Rain cloud blob 2 over Erbil/Sulaymaniyah corridor */}
              <div className="absolute top-1/3 left-1/3 w-52 h-40 rounded-full bg-blue-500/20 blur-3xl animate-cloud-float" />
              {/* Concentric radar range circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-400/20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-400/10 pointer-events-none" />
            </div>
          )}

          {activeLayer === 'temperature' && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Thermal gradient overlay */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-full bg-rose-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full bg-amber-500/20 blur-3xl" />
              <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>
          )}

          {activeLayer === 'wind' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Wind Streamlines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`wind-${i}`}
                  className="absolute h-[1.5px] bg-gradient-to-r from-transparent via-teal-300 to-transparent rounded-full opacity-60"
                  style={{
                    top: `${(i * 9) + 5}%`,
                    left: `${(i * 6) % 30}%`,
                    width: `${90 + (i % 4) * 40}px`,
                    transform: 'rotate(-12deg)',
                    animationName: 'cloud-float',
                    animationDuration: `${10 + (i % 5) * 3}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                  }}
                />
              ))}
            </div>
          )}

          {/* Simulated Kurdistan Map City Pins (positioned relatively by latitude/longitude bounds) */}
          {/* Lat: 33 to 39, Lon: 38 to 47 */}
          {KURDISTAN_CITIES.filter(c => c.isPopular).map((city) => {
            const isSelected = currentCity.id === city.id;
            // Approximate coordinates to percentage:
            // lon: 38 (left 5%) to 47 (right 95%)
            // lat: 39 (top 10%) to 33 (bottom 90%)
            const left = Math.max(8, Math.min(92, ((city.lon - 37.5) / 10) * 100));
            const top = Math.max(12, Math.min(88, ((39.5 - city.lat) / 6.5) * 100));

            return (
              <button
                key={city.id}
                onClick={() => onSelectCity(city)}
                style={{ left: `${left}%`, top: `${top}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                {/* Pin marker */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-all ${
                    isSelected
                      ? 'bg-cyan-400 border-white text-slate-950 shadow-[0_0_12px_#22d3ee]'
                      : 'bg-slate-900/90 border-cyan-400/50 text-cyan-300 hover:border-cyan-300'
                  }`}
                >
                  <MapPin size={13} />
                </div>

                {/* City name badge */}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 whitespace-nowrap shadow-sm border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-extrabold'
                      : 'bg-black/75 text-white border-white/10 group-hover:border-white/30'
                  }`}
                >
                  {city.nameKu}
                </span>
              </button>
            );
          })}

          {/* Compass Rose at bottom-left */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-2xl p-2 border border-white/10 flex items-center gap-1.5 text-[10px] text-slate-300">
            <Compass size={14} className="text-cyan-400" />
            <span className="font-bold">کوردستان</span>
          </div>

          {/* Selected City Legend at bottom-right */}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md rounded-2xl px-3 py-1.5 border border-white/10 text-right">
            <span className="text-[10px] text-slate-400 block">شاری دیاریکراو:</span>
            <span className="text-xs font-bold text-cyan-300">{currentCity.nameKu}</span>
          </div>
        </div>
      </div>

      {/* 3. Kurdistan Regional City Directory */}
      <div className="rounded-3xl p-5 glass-panel border border-white/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              شار و شارۆچکەکانی کوردستان
            </h3>
            <p className="text-[11px] text-slate-300">
              کلیک لە هەر شارێک بکە بۆ بینینی کەشوهەوای زیندوو
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-56">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="گەڕان بۆ شار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl pr-8 pl-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Region Filter Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2 mb-3">
          {[
            { id: 'all', label: 'هەموو' },
            { id: 'bashur', label: 'باشوور' },
            { id: 'rojhilat', label: 'ڕۆژهەڵات' },
            { id: 'rojava', label: 'ڕۆژئاوا' },
            { id: 'bakur', label: 'باکوور' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRegionFilter(tab.id as typeof regionFilter)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                regionFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto no-scrollbar pr-0.5">
          {filteredCities.map((city) => {
            const isCurrent = currentCity.id === city.id;

            return (
              <button
                key={city.id}
                onClick={() => onSelectCity(city)}
                className={`p-3 rounded-2xl flex items-center justify-between text-right transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500/25 border border-cyan-400 shadow-md ring-1 ring-cyan-400/30'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div>
                  <span className={`text-xs font-bold block ${isCurrent ? 'text-cyan-200' : 'text-white'}`}>
                    {city.nameKu}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {city.regionKu.replace('ی کوردستان', '')}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                    isCurrent ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  <MapPin size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
