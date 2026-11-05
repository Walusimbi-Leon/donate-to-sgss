import React from 'react';
import { Target, Server, Mic, Globe2, BookOpen, Layers } from 'lucide-react';

interface TransparencyProgressProps {
  totalRaisedUsd: number;
  monthlyGoalUsd: number;
  donorsCount: number;
}

export const TransparencyProgress: React.FC<TransparencyProgressProps> = ({
  totalRaisedUsd,
  monthlyGoalUsd,
  donorsCount,
}) => {
  const percentage = Math.min(Math.round((totalRaisedUsd / monthlyGoalUsd) * 100), 100);

  return (
    <section id="transparency" className="py-12 border-t border-b border-stone-200 bg-stone-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
            Financial Transparency
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            How Every Dollar Sustains Free Access
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            SGSS does not charge users, sell advertising space, or harvest visitor data. Our operational expenses are 100% public and funded entirely through community contributions via Paystack.
          </p>
        </div>

        {/* Live Monthly Budget Progress Bar */}
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 font-mono tabular-nums">
                ${totalRaisedUsd.toLocaleString()}
              </span>
              <span className="text-stone-500 text-sm">
                raised toward{' '}
                <span className="font-mono tabular-nums font-semibold text-stone-800">
                  ${monthlyGoalUsd.toLocaleString()}
                </span>{' '}
                monthly operating target
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="font-mono tabular-nums font-semibold text-amber-800 text-sm">
                {percentage}%
              </span>
              <span>funded</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-mono tabular-nums font-semibold text-stone-800">
                {donorsCount}
              </span>
              <span>active patrons</span>
            </div>
          </div>

          {/* Progress track */}
          <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200/80">
            <div
              className="bg-amber-700 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
            <span>Current Billing Cycle: 25 days remaining</span>
            <span>Target covers high-speed CDN, studio audio recording, and server uptime</span>
          </div>
        </div>

        {/* 4 Direct Expense Allocations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <div className="w-8 h-8 rounded-md bg-stone-100 flex items-center justify-center text-stone-700 mb-3">
              <Server className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">
              35% Allocation
            </div>
            <div className="font-serif text-base font-semibold text-stone-900 mt-1">
              Game Servers & CDN
            </div>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Global low-latency content distribution for multi-gigabyte open game builds and assets.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <div className="w-8 h-8 rounded-md bg-stone-100 flex items-center justify-center text-stone-700 mb-3">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">
              30% Allocation
            </div>
            <div className="font-serif text-base font-semibold text-stone-900 mt-1">
              Audio Narration & Mastering
            </div>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Direct honorariums to voice artists and audio engineers crafting complete unabridged audiobooks.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <div className="w-8 h-8 rounded-md bg-stone-100 flex items-center justify-center text-stone-700 mb-3">
              <Globe2 className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">
              20% Allocation
            </div>
            <div className="font-serif text-base font-semibold text-stone-900 mt-1">
              Web Tools & Hosting
            </div>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Hosting, domain registry, and zero-telemetry infrastructure for our suite of free browser utilities.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <div className="w-8 h-8 rounded-md bg-stone-100 flex items-center justify-center text-stone-700 mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">
              15% Allocation
            </div>
            <div className="font-serif text-base font-semibold text-stone-900 mt-1">
              Typesetting & Curation
            </div>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Editorial proofreading, archival format preservation (EPUB/PDF), and open licensing stewardship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
