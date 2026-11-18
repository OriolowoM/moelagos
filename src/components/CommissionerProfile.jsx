import React from 'react';
import { Quote, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function CommissionerProfile() {
  return (
    <section id="commissioner" className="py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-green-50 via-emerald-50/40 to-white rounded-3xl p-6 sm:p-10 border border-green-100 shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Commissioner Portrait (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-lagos-green to-lagos-orange rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                  <img 
                    src="https://moelagos.gov.ng/wp-content/uploads/2025/05/TokunboWahab.jpg" 
                    alt="Honourable Commissioner Mr. Tokunbo Wahab" 
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>

              {/* Title & Portfolio Badge */}
              <div className="mt-5">
                <h3 className="font-heading text-xl sm:text-2xl font-black text-gray-900">
                  MR. TOKUNBO WAHAB
                </h3>
                <div className="text-xs sm:text-sm font-bold text-lagos-green uppercase tracking-wider mt-1">
                  Honourable Commissioner
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Ministry of the Environment and Water Resources, Lagos State
                </div>
              </div>
            </div>

            {/* Commissioner Statement & Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-lagos-green text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                <Award className="w-4 h-4 text-yellow-300" />
                <span>Executive Leadership Message</span>
              </div>

              <div className="relative">
                <Quote className="w-10 h-10 text-green-200 absolute -top-4 -left-3 -z-10 opacity-75" />
                <p className="font-heading text-lg sm:text-xl font-medium text-gray-800 leading-relaxed italic">
                  "Our administration under Governor Babajide Olusola Sanwo-Olu is uncompromisingly committed to restoring 
                  environmental sanctity, reclaiming drainage rights-of-way, and implementing circular waste solutions. 
                  Environmental sustainability is non-negotiable for the survival, health, and economic future of Lagos State."
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-600 leading-relaxed border-t border-green-100/80 pt-4">
                <p>
                  As Lagos surges past 20 million residents, the ministry has instituted zero tolerance for canal encroachments, 
                  modernized waste infrastructure with private sector collaboration, deployed over 200 new compactor trucks, 
                  and pioneered grassroots citizen advocacy.
                </p>
                <p>
                  We invite every resident, corporate citizen, and community leader to partner with us. A cleaner Lagos is our shared heritage.
                </p>
              </div>

              {/* Priorities Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Zero Tolerance on Drainage Encroachments',
                  'Decommissioning of Olusosun & Solous Landfills',
                  'Expansion of CNG Compactor Fleet',
                  'Statewide Health Scheme Enforcement'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-800 bg-white/80 p-2.5 rounded-lg border border-green-100 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-lagos-green flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
