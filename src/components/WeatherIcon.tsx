import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  CloudHail,
  Wind,
  Droplets,
  Thermometer,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
  animate?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  name, 
  className = 'w-6 h-6', 
  size = 24,
  animate = true,
}) => {
  // Enhanced Fluid Vector Animations
  switch (name) {
    case 'Sun':
      return (
        <div className="relative inline-flex items-center justify-center">
          {animate && (
            <div 
              className="absolute inset-0 rounded-full bg-amber-400/30 blur-md animate-ping-slow"
            />
          )}
          <Sun 
            size={size} 
            className={`text-amber-400 drop-shadow-[0_0_14px_rgba(251,191,36,0.65)] ${
              animate ? 'animate-sun-corona' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'SunMedium':
      return (
        <div className="relative inline-flex items-center justify-center">
          <Sun 
            size={size} 
            className={`text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.5)] ${
              animate ? 'animate-sun-corona' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'Moon':
      return (
        <div className="relative inline-flex items-center justify-center">
          {animate && (
            <div 
              className="absolute inset-0 rounded-full bg-indigo-300/20 blur-md animate-pulse" 
            />
          )}
          <Moon 
            size={size} 
            className={`text-indigo-200 drop-shadow-[0_0_12px_rgba(199,210,254,0.5)] ${
              animate ? 'animate-pulse' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'CloudSun':
      return (
        <div className="relative inline-flex items-center justify-center">
          <CloudSun 
            size={size} 
            className={`text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.4)] ${
              animate ? 'animate-cloud-float' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'CloudMoon':
      return (
        <div className="relative inline-flex items-center justify-center">
          <CloudMoon 
            size={size} 
            className={`text-indigo-200 drop-shadow-[0_0_10px_rgba(199,210,254,0.35)] ${
              animate ? 'animate-cloud-float' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'Cloud':
      return (
        <Cloud 
          size={size} 
          className={`text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.25)] ${
            animate ? 'animate-cloud-float' : ''
          } ${className}`} 
        />
      );

    case 'CloudFog':
      return (
        <CloudFog 
          size={size} 
          className={`text-slate-400 drop-shadow-[0_0_8px_rgba(148,163,184,0.3)] ${
            animate ? 'animate-pulse' : ''
          } ${className}`} 
        />
      );

    case 'CloudDrizzle':
      return (
        <div className="relative inline-flex items-center justify-center">
          <CloudDrizzle 
            size={size} 
            className={`text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.4)] ${className}`} 
          />
        </div>
      );

    case 'CloudRain':
    case 'CloudRainWind':
      return (
        <div className="relative inline-flex items-center justify-center">
          {animate && (
            <div className="absolute -bottom-1 inset-x-0 h-1 bg-cyan-400/20 blur-sm rounded-full animate-pulse" />
          )}
          <CloudRain 
            size={size} 
            className={`text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.55)] ${
              animate ? 'translate-y-[-1px]' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'Snowflake':
      return (
        <div className="relative inline-flex items-center justify-center">
          {animate && (
            <div className="absolute inset-0 rounded-full bg-cyan-200/20 blur-sm animate-pulse" />
          )}
          <Snowflake 
            size={size} 
            className={`text-cyan-100 drop-shadow-[0_0_12px_rgba(207,250,254,0.7)] ${
              animate ? 'animate-slow-spin' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'CloudLightning':
      return (
        <div className="relative inline-flex items-center justify-center">
          {animate && (
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md animate-ping-medium" />
          )}
          <CloudLightning 
            size={size} 
            className={`text-yellow-400 drop-shadow-[0_0_16px_rgba(250,204,21,0.8)] ${
              animate ? 'animate-pulse' : ''
            } ${className}`} 
          />
        </div>
      );

    case 'CloudHail':
      return (
        <CloudHail 
          size={size} 
          className={`text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.4)] ${className}`} 
        />
      );

    case 'Wind':
      return (
        <Wind 
          size={size} 
          className={`text-teal-300 drop-shadow-[0_0_10px_rgba(94,234,212,0.4)] ${
            animate ? 'animate-cloud-float' : ''
          } ${className}`} 
        />
      );

    case 'Droplets':
      return <Droplets size={size} className={`text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)] ${className}`} />;

    case 'Thermometer':
      return <Thermometer size={size} className={`text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.4)] ${className}`} />;

    default:
      return <Sun size={size} className={`text-amber-400 ${className}`} />;
  }
};
