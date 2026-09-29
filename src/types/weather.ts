export interface KurdistanCity {
  id: string;
  nameKu: string;
  nameEn: string;
  regionKu: string; // باشووری کوردستان, ڕۆژهەڵات, هتد
  regionKey: 'bashur' | 'rojhilat' | 'rojava' | 'bakur' | 'world';
  lat: number;
  lon: number;
  elevation?: number;
  isPopular?: boolean;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  pressure: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
  precipitation: number;
  cloudCover: number;
  descriptionKu: string;
  dewPoint: number;
  visibility: number; // in meters or km
}

export interface HourlyForecastItem {
  time: string;
  formattedTime: string;
  timestamp: number;
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  descriptionKu: string;
  precipitationProbability: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  humidity: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string;
  dayKu: string; // ڕۆژ (دووشەممە، سێشەممە...)
  weatherCode: number;
  descriptionKu: string;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  windSpeedMax: number;
}

export interface AirQualityData {
  europeanAqi: number;
  usAqi: number;
  pm2_5: number;
  pm10: number;
  ozone: number;
  nitrogenDioxide: number;
  sulphurDioxide: number;
  carbonMonoxide: number;
  dust: number;
  uvIndex: number;
  statusKu: string;
  summaryKu: string;
  color: string;
}

export interface PredictiveInsight {
  id: string;
  type: 'rain' | 'wind' | 'temp' | 'uv' | 'air' | 'activity';
  titleKu: string;
  descriptionKu: string;
  severity: 'info' | 'warning' | 'positive';
  icon: string;
}

export interface WeatherData {
  city: KurdistanCity;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality: AirQualityData;
  insights: PredictiveInsight[];
  lastUpdated: string;
}

export type TempUnit = 'C' | 'F';
export type SpeedUnit = 'kmh' | 'mph';
