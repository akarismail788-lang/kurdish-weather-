import React from 'react';
import { 
  Award, 
  Sparkles, 
  Compass, 
  Sprout, 
  BellRing, 
  Users, 
  Mountain, 
  Heart,
  Code2,
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-4 px-4 pb-24 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Official Creator Distinction Card (Official Silver Developer Branding) */}
      <div className="rounded-3xl p-6 glass-panel border border-[#C0C0C0]/30 shadow-[0_15px_45px_rgba(192,192,192,0.12)] relative overflow-hidden text-center">
        {/* Ambient silver/platinum auroral glows */}
        <div className="absolute -top-16 inset-x-0 h-40 bg-gradient-to-b from-[#C0C0C0]/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-10 w-44 h-44 rounded-full bg-slate-400/10 blur-3xl pointer-events-none" />

        {/* Formal Silver Emblem */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-400 via-slate-100 to-zinc-400 p-0.5 shadow-xl shadow-slate-400/20 mb-3.5 flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center">
              <Award size={32} className="text-[#C0C0C0] drop-shadow-[0_0_12px_rgba(192,192,192,0.6)]" />
            </div>
          </div>

          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800/80 text-[#C0C0C0] border border-[#C0C0C0]/35 mb-3 uppercase tracking-wider shadow-sm">
            بەیاننامەی فەرمی و مافی بەرهەم · Official Developer Branding
          </span>

          <h1 className="text-lg sm:text-xl font-black text-white leading-relaxed tracking-tight max-w-sm">
            ئەم ئەپە لەلایەن « <span className="bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#94A3B8] bg-clip-text text-transparent font-black underline decoration-[#C0C0C0]/60 decoration-2 underline-offset-4 drop-shadow-[0_2px_10px_rgba(192,192,192,0.45)]">ئاکار ئیسماعیل (Akar Ismail)</span> » دیزاین کراوە و دروست کراوە
          </h1>

          <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed max-w-xs">
            دیزاین و پرۆگرامسازی بەرزترین ئاستی ئەندازیاری نەرمەکاڵا و ڕووکاری بەکارهێنەر لەسەر ستانداردە جیهانییەکان
          </p>

          <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Code2 size={13} className="text-[#C0C0C0]" />
            <span>وەشانی بەرهەم: 2.5.0 Pro · كەشوهەوای کوردی</span>
          </div>
        </div>
      </div>

      {/* 2. Core Mission Section (پەیامی سەرەکی ئێمە) */}
      <div className="rounded-3xl p-5 glass-panel border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
            <Compass size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              پەیام و ئامانجی سەرەکی (Our Core Mission)
            </h2>
            <p className="text-[10px] text-slate-300">
              بۆچی كەشوهەوای کوردی دروستکراوە؟
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-200">
          <p>
            ئامانجی سەرەکی لە دروستکردنی ئەپڵیکەیشنی <strong>«كەشوهەوای کوردی»</strong>، پێشکەشکردنی داتای کەشناسی و ژینگەیی زۆر ورد، بێ دواکەوتن و بە تەواوی ناوخۆیی کراوەیە بۆ سەرجەم هاوڵاتیان لە باشوور، ڕۆژهەڵات، باکوور و ڕۆژئاوای کوردستان.
          </p>
          <p className="text-slate-300">
            ئێمە باوەڕمان وایە کە دەستگەیشتن بە زانیاری کەشوهەوای دەقیق و ئاگادارییە کتوپڕەکانی بوومەلەرزە و گەردەلوول مافێکی سەرەکی هەموو تاکێکە بە زمانی دایک، بە تایبەتی لە ناوچە شاخاوییەکان و دەشتاییە بەپیتەکانی نیشتمانەکەمان.
          </p>
        </div>
      </div>

      {/* 3. Future Roadmap (نەخشەڕێگای داهاتوو) */}
      <div className="rounded-3xl p-5 glass-panel border border-white/15">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              نەخشەڕێگای داهاتوو (Future Roadmap)
            </h2>
            <p className="text-[10px] text-slate-300">
              تایبەتمەندییە نوێیەکان کە لە وەشانی داهاتوودا بەردەست دەبن
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Milestone 1: Agricultural Weather */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <Sprout size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white">
                  ڕاوێژکاری کەشوهەوای کشتوکاڵی پێشکەوتوو
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                  لە قۆناغی کاردایە
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                بەشێکی تایبەت بۆ جووتیاران و باخەوانانی کوردستان بۆ دیاریکردنی کاتی گونجاوی ئاودێری، دەرمانڕێژی و چاندنی گەنم و بەروبوومەکان بەپێی شێی خاک.
              </p>
            </div>
          </div>

          {/* Milestone 2: Severe Alerts Push */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
              <BellRing size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white">
                  ئاگادارییە کتوپڕەکانی ڕووداوە سەختەکانی کەشوهەوا
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                  داهاتوو
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                سیستەمی هۆشیارکردنەوەی خێرا (Push Notifications) بۆ لافاو، بارانی بەخوڕ، ڕەشەبای زاگرۆس و شەپۆلەکانی تۆزوخۆڵ بە هاوکاری دەزگا پێوەندیدارەکان.
              </p>
            </div>
          </div>

          {/* Milestone 3: Community Weather Stations */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
              <Users size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white">
                  تۆڕی کەشناسی هاوبەش و کەشناسی جەماوەری
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                  داهاتوو
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                ڕێگەدان بە بەکارهێنەران و وێستگە کەسییەکان بۆ بەشداریکردنی پلەی گەرمی و ڕێژەی باران لە گوند و شارۆچکە دوورەدەستەکاندا.
              </p>
            </div>
          </div>

          {/* Milestone 4: Mountain Pass Road Weather */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
              <Mountain size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white">
                  پێشبینی بەستەڵەک و بەفری شاخەکان و ڕێگاوبان
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                  داهاتوو
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                چاودێری تایبەتی بەفربارین و تەمی ڕێگاکانی پێنجوێن، ئەزمەڕ، کۆڕەک، دەربەندیخان، گەلی عەلی بەگ و زینەتیر بۆ سەلامەتی شۆفێران.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quality & Commitment Badge with Official Silver Branding */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-700/60 shadow-[0_4px_25px_rgba(192,192,192,0.06)] text-center flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-xs text-slate-200 font-bold mb-1.5">
          <Heart size={14} className="text-rose-500 fill-rose-500" />
          <span>پێشکەشە بە خەڵکی خۆشەویستی کوردستان</span>
        </div>
        <p className="text-[11px] text-slate-400">
          هەموو مافەکانی دیزاین و گەشەپێدان پارێزراوە بۆ <span className="bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#94A3B8] bg-clip-text text-transparent font-black tracking-wide drop-shadow-[0_1px_3px_rgba(192,192,192,0.4)]">ئاکار ئیسماعیل (Akar Ismail)</span> © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
