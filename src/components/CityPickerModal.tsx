import React, { useState } from 'react';
import { KurdistanCity } from '../types/weather';
import { KURDISTAN_CITIES } from '../data/kurdistanCities';
import { searchCities } from '../services/weatherService';
import { X, Search, MapPin, Navigation, Loader2 } from 'lucide-react';

interface CityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: KurdistanCity;
  onSelectCity: (city: KurdistanCity) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
}

export const CityPickerModal: React.FC<CityPickerModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
  onUseCurrentLocation,
  isLocating,
}) => {
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<'all' | 'bashur' | 'rojhilat' | 'rojava' | 'bakur'>('all');
  const [searchResults, setSearchResults] = useState<KurdistanCity[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearchChange = async (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCities(val);
      setSearchResults(results);
    } catch {
      // ignore
    } finally {
      setIsSearching(false);
    }
  };

  // Base list when not searching
  const displayedCities = query.trim()
    ? searchResults
    : KURDISTAN_CITIES.filter(
        c => activeRegion === 'all' || c.regionKey === activeRegion
      );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Container / Bottom Sheet */}
      <div 
        className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-t-[36px] sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] text-slate-100 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle for Mobile */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              هەڵبژاردنی شار
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Bar & GPS Trigger */}
        <div className="mt-3 space-y-2">
          <div className="relative">
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ناوی شار بنووسە (هەولێر، سلێمانی، London...)"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              autoFocus
              className="w-full bg-white/5 border border-white/15 rounded-2xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {isSearching && (
              <Loader2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 animate-spin" />
            )}
          </div>

          {/* GPS Current Location button */}
          <button
            onClick={() => {
              onUseCurrentLocation();
              onClose();
            }}
            disabled={isLocating}
            className="w-full p-2.5 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 flex items-center justify-center gap-2 text-xs font-bold text-cyan-300 transition-all cursor-pointer"
          >
            <Navigation size={15} className={isLocating ? 'animate-spin' : ''} />
            <span>بەکارهێنانی شوێنی ئێستام (GPS)</span>
          </button>
        </div>

        {/* Regional Filter Tabs (if not actively searching) */}
        {!query.trim() && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-3">
            {[
              { id: 'all', label: 'هەموو' },
              { id: 'bashur', label: 'باشوور' },
              { id: 'rojhilat', label: 'ڕۆژهەڵات' },
              { id: 'rojava', label: 'ڕۆژئاوا' },
              { id: 'bakur', label: 'باکوور' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id as typeof activeRegion)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeRegion === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Cities List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5 mt-2 pr-1">
          {displayedCities.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              هیچ شارێک بەو ناوە نەدۆزرایەوە.
            </div>
          ) : (
            displayedCities.map((city) => {
              const isSelected = currentCity.id === city.id;

              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-right transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="font-bold text-sm block">
                        {city.nameKu}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {city.regionKu}
                      </span>
                    </div>
                  </div>

                  {city.elevation && (
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      {city.elevation} م
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
