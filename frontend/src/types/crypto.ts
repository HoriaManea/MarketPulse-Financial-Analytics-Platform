export type Crypto = {
  symbol: string;
  price: string;
};

export type LastYearCrypto = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

export type Article = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  sourceKey: string;
  category: string;
  timeAgo: string;
};

export type Pagination = {
  page: number;
  perPage: number;
  totalPages: number;
  hasMore: boolean;
};

export type Meta = {
  responseTimeMs: number;
};

export type ArticlesResponse = {
  articles: Article[];
  totalCount: number;
  sources: string[];
  fetchedAt: string;
  pagination: Pagination;
  lang: string;
  availableLanguages: string[];
  availableCategories: string[];
  _meta: Meta;
};
