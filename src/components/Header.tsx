import React from 'react';
import { HeartHandshake } from 'lucide-react';

interface HeaderProps {
  onDonateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDonateClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-3 text-stone-900 group shrink-0">
          <div className="w-9 h-9 rounded-md bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-lg font-bold shadow-xs">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900 leading-tight">
              SGSS Foundation
            </span>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-sans">
              Free Games, Literature & Open Web
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#mission"
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-300"
          >
            Mission & Impact
          </a>
          <a
            href="#projects"
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-300"
          >
            Free Creations
          </a>
          <a
            href="#transparency"
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-300"
          >
            Transparency
          </a>
          <a
            href="#supporters"
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-300"
          >
            Supporters Wall
          </a>
          <a
            href="#faq"
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-300"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDonateClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm transition-all transform active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Donate to SGSS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
