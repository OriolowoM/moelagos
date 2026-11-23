import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Award, CheckCircle, ArrowRight, ShieldCheck, GraduationCap, Briefcase, ExternalLink } from 'lucide-react';

export default function CommissionerProfile() {
  const [imgSrc, setImgSrc] = useState('/uploads/2025/05/TokunboWahab.jpg');

  return (
    <section id="commissioner" className="py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Executive Container */}
        <div className="relative bg-gradient-to-br from-emerald-50/80 via-white to-green-50/40 rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-100 shadow-xl overflow-hidden">
          
          {/* Subtle Background Watermark Accents */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-lagos-green/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Commissioner Portrait Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <Link 
                to="/honourable-commissioner" 
                className="group relative block focus:outline-none focus:ring-4 focus:ring-lagos-green/30 rounded-3xl"
                aria-label="View full biography of Honourable Commissioner Mr. Tokunbo Wahab"
              >
                {/* Aura Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-lagos-green via-emerald-500 to-lagos-orange rounded-3xl blur-md opacity-40 group-hover:opacity-85 transition duration-500 group-hover:blur-lg"></div>
                
                {/* Image Frame */}
                <div className="relative w-64 sm:w-72 h-84 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                  <img 
                    src={imgSrc} 
                    alt="Mr. Tokunbo Wahab - Honourable Commissioner, Lagos State Ministry of the Environment & Water Resources" 
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                    fetchPriority="high"
                    loading="eager"
                    onError={() => {
                      // Graceful fallback to root copy or official URL
                      if (imgSrc !== '/tokunbowahab.jpg') {
                        setImgSrc('/tokunbowahab.jpg');
                      } else if (imgSrc !== 'https://moelagos.gov.ng/uploads/2025/05/TokunboWahab.jpg') {
                        setImgSrc('https://moelagos.gov.ng/uploads/2025/05/TokunboWahab.jpg');
                      }
                    }}
                  />

                  {/* Gradient Overlay & Verified Badge */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verified Profile</span>
                    </div>
                    <span className="text-[11px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/30 text-emerald-100 font-medium">
                      Cabinet Member
                    </span>
                  </div>
                </div>

                {/* Hover Click Hint */}
                <div className="absolute -bottom-3 inset-x-6 bg-lagos-darkGreen text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 flex items-center justify-center gap-1">
                  <span>Click to View Full Biography</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Title & Portfolio Badge */}
              <div className="mt-6 w-full">
                <Link to="/honourable-commissioner" className="inline-block group">
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 group-hover:text-lagos-green transition duration-200">
                    MR. TOKUNBO WAHAB
                  </h3>
                </Link>
                <div className="text-xs sm:text-sm font-bold text-lagos-green uppercase tracking-wider mt-1.5 flex items-center justify-center gap-1.5">
                  <span>Honourable Commissioner</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">
                  Ministry of the Environment and Water Resources, Lagos State
                </div>

                {/* Fast Credential Pills */}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-lagos-darkGreen border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                    <GraduationCap className="w-3 h-3 text-lagos-green" />
                    Harvard Kennedy / Business School Alum
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-lagos-darkGreen border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                    <Briefcase className="w-3 h-3 text-lagos-green" />
                    25+ Yrs Legal Practice
                  </span>
                </div>
              </div>
            </div>

            {/* Commissioner Statement & Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 bg-lagos-green text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span>Executive Leadership Message</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  Lagos State Environmental Transformation Agenda
                </span>
              </div>

              {/* Quote Block */}
              <div className="relative pl-2">
                <Quote className="w-12 h-12 text-emerald-200/60 absolute -top-5 -left-4 -z-10" />
                <blockquote className="font-heading text-lg sm:text-xl font-medium text-gray-900 leading-relaxed italic border-l-4 border-lagos-green pl-4 py-1">
                  "Our administration under Governor Babajide Olusola Sanwo-Olu is uncompromisingly committed to restoring 
                  environmental sanctity, reclaiming drainage rights-of-way, and implementing circular waste solutions. 
                  Environmental sustainability is non-negotiable for the survival, health, and economic future of Lagos State."
                </blockquote>
              </div>

              {/* Explanatory Context */}
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed border-t border-emerald-100/80 pt-4">
                <p>
                  As Lagos surges past 20 million residents, the ministry has instituted zero tolerance for canal encroachments, 
                  modernized waste infrastructure with private sector collaboration, deployed over 200 new compactor trucks, 
                  and pioneered grassroots citizen advocacy.
                </p>
                <p>
                  We invite every resident, corporate citizen, and community leader to partner with us. A cleaner, greener, 
                  and flood-resilient Lagos is our shared heritage.
                </p>
              </div>

              {/* Strategic Priorities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'Zero Tolerance on Drainage Encroachments',
                  'Decommissioning of Olusosun & Solous Landfills',
                  'Expansion of CNG Compactor Fleet',
                  'Statewide Health Scheme Enforcement'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-800 bg-white/90 p-2.5 rounded-xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition">
                    <CheckCircle className="w-4 h-4 text-lagos-green flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Call-to-Action Buttons to Dedicated Page */}
              <div className="pt-4 border-t border-emerald-100/80 flex flex-wrap items-center gap-3">
                <Link
                  to="/honourable-commissioner"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lagos-green hover:bg-lagos-darkGreen text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm group"
                >
                  <span>View Full Profile & Detailed Biography</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  to="/about-moelagos/principal-officers/honourable-commissioner"
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 transition text-sm shadow-sm hover:border-gray-300"
                >
                  <span>Cabinet Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
