export type ProjectCategory = 'all' | 'games' | 'books' | 'tools';

export interface DonationRecord {
  id: string;
  reference: string;
  donorName: string;
  email: string;
  amount: number; // in USD
  currency: string;
  frequency: 'once' | 'monthly';
  projectCategory: ProjectCategory;
  message?: string;
  isAnonymous: boolean;
  date: string;
  gateway: 'paystack';
  status: 'success' | 'pending';
}

export interface ImpactTier {
  amount: number;
  label: string;
  impactDescription: string;
}
