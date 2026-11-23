import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Droplets, Leaf, ArrowRight, Building, CheckCircle } from 'lucide-react';

export default function MinistryOverview() {
  return (
    <section id="overview" className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Mandate Intro */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-lagos-darkGreen text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-4 h-4 text-lagos-green" />
            <span>Ministry Mandate & Institutional Framework</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Securing a Clean, Healthier & Sustainable Lagos
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed">
            The Lagos State Ministry of the Environment and Water Resources is mandated to secure a clean, 
            healthier, resilient, and aesthetically pleasing environment conducive for tourism, economic productivity, 
            and the overall wellbeing of all Lagosians. 
          </p>
        </div>

        {/* Dual Offices Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Office of Environmental Services & Water Resources (OES&WR) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-xl bg-green-50 text-lagos-green flex items-center justify-center mb-6 group-hover:bg-lagos-green group-hover:text-white transition">
                <Leaf className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-lagos-green mb-1">
                Executive Directorate 01
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Office of Environmental Services & Water Resources
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Oversees comprehensive environmental governance, solid waste management policies, climate change adaptation, 
                environmental health protection, biodiversity conservation, public advocacy, and statutory environmental impact assessments.
              </p>

              {/* Departmental breakdown */}
              <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">
                  Key Departments & Units:
                </div>
                {[
                  'Conservation & Ecology (C&E)',
                  'Sanitation Services Department (SSD)',
                  'Climate Change & Environmental Planning',
                  'Monitoring, Enforcement & Compliance (MEC)',
                  'Environmental Impact Assessment (EIA)',
                  'Environmental Health & Vector Control'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-lagos-green flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              to="/departments" 
              className="inline-flex items-center gap-2 text-sm font-bold text-lagos-green hover:text-lagos-darkGreen transition pt-2 group-hover:translate-x-1"
            >
              <span>Explore Environmental Services &amp; Directorates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2. Office of Drainage Services & Water Resources (ODS&WR) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                <Droplets className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                Executive Directorate 02
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Office of Drainage Services &amp; Water Resources
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Engineers, operates, and maintains primary and secondary stormwater drainage networks, executes capital dredging 
                of critical canals, regulates raw water abstraction, and enforces the state drainage masterplan to guarantee a flood-free Lagos.
              </p>

              {/* Departmental breakdown */}
              <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">
                  Key Operational Mandates:
                </div>
                {[
                  'Drainage Construction & Capital Dredging',
                  'Drainage Maintenance & Operations (EFAD)',
                  'Drainage Enforcement & Right-of-Way Compliance',
                  'Water Resources Management & Abstraction Licensing',
                  'Stormwater Channel Rehabilitation Projects',
                  'Hydrographic Survey & Flood Early-Warning'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition pt-2 group-hover:translate-x-1"
            >
              <span>Explore Drainage &amp; Water Infrastructure Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
