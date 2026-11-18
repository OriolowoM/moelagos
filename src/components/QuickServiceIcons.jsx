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
      tag: 'Environment'
    },
    {
      id: 'tree-planting',
      title: 'Tree Planting',
      desc: 'Green Lagos Canopy',
      icon: Trees,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/5de485679bf1c-1.png',
      color: 'from-green-600 to-teal-700',
      tag: 'Environment'
    },
    {
      id: 'walk-for-nature',
      title: 'Walk for Nature',
      desc: 'Citizen Conservation',
      icon: Footprints,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/Weekly_64x64_copy-03-512.png',
      color: 'from-lime-500 to-green-600',
      tag: 'Event'
    },
    {
      id: 'flooding',
      title: 'Flooding Action',
      desc: 'Drainage & Canal Dredging',
      icon: Droplets,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/flood.png',
      color: 'from-blue-500 to-cyan-600',
      tag: 'Press Releases'
    },
    {
      id: 'sanitation',
      title: 'Environmental Sanitation',
      desc: 'Clean & Safe Communities',
      icon: Sparkles,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2023/07/keep-city-clean-01.png',
      color: 'from-green-500 to-emerald-700',
      tag: 'News'
    },
    {
      id: 'no-open-defecation',
      title: 'No Open Defecation',
      desc: 'Clean Lagos Hygiene',
      icon: Ban,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2023/07/openDefeacation-01.png',
      color: 'from-amber-500 to-orange-600',
      tag: 'News'
    },
    {
      id: 'recycle-reuse',
      title: 'Recycle & Reuse',
      desc: 'Circular Waste Economy',
      icon: Recycle,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/ico-6.png',
      color: 'from-teal-500 to-emerald-600',
      tag: 'News'
    },
    {
      id: 'green-energy',
      title: 'Green Energy',
      desc: 'Low-Carbon Future',
      icon: Zap,
      image: 'https://moelagos.gov.ng/wp-content/uploads/2019/12/ico1.png',
      color: 'from-yellow-500 to-amber-600',
      tag: 'Environment'
    }
  ];

  return (
    <section id="initiatives" className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-lagos-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Priority Action Pillars
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            Strategic Environmental Initiatives
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Direct access to Lagos State Government policies, campaigns, and public engagement programmes.
          </p>
        </div>

        {/* 8 Circular Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onFilterCategory(item.tag)}
                className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-green-50/60 transition duration-200 focus:outline-none focus:ring-2 focus:ring-lagos-green"
              >
                {/* Circular Icon Container */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr ${item.color} p-0.5 shadow-md group-hover:shadow-xl transition transform group-hover:scale-110 flex items-center justify-center relative`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-3 overflow-hidden">
                    {/* Render Image or Fallback Lucide Icon */}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain filter group-hover:brightness-110 transition"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextElementSibling) {
                          e.target.nextElementSibling.style.display = 'block';
                        }
                      }}
                    />
                    <Icon className="w-8 h-8 text-lagos-green hidden" />
                  </div>
                </div>

                {/* Title */}
                <span className="mt-3 font-heading font-bold text-xs sm:text-sm text-gray-900 group-hover:text-lagos-green leading-tight transition">
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
