import React, { useState } from 'react';
import { HourlyForecastItem, TempUnit, SpeedUnit } from '../types/weather';
import { toFahrenheit, toMph, getKurdishWindDirection } from '../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Sun, Clock, Compass } from 'lucide-react';

interface HourlyTabProps {
  hourly: HourlyForecastItem[];
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
}

export const HourlyTab: React.FC<HourlyTabProps> = ({
  hourly,
  tempUnit,
  speedUnit,
}) => {
  const [selectedHourIndex, setSelectedHourIndex] = useState<number>(0);
  const selectedItem = hourly[selectedHourIndex] || hourly[0];

  const formatTemp = (celsius: number) => {
    const val = tempUnit === 'F' ? toFahrenheit(celsius) : Math.round(celsius);
    return `${val}°`;
  };

  const formatSpeed = (kmh: number) => {
    const val = speedUnit === 'mph' ? toMph(kmh) : Math.round(kmh);
    const unitText = speedUnit === 'mph' ? 'میل/ک' : 'کم/ک';
    return `${val} ${unitText}`;
  };

  // Find min & max temp across hourly list for temperature bar relative scaling
  const allTemps = hourly.map(h => h.temperature);
  const minTemp = Math.min(...allTemps);
  const maxTemp = Math.max(...allTemps);
  const tempRange = Math.max(1, maxTemp - minTemp);

  return (
    <div className="space-y-4 px-4 pb-20 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Header Card with Selected Hour Details */}
      <div className="rounded-3xl p-5 glass-panel border border-white/20 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-cyan-400" />
            <div>
              <h2 className="text-sm font-bold text-white">
                وردەکاری کاتژمێری هەڵبژێردراو
              </h2>
              <span className="text-[11px] text-slate-300">
                {selectedItem.formattedTime}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-cyan-300 tabular-nums">
              {formatTemp(selectedItem.temperature)}
            </span>
            <span className="text-[11px] block text-slate-300">
              هەستپێکراو: {formatTemp(selectedItem.apparentTemperature)}
            </span>
          </div>
        </div>

        {/* Selected Hour Quick Metrics Grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {/* Weather Condition */}
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
            <WeatherIcon
              name={
                selectedItem.weatherCode === 0 ? (selectedItem.isDay ? 'Sun' : 'Moon') :
                selectedItem.weatherCode <= 2 ? (selectedItem.isDay ? 'CloudSun' : 'CloudMoon') :
                selectedItem.weatherCode >= 71 ? 'Snowflake' :
                selectedItem.weatherCode >= 51 ? 'CloudRain' :
                selectedItem.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
              }
              size={22}
              className="mb-1"
            />
            <span className="text-[10px] text-slate-200 font-medium truncate w-full">
              {selectedItem.descriptionKu}
            </span>
          </div>

          {/* Rain Probability */}
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
            <Droplets size={18} className="text-blue-400 mb-1" />
            <span className="text-xs font-bold text-white tabular-nums">
              {selectedItem.precipitationProbability}%
            </span>
            <span className="text-[10px] text-slate-300">
              ئەگەری باران
            </span>
          </div>

          {/* Wind Speed */}
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
            <Wind size={18} className="text-teal-400 mb-1" />
            <span className="text-xs font-bold text-white tabular-nums">
              {formatSpeed(selectedItem.windSpeed)}
            </span>
            <span className="text-[10px] text-slate-300 truncate w-full">
              {getKurdishWindDirection(selectedItem.windDirection)}
            </span>
          </div>

          {/* Humidity */}
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
            <Sun size={18} className="text-amber-400 mb-1" />
            <span className="text-xs font-bold text-white tabular-nums">
              {selectedItem.uvIndex} UV
            </span>
            <span className="text-[10px] text-slate-300">
              شێ: {selectedItem.humidity}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Timeline Strip */}
      <div className="rounded-3xl p-4 glass-panel border border-white/15">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 px-1">
          هێڵی پێشبینی کاتژمێری (کلیک بکە بۆ دیاریکردن)
        </h3>

        {/* Scrollable list */}
        <div className="flex items-end gap-2.5 overflow-x-auto no-scrollbar py-2 px-1">
          {hourly.slice(0, 24).map((item, idx) => {
            const isSelected = selectedHourIndex === idx;
            const heightPercent = 25 + Math.round(((item.temperature - minTemp) / tempRange) * 50);

            return (
              <button
                key={idx}
                onClick={() => setSelectedHourIndex(idx)}
                className={`flex flex-col items-center min-w-[68px] p-2.5 rounded-2xl transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-cyan-500/25 border border-cyan-400 shadow-md ring-2 ring-cyan-400/20'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                {/* Time */}
                <span className={`text-[11px] font-semibold mb-2 ${isSelected ? 'text-cyan-200' : 'text-slate-300'}`}>
                  {idx === 0 ? 'ئێستا' : item.formattedTime.split(' ')[0]}
                </span>

                {/* Weather Icon */}
                <WeatherIcon
                  name={
                    item.weatherCode === 0 ? (item.isDay ? 'Sun' : 'Moon') :
                    item.weatherCode <= 2 ? (item.isDay ? 'CloudSun' : 'CloudMoon') :
                    item.weatherCode >= 71 ? 'Snowflake' :
                    item.weatherCode >= 51 ? 'CloudRain' :
                    item.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
                  }
                  size={20}
                  className="w-5 h-5 mb-2"
                />

                {/* Temperature */}
                <span className="text-xs font-bold text-white tabular-nums mb-2">
                  {formatTemp(item.temperature)}
                </span>

                {/* Micro Visual Bar */}
                <div className="w-2.5 h-16 bg-white/10 rounded-full flex flex-col justify-end overflow-hidden my-1">
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                        : item.precipitationProbability > 40
                        ? 'bg-blue-400'
                        : 'bg-white/40'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Rain probability */}
                <div className="mt-1 flex items-center gap-0.5 text-[9px] font-semibold text-blue-300 tabular-nums">
                  {item.precipitationProbability > 0 ? (
                    <span>{item.precipitationProbability}%</span>
                  ) : (
                    <span className="text-slate-500">٠%</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Hourly List Rows */}
      <div className="rounded-3xl p-4 glass-panel border border-white/15">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 px-1">
          خشتەی وردی کاتژمێرەکان
        </h3>

        <div className="space-y-2">
          {hourly.slice(0, 16).map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedHourIndex(idx)}
              className={`p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                selectedHourIndex === idx
                  ? 'bg-cyan-500/20 border border-cyan-400/40'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              {/* Left: Time & Icon & Kurdish Description */}
              <div className="flex items-center gap-3">
                <WeatherIcon
                  name={
                    item.weatherCode === 0 ? (item.isDay ? 'Sun' : 'Moon') :
                    item.weatherCode <= 2 ? (item.isDay ? 'CloudSun' : 'CloudMoon') :
                    item.weatherCode >= 71 ? 'Snowflake' :
                    item.weatherCode >= 51 ? 'CloudRain' :
                    item.weatherCode >= 95 ? 'CloudLightning' : 'Cloud'
                  }
                  size={24}
                  className="w-6 h-6 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-white">
                    {idx === 0 ? 'ئێستا' : item.formattedTime}
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {item.descriptionKu}
                  </span>
                </div>
              </div>

              {/* Right: Rain prob, Wind, Temp */}
              <div className="flex items-center gap-4 text-right">
                {/* Rain probability bar */}
                <div className="flex items-center gap-1.5 text-xs text-blue-300 tabular-nums">
                  <Droplets size={13} />
                  <span>{item.precipitationProbability}%</span>
                </div>

                {/* Wind */}
                <div className="hidden sm:flex items-center gap-1 text-xs text-teal-300 tabular-nums">
                  <Compass size={13} />
                  <span>{formatSpeed(item.windSpeed)}</span>
                </div>

                {/* Temp */}
                <div className="text-base font-bold text-white tabular-nums min-w-[42px] text-left">
                  {formatTemp(item.temperature)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
