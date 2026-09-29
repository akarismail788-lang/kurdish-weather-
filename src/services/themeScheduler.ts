export type AtmosphericMood = 
  | 'dawn' 
  | 'day' 
  | 'dusk' 
  | 'night' 
  | 'storm' 
  | 'rain' 
  | 'snow' 
  | 'dust';

export type ThemePreference = 'auto' | 'dark' | 'light' | 'aurora';

export interface AtmosphereConfig {
  mood: AtmosphericMood;
  labelKu: string;
  primaryGradient: string;
  accentGlow: string;
  textColor: string;
  isDark: boolean;
}

/**
 * Parse "HH:MM" time string to minutes from midnight
 */
function parseTimeToMinutes(timeStr?: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return 0;
}

/**
 * Determine the dynamic atmospheric mood from solar time and weather conditions
 */
export function getSmartAtmosphere(
  weatherCode: number,
  isDay: boolean,
  sunriseStr?: string,
  sunsetStr?: string,
  forcedMood?: AtmosphericMood | null
): AtmosphereConfig {
  if (forcedMood) {
    return getMoodConfig(forcedMood);
  }

  // 1. Severe Weather Overrides
  if (weatherCode >= 95) {
    return getMoodConfig('storm');
  }
  if ((weatherCode >= 71 && weatherCode <= 86)) {
    return getMoodConfig('snow');
  }
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return getMoodConfig('rain');
  }

  // 2. Solar Timing Check
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sunriseMinutes = sunriseStr ? parseTimeToMinutes(sunriseStr) : 360; // 06:00
  const sunsetMinutes = sunsetStr ? parseTimeToMinutes(sunsetStr) : 1100; // 18:20

  // Dawn (Golden hour around sunrise: +/- 35 mins)
  if (Math.abs(currentMinutes - sunriseMinutes) <= 35) {
    return getMoodConfig('dawn');
  }

  // Dusk (Golden hour around sunset: +/- 45 mins)
  if (Math.abs(currentMinutes - sunsetMinutes) <= 45) {
    return getMoodConfig('dusk');
  }

  if (isDay) {
    return getMoodConfig('day');
  }

  return getMoodConfig('night');
}

export function getMoodConfig(mood: AtmosphericMood): AtmosphereConfig {
  switch (mood) {
    case 'dawn':
      return {
        mood: 'dawn',
        labelKu: 'بەرەبەیان و خۆرهەڵاتن (زێڕین)',
        primaryGradient: 'from-amber-900/60 via-slate-900 to-slate-950',
        accentGlow: 'rgba(251, 191, 36, 0.25)',
        textColor: 'text-amber-200',
        isDark: true,
      };
    case 'day':
      return {
        mood: 'day',
        labelKu: 'ڕۆژ (ئاسمانی ساماڵ)',
        primaryGradient: 'from-sky-700/80 via-slate-900 to-slate-950',
        accentGlow: 'rgba(14, 165, 233, 0.3)',
        textColor: 'text-cyan-200',
        isDark: true,
      };
    case 'dusk':
      return {
        mood: 'dusk',
        labelKu: 'خۆرئاوابوون و ئێوارە (شەبەنگ)',
        primaryGradient: 'from-orange-950/70 via-purple-950/60 to-slate-950',
        accentGlow: 'rgba(249, 115, 22, 0.3)',
        textColor: 'text-orange-200',
        isDark: true,
      };
    case 'storm':
      return {
        mood: 'storm',
        labelKu: 'زریان و هەورەتریشقە',
        primaryGradient: 'from-purple-950/80 via-slate-950 to-black',
        accentGlow: 'rgba(168, 85, 247, 0.35)',
        textColor: 'text-purple-200',
        isDark: true,
      };
    case 'rain':
      return {
        mood: 'rain',
        labelKu: 'کەشی باراناوی',
        primaryGradient: 'from-cyan-950/70 via-slate-900 to-slate-950',
        accentGlow: 'rgba(6, 182, 212, 0.25)',
        textColor: 'text-cyan-300',
        isDark: true,
      };
    case 'snow':
      return {
        mood: 'snow',
        labelKu: 'بەفربارین و سەرمای سەخت',
        primaryGradient: 'from-slate-800/80 via-blue-950/60 to-slate-950',
        accentGlow: 'rgba(186, 230, 253, 0.3)',
        textColor: 'text-sky-200',
        isDark: true,
      };
    case 'dust':
      return {
        mood: 'dust',
        labelKu: 'تۆزوخۆڵ و ڕەشەبا',
        primaryGradient: 'from-amber-950/80 via-yellow-950/50 to-slate-950',
        accentGlow: 'rgba(217, 119, 6, 0.3)',
        textColor: 'text-amber-300',
        isDark: true,
      };
    case 'night':
    default:
      return {
        mood: 'night',
        labelKu: 'شەوی ئەستێرەباران',
        primaryGradient: 'from-slate-950 via-[#070b14] to-black',
        accentGlow: 'rgba(99, 102, 241, 0.2)',
        textColor: 'text-indigo-200',
        isDark: true,
      };
  }
}
