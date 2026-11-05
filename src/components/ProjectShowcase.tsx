import React, { useState } from 'react';
import { Gamepad2, Headphones, Globe, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { SGSS_PROJECTS, SGSSProject } from '../data/initialData';
import { ProjectCategory } from '../types/donation';

interface ProjectShowcaseProps {
  onSelectProjectForDonation: (category: ProjectCategory) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onSelectProjectForDonation,
}) => {
  const [filter, setFilter] = useState<'all' | 'games' | 'books' | 'tools'>('all');

  const filteredProjects =
    filter === 'all'
      ? SGSS_PROJECTS
      : SGSS_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
            The SGSS Catalogue
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Free Games, Literature & Open Tools
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Every creation released by SGSS is permanently free to access, download, and enjoy for all humanity. No ads, no paywalls, no tracking scripts.
          </p>
        </div>

        {/* Interactive filter tabs (segmented controls) */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Works
          </button>
          <button
            onClick={() => setFilter('games')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              filter === 'games'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setFilter('books')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              filter === 'books'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Books & Audiobooks
          </button>
          <button
            onClick={() => setFilter('tools')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              filter === 'tools'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Websites & Tools
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col group shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Visual Media Slot with Fallback Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                onError={(e) => {
                  // Fallback container in case image path fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                style={{ display: 'none' }}
                className="w-full h-full bg-gradient-to-br from-stone-200 to-amber-100/50 flex flex-col items-center justify-center p-6 text-stone-700"
              >
                {project.category === 'games' && <Gamepad2 className="w-10 h-10 mb-2 text-stone-600" />}
                {project.category === 'books' && <Headphones className="w-10 h-10 mb-2 text-stone-600" />}
                {project.category === 'tools' && <Globe className="w-10 h-10 mb-2 text-stone-600" />}
                <span className="font-serif font-bold text-center text-stone-900 text-lg">
                  {project.title}
                </span>
              </div>

              {/* Category indicator watermark-free overlay */}
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-medium tracking-wide">
                {project.categoryLabel}
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Unboxed metadata line with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span>{project.license}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{project.metrics}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-amber-800 font-medium mt-1">
                {project.tagline}
              </p>
              <p className="text-xs text-stone-600 mt-2.5 leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
                {project.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-emerald-700 font-mono">
                  100% Free Forever
                </span>
                <button
                  onClick={() => onSelectProjectForDonation(project.category)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer group-hover:translate-x-0.5"
                >
                  <span>Support this work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
