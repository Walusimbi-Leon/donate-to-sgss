import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand and Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-amber-700 text-white flex items-center justify-center font-serif text-base font-bold">
                S
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                SGSS Foundation
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              SGSS is an independent non-profit creative collective creating games, books, audiobooks, and open web software. All creations are provided 100% free of charge to everyone, everywhere.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Paystack Integration</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="font-mono text-[11px] text-stone-500">pk_live_40927e91...</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3 font-sans">
              Free Works
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Interactive Video Games
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Audiobook Library & Narrations
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Open Web Utilities & Code
                </a>
              </li>
              <li>
                <a href="#transparency" className="hover:text-white transition-colors">
                  Financial Transparency Report
                </a>
              </li>
            </ul>
          </div>

          {/* Stewardship */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3 font-sans">
              Community & Trust
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#supporters" className="hover:text-white transition-colors">
                  Supporters Wall
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Donation FAQs
                </a>
              </li>
              <li>
                <span className="text-stone-400">
                  Zero ads · Zero paywalls · Zero tracking
                </span>
              </li>
              <li>
                <span className="text-amber-400">
                  Powered by volunteer care & community gifts
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} SGSS Foundation. Open Culture Initiative.</p>
          <div className="flex items-center gap-2">
            <span>Made with genuine care for free public knowledge</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
