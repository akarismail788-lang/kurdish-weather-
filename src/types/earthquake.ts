export interface EarthquakeItem {
  id: string;
  magnitude: number;
  placeKu: string;
  placeOriginal: string;
  time: number;
  timeFormattedKu: string;
  depthKm: number;
  latitude: number;
  longitude: number;
  isKurdistanRegion: boolean;
  intensityLevel: 'minor' | 'light' | 'moderate' | 'strong' | 'severe';
  intensityLabelKu: string;
  color: string;
  distanceKm?: number;
  feltReports?: number;
}

export interface EarthquakeStats {
  total24h: number;
  maxMagnitude: number;
  latestTimeKu: string;
  kurdistanCount: number;
}
