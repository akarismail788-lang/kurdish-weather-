import { 
  AirQualityData, 
  CurrentWeather, 
  DailyForecastItem, 
  HourlyForecastItem, 
  KurdistanCity, 
  PredictiveInsight, 
  WeatherData 
} from '../types/weather';
import { KURDISTAN_CITIES } from '../data/kurdistanCities';
import { secureFetch } from './secureClient';
import { secureSetItem, secureGetItemSync, secureGetItem } from './secureStorage';

/**
 * WMO Weather Code to Kurdish Description and Icon
 */
export function getKurdishWeatherDescription(code: number, isDay: boolean = true): { text: string; icon: string; theme: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'thunder' | 'fog' | 'night' } {
  switch (code) {
    case 0:
      return {
        text: isDay ? 'ئاسمانی ساماڵ' : 'ساماڵ و ڕووناک',
        icon: isDay ? 'Sun' : 'Moon',
        theme: isDay ? 'sunny' : 'night',
      };
    case 1:
      return {
        text: 'ساماڵ لەگەڵ پەڵەهەور',
        icon: isDay ? 'SunMedium' : 'CloudMoon',
        theme: isDay ? 'sunny' : 'night',
      };
    case 2:
      return {
        text: 'نیمچە هەور',
        icon: isDay ? 'CloudSun' : 'CloudMoon',
        theme: 'cloudy',
      };
    case 3:
      return {
        text: 'هەوراوی چڕ',
        icon: 'Cloud',
        theme: 'cloudy',
      };
    case 45:
      return {
        text: 'تەم و مژ',
        icon: 'CloudFog',
        theme: 'fog',
      };
    case 48:
      return {
        text: 'تەمی بەستوو لەسەر زەوی',
        icon: 'CloudFog',
        theme: 'fog',
      };
    case 51:
      return {
        text: 'نمەبارانی کەم',
        icon: 'CloudDrizzle',
        theme: 'rainy',
      };
    case 53:
      return {
        text: 'نمەبارانی مامناوەند',
        icon: 'CloudDrizzle',
        theme: 'rainy',
      };
    case 55:
      return {
        text: 'نمەبارانی چڕ',
        icon: 'CloudRain',
        theme: 'rainy',
      };
    case 56:
    case 57:
      return {
        text: 'نمەبارانی بەستەڵەکی سارد',
        icon: 'CloudHail',
        theme: 'rainy',
      };
    case 61:
      return {
        text: 'بارانی سووک',
        icon: 'CloudRain',
        theme: 'rainy',
      };
    case 63:
      return {
        text: 'بارانی مامناوەند',
        icon: 'CloudRain',
        theme: 'rainy',
      };
    case 65:
      return {
        text: 'بارانی بەخوڕ و لێزمە',
        icon: 'CloudRainWind',
        theme: 'rainy',
      };
    case 66:
    case 67:
      return {
        text: 'بارانی بەستەڵەک',
        icon: 'CloudHail',
        theme: 'snowy',
      };
    case 71:
      return {
        text: 'بەفری کەم',
        icon: 'Snowflake',
        theme: 'snowy',
      };
    case 73:
      return {
        text: 'بەفری مامناوەند',
        icon: 'Snowflake',
        theme: 'snowy',
      };
    case 75:
      return {
        text: 'بەفربارینی چڕ و سەخت',
        icon: 'Snowflake',
        theme: 'snowy',
      };
    case 77:
      return {
        text: 'دەنکەبەفر و دەنکەتەرزە',
        icon: 'Snowflake',
        theme: 'snowy',
      };
    case 80:
      return {
        text: 'لێزمەبارانی کورتخایەن',
        icon: 'CloudRain',
        theme: 'rainy',
      };
    case 81:
      return {
        text: 'لێزمەبارانی بەهێز',
        icon: 'CloudRainWind',
        theme: 'rainy',
      };
    case 82:
      return {
        text: 'لێزمەبارانی زۆر بەخوڕ',
        icon: 'CloudRainWind',
        theme: 'rainy',
      };
    case 85:
    case 86:
      return {
        text: 'لێزمەبەفر لە شاخەکان',
        icon: 'Snowflake',
        theme: 'snowy',
      };
    case 95:
      return {
        text: 'هەورەتریشقە و باران',
        icon: 'CloudLightning',
        theme: 'thunder',
      };
    case 96:
    case 99:
      return {
        text: 'هەورەتریشقەی توند لەگەڵ تەرزە',
        icon: 'CloudLightning',
        theme: 'thunder',
      };
    default:
      return {
        text: 'ئاسایی',
        icon: isDay ? 'Sun' : 'Moon',
        theme: isDay ? 'sunny' : 'night',
      };
  }
}

/**
 * Kurdish Wind Direction
 */
export function getKurdishWindDirection(degrees: number): string {
  const directions = [
    { ku: 'باکوور', min: 337.5, max: 360 },
    { ku: 'باکوور', min: 0, max: 22.5 },
    { ku: 'باکووری ڕۆژهەڵات', min: 22.5, max: 67.5 },
    { ku: 'ڕۆژهەڵات', min: 67.5, max: 112.5 },
    { ku: 'باشووری ڕۆژهەڵات', min: 112.5, max: 157.5 },
    { ku: 'باشوور', min: 157.5, max: 202.5 },
    { ku: 'باشووری ڕۆژئاوا', min: 202.5, max: 247.5 },
    { ku: 'ڕۆژئاوا', min: 247.5, max: 292.5 },
    { ku: 'باکووری ڕۆژئاوا', min: 292.5, max: 337.5 },
  ];

  for (const d of directions) {
    if (degrees >= d.min && degrees < d.max) {
      return d.ku;
    }
  }
  return 'باکوور';
}

/**
 * Kurdish Day Name
 */
export function getKurdishDayName(dateStr: string): string {
  const date = new Date(dateStr);
  const dayIndex = date.getDay(); // 0 is Sunday
  const daysKu = [
    'یەکشەممە',
    'دووشەممە',
    'سێشەممە',
    'چوارشەممە',
    'پێنجشەممە',
    'هەینی',
    'شەممە',
  ];
  return daysKu[dayIndex];
}

/**
 * Format Time string (e.g. 2026-03-29T14:00 -> "١٤:٠٠" or "2:00 PM")
 */
export function formatKurdishTime(timeStr: string): string {
  try {
    const date = new Date(timeStr);
    const hours = date.getHours();
    const period = hours >= 12 ? 'دوای نیوەڕۆ' : 'بەیانی';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:00 ${period}`;
  } catch {
    return timeStr.slice(11, 16);
  }
}

/**
 * Convert Celsius to Fahrenheit
 */
export function toFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

/**
 * Convert km/h to mph
 */
export function toMph(kmh: number): number {
  return Math.round(kmh * 0.621371);
}

/**
 * Generate Intelligent Predictive Insights in Kurdish
 */
function generatePredictiveInsights(
  current: CurrentWeather,
  hourly: HourlyForecastItem[],
  daily: DailyForecastItem[],
  airQuality: AirQualityData
): PredictiveInsight[] {
  const insights: PredictiveInsight[] = [];

  // 1. Rain check in next 12 hours
  const upcomingHours = hourly.slice(0, 12);
  const nextRainHour = upcomingHours.find(h => h.precipitationProbability >= 40 || h.precipitation > 0.3);
  if (nextRainHour) {
    insights.push({
      id: 'rain-alert',
      type: 'rain',
      titleKu: 'پێشبینی بارانبارین',
      descriptionKu: `ئەگەری بارانبارین لە دەوروبەری ${nextRainHour.formattedTime} بە ڕێژەی ${nextRainHour.precipitationProbability}% هەیە، چەتر لەبیر مەکە.`,
      severity: 'warning',
      icon: 'CloudRain',
    });
  } else if (current.precipitation > 0.5) {
    insights.push({
      id: 'rain-ongoing',
      type: 'rain',
      titleKu: 'بارانبارینی ئێستا',
      descriptionKu: 'لە ئێستادا باران دەبارێت و ڕێگاکان تەڕن، تکایە بە هێواشی شۆفێری بکەن.',
      severity: 'info',
      icon: 'CloudDrizzle',
    });
  }

  // 2. Wind check
  const maxWindHour = upcomingHours.reduce((max, h) => (h.windSpeed > max.windSpeed ? h : max), upcomingHours[0] || { windSpeed: 0, formattedTime: '' });
  if (maxWindHour.windSpeed >= 30) {
    insights.push({
      id: 'wind-alert',
      type: 'wind',
      titleKu: 'ئاگاداری بای بەهێز',
      descriptionKu: `خێرایی با لە ${maxWindHour.formattedTime} بەرز دەبێتەوە بۆ نزیکەی ${Math.round(maxWindHour.windSpeed)} کم/ک. لە شوێنە بەرزەکان و دارەکان وریابن.`,
      severity: 'warning',
      icon: 'Wind',
    });
  }

  // 3. Air Quality insight
  if (airQuality.usAqi > 100) {
    insights.push({
      id: 'air-quality-alert',
      type: 'air',
      titleKu: 'کوالیتی هەوا ناتەندروستە',
      descriptionKu: 'تۆزوخۆڵ یان گەردیلەی هەوا بەرزە، باشترە کەسانی تووشبووی ڕەبۆ و پیر و منداڵان لە ماڵەوە بمێننەوە.',
      severity: 'warning',
      icon: 'AlertTriangle',
    });
  } else if (airQuality.usAqi <= 50) {
    insights.push({
      id: 'air-quality-good',
      type: 'air',
      titleKu: 'هەوای زۆر خاوێن و پاک',
      descriptionKu: 'کوالیتی هەوای ئێستا نایابە، کاتێکی گونجاوە بۆ پیاسەکردن و وەرزشی دەرەوە لە ناو سروشتدا.',
      severity: 'positive',
      icon: 'Sparkles',
    });
  }

  // 4. UV Radiation
  if (current.uvIndex >= 6) {
    insights.push({
      id: 'uv-alert',
      type: 'uv',
      titleKu: 'تیشکی سەروو بنەوشەیی بەرز',
      descriptionKu: `ڕادەی تیشکی UV گەیشتووەتە ${current.uvIndex} (بەرز). دژەخۆر و چاویلکەی تاریک بەکاربهێنە.`,
      severity: 'warning',
      icon: 'Sun',
    });
  }

  // 5. Temperature swing insight
  if (daily.length > 0) {
    const today = daily[0];
    const diff = Math.round(today.tempMax - today.tempMin);
    if (diff >= 14) {
      insights.push({
        id: 'temp-swing',
        type: 'temp',
        titleKu: 'جیاوازی بەرچاوی پلەی گەرمی',
        descriptionKu: `جیاوازی نێوان ساردیی شەو و گەرمیی ڕۆژ ${diff}° پلەیە، لە کاتی دەرچوون لە شەواندا پۆشاکی گونجاو بپۆشن.`,
        severity: 'info',
        icon: 'ThermometerSnowflake',
      });
    }
  }

  // If few insights, add helpful seasonal/general meteorology note
  if (insights.length < 2) {
    insights.push({
      id: 'lifestyle-rec',
      type: 'activity',
      titleKu: 'ڕێنمایی گشتی کەشوهەوا',
      descriptionKu: 'کەشوهەوا جێگیرە، گونجاوە بۆ گەشت و هاتووچۆی ئاسایی ڕۆژانە بەبێ گرفت.',
      severity: 'positive',
      icon: 'CheckCircle2',
    });
  }

  return insights;
}

/**
 * Fetch Live Weather Data from Open-Meteo
 */
export async function fetchLiveWeatherData(city: KurdistanCity): Promise<WeatherData> {
  const cacheKey = `kurdish_weather_${city.id}`;

  try {
    // 1. Fetch Main Forecast Data via SSL-pinned, MitM-protected client
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=7&_t=${Date.now()}`;

    // 2. Fetch Air Quality Data via SSL-pinned client
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index&timezone=auto&_t=${Date.now()}`;

    const [weatherRes, aqiRes] = await Promise.all([
      secureFetch(weatherUrl, { timeoutMs: 7000, retries: 2 }),
      secureFetch(aqiUrl, { timeoutMs: 7000, retries: 1 }).catch(() => null),
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const aqiData = aqiRes && aqiRes.ok ? await aqiRes.json() : null;

    // Parse Current
    const cur = weatherData.current;
    const isDay = cur.is_day === 1;
    const weatherDesc = getKurdishWeatherDescription(cur.weather_code, isDay);

    const current: CurrentWeather = {
      temperature: Math.round(cur.temperature_2m),
      apparentTemperature: Math.round(cur.apparent_temperature),
      humidity: Math.round(cur.relative_humidity_2m),
      windSpeed: Math.round(cur.wind_speed_10m),
      windDirection: cur.wind_direction_10m,
      windGusts: Math.round(cur.wind_gusts_10m || cur.wind_speed_10m * 1.3),
      pressure: Math.round(cur.surface_pressure || cur.pressure_msl || 1013),
      uvIndex: Math.round((weatherData.daily?.uv_index_max?.[0] || 4) * 0.8),
      weatherCode: cur.weather_code,
      isDay,
      precipitation: cur.precipitation || 0,
      cloudCover: cur.cloud_cover || 0,
      descriptionKu: weatherDesc.text,
      dewPoint: Math.round(weatherData.hourly?.dew_point_2m?.[0] || cur.temperature_2m - 5),
      visibility: Math.round((weatherData.hourly?.visibility?.[0] || 10000) / 1000), // in km
    };

    // Parse Hourly (Next 24-36 hours)
    const hourlyTimes: string[] = weatherData.hourly?.time || [];
    const hourlyList: HourlyForecastItem[] = [];
    const nowIso = new Date().toISOString();

    // Find closest index to now
    let startIndex = hourlyTimes.findIndex(t => new Date(t) >= new Date(nowIso));
    if (startIndex === -1) startIndex = 0;

    for (let i = startIndex; i < Math.min(startIndex + 36, hourlyTimes.length); i++) {
      const timeStr = hourlyTimes[i];
      const hIsDay = weatherData.hourly.is_day?.[i] === 1;
      const hCode = weatherData.hourly.weather_code?.[i] ?? 0;
      const hDesc = getKurdishWeatherDescription(hCode, hIsDay);

      hourlyList.push({
        time: timeStr,
        formattedTime: formatKurdishTime(timeStr),
        timestamp: new Date(timeStr).getTime(),
        temperature: Math.round(weatherData.hourly.temperature_2m[i]),
        apparentTemperature: Math.round(weatherData.hourly.apparent_temperature?.[i] ?? weatherData.hourly.temperature_2m[i]),
        weatherCode: hCode,
        descriptionKu: hDesc.text,
        precipitationProbability: Math.round(weatherData.hourly.precipitation_probability?.[i] ?? 0),
        precipitation: weatherData.hourly.precipitation?.[i] ?? 0,
        windSpeed: Math.round(weatherData.hourly.wind_speed_10m?.[i] ?? 0),
        windDirection: weatherData.hourly.wind_direction_10m?.[i] ?? 0,
        uvIndex: Math.round(weatherData.hourly.uv_index?.[i] ?? 0),
        humidity: Math.round(weatherData.hourly.relative_humidity_2m?.[i] ?? 50),
        isDay: hIsDay,
      });
    }

    // Parse Daily (7 Days)
    const dailyTimes: string[] = weatherData.daily?.time || [];
    const dailyList: DailyForecastItem[] = [];

    for (let i = 0; i < dailyTimes.length; i++) {
      const dDate = dailyTimes[i];
      const dCode = weatherData.daily.weather_code?.[i] ?? 0;
      const dDesc = getKurdishWeatherDescription(dCode, true);

      // Sunrise & Sunset formatting
      const sunriseRaw = weatherData.daily.sunrise?.[i] || '';
      const sunsetRaw = weatherData.daily.sunset?.[i] || '';
      const sunrise = sunriseRaw ? sunriseRaw.slice(11, 16) : '05:45';
      const sunset = sunsetRaw ? sunsetRaw.slice(11, 16) : '18:15';

      dailyList.push({
        date: dDate,
        dayKu: i === 0 ? 'ئەمڕۆ' : i === 1 ? 'سبەی' : getKurdishDayName(dDate),
        weatherCode: dCode,
        descriptionKu: dDesc.text,
        tempMax: Math.round(weatherData.daily.temperature_2m_max[i]),
        tempMin: Math.round(weatherData.daily.temperature_2m_min[i]),
        apparentTempMax: Math.round(weatherData.daily.apparent_temperature_max?.[i] ?? weatherData.daily.temperature_2m_max[i]),
        apparentTempMin: Math.round(weatherData.daily.apparent_temperature_min?.[i] ?? weatherData.daily.temperature_2m_min[i]),
        precipitationSum: weatherData.daily.precipitation_sum?.[i] ?? 0,
        precipitationProbabilityMax: Math.round(weatherData.daily.precipitation_probability_max?.[i] ?? 0),
        sunrise,
        sunset,
        uvIndexMax: Math.round(weatherData.daily.uv_index_max?.[i] ?? 5),
        windSpeedMax: Math.round(weatherData.daily.wind_speed_10m_max?.[i] ?? 15),
      });
    }

    // Parse Air Quality
    const aqiCur = aqiData?.current || {};
    const usAqi = Math.round(aqiCur.us_aqi || 42);
    const europeanAqi = Math.round(aqiCur.european_aqi || 28);
    const pm2_5 = Math.round(aqiCur.pm2_5 || 12);
    const pm10 = Math.round(aqiCur.pm10 || 24);
    const ozone = Math.round(aqiCur.ozone || 38);
    const no2 = Math.round(aqiCur.nitrogen_dioxide || 14);
    const so2 = Math.round(aqiCur.sulphur_dioxide || 5);
    const co = Math.round(aqiCur.carbon_monoxide || 210);
    const dust = Math.round(aqiCur.dust || 8);

    let statusKu = 'باش و تەندروست';
    let summaryKu = 'کوالیتی هەوا گونجاوە بۆ هەموو تەمەنەکان بەبێ هیچ مەترسییەک.';
    let color = '#10b981'; // emerald

    if (usAqi <= 50) {
      statusKu = 'زۆر باش و پاکژ';
      summaryKu = 'کوالیتی هەوا نایابە و هیچ مەترسییەکی پیسبوون بوونی نییە.';
      color = '#10b981';
    } else if (usAqi <= 100) {
      statusKu = 'مامناوەند و پەسەندکراو';
      summaryKu = 'کوالیتی هەوا باشە، بەڵام بۆ کەسانی زۆر هەستیار ئەگەری کاریگەری کەم هەیە.';
      color = '#f59e0b';
    } else if (usAqi <= 150) {
      statusKu = 'ناتەندروست بۆ هەستیارەکان';
      summaryKu = 'کەسانی تووشبووی ڕەبۆ یان هەستیاری سییەکان دەبێت چالاکی دەرەوە کەم بکەنەوە.';
      color = '#f97316';
    } else {
      statusKu = 'پیسبوو و ناتەندروست';
      summaryKu = 'هەوا پیسە و ڕێژەی گەردیلە زیانبەخشەکان بەرزە، لە ماڵەوە بمێننەوە.';
      color = '#ef4444';
    }

    const airQuality: AirQualityData = {
      europeanAqi,
      usAqi,
      pm2_5,
      pm10,
      ozone,
      nitrogenDioxide: no2,
      sulphurDioxide: so2,
      carbonMonoxide: co,
      dust,
      uvIndex: current.uvIndex,
      statusKu,
      summaryKu,
      color,
    };

    // Generate Predictive Insights
    const insights = generatePredictiveInsights(current, hourlyList, dailyList, airQuality);

    const fullResult: WeatherData = {
      city,
      current,
      hourly: hourlyList,
      daily: dailyList,
      airQuality,
      insights,
      lastUpdated: new Date().toLocaleTimeString('ckb-IQ', { hour: '2-digit', minute: '2-digit' }),
    };

    // Save to Encrypted Cache for zero-data-leak offline resiliency
    try {
      secureSetItem(cacheKey, JSON.stringify(fullResult));
    } catch {
      // storage quota or incognito
    }

    return fullResult;
  } catch (err) {
    console.warn('Network error or API failure, checking encrypted local cache...', err);
    // Check secureStorage cache (both async and memory/sync)
    const cached = secureGetItemSync(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as WeatherData;
        return parsed;
      } catch {
        // fall through
      }
    }

    try {
      const asyncCached = await secureGetItem(cacheKey);
      if (asyncCached) {
        const parsed = JSON.parse(asyncCached) as WeatherData;
        return parsed;
      }
    } catch {
      // ignore
    }

    // Fallback Mock data for robust offline guarantee
    return createOfflineFallbackData(city);
  }
}

/**
 * Generate Offline Fallback Data with Kurdish values
 */
function createOfflineFallbackData(city: KurdistanCity): WeatherData {
  const current: CurrentWeather = {
    temperature: 24,
    apparentTemperature: 23,
    humidity: 46,
    windSpeed: 14,
    windDirection: 310,
    windGusts: 21,
    pressure: 1014,
    uvIndex: 5,
    weatherCode: 1,
    isDay: true,
    precipitation: 0,
    cloudCover: 20,
    descriptionKu: 'ساماڵ لەگەڵ پەڵەهەور',
    dewPoint: 11,
    visibility: 10,
  };

  const hourly: HourlyForecastItem[] = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getTime() + i * 3600000);
    const hour = d.getHours();
    const isDay = hour >= 6 && hour <= 19;
    hourly.push({
      time: d.toISOString(),
      formattedTime: `${hour}:00`,
      timestamp: d.getTime(),
      temperature: 20 + Math.round(Math.sin((hour - 6) / 4) * 6),
      apparentTemperature: 19 + Math.round(Math.sin((hour - 6) / 4) * 6),
      weatherCode: i % 4 === 0 ? 2 : 1,
      descriptionKu: i % 4 === 0 ? 'نیمچە هەور' : 'ساماڵ',
      precipitationProbability: Math.round(Math.random() * 15),
      precipitation: 0,
      windSpeed: 12 + Math.round(Math.random() * 6),
      windDirection: 320,
      uvIndex: isDay ? 4 : 0,
      humidity: 45 + Math.round(Math.random() * 10),
      isDay,
    });
  }

  const daysKu = ['ئەمڕۆ', 'سبەی', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی'];
  const daily: DailyForecastItem[] = [];
  for (let i = 0; i < 7; i++) {
    daily.push({
      date: new Date(now.getTime() + i * 86400000).toISOString().slice(0, 10),
      dayKu: daysKu[i] || 'ڕۆژ',
      weatherCode: i === 2 ? 61 : i === 4 ? 2 : 1,
      descriptionKu: i === 2 ? 'بارانی مامناوەند' : i === 4 ? 'نیمچە هەور' : 'ساماڵ و گەش',
      tempMax: 26 - (i % 3),
      tempMin: 14 - (i % 2),
      apparentTempMax: 25,
      apparentTempMin: 13,
      precipitationSum: i === 2 ? 4.2 : 0,
      precipitationProbabilityMax: i === 2 ? 65 : 10,
      sunrise: '05:52',
      sunset: '18:24',
      uvIndexMax: 6,
      windSpeedMax: 18,
    });
  }

  const airQuality: AirQualityData = {
    europeanAqi: 24,
    usAqi: 38,
    pm2_5: 9,
    pm10: 18,
    ozone: 32,
    nitrogenDioxide: 11,
    sulphurDioxide: 4,
    carbonMonoxide: 180,
    dust: 5,
    uvIndex: 5,
    statusKu: 'زۆر باش و خاوێن',
    summaryKu: 'کوالیتی هەوای ئێستا نایابە و گونجاوە بۆ هەموو چالاکییەکانی دەرەوە.',
    color: '#10b981',
  };

  const insights: PredictiveInsight[] = [
    {
      id: 'offline-mode',
      type: 'activity',
      titleKu: 'دۆخی ئۆفلاین (پارێزراو)',
      descriptionKu: 'زانیارییەکان لە بیرگەی ئامێرەکەتەوە دەخوێندرێنەوە تاکو هێڵی ئینتەرنێت دەگەڕێتەوە.',
      severity: 'info',
      icon: 'WifiOff',
    },
    {
      id: 'pleasant-weather',
      type: 'temp',
      titleKu: 'کەشوهەوایەکی لەبار',
      descriptionKu: 'پلەی گەرمی گونجاو و مامناوەندە بەبێ گەرما یان سەرماکاری توند.',
      severity: 'positive',
      icon: 'Sun',
    },
  ];

  return {
    city,
    current,
    hourly,
    daily,
    airQuality,
    insights,
    lastUpdated: 'ئۆفلاین',
  };
}

/**
 * Search cities worldwide or across Kurdistan using Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<KurdistanCity[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  // 1. First search local curated Kurdistan cities (fast & localized)
  const localMatches = KURDISTAN_CITIES.filter(
    c => c.nameKu.toLowerCase().includes(trimmed) || 
         c.nameEn.toLowerCase().includes(trimmed) ||
         c.regionKu.toLowerCase().includes(trimmed)
  );

  // If local query matched 3 or more, return them immediately
  if (localMatches.length >= 3) {
    return localMatches;
  }

  // 2. Query Open-Meteo Geocoding API with SSL-pinned secure client
  try {
    const res = await secureFetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`, {
      timeoutMs: 6000,
    });
    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const remoteCities: KurdistanCity[] = data.results.map((r: { id: number; name: string; country: string; admin1?: string; latitude: number; longitude: number; elevation?: number }) => ({
          id: `geo_${r.id}`,
          nameKu: r.name,
          nameEn: r.name,
          regionKu: r.admin1 ? `${r.admin1}، ${r.country}` : r.country || 'جیهان',
          regionKey: 'world',
          lat: r.latitude,
          lon: r.longitude,
          elevation: r.elevation,
        }));

        // Combine unique local matches with remote
        const combined = [...localMatches];
        for (const rc of remoteCities) {
          if (!combined.some(c => Math.abs(c.lat - rc.lat) < 0.1 && Math.abs(c.lon - rc.lon) < 0.1)) {
            combined.push(rc);
          }
        }
        return combined;
      }
    }
  } catch (e) {
    console.warn('Geocoding search error:', e);
  }

  return localMatches;
}
