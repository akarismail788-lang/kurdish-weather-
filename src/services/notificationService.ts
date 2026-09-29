import { WeatherNotification, NotificationSettings } from '../types/notifications';
import { WeatherData } from '../types/weather';
import { EarthquakeItem } from '../types/earthquake';
import { secureSetItem, secureGetItemSync } from './secureStorage';

const SETTINGS_KEY = 'kurdish_weather_notification_settings';
const NOTIFICATIONS_KEY = 'kurdish_weather_stored_notifications';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enablePush: true,
  severeStorms: true,
  heavyRain: true,
  temperatureDrops: true,
  earthquakes: true,
  frostWarnings: true,
  dailyBriefing: true,
};

export function loadNotificationSettings(): NotificationSettings {
  try {
    const saved = secureGetItemSync(SETTINGS_KEY) || localStorage.getItem(SETTINGS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_NOTIFICATION_SETTINGS;
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  try {
    secureSetItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // quota
  }
}

export function loadStoredNotifications(): WeatherNotification[] {
  try {
    const saved = secureGetItemSync(NOTIFICATIONS_KEY) || localStorage.getItem(NOTIFICATIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return [];
}

export function saveStoredNotifications(list: WeatherNotification[]): void {
  try {
    secureSetItem(NOTIFICATIONS_KEY, JSON.stringify(list));
  } catch {
    // quota
  }
}

export function formatTimeAgoKu(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return 'ئێستا (کەمێک لەمەوبەر)';
  if (diffMins < 60) return `پێش ${diffMins} خولەک`;
  if (diffHours < 24) return `پێش ${diffHours} کاتژمێر`;
  return new Date(timestamp).toLocaleDateString('ckb-IQ', { month: 'numeric', day: 'numeric' });
}

/**
 * Request Browser Local Push Notification Permission
 */
export async function requestPushPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

/**
 * Dispatch real browser local push notification
 */
export function dispatchLocalPush(title: string, body: string, icon: string = '🌦️'): void {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      dir: 'rtl',
      lang: 'ckb',
      tag: `kurdish_weather_${Date.now()}`,
    });
  } catch (err) {
    console.warn('Native push notification error:', err);
  }
}

/**
 * Proactively analyze current weather and earthquakes to generate intelligent notifications
 */
export function evaluateSmartNotifications(
  weather: WeatherData | null,
  earthquakes: EarthquakeItem[],
  settings: NotificationSettings,
  existingList: WeatherNotification[]
): WeatherNotification[] {
  const newAlerts: WeatherNotification[] = [];
  const now = Date.now();

  if (weather) {
    const { current, daily, city } = weather;
    const today = daily[0];

    // 1. Severe Storm / Heavy Rain Warning
    if (settings.heavyRain || settings.severeStorms) {
      if (current.weatherCode >= 95) {
        newAlerts.push({
          id: `storm_${city.id}_${Math.floor(now / 3600000)}`,
          type: 'severe',
          priority: 'critical',
          titleKu: `هۆشداری هەورەتریشقە و زریانی بەهێز لە ${city.nameKu}`,
          bodyKu: `شەپۆلێکی هەورەتریشقەی چڕ لە ئاسمانی ${city.nameKu} تۆمارکراوە. تکایە لە کاتی دەرچوون وریابن.`,
          timestamp: now,
          timeAgoKu: 'ئێستا',
          cityId: city.id,
          cityNameKu: city.nameKu,
          isRead: false,
          relatedValue: `${current.windGusts} km/h`,
        });
      } else if (current.precipitation > 2.0 || (today && today.precipitationProbabilityMax >= 75)) {
        newAlerts.push({
          id: `rain_${city.id}_${Math.floor(now / 7200000)}`,
          type: 'rain',
          priority: 'high',
          titleKu: `ئاگاداری بارانی بەخوڕ لە ناوچەی ${city.nameKu}`,
          bodyKu: `ئەگەری بارانبارینی بەردەوام هەیە (${today?.precipitationProbabilityMax || 80}%). چەتر لەبیر مەکەن.`,
          timestamp: now,
          timeAgoKu: 'ئێستا',
          cityId: city.id,
          cityNameKu: city.nameKu,
          isRead: false,
        });
      }
    }

    // 2. Frost / Cold Snap Warning (پلەی گەرمی نزم)
    if (settings.frostWarnings || settings.temperatureDrops) {
      if (current.temperature <= 2 || (today && today.tempMin <= 1)) {
        newAlerts.push({
          id: `frost_${city.id}_${Math.floor(now / 14400000)}`,
          type: 'frost',
          priority: 'high',
          titleKu: `ئاگاداری شەختە و بەستەڵەک لە ${city.nameKu}`,
          bodyKu: `پلەی گەرمی دادەبەزێت بۆ نزیكەی ${current.temperature}°C. مەترسی خلیسکانی ڕێگاوبان لە شەواندا هەیە.`,
          timestamp: now,
          timeAgoKu: 'ئێستا',
          cityId: city.id,
          cityNameKu: city.nameKu,
          isRead: false,
          relatedValue: `${current.temperature}°C`,
        });
      }
    }

    // 3. High UV Warning
    if (current.uvIndex >= 7) {
      newAlerts.push({
        id: `uv_${city.id}_${Math.floor(now / 14400000)}`,
        type: 'uv',
        priority: 'medium',
        titleKu: `تیشکی سەروو بنەوشەیی زۆر بەرزە (UV ${current.uvIndex})`,
        bodyKu: `لە ناوچەی ${city.nameKu} تیشکی خۆر بەهێزە، دژەخۆر و کڵاو و چاویلکە بەکاربهێنن.`,
        timestamp: now,
        timeAgoKu: 'ئێستا',
        cityId: city.id,
        cityNameKu: city.nameKu,
        isRead: false,
      });
    }
  }

  // 4. Earthquake Significant Alerts
  if (settings.earthquakes && earthquakes.length > 0) {
    const significantQuake = earthquakes.find(
      q => q.magnitude >= 3.6 && (now - q.time) < 18000000 // past 5 hours
    );

    if (significantQuake) {
      newAlerts.push({
        id: `quake_${significantQuake.id}`,
        type: 'earthquake',
        priority: significantQuake.magnitude >= 4.5 ? 'critical' : 'high',
        titleKu: `ئاگاداری بوومەلەرزە: گوڕی ${significantQuake.magnitude.toFixed(1)} ڕێختەر`,
        bodyKu: `لەرزینێک لە ${significantQuake.placeKu} تۆمارکراوە لە قووڵایی ${significantQuake.depthKm} کم.`,
        timestamp: significantQuake.time,
        timeAgoKu: formatTimeAgoKu(significantQuake.time),
        isRead: false,
        relatedValue: `${significantQuake.magnitude.toFixed(1)} Richter`,
      });
    }
  }

  // Deduplicate against existing list by id
  const existingIds = new Set(existingList.map(item => item.id));
  const trulyNew = newAlerts.filter(a => !existingIds.has(a.id));

  // If user enabled push notifications and we have new alerts, fire browser notification
  if (settings.enablePush && trulyNew.length > 0) {
    const topAlert = trulyNew[0];
    dispatchLocalPush(topAlert.titleKu, topAlert.bodyKu);
  }

  // Return combined list, sorted by timestamp descending
  const combined = [...trulyNew, ...existingList].slice(0, 35);
  saveStoredNotifications(combined);
  return combined;
}
