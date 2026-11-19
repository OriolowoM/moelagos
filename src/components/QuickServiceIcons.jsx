import React from 'react';
import { 
  CloudSun, Trees, Footprints, Droplets, 
  Sparkles, Ban, Recycle, Zap 
} from 'lucide-react';

export default function QuickServiceIcons({ onFilterCategory }) {
  const initiatives = [
    {
      id: 'climate-change',
      title: 'Climate Change',
      desc: 'Adaptation & Resilience',
      icon: CloudSun,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/climate-change.png',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50 text-emerald-700',
      tag: 'Environment'
    },
    {
      id: 'tree-planting',
      title: 'Tree Planting',
      desc: 'Green Lagos Canopy',
      icon: Trees,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/5de485679bf1c-1.png',
      color: 'from-green-600 to-teal-700',
      bgColor: 'bg-green-50 text-green-700',
      tag: 'Environment'
    },
    {
      id: 'walk-for-nature',
      title: 'Walk for Nature',
      desc: 'Citizen Conservation',
      icon: Footprints,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/Weekly_64x64_copy-03-512.png',
      color: 'from-lime-600 to-green-700',
      bgColor: 'bg-lime-50 text-lime-700',
      tag: 'Event'
    },
    {
      id: 'flooding',
      title: 'Flooding Action',
      desc: 'Drainage & Canal Dredging',
      icon: Droplets,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/flood.png',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 text-blue-700',
      tag: 'Press Releases'
    },
    {
      id: 'sanitation',
      title: 'Environmental Sanitation',
      desc: 'Clean & Safe Communities',
      icon: Sparkles,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2023/07/keep-city-clean-01.png',
      color: 'from-green-500 to-emerald-700',
      bgColor: 'bg-teal-50 text-teal-700',
      tag: 'News'
    },
    {
      id: 'no-open-defecation',
      title: 'No Open Defecation',
      desc: 'Clean Lagos Hygiene',
      icon: Ban,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2023/07/openDefeacation-01.png',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-700',
      tag: 'News'
    },
    {
      id: 'recycle-reuse',
      title: 'Recycle & Reuse',
      desc: 'Circular Waste Economy',
      icon: Recycle,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/ico-6.png',
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-emerald-50 text-emerald-700',
      tag: 'News'
    },
    {
      id: 'green-energy',
      title: 'Green Energy',
      desc: 'Low-Carbon Future',
      icon: Zap,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/ico1.png',
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'bg-yellow-50 text-amber-700',
      tag: 'Environment'
    }
  ];

  return (
    <section id="initiatives" className="py-10 sm:py-14 bg-white border-b border-gray-100 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-lagos-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Priority Action Pillars
          </span>
          <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
            Strategic Environmental Initiatives
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
            Direct access to Lagos State Government policies, campaigns, and public engagement programmes.
          </p>
        </div>

        {/* Responsive Grid: 2 cols on small mobile, 4 cols on tablet, 8 cols on desktop */}
        <div className="grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-5">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onFilterCategory(item.tag)}
                className="group flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl bg-gray-50/60 hover:bg-green-50/70 border border-gray-150/80 hover:border-green-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lagos-green"
              >
                {/* Circular Icon Container */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-sm group-hover:shadow-md transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center relative flex-shrink-0`}>
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-2 overflow-hidden">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-lagos-green group-hover:scale-110 transition duration-200" />
                  </div>
                </div>

                {/* Title */}
                <span className="mt-2.5 font-heading font-bold text-xs text-gray-900 group-hover:text-lagos-green leading-snug transition line-clamp-2">
                  {item.title}
                </span>
                
                {/* Subtitle */}
                <span className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
