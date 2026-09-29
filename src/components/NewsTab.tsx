import React, { useState } from 'react';
import { DailyNewsBriefing, WeatherNewsArticle, NewsCategory } from '../types/news';
import { 
  Newspaper, 
  Sparkles, 
  Sprout, 
  Droplets, 
  RefreshCw, 
  Clock, 
  ChevronLeft, 
  Tag, 
  ExternalLink,
  X,
  Share2,
  Calendar,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface NewsTabProps {
  briefing: DailyNewsBriefing;
  isLoading: boolean;
  onRefresh: () => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({
  briefing,
  isLoading,
  onRefresh,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [activeArticle, setActiveArticle] = useState<WeatherNewsArticle | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticleIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredArticles = briefing.articles.filter((article) => {
    if (selectedCategory === 'all') return true;
    return article.category === selectedCategory;
  });

  return (
    <div className="space-y-4 px-4 pb-24 pt-1 text-slate-100 animate-fadeIn">
      {/* 1. Daily AI Meteorology Briefing Banner */}
      <div className="rounded-3xl p-5 glass-panel border border-cyan-400/30 shadow-[0_15px_45px_rgba(6,182,212,0.12)] relative overflow-hidden">
        {/* Atmospheric Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-md">
              <Sparkles size={20} className="text-cyan-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white tracking-tight">
                  هەواڵ و شیکاریی ڕۆژانە بە ژیری دەستکرد
                </h2>
              </div>
              <span className="text-[11px] text-slate-300">
                {briefing.dateKu}
              </span>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
            title="نوێکردنەوە بە ژیری دەستکرد"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin text-cyan-400' : ''} />
            <span className="hidden sm:inline">نوێکردنەوەی AI</span>
          </button>
        </div>

        {/* Daily Headline & Synthesis */}
        <div className="mt-3.5 relative z-10 space-y-2">
          <h3 className="text-sm sm:text-base font-black text-white leading-snug drop-shadow-sm">
            {briefing.headlineKu}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-black/25 p-3 rounded-2xl border border-white/5">
            {briefing.generalSummaryKu}
          </p>
        </div>

        {/* Quick Insights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 relative z-10 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <Sprout size={15} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-300 block mb-0.5">ڕاوێژی کشتوکاڵی ئەمڕۆ:</span>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {briefing.agriculturalAdvisoryKu}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
              <Droplets size={15} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-300 block mb-0.5">ئاوی بەنداوەکان و بەفر:</span>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {briefing.waterReservoirStatusKu}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'هەموو بابەتەکان' },
          { id: 'meteorology', label: 'کەشناسی گشتی' },
          { id: 'agriculture', label: 'کشتوکاڵ و باخداری' },
          { id: 'dams', label: 'ئاو و بەنداوەکان' },
          { id: 'climate', label: 'شیکاری کەش' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as NewsCategory)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Article Cards Feed */}
      <div className="space-y-3">
        {filteredArticles.map((article) => {
          const isSaved = savedArticleIds.includes(article.id);

          return (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className={`rounded-3xl p-4 glass-panel border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer group text-right relative overflow-hidden ${
                article.isFeatured ? 'bg-slate-900/80 ring-1 ring-cyan-500/30' : ''
              }`}
            >
              {/* Category Badge & Bookmark */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                    {article.categoryLabelKu}
                  </span>
                  {article.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles size={10} />
                      گرنگ
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={11} />
                    {article.readTimeMinutes} خولەک
                  </span>
                  <button
                    onClick={(e) => handleToggleSave(article.id, e)}
                    className={`p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                      isSaved ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                    title="پاشەکەوتکردن"
                  >
                    <Bookmark size={15} className={isSaved ? 'fill-cyan-400' : ''} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug mb-1.5">
                {article.titleKu}
              </h4>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {article.summaryKu}
              </p>

              {/* Tags & Regions */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                {article.regionsKu.slice(0, 3).map((r, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                    📍 {r}
                  </span>
                ))}
                <span className="text-slate-400 mr-auto text-[10px] font-medium group-hover:translate-x-[-3px] transition-transform flex items-center gap-0.5 text-cyan-300">
                  درێژەی بابەت ←
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
          <div 
            className="w-full max-w-xl bg-slate-900 border border-white/20 rounded-t-[36px] sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] text-slate-100 animate-slideUp overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

            {/* Reader Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {activeArticle.categoryLabelKu}
                </span>
                <span className="text-[11px] text-slate-400">
                  {activeArticle.dateKu}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Article Content Scrollable Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 text-right pr-0.5">
              <h2 className="text-base sm:text-lg font-black text-white leading-relaxed">
                {activeArticle.titleKu}
              </h2>

              {/* Author & Source */}
              <div className="flex items-center justify-between text-xs text-slate-400 bg-white/5 p-2.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-200">{activeArticle.authorKu}</span>
                </div>
                <span>سەرچاوە: {activeArticle.sourceKu}</span>
              </div>

              {/* Highlight callout if present */}
              {activeArticle.highlightKu && (
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 font-medium leading-relaxed">
                  💡 خاڵی سەرەکی: {activeArticle.highlightKu}
                </div>
              )}

              {/* Main Body */}
              <div className="text-xs sm:text-sm text-slate-200 leading-loose space-y-3 whitespace-pre-line font-normal">
                {activeArticle.contentKu}
              </div>

              {/* Seasonal advice tip if present */}
              {activeArticle.seasonalTipKu && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white mb-0.5">ڕێنمایی وەرزی:</span>
                    <span>{activeArticle.seasonalTipKu}</span>
                  </div>
                </div>
              )}

              {/* Tags & Regions Footer */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                {activeArticle.tagsKu.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 text-slate-300 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
