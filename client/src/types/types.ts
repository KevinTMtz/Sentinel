export interface objectWithKeyStr {
  [key: string]: any;
}

export interface ReportSearchQuery {
  topic: string;
  location: string;
  until: Date | undefined;
}

export type Periodicy = 'daily' | 'weekly' | 'monthly';

export interface SubscriptionConfig {
  periodicy: Periodicy;
  startDate: string;
  isActive: Boolean;
}

export interface Subscription {
  id?: string | undefined;
  config: SubscriptionConfig;
  query: ReportSearchQuery;
}

export interface Trend {
  name: string;
  tweetVolume: number;
}
