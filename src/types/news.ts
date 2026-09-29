export type NewsCategory = 'all' | 'meteorology' | 'agriculture' | 'climate' | 'dams';

export interface WeatherNewsArticle {
  id: string;
  titleKu: string;
  summaryKu: string;
  contentKu: string;
  category: 'meteorology' | 'agriculture' | 'climate' | 'dams';
  categoryLabelKu: string;
  authorKu: string;
  readTimeMinutes: number;
  timestamp: number;
  dateKu: string;
  tagsKu: string[];
  sourceKu: string;
  isFeatured?: boolean;
  highlightKu?: string;
  seasonalTipKu?: string;
  regionsKu: string[];
}

export interface DailyNewsBriefing {
  dateKu: string;
  generatedAt: number;
  headlineKu: string;
  generalSummaryKu: string;
  articles: WeatherNewsArticle[];
  agriculturalAdvisoryKu: string;
  waterReservoirStatusKu: string;
}
