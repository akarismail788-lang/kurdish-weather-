/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { KurdistanCity, WeatherData, TempUnit, SpeedUnit } from './types/weather';
import { EarthquakeItem, EarthquakeStats } from './types/earthquake';
import { WeatherNotification, NotificationSettings } from './types/notifications';
import { DailyNewsBriefing } from './types/news';
import { AtmosphericMood, ThemePreference, getSmartAtmosphere } from './services/themeScheduler';
import { KURDISTAN_CITIES, DEFAULT_CITY } from './data/kurdistanCities';
import { fetchLiveWeatherData } from './services/weatherService';
import { fetchLiveEarthquakes } from './services/earthquakeService';
import { 
  loadNotificationSettings, 
  loadStoredNotifications, 
  saveStoredNotifications, 
  evaluateSmartNotifications, 
  dispatchLocalPush 
} from './services/notificationService';
import { fetchDailyWeatherNews } from './services/newsService';
import { AndroidFrame } from './components/AndroidFrame';
import { WeatherBackground } from './components/WeatherBackground';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar, TabType } from './components/BottomNavBar';
import { HomeTab } from './components/HomeTab';
import { HourlyTab } from './components/HourlyTab';
import { DailyTab } from './components/DailyTab';
import { NewsTab } from './components/NewsTab';
import { EarthquakeTab } from './components/EarthquakeTab';
import { AboutTab } from './components/AboutTab';
import { CityPickerModal } from './components/CityPickerModal';
import { SettingsModal } from './components/SettingsModal';
import { NotificationsModal } from './components/NotificationsModal';
import { WidgetsModal } from './components/WidgetsModal';
import { OfflineBanner } from './components/OfflineBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { secureSetItem, secureGetItemSync } from './services/secureStorage';
import { CloudSun, AlertCircle } from 'lucide-react';

export default function App() {
  // Current active city with encrypted storage support
  const [currentCity, setCurrentCity] = useState<KurdistanCity>(() => {
    const saved = secureGetItemSync('kurdish_weather_selected_city') || localStorage.getItem('kurdish_weather_selected_city');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CITY;
      }
    }
    return DEFAULT_CITY;
  });

  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Earthquake state
  const [earthquakes, setEarthquakes] = useState<EarthquakeItem[]>([]);
  const [earthquakeStats, setEarthquakeStats] = useState<EarthquakeStats>({
    total24h: 0,
    maxMagnitude: 0,
    latestTimeKu: 'ئێستا',
    kurdistanCount: 0,
  });
  const [isLoadingEarthquakes, setIsLoadingEarthquakes] = useState<boolean>(false);

  // Smart Push Notifications state
  const [notifications, setNotifications] = useState<WeatherNotification[]>(() => {
    return loadStoredNotifications();
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    return loadNotificationSettings();
  });
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);

  // AI-Powered Daily Weather News state
  const [newsBriefing, setNewsBriefing] = useState<DailyNewsBriefing | null>(null);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Modals state
  const [isCityPickerOpen, setIsCityPickerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isWidgetsModalOpen, setIsWidgetsModalOpen] = useState<boolean>(false);

  // User preferences & Smart Theme Scheduler (Encrypted Storage)
  const [tempUnit, setTempUnit] = useState<TempUnit>(() => {
    return (secureGetItemSync('kurdish_weather_temp_unit') as TempUnit) || 
           (localStorage.getItem('kurdish_weather_temp_unit') as TempUnit) || 'C';
  });
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>(() => {
    return (secureGetItemSync('kurdish_weather_speed_unit') as SpeedUnit) || 
           (localStorage.getItem('kurdish_weather_speed_unit') as SpeedUnit) || 'kmh';
  });
  const [enableWeatherEffects, setEnableWeatherEffects] = useState<boolean>(() => {
    const s = secureGetItemSync('kurdish_weather_effects') || localStorage.getItem('kurdish_weather_effects');
    return s !== 'false';
  });
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    return (secureGetItemSync('kurdish_weather_theme_pref') as ThemePreference) || 
           (localStorage.getItem('kurdish_weather_theme_pref') as ThemePreference) || 'auto';
  });
  const [forcedMood, setForcedMood] = useState<AtmosphericMood | null>(null);

  // Desktop mockup mode switch
  const [isMockupMode, setIsMockupMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return true;
    }
    return false;
  });

  // Calculate dynamic atmospheric mood from solar time & weather
  const currentMood: AtmosphericMood = useMemo(() => {
    if (forcedMood) return forcedMood;
    if (themePreference === 'dark') return 'night';
    if (themePreference === 'light') return 'day';
    if (themePreference === 'aurora') return 'dusk';

    if (!weather) return 'night';

    return getSmartAtmosphere(
      weather.current.weatherCode,
      weather.current.isDay,
      weather.daily[0]?.sunrise,
      weather.daily[0]?.sunset
    ).mood;
  }, [forcedMood, themePreference, weather]);

  // Load weather
  const loadWeather = useCallback(async (city: KurdistanCity, background: boolean = false) => {
    if (!background) setIsLoadingWeather(true);
    setErrorMsg(null);

    try {
      const data = await fetchLiveWeatherData(city);
      setWeather(data);
      secureSetItem('kurdish_weather_selected_city', JSON.stringify(city));
    } catch (err) {
      console.error('Failed to load weather:', err);
      setErrorMsg('نەتوانرا زانیاری کەشوهەوا نوێ بکرێتەوە، دۆخی ئۆفلاین بەکاردێت.');
    } finally {
      setIsLoadingWeather(false);
      setIsRefreshing(false);
    }
  }, []);

  // Load earthquakes
  const loadEarthquakes = useCallback(async () => {
    setIsLoadingEarthquakes(true);
    try {
      const res = await fetchLiveEarthquakes();
      setEarthquakes(res.items);
      setEarthquakeStats(res.stats);
    } catch (err) {
      console.error('Failed to fetch earthquakes:', err);
    } finally {
      setIsLoadingEarthquakes(false);
    }
  }, []);

  // Load AI Weather News
  const loadNews = useCallback(async (cityId: string) => {
    setIsLoadingNews(true);
    try {
      const briefing = await fetchDailyWeatherNews(cityId);
      setNewsBriefing(briefing);
    } catch (err) {
      console.error('Failed to load news briefing:', err);
    } finally {
      setIsLoadingNews(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeather(currentCity);
    loadEarthquakes();
    loadNews(currentCity.id);
  }, [currentCity, loadWeather, loadEarthquakes, loadNews]);

  // Periodic auto-refresh every 8 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      loadWeather(currentCity, true);
      loadEarthquakes();
    }, 8 * 60 * 1000);
    return () => clearInterval(timer);
  }, [currentCity, loadWeather, loadEarthquakes]);

  // Trigger proactive smart notifications whenever weather or earthquakes update
  useEffect(() => {
    if (weather) {
      setNotifications(prev => {
        const evaluated = evaluateSmartNotifications(weather, earthquakes, notificationSettings, prev);
        return evaluated;
      });
    }
  }, [weather, earthquakes, notificationSettings]);

  // Manual refresh trigger for all live data
  const handleRefreshAll = () => {
    setIsRefreshing(true);
    loadWeather(currentCity, false);
    loadEarthquakes();
    loadNews(currentCity.id);
  };

  // City change handler
  const handleSelectCity = (city: KurdistanCity) => {
    setCurrentCity(city);
    setActiveTab('home');
    loadNews(city.id);
  };

  // Browser Geolocation (GPS)
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('گەڕان بەدوای شوێن لە وێبگەڕەکەتدا بەردەست نییە.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let closestCity = KURDISTAN_CITIES[0];
        let minDistance = Number.MAX_VALUE;

        for (const c of KURDISTAN_CITIES) {
          const dist = Math.hypot(c.lat - latitude, c.lon - longitude);
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = c;
          }
        }

        if (minDistance < 0.5) {
          setCurrentCity(closestCity);
        } else {
          const customCity: KurdistanCity = {
            id: `gps_${latitude.toFixed(2)}_${longitude.toFixed(2)}`,
            nameKu: 'شوێنی ئێستات',
            nameEn: 'Current Location',
            regionKu: 'شوێنی دیاریکراوی GPS',
            regionKey: 'world',
            lat: latitude,
            lon: longitude,
          };
          setCurrentCity(customCity);
        }
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsLocating(false);
        setErrorMsg('دەستگەیشتن بە شوێنی جوگرافی ڕەتکرایەوە یان نەدۆزرایەوە.');
      },
      { timeout: 10000 }
    );
  };

  // Notification management handlers
  const handleMarkAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    saveStoredNotifications([]);
  };

  const handleMarkItemAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const handleAddTestNotification = () => {
    const testAlert: WeatherNotification = {
      id: `test_${Date.now()}`,
      type: 'severe',
      priority: 'high',
      titleKu: `تاقیکردنەوەی ئاگادارکردنەوەی کەشوهەوا لە ${currentCity.nameKu}`,
      bodyKu: 'ئەمە ئاگادارییەکی تاقیارییە بۆ دڵنیابوونەوە لە گەیشتنی هۆشدارییە خێراکان بە ئامێرەکەت.',
      timestamp: Date.now(),
      timeAgoKu: 'ئێستا',
      cityNameKu: currentCity.nameKu,
      isRead: false,
    };
    const updated = [testAlert, ...notifications];
    setNotifications(updated);
    saveStoredNotifications(updated);
    dispatchLocalPush(testAlert.titleKu, testAlert.bodyKu);
  };

  // Unit settings handlers (Encrypted persistence)
  const handleSetTempUnit = (u: TempUnit) => {
    setTempUnit(u);
    secureSetItem('kurdish_weather_temp_unit', u);
  };

  const handleSetSpeedUnit = (u: SpeedUnit) => {
    setSpeedUnit(u);
    secureSetItem('kurdish_weather_speed_unit', u);
  };

  const handleToggleWeatherEffects = () => {
    setEnableWeatherEffects(prev => {
      const next = !prev;
      secureSetItem('kurdish_weather_effects', String(next));
      return next;
    });
  };

  const handleSetThemePreference = (pref: ThemePreference) => {
    setThemePreference(pref);
    secureSetItem('kurdish_weather_theme_pref', pref);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <ErrorBoundary>
      <AndroidFrame
        isMockupMode={isMockupMode}
        onToggleMockup={() => setIsMockupMode(!isMockupMode)}
      >
        {/* 1. Dynamic Atmospheric Background with Severe Weather Engine */}
        {enableWeatherEffects && (
          <WeatherBackground
            weatherCode={weather?.current.weatherCode || 0}
            isDay={weather?.current.isDay ?? true}
            mood={currentMood}
            sunriseStr={weather?.daily[0]?.sunrise}
            sunsetStr={weather?.daily[0]?.sunset}
          />
        )}

        {/* 2. Top App Bar (Permanently pinned at top) */}
        <TopAppBar
          currentCity={currentCity}
          onOpenCityPicker={() => setIsCityPickerOpen(true)}
          onUseCurrentLocation={handleUseCurrentLocation}
          onRefresh={handleRefreshAll}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenNotifications={() => setIsNotificationsModalOpen(true)}
          unreadNotificationsCount={unreadNotificationsCount}
          isRefreshing={isRefreshing}
          isLocating={isLocating}
        />

        {/* 3. Main Scrollable Container (Exclusively scrolls within this area) */}
        <main className="flex-1 min-h-0 w-full overflow-y-auto no-scrollbar relative z-10">
          {/* Real-time Offline & Security Banner */}
          <OfflineBanner 
            onRetry={handleRefreshAll} 
            lastUpdatedStr={weather?.lastUpdated} 
          />

          {/* Error notification banner if any */}
          {errorMsg && (
            <div className="mx-4 my-2 p-2.5 rounded-3xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-[11px] underline font-bold cursor-pointer"
              >
                داخستن
              </button>
            </div>
          )}

        {/* Loading Spinner Skeleton */}
        {isLoadingWeather && !weather ? (
          <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin" />
              <CloudSun size={28} className="absolute inset-0 m-auto text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                كەشوهەوای کوردی (Kurdish Weather)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                لە وەرگرتنی کەشوهەوای {currentCity.nameKu}...
              </p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'home' && weather && (
              <HomeTab
                weather={weather}
                tempUnit={tempUnit}
                speedUnit={speedUnit}
                onSelectHourlyTab={() => setActiveTab('hourly')}
                onSelectDailyTab={() => setActiveTab('daily')}
                onOpenWidgets={() => setIsWidgetsModalOpen(true)}
                onOpenNotifications={() => setIsNotificationsModalOpen(true)}
              />
            )}

            {activeTab === 'hourly' && weather && (
              <HourlyTab
                hourly={weather.hourly}
                tempUnit={tempUnit}
                speedUnit={speedUnit}
              />
            )}

            {activeTab === 'daily' && weather && (
              <DailyTab
                daily={weather.daily}
                tempUnit={tempUnit}
                speedUnit={speedUnit}
              />
            )}

            {activeTab === 'news' && (
              <NewsTab
                briefing={newsBriefing || fetchDailyWeatherNewsSync()}
                isLoading={isLoadingNews}
                onRefresh={() => loadNews(currentCity.id)}
              />
            )}

            {activeTab === 'earthquake' && (
              <EarthquakeTab
                items={earthquakes}
                stats={earthquakeStats}
                isLoading={isLoadingEarthquakes}
                onRefresh={loadEarthquakes}
              />
            )}

            {activeTab === 'about' && (
              <AboutTab />
            )}
          </>
        )}
      </main>

      {/* 4. Permanently Sticky Persistent Bottom Navigation Bar (Never hides on scroll) */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        hasRecentEarthquake={earthquakeStats.total24h > 0}
        hasUnreadNews={true}
      />

      {/* 5. City Picker Modal */}
      <CityPickerModal
        isOpen={isCityPickerOpen}
        onClose={() => setIsCityPickerOpen(false)}
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
      />

      {/* 6. Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        tempUnit={tempUnit}
        onSetTempUnit={handleSetTempUnit}
        speedUnit={speedUnit}
        onSetSpeedUnit={handleSetSpeedUnit}
        enableWeatherEffects={enableWeatherEffects}
        onToggleWeatherEffects={handleToggleWeatherEffects}
        themePreference={themePreference}
        onSetThemePreference={handleSetThemePreference}
        forcedMood={forcedMood}
        onSetForcedMood={setForcedMood}
        onOpenWidgets={() => setIsWidgetsModalOpen(true)}
      />

      {/* 7. Smart Push Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAllNotifications}
        onMarkItemAsRead={handleMarkItemAsRead}
        settings={notificationSettings}
        onUpdateSettings={setNotificationSettings}
        onAddTestNotification={handleAddTestNotification}
      />

      {/* 8. Android Home Screen Widgets Preview Modal */}
      {weather && (
        <WidgetsModal
          isOpen={isWidgetsModalOpen}
          onClose={() => setIsWidgetsModalOpen(false)}
          weather={weather}
          tempUnit={tempUnit}
        />
      )}
    </AndroidFrame>
  </ErrorBoundary>
  );
}

// Synchronous helper for instant fallback during initial micro-render
function fetchDailyWeatherNewsSync(): DailyNewsBriefing {
  return {
    dateKu: 'ئەمڕۆ',
    generatedAt: Date.now(),
    headlineKu: 'پوختەی کەشوهەوای هەرێمی کوردستان و ناوچەکانی دەوروبەر',
    generalSummaryKu: 'کەشوهەوا لە زۆربەی شارەکانی کوردستان جێگیرە لەگەڵ پەڵەهەور و فێنکی لە کوێستانەکاندا.',
    agriculturalAdvisoryKu: 'کاتی گونجاوە بۆ کێڵان و پێڕاگەیشتن بە باخەکان.',
    waterReservoirStatusKu: 'ئاستی بەنداوەکان جێگیرە و سەرچاوەی ئاوی بەفر لە شاخەکان بەردەوامە.',
    articles: [],
  };
}
