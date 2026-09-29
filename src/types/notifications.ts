export type NotificationType = 'severe' | 'rain' | 'temp' | 'earthquake' | 'frost' | 'uv' | 'general';
export type NotificationPriority = 'critical' | 'high' | 'medium' | 'info';

export interface WeatherNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  titleKu: string;
  bodyKu: string;
  timestamp: number;
  timeAgoKu: string;
  cityId?: string;
  cityNameKu?: string;
  isRead: boolean;
  actionUrl?: string;
  relatedValue?: string | number;
}

export interface NotificationSettings {
  enablePush: boolean;
  severeStorms: boolean;
  heavyRain: boolean;
  temperatureDrops: boolean;
  earthquakes: boolean;
  frostWarnings: boolean;
  dailyBriefing: boolean;
}
