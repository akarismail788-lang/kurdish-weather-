import React, { useState } from 'react';
import { 
  WeatherNotification, 
  NotificationSettings 
} from '../types/notifications';
import { 
  requestPushPermission, 
  dispatchLocalPush, 
  saveNotificationSettings 
} from '../services/notificationService';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  AlertTriangle, 
  CloudRain, 
  ThermometerSnowflake, 
  Activity, 
  Sun, 
  Sliders, 
  SendHorizontal,
  ShieldCheck,
  Check
} from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: WeatherNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onMarkItemAsRead: (id: string) => void;
  settings: NotificationSettings;
  onUpdateSettings: (settings: NotificationSettings) => void;
  onAddTestNotification: () => void;
}

type FilterTab = 'all' | 'critical' | 'weather' | 'quake';

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onMarkItemAsRead,
  settings,
  onUpdateSettings,
  onAddTestNotification,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  if (!isOpen) return null;

  const handleRequestPush = async () => {
    const perm = await requestPushPermission();
    setPermissionStatus(perm);
    if (perm === 'granted') {
      const updated = { ...settings, enablePush: true };
      onUpdateSettings(updated);
      saveNotificationSettings(updated);
      dispatchLocalPush('ئاگادارکردنەوەی کەشوهەوا چالاک کرا', 'ئێستا نوێترین گۆڕانکاری و ئاگادارییەکان ڕاستەوخۆ وەردەگریت.');
    }
  };

  const handleToggleSetting = (key: keyof NotificationSettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    onUpdateSettings(updated);
    saveNotificationSettings(updated);
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'critical') return item.priority === 'critical' || item.priority === 'high';
    if (activeTab === 'weather') return item.type !== 'earthquake';
    if (activeTab === 'quake') return item.type === 'earthquake';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'severe':
        return <AlertTriangle size={17} className="text-rose-400" />;
      case 'rain':
        return <CloudRain size={17} className="text-cyan-400" />;
      case 'frost':
        return <ThermometerSnowflake size={17} className="text-blue-300" />;
      case 'earthquake':
        return <Activity size={17} className="text-rose-400" />;
      case 'uv':
        return <Sun size={17} className="text-amber-400" />;
      default:
        return <Bell size={17} className="text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-t-[36px] sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[88vh] text-slate-100 animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 relative">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-md">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  ئاگادارکردنەوە زیرەکەکان
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  خۆکار و زیرەک
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                هۆشداری کتوپڕی کەشوهەوا، سەرما، لافاو و بوومەلەرزە
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                showSettings ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-slate-300'
              }`}
              title="ڕێکخستنی ئاگادارییەکان"
            >
              <Sliders size={15} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Settings Panel (Collapsible) */}
        {showSettings && (
          <div className="my-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3 shrink-0 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span className="font-bold text-white">ئاگادارکردنەوەی سیستەمی (Push)</span>
              </div>
              {permissionStatus === 'granted' ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ڕێگەپێدراوە ✓
                </span>
              ) : (
                <button
                  onClick={handleRequestPush}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500 text-slate-950 font-bold text-[11px] hover:bg-cyan-400 transition-colors cursor-pointer shadow-sm"
                >
                  چالاککردن لە وێبگەڕ
                </button>
              )}
            </div>

            {/* Toggle options */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
              <button
                onClick={() => handleToggleSetting('severeStorms')}
                className={`p-2 rounded-xl border flex items-center justify-between text-[11px] transition-all cursor-pointer ${
                  settings.severeStorms ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <span>زریان و ڕەشەبا</span>
                {settings.severeStorms && <Check size={12} />}
              </button>

              <button
                onClick={() => handleToggleSetting('heavyRain')}
                className={`p-2 rounded-xl border flex items-center justify-between text-[11px] transition-all cursor-pointer ${
                  settings.heavyRain ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <span>بارانی بەخوڕ</span>
                {settings.heavyRain && <Check size={12} />}
              </button>

              <button
                onClick={() => handleToggleSetting('frostWarnings')}
                className={`p-2 rounded-xl border flex items-center justify-between text-[11px] transition-all cursor-pointer ${
                  settings.frostWarnings ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <span>شەختە و بەستەڵەک</span>
                {settings.frostWarnings && <Check size={12} />}
              </button>

              <button
                onClick={() => handleToggleSetting('earthquakes')}
                className={`p-2 rounded-xl border flex items-center justify-between text-[11px] transition-all cursor-pointer ${
                  settings.earthquakes ? 'bg-rose-500/20 border-rose-400 text-rose-200' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <span>هۆشداری بوومەلەرزە</span>
                {settings.earthquakes && <Check size={12} />}
              </button>
            </div>

            {/* Test Trigger Button */}
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">تاقیکردنەوەی ئاگاداری پۆش:</span>
              <button
                onClick={onAddTestNotification}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-bold transition-all cursor-pointer border border-white/10"
              >
                <SendHorizontal size={12} />
                <span>ناردنی ئاگاداری تاقیاری</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Tabs & Bulk Actions */}
        <div className="flex items-center justify-between gap-2 py-3 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'هەموو' },
              { id: 'critical', label: 'گرنگ و کتوپڕ' },
              { id: 'weather', label: 'کەشوهەوا' },
              { id: 'quake', label: 'بوومەلەرزە' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 text-xs transition-colors cursor-pointer"
                title="هەمووی بە خوێندراوە نیشان بدە"
              >
                <CheckCheck size={15} />
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                title="سڕینەوەی هەمووی"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Notifications Scrollable List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center glass-panel rounded-3xl border border-white/10 my-4">
              <Bell size={32} className="mx-auto text-slate-500 opacity-40 mb-2" />
              <h3 className="text-sm font-bold text-slate-300">هیچ ئاگادارییەک نییە</h3>
              <p className="text-xs text-slate-400 mt-1">
                کەشوهەوای ناوچەکەت ئارام و جێگیرە بەبێ هۆشداری مەترسیدار.
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const isCritical = item.priority === 'critical';
              const isHigh = item.priority === 'high';

              return (
                <div
                  key={item.id}
                  onClick={() => onMarkItemAsRead(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all text-right cursor-pointer relative overflow-hidden ${
                    !item.isRead
                      ? isCritical
                        ? 'bg-rose-950/40 border-rose-500/40 shadow-sm'
                        : isHigh
                        ? 'bg-amber-950/30 border-amber-500/40 shadow-sm'
                        : 'bg-cyan-950/30 border-cyan-500/40 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 opacity-75'
                  }`}
                >
                  {/* Unread Micro Indicator */}
                  {!item.isRead && (
                    <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  )}

                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-400'
                          : isHigh
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {getIconForType(item.type)}
                    </div>

                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="text-xs font-bold text-white tracking-tight truncate">
                          {item.titleKu}
                        </h4>
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-300 mt-0.5">
                        {item.bodyKu}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                        <span>{item.timeAgoKu}</span>
                        {item.cityNameKu && (
                          <>
                            <span>·</span>
                            <span className="text-cyan-300">{item.cityNameKu}</span>
                          </>
                        )}
                        {item.relatedValue && (
                          <>
                            <span>·</span>
                            <span className="font-mono">{item.relatedValue}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
