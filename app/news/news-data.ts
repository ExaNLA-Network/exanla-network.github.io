export const newsCategories = {
  PROJECT_UPDATES: 'Project Updates',
  LIBRARY_RELEASES: 'Library Releases',
  APPLICATION_INTEGRATIONS: 'Application Integrations',
  EVENTS_WORKSHOPS: 'Events & Workshops',
  PUBLICATIONS: 'Publications',
  BENCHMARKS_PERFORMANCE: 'Benchmarks & Performance',
  COMMUNITY: 'Community',
} as const; // Using "as const" for stricter typing of values

export type NewsCategoryValue = typeof newsCategories[keyof typeof newsCategories];

export interface NewsArticleData {
  id: string;
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  imageUrl?: string;
  fullContent: string; // Can be simple text, or use markdown/HTML later
  categories: NewsCategoryValue[]; 
}

// Updated news data with only the workshop article and categories
export const newsArticlesData: NewsArticleData[] = [
  {
    id: '1',
    slug: 'exanla-workshop-lays-groundwork',
    title: 'ExaNLA Workshop Lays Groundwork for Exascale Numerical Linear Algebra',
    date: '2025-02-13',
    summary: 'From 11-13 February 2025, the Jülich Supercomputing Centre hosted the \'Exascale-ready distributed and accelerated dense Numerical Linear Algebra (ExaNLA)\' workshop, tackling the need for an advanced NLA library for future exascale supercomputers.',
    imageUrl: '/news/images/exanla_workshop_0225.jpeg', // Optional: Add an image path if available
    fullContent: `From 11-13 February 2025, the Jülich Supercomputing Centre hosted the "Exascale-ready distributed and accelerated dense Numerical Linear Algebra (ExaNLA)" workshop. Bringing together experts from Europe, the USA, and Japan, the event tackled the need for an advanced NLA library to fully utilize JUPITER and future exascale supercomputers. Discussions focused on strategies for large-scale distributed and accelerated computing. The successful workshop marked the first step toward forming an international committee to drive this initiative forward.`,
    categories: [newsCategories.EVENTS_WORKSHOPS, newsCategories.PROJECT_UPDATES, newsCategories.COMMUNITY],
  },
  // Previous news articles have been removed
]; 