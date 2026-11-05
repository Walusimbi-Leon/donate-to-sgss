import { DonationRecord, ImpactTier } from '../types/donation';

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'sgss-don-101',
    reference: 'SGSS-1741203912-88219',
    donorName: 'Elena Rostova',
    email: 'elena.rostova@example.org',
    amount: 100,
    currency: 'USD',
    frequency: 'monthly',
    projectCategory: 'games',
    message: 'Thank you for keeping indie narrative games free for everyone without paywalls or ads!',
    isAnonymous: false,
    date: '2026-11-04T18:22:00Z',
    gateway: 'paystack',
    status: 'success',
  },
  {
    id: 'sgss-don-102',
    reference: 'SGSS-1741198421-44102',
    donorName: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    amount: 20,
    currency: 'USD',
    frequency: 'once',
    projectCategory: 'books',
    message: 'The audiobooks have accompanied my daily commute for 2 years. Happy to contribute.',
    isAnonymous: false,
    date: '2026-11-03T11:45:00Z',
    gateway: 'paystack',
    status: 'success',
  },
  {
    id: 'sgss-don-103',
    reference: 'SGSS-1741182049-93012',
    donorName: 'Anonymous Reader',
    email: 'anon@example.com',
    amount: 50,
    currency: 'USD',
    frequency: 'once',
    projectCategory: 'tools',
    message: 'Your open web calculators and developer utilities saved our student team countless hours.',
    isAnonymous: true,
    date: '2026-11-02T09:15:00Z',
    gateway: 'paystack',
    status: 'success',
  },
  {
    id: 'sgss-don-104',
    reference: 'SGSS-1741154201-38192',
    donorName: 'Dr. Tariq Al-Mansoor',
    email: 'tariq.mansoor@example.edu',
    amount: 10,
    currency: 'USD',
    frequency: 'monthly',
    projectCategory: 'books',
    message: 'Accessible public domain scholarship with human narration is a rare gem in 2026.',
    isAnonymous: false,
    date: '2026-11-01T15:30:00Z',
    gateway: 'paystack',
    status: 'success',
  },
  {
    id: 'sgss-don-105',
    reference: 'SGSS-1741120019-12904',
    donorName: 'Aisha Bello',
    email: 'aisha.b@example.ng',
    amount: 5,
    currency: 'USD',
    frequency: 'once',
    projectCategory: 'all',
    message: 'Small gift from Lagos with gratitude for SGSS free learning resources!',
    isAnonymous: false,
    date: '2026-10-31T20:10:00Z',
    gateway: 'paystack',
    status: 'success',
  },
  {
    id: 'sgss-don-106',
    reference: 'SGSS-1741098221-75412',
    donorName: 'Devon Vance',
    email: 'devon@example.io',
    amount: 2,
    currency: 'USD',
    frequency: 'once',
    projectCategory: 'games',
    message: 'Keep making pure art without microtransactions.',
    isAnonymous: false,
    date: '2026-10-30T14:05:00Z',
    gateway: 'paystack',
    status: 'success',
  },
  {
    id: 'sgss-don-107',
    reference: 'SGSS-1741065112-61209',
    donorName: 'Klara Lindholm',
    email: 'klara.lindholm@example.se',
    amount: 1,
    currency: 'USD',
    frequency: 'monthly',
    projectCategory: 'tools',
    message: 'Every dollar counts. Proud sustainer.',
    isAnonymous: false,
    date: '2026-10-29T08:50:00Z',
    gateway: 'paystack',
    status: 'success',
  },
];

export const IMPACT_TIERS: Record<number, ImpactTier> = {
  1: {
    amount: 1,
    label: 'CDN Fuel',
    impactDescription: 'Delivers 1,000 free game asset or audiobook chapter downloads via global edge networks.',
  },
  2: {
    amount: 2,
    label: 'Open Host',
    impactDescription: 'Keeps 1 open web educational utility online and ad-free for an entire month.',
  },
  5: {
    amount: 5,
    label: 'Studio Voice',
    impactDescription: 'Sponsors 1 hour of professional human audio narration & acoustic mastering for free audiobooks.',
  },
  10: {
    amount: 10,
    label: 'Game Relay',
    impactDescription: 'Funds multiplayer server bandwidth for 500 active indie game players worldwide for 2 weeks.',
  },
  20: {
    amount: 20,
    label: 'Literary Care',
    impactDescription: 'Covers complete typography, proofreading, and multi-format conversion (EPUB, PDF, Web) for 1 full open book.',
  },
  50: {
    amount: 50,
    label: 'Infrastructure',
    impactDescription: 'Provides dedicated cloud continuous integration, database backups, and SSL for all SGSS platforms.',
  },
  100: {
    amount: 100,
    label: 'Creator Patron',
    impactDescription: 'Directly subsidizes independent writers, coders, and sound artists to develop new free public works.',
  },
};

export interface SGSSProject {
  id: string;
  title: string;
  category: 'games' | 'books' | 'tools';
  categoryLabel: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics: string;
  image: string;
  license: string;
}

export const SGSS_PROJECTS: SGSSProject[] = [
  {
    id: 'proj-chronicles',
    title: 'Aetheria: Isle of Echoes',
    category: 'games',
    categoryLabel: 'Interactive Games',
    tagline: 'An atmospheric puzzle adventure about forgotten languages and ancient ruins.',
    description:
      'A full-length story-driven adventure game completely free to play in modern browsers and downloadable for desktop. Zero microtransactions, zero telemetry, crafted with pure hand-painted art and responsive acoustic orchestration.',
    highlights: ['14 Handcrafted Chapters', 'Original Orchestral Score', '100% Free & Open Source'],
    metrics: '42,000+ Players Worldwide',
    image: '/src/assets/images/sgss_games_showcase_1793885126317.jpg',
    license: 'CC BY-NC 4.0 / Open Engine',
  },
  {
    id: 'proj-open-audio',
    title: 'The Alexandria Voice Archives',
    category: 'books',
    categoryLabel: 'Books & Audiobooks',
    tagline: 'Meticulously curated classics and modern philosophical essays with studio narration.',
    description:
      'We bring essential human thought to life. Every title includes pristine typographic typography in EPUB and PDF alongside warm, human voice recordings recorded in studio environments with zero synthetic shortcuts.',
    highlights: ['28 Complete Audio Volumes', 'Unabridged Studio Narration', 'EPUB / PDF / MP3 Direct Access'],
    metrics: '85,000+ Downloads This Year',
    image: '/src/assets/images/sgss_books_showcase_1793885126777.jpg',
    license: 'Public Domain / Free Culture',
  },
  {
    id: 'proj-open-tools',
    title: 'Aether Digital Toolkit',
    category: 'tools',
    categoryLabel: 'Websites & Open Tools',
    tagline: 'Privacy-first browser utilities for creators, writers, and students.',
    description:
      'A suite of lightweight, client-side web tools: distraction-free writing environments, accessible typography contrast validators, audio waveform visualizers, and mathematical problem solvers running cleanly without tracking scripts.',
    highlights: ['Client-Side Only (No Tracking)', 'Instant Load Times', 'Open Source GitHub Monorepo'],
    metrics: '110,000+ Monthly Unique Users',
    image: '/src/assets/images/sgss_web_tools_showcase_1793885127046.jpg',
    license: 'MIT Permissive License',
  },
];
