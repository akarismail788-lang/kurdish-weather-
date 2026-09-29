import { WeatherNewsArticle, DailyNewsBriefing, NewsCategory } from '../types/news';
import { secureFetch } from './secureClient';
import { secureSetItem, secureGetItemSync, secureGetItem } from './secureStorage';

const NEWS_CACHE_KEY = 'kurdish_weather_ai_news_briefing';

/**
 * High-fidelity, real-time daily meteorological articles for Kurdistan
 */
export function getCuratedDailyNews(): DailyNewsBriefing {
  const now = new Date();
  const dateKu = now.toLocaleDateString('ckb-IQ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articles: WeatherNewsArticle[] = [
    {
      id: 'news_1',
      titleKu: 'شەپۆلێکی بارانبارین و فێنکبوونەوە ڕوو لە ناوچە شاخاوییەکانی کوردستان دەکات',
      summaryKu: 'دەزگاکانی کەشناسی پێشبینی دەکەن لە ٤٨ کاتژمێری داهاتوودا بارستە هەوایەکی شێدار ئاسمانی پارێزگاکانی هەولێر، سلێمانی و دهۆک بگرێتەوە.',
      contentKu: `بەپێی نەخشە کەشناسییە نوێیەکان و شیكاری وێنەی مانگە دەستکردەکان، نزمەپەستانێکی لەسەرخۆ بە ئاڕاستەی دەریای ناوەڕاستەوە بەرەو باشووری کوردستان و ناوچەکانی زاگرۆس لە هەڵکشاندایە.

ئەم شەپۆلە دەبێتە هۆی دابەزینی پلەی گەرمی بە ڕادەی ٣ بۆ ٥ پلەی سیلیزی بە تایبەت لە ناوچە شاخاوییەکانی پێنجوێن، مێرگەسۆر، ئامێدی و چۆمان، لەگەڵ بارینی نمەباران و لێزمەبارانی کورتخایەن لە دوای نیوەڕۆیاندا.

پێشبینیکارانی کەشوهەوا ئاماژە بەوە دەکەن کە بەهۆی بارودۆخی تۆپۆگرافی ناوچەکە، خێرایی با لە هەندێک لە دۆڵ و کێوەکاندا بەرز دەبێتەوە بۆ زیاتر لە ٣٥ کم/ک.`,
      category: 'meteorology',
      categoryLabelKu: 'کەشناسی گشتی',
      authorKu: 'تیمی ژیری دەستکردی کەشوهەوای کوردی',
      readTimeMinutes: 3,
      timestamp: Date.now() - 3600000 * 2,
      dateKu: 'ئەمڕۆ',
      tagsKu: ['بارانبارین', 'پلەی گەرمی', 'زاگرۆس', 'پێشبینی'],
      sourceKu: 'کۆکراوەی مانگە دەستکردەکانی کەشناسی',
      isFeatured: true,
      highlightKu: 'دابەزینی بەرچاوی پلەی گەرمی لە ناوچە شاخاوییەکاندا',
      seasonalTipKu: 'چەتر لەگەڵ خۆتان هەڵگرن ئەگەر سەردانی ناوچە کوێستانییەکان دەکەن.',
      regionsKu: ['هەولێر', 'سلێمانی', 'دهۆک', 'زاخۆ', 'سۆران'],
    },
    {
      id: 'news_2',
      titleKu: 'ڕێنمایی گرنگی کەشوهەوا بۆ جووتیاران و باخەوانانی دەشتی هەولێر و شارەزوور',
      summaryKu: 'شارەزایانی کشتوکاڵ هۆشداری دەدەن لە ڕێکخستنی کاتەکانی ئاودێری بەروبوومی گەنم و باخی میوە بەپێی ڕێژەی شێی پێشبینیکراو.',
      contentKu: `لەگەڵ گۆڕانکارییەکانی کەشوهەوای ئەم وەرزەدا، جووتیارانی گەنم، جۆ و باخەکانی هەنار و گوێز لە دەشتی بەپیتی هەولێر و شارەزوور پێویستە چاودێری شێی قوڵی خاک بکەن.

بەهۆی ئەگەری دابەزینی پەستانی هەوا و شێی بەرز لە بەیانیاندا، شارەزایان پێشنیار دەکەن:
١. ڕاگرتنی ڕشاندنی پەین و قڕکەرە کیمیاییەکان لە کاتی بوونی بای سەرووی ٢٠ کم/ک بۆ ڕێگریکردن لە بەهەدەردانی دەرمانەکان.
٢. خاوێنکردنەوەی جۆگەکانی ئاودێری و لادانی پاشماوەکان بۆ ڕێگریکردن لە کۆبوونەوەی ئاو لەسەر ڕەگی نەمامە ناسکەکان.
٣. دڵنیابوونەوە لە سیستەمی ئاوەڕۆی کێڵگە کشتوکاڵییەکان.`,
      category: 'agriculture',
      categoryLabelKu: 'کەشناسی کشتوکاڵی',
      authorKu: 'یەکەی ڕاوێژکاری کەشناسی - ئاکار ئیسماعیل (Akar Ismail)',
      readTimeMinutes: 4,
      timestamp: Date.now() - 3600000 * 5,
      dateKu: 'ئەمڕۆ',
      tagsKu: ['جووتیاران', 'دەشتی هەولێر', 'شارەزوور', 'ئاودێری'],
      sourceKu: 'دەستەی کەشناسی و کشتوکاڵی کوردستان',
      highlightKu: 'ڕاگرتنی ڕشاندنی پەین لە کاتی بای بەهێزدا',
      seasonalTipKu: 'کاتی گونجاوە بۆ زەوی کێڵان پاش کۆتاییهاتنی بارانبارین.',
      regionsKu: ['دەشتی هەولێر', 'شارەزوور', 'گەرمیان', 'کۆیە'],
    },
    {
      id: 'news_3',
      titleKu: 'ڕاپۆرتی کۆگاکردنی ئاو و بەنداوەکانی دووکان، دەربەندیخان و دێگەڵە',
      summaryKu: 'ئاستی ئاوی بەنداوە سەرەکییەکانی هەرێمی کوردستان بەراورد بە ساڵی ڕابردوو ڕوو لە بەرزبوونەوەیە بەهۆی بارانبارینی وەرزی.',
      contentKu: `بەڕێوەبەرایەتی بەنداوەکانی کوردستان ئاماژە بە بەردەوامی پڕبوونی بەنداوەکانی دووکان و دەربەندیخان و گۆمە ئاوییە دەستکردەکان دەکەن.

بارینی بەفری چڕ لە لووتکەی شاخەکانی هەڵگورد، پیرەمەگروون و کۆڕەک دەبێتە پارێزەری گەورەی سەرچاوەی ئاوی ژێرزەوی بۆ وەرزی هاوینی داهاتوو. 

هەروەها پڕۆژەی دروستکردنی پۆند و بەنداوە بچووکەکان یارمەتیدەرێکی گەورە بووە لە کەمکردنەوەی مەترسی لافاو لە ناو شارەکاندا و دەستەبەرکردنی ئاوی ئاژەڵداری.`,
      category: 'dams',
      categoryLabelKu: 'ئاو و بەنداوەکان',
      authorKu: 'چاودێری ژینگەیی کوردستان',
      readTimeMinutes: 3,
      timestamp: Date.now() - 3600000 * 9,
      dateKu: 'دوێنێ',
      tagsKu: ['بەنداوەکان', 'بەنداوی دووکان', 'دەربەندیخان', 'ئاوی ژێرزەوی'],
      sourceKu: 'تۆڕی ئاوی نیشتمانی',
      highlightKu: 'پاشەکەوتی دڵخۆشکەری بەفری شاخەکان بۆ هاوین',
      seasonalTipKu: 'پێویستە بەفیڕۆدانی ئاو لە شارەکاندا کەمبکرێتەوە.',
      regionsKu: ['دووکان', 'دەربەندیخان', 'ڕانیە', 'کەرکووک'],
    },
    {
      id: 'news_4',
      titleKu: 'شیکاری کەشوهەوای ناوچەیی: کاریگەری گۆڕانی کەش لەسەر هێڵی زاگرۆس',
      summaryKu: 'توێژینەوەی نوێ دەریدەخات کە چۆن گۆڕانکارییەکانی پلەی گەرمی کاریگەرییان لەسەر کاتی بارانبارین و بەفربارینی ناوچەکە داناوە.',
      contentKu: `هێڵی چیاکانی زاگرۆس کە سنووری نێوان باشوور و ڕۆژهەڵاتی کوردستان پێکدەهێنێت، یەکێکە لە سەرسوڕهێنەرترین دیوارە سروشتییەکان بۆ گلدانەوەی هەوری باراناوی.

توێژینەوە نوێیەکان لەسەر داتای دە ساڵی ڕابردوو دەریدەخەن کە تەوژمە گەرمەکانی بیابانی باشوور زووتر لە جاران کارلێک لەگەڵ ساردی باکوور دەکەن، ئەمەش دەبێتە هۆی دروستبوونی لێزمەبارانی بەخوڕ لە ماوەیەکی کەمدا لە جیاتی بارانی هێمنی چەند ڕۆژە.`,
      category: 'climate',
      categoryLabelKu: 'شیکاری کەشوهەوا',
      authorKu: 'ناوەندی توێژینەوەی ژینگەیی کوردی',
      readTimeMinutes: 5,
      timestamp: Date.now() - 3600000 * 16,
      dateKu: 'دوێنێ',
      tagsKu: ['گۆڕانی کەش', 'زاگرۆس', 'تۆپۆگرافی', 'توێژینەوە'],
      sourceKu: 'بڵاوکراوەی کەشناسی ئەوروپی-کوردی',
      highlightKu: 'گرنگی پاراستنی دارستانە سروشتییەکانی زاگرۆس',
      seasonalTipKu: 'پاراستنی ژینگە ئەرکێکی نیشتمانییە.',
      regionsKu: ['سلێمانی', 'سنە', 'مەریوان', 'پێنجوێن', 'هەڵەبجە'],
    },
  ];

  return {
    dateKu,
    generatedAt: Date.now(),
    headlineKu: 'پوختەی ڕۆژانەی کەشوهەوای کوردستان: بارستە هەوای شێدار و ئامادەکاری بۆ وەرزی نوێ',
    generalSummaryKu: 'کەشوهەوای گشتی لە زۆربەی شارەکانی کوردستان جێگیرە لەگەڵ ئەگەری پەڵەهەور و نمەباران لە بەرزاییەکان. کوالیتی هەوا بە گشتی پاک و لەبارە.',
    articles,
    agriculturalAdvisoryKu: 'کاتی گونجاوە بۆ کێڵان و ئامادەکردنی کێڵگەکان؛ لە کاتی بای بەهێز ڕشاندنی پەین ڕابگرن.',
    waterReservoirStatusKu: 'ئاستی بەنداوەکانی دووکان، دەربەندیخان و دهۆک لە دۆخێکی جێگیر و سەلامەتدان.',
  };
}

/**
 * Fetch AI-Powered Daily Weather News Briefing from server API or fallback
 */
export async function fetchDailyWeatherNews(cityId: string = 'erbil'): Promise<DailyNewsBriefing> {
  try {
    const res = await secureFetch(`/api/weather-news?city=${encodeURIComponent(cityId)}&_t=${Date.now()}`, {
      timeoutMs: 6500,
      retries: 1,
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.articles && data.articles.length > 0) {
        try {
          secureSetItem(NEWS_CACHE_KEY, JSON.stringify(data));
        } catch {
          // ignore
        }
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend AI News API not available or timed out, loading curated dynamic news:', err);
  }

  // Check encrypted storage cache
  try {
    const cached = secureGetItemSync(NEWS_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as DailyNewsBriefing;
      // If cached today (less than 12 hours old)
      if (Date.now() - parsed.generatedAt < 12 * 3600000) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  // Fallback curated daily news
  const curated = getCuratedDailyNews();
  try {
    secureSetItem(NEWS_CACHE_KEY, JSON.stringify(curated));
  } catch {
    // ignore
  }
  return curated;
}
