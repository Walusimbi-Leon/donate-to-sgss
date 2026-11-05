import React, { useState } from 'react';
import { Heart, MessageSquare, Sparkles } from 'lucide-react';
import { DonationRecord, ProjectCategory } from '../types/donation';

interface DonorWallProps {
  donations: DonationRecord[];
}

export const DonorWall: React.FC<DonorWallProps> = ({ donations }) => {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filtered =
    filter === 'all'
      ? donations
      : donations.filter((d) => d.projectCategory === filter);

  const getCategoryLabel = (cat: ProjectCategory) => {
    switch (cat) {
      case 'games':
        return 'Interactive Games';
      case 'books':
        return 'Books & Audiobooks';
      case 'tools':
        return 'Websites & Open Tools';
      default:
        return 'General Fund';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="supporters" className="py-16 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
              Community Circle
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Wall of Gratitude
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
              Every creation remains free for the next person because of the kindness of people listed here.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Patrons
            </button>
            <button
              onClick={() => setFilter('games')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'games'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Games
            </button>
            <button
              onClick={() => setFilter('books')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'books'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Audiobooks
            </button>
            <button
              onClick={() => setFilter('tools')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'tools'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Web Tools
            </button>
          </div>
        </div>

        {/* Wall Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((donor) => (
            <div
              key={donor.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      {donor.isAnonymous ? 'Anonymous Supporter' : donor.donorName}
                    </h4>
                    {/* Unboxed metadata line */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span>{getCategoryLabel(donor.projectCategory)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{formatDate(donor.date)}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-base font-bold text-amber-800 tabular-nums">
                      ${donor.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-sans">
                      {donor.frequency === 'monthly' ? 'Monthly' : 'USD'}
                    </span>
                  </div>
                </div>

                {donor.message && (
                  <p className="mt-3.5 text-xs text-stone-700 italic border-l-0 bg-stone-50 p-3 rounded-lg leading-relaxed">
                    "{donor.message}"
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Verified via Paystack</span>
                <span className="tabular-nums">{donor.reference.slice(0, 14)}...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
