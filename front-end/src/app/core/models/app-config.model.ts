export interface AppConfig {
  appName?: string;
  phone?: string;
  address?: string;
  location?: string;
  hotlineNumber: number;
  workingHours: string;
  shortDescription?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  social?: { facebook?: string; twitter?: string; instagram?: string, youtube?: string };
  paymentMethods: string[],
  appCurrencies: string[],
}
