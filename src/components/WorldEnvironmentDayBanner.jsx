import React from 'react';
import { 
  Trophy, Calendar, Clock, Award, QrCode, 
  CheckCircle2, ArrowRight, Sparkles, Trees 
} from 'lucide-react';

export default function WorldEnvironmentDayBanner() {
  const steps = [
    { num: '01', title: 'Register Online', desc: 'Sign up on the Lagos Environmental Portal' },
    { num: '02', title: 'Plant Your Tree', desc: 'Select an indigenous species & tag location' },
    { num: '03', title: 'Upload Growth', desc: 'Submit monthly geotagged photo updates' },
    { num: '04', title: 'Win & Celebrate', desc: 'Expert verification & grand ceremony' }
  ];

  const prizes = [
    { rank: 'Grand Prize', amount: '₦2,500,000', badge: 'bg-yellow-400 text-yellow-950 font-black' },
    { rank: '1st Runner Up', amount: '₦1,500,000', badge: 'bg-gray-200 text-gray-800 font-bold' },
    { rank: '2nd Runner Up', amount: '₦1,000,000', badge: 'bg-amber-600 text-white font-bold' },
    { rank: '10 Consolation Prizes', amount: '₦250,000 each', badge: 'bg-green-700 text-white font-medium' }
  ];

  return (
    <section className="py-14 bg-gradient-to-br from-green-900 via-lagos-darkGreen to-emerald-950 text-white relative overflow-hidden">
      {/* Decorative foliage / circles background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-lagos-orange/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Banner Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-green-700/50 pb-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-yellow-400/20 text-yellow-300 rounded-xl border border-yellow-400/30">
              <Sparkles className="w-6 h-6" />
            </span>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-lagos-orange">
                World Environment Day 2026 Special Campaign
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
                "My Tree Challenge" — Plant for a Greener Lagos
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-1.5 text-green-200">
              <Calendar className="w-4 h-4 text-lagos-orange" />
              <span>Launch: <strong>June 4, 2026</strong></span>
            </div>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1.5 text-green-200">
              <Clock className="w-4 h-4 text-lagos-orange" />
              <span>Duration: <strong>12 Months</strong></span>
            </div>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1.5 text-green-200">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Awards: <strong>June 5, 2027</strong></span>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mission & Entry Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-green-100 text-sm sm:text-base leading-relaxed">
              Join thousands of Lagosians in fostering climate resilience and urban canopy expansion. 
              The Lagos State Ministry of the Environment & Water Resources invites schools, communities, 
              youth groups, and individuals to participate in the flagship <strong>12-Month My Tree Challenge</strong>.
            </p>

            {/* How to Enter Steps */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-yellow-300 mb-4 flex items-center gap-2">
                <Trees className="w-4 h-4" />
                How to Enter & Participate (4 Simple Steps)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps.map((st, idx) => (
                  <div key={idx} className="bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 rounded-xl transition backdrop-blur-sm flex items-start gap-3">
                    <span className="text-lg font-black text-lagos-orange font-heading">
                      {st.num}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{st.title}</div>
                      <div className="text-xs text-green-200 mt-0.5">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="#register" 
                className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold px-6 py-3 rounded-xl text-sm shadow-xl transition transform hover:-translate-y-0.5"
              >
                <span>Register for Tree Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-green-300">
                Participation is free for all Lagos residents.
              </span>
            </div>
          </div>

          {/* Right Column: Prize Structure & Scannable QR Code (5 cols) */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="font-heading font-extrabold text-base uppercase tracking-wide text-white">
                  Prize Structure
                </h3>
              </div>
              <span className="text-xs text-yellow-300 font-semibold bg-yellow-400/20 px-2 py-0.5 rounded-full border border-yellow-400/30">
                ₦6.5M+ Total Pool
              </span>
            </div>

            {/* Prize Breakdown List */}
            <div className="space-y-2.5 mb-6">
              {prizes.map((pz, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/20 p-2.5 rounded-lg border border-white/5">
                  <span className="text-xs sm:text-sm font-semibold text-gray-200">
                    {pz.rank}
                  </span>
                  <span className={`text-xs sm:text-sm px-2.5 py-1 rounded-md ${pz.badge}`}>
                    {pz.amount}
                  </span>
                </div>
              ))}
            </div>

            {/* Scannable QR Code Box */}
            <div className="bg-white p-4 rounded-xl text-gray-900 flex items-center gap-4 shadow-lg">
              {/* High-contrast generated SVG QR Code */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg p-1.5 flex items-center justify-center border border-gray-200 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900 fill-current">
                  {/* Stylized QR Code matrix elements */}
                  <rect x="0" y="0" width="30" height="30" rx="3" fill="#000" />
                  <rect x="5" y="5" width="20" height="20" fill="#fff" />
                  <rect x="10" y="10" width="10" height="10" fill="#000" />
                  
                  <rect x="70" y="0" width="30" height="30" rx="3" fill="#000" />
                  <rect x="75" y="5" width="20" height="20" fill="#fff" />
                  <rect x="80" y="10" width="10" height="10" fill="#000" />
                  
                  <rect x="0" y="70" width="30" height="30" rx="3" fill="#000" />
                  <rect x="5" y="75" width="20" height="20" fill="#fff" />
                  <rect x="10" y="80" width="10" height="10" fill="#000" />

                  {/* QR Pattern data dots */}
                  <rect x="36" y="8" width="8" height="8" fill="#000" />
                  <rect x="50" y="8" width="8" height="8" fill="#000" />
                  <rect x="36" y="24" width="8" height="8" fill="#000" />
                  <rect x="50" y="24" width="8" height="8" fill="#000" />
                  <rect x="8" y="38" width="8" height="8" fill="#000" />
                  <rect x="24" y="38" width="8" height="8" fill="#000" />
                  <rect x="40" y="40" width="20" height="20" rx="2" fill="#008751" />
                  <rect x="68" y="38" width="8" height="8" fill="#000" />
                  <rect x="84" y="38" width="8" height="8" fill="#000" />
                  <rect x="36" y="72" width="8" height="8" fill="#000" />
                  <rect x="50" y="72" width="8" height="8" fill="#000" />
                  <rect x="68" y="72" width="8" height="8" fill="#000" />
                  <rect x="84" y="72" width="8" height="8" fill="#000" />
                  <rect x="36" y="86" width="8" height="8" fill="#000" />
                  <rect x="50" y="86" width="8" height="8" fill="#000" />
                  <rect x="68" y="86" width="8" height="8" fill="#000" />
                  <rect x="84" y="86" width="8" height="8" fill="#000" />
                </svg>
              </div>

              <div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Scan to Register
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Scan with your mobile camera to launch the registration form & download guideline booklet.
                </div>
                <div className="text-[10px] text-lagos-green font-bold mt-1">
                  moelagos.gov.ng/my-tree-challenge
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
