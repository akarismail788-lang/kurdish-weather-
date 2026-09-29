import React, { useMemo } from 'react';
import { AtmosphericMood } from '../services/themeScheduler';

interface WeatherBackgroundProps {
  weatherCode: number;
  isDay: boolean;
  mood?: AtmosphericMood;
  sunriseStr?: string;
  sunsetStr?: string;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({
  weatherCode,
  isDay,
  mood = 'night',
}) => {
  // Heavy rain particles generator
  const rainDrops = useMemo(() => {
    if (mood !== 'rain' && mood !== 'storm') return [];
    const count = mood === 'storm' ? 65 : 40;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 1.55) % 100}%`,
      delay: `${(i * 0.08) % 1.8}s`,
      duration: `${mood === 'storm' ? 0.45 + ((i % 4) * 0.08) : 0.7 + ((i % 4) * 0.12)}s`,
      height: `${mood === 'storm' ? 26 + (i % 5) * 10 : 16 + (i % 4) * 6}px`,
      opacity: 0.35 + ((i % 3) * 0.25),
    }));
  }, [mood]);

  // Blizzard & Snow flakes generator
  const snowFlakes = useMemo(() => {
    if (mood !== 'snow') return [];
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      left: `${(i * 2.1) % 100}%`,
      delay: `${(i * 0.15) % 3}s`,
      duration: `${1.8 + ((i % 6) * 0.5)}s`,
      size: `${3 + (i % 5) * 2.5}px`,
      opacity: 0.45 + ((i % 3) * 0.25),
    }));
  }, [mood]);

  // Dust storm particles generator
  const dustParticles = useMemo(() => {
    if (mood !== 'dust') return [];
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      top: `${(i * 3.4) % 95}%`,
      left: `${(i * 4.2) % 90}%`,
      delay: `${(i * 0.2) % 4}s`,
      duration: `${4 + (i % 4) * 1.5}s`,
      size: `${24 + (i % 5) * 22}px`,
    }));
  }, [mood]);

  // Night stars generator
  const stars = useMemo(() => {
    if (mood !== 'night' && mood !== 'dusk') return [];
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      top: `${(i * 7) % 65}%`,
      left: `${(i * 13) % 96}%`,
      size: `${1.5 + (i % 3)}px`,
      opacity: 0.3 + ((i % 4) * 0.2),
      duration: `${2 + (i % 3)}s`,
      delay: `${(i * 0.3) % 3}s`,
    }));
  }, [mood]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000 select-none">
      {/* 1. Dynamic Mood Atmospheric Gradients */}
      {mood === 'dawn' && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-700/40 via-slate-900 to-slate-950">
          <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-amber-400/25 via-rose-500/20 to-transparent blur-3xl animate-weather-pulse" />
          <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-orange-400/15 blur-3xl" />
        </div>
      )}

      {mood === 'day' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-600 via-sky-900 to-slate-950">
          <div className="absolute -top-28 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-amber-300/30 via-cyan-400/20 to-transparent blur-3xl animate-sun-corona" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl" />
        </div>
      )}

      {mood === 'dusk' && (
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/80 via-purple-950/70 to-slate-950">
          <div className="absolute top-12 -right-10 w-96 h-96 rounded-full bg-orange-500/25 blur-3xl animate-weather-pulse" />
          <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl" />
        </div>
      )}

      {mood === 'storm' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#161129] via-[#0d0f1c] to-[#04050a]">
          {/* Flashing Lightning Aura Overlay */}
          <div className="absolute inset-0 animate-lightning pointer-events-none mix-blend-screen" />
          <div className="absolute top-8 inset-x-8 h-80 bg-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />

          {/* Electric Lightning Fork simulation */}
          <svg className="absolute top-0 right-1/4 w-48 h-96 opacity-40 animate-lightning" viewBox="0 0 100 200">
            <polyline 
              points="50,0 45,60 65,70 35,130 55,140 20,200" 
              fill="none" 
              stroke="#e0e7ff" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              filter="drop-shadow(0 0 8px #a5b4fc)"
            />
          </svg>
        </div>
      )}

      {mood === 'rain' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#111c2c] via-[#0c1522] to-[#060a10]">
          <div className="absolute top-0 inset-x-0 h-96 bg-cyan-900/25 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-900/20 blur-3xl" />
        </div>
      )}

      {mood === 'snow' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#182638] via-[#101b29] to-[#070d14]">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-cyan-200/15 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyan-100/10 to-transparent blur-xl" />
        </div>
      )}

      {mood === 'dust' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#332011] via-[#21160d] to-[#0c0906]">
          <div className="absolute inset-0 bg-amber-600/10 backdrop-blur-[1px]" />
          <div className="absolute top-1/4 inset-x-0 h-80 bg-amber-500/20 blur-3xl" />
        </div>
      )}

      {mood === 'night' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#080f1e] to-[#03060c]">
          {/* Moon aura */}
          <div className="absolute top-12 left-16 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl animate-weather-pulse" />
          <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-blue-900/15 blur-3xl" />
        </div>
      )}

      {/* 2. Severe Particle Systems */}
      {/* Heavy & Torrential Rain */}
      {rainDrops.map(r => (
        <div
          key={`rain-${r.id}`}
          className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-cyan-100 to-cyan-300 rounded-full"
          style={{
            left: r.left,
            top: '-40px',
            height: r.height,
            opacity: r.opacity,
            transform: mood === 'storm' ? 'rotate(18deg)' : 'rotate(10deg)',
            animationName: 'rain-torrential',
            animationDuration: r.duration,
            animationTimingFunction: 'linear',
            animationDelay: r.delay,
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Swirling Blizzard Snowflakes */}
      {snowFlakes.map(s => (
        <div
          key={`snow-${s.id}`}
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          style={{
            left: s.left,
            top: '-20px',
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationName: 'blizzard-gust',
            animationDuration: s.duration,
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationDelay: s.delay,
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Zagros Dust Storm Clouds */}
      {dustParticles.map(d => (
        <div
          key={`dust-${d.id}`}
          className="absolute rounded-full bg-gradient-to-r from-amber-700/20 via-yellow-600/25 to-transparent blur-2xl"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            animationName: 'dust-swirl',
            animationDuration: d.duration,
            animationTimingFunction: 'ease-in-out',
            animationDelay: d.delay,
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Stars for clear nights & twilights */}
      {stars.map(s => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationName: 'pulse',
            animationDuration: s.duration,
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
            animationDelay: s.delay,
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Floating Ethereal Cloud Blobs across all states */}
      <div 
        className="absolute -top-16 -left-32 w-[650px] h-[350px] rounded-full bg-white/[0.04] blur-3xl animate-cloud-float pointer-events-none" 
      />
      <div 
        className="absolute top-1/2 -right-40 w-[550px] h-[300px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" 
        style={{
          animationName: 'cloud-float',
          animationDuration: '34s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDirection: 'reverse',
        }}
      />
    </div>
  );
};
