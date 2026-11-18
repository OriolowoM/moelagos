import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trees, Droplets, Sparkles, Globe, Shield, 
  Award, QrCode, ArrowRight, CheckCircle2, Megaphone 
} from 'lucide-react';

export default function InitiativesPage() {
  const initiatives = [
    {
      id: 'tree-challenge',
      title: 'My Tree Challenge (World Environment Day 2026)',
      tag: 'Urban Greening & Biodiversity',
      icon: Trees,
      color: 'border-emerald-200 bg-emerald-50/50',
      iconColor: 'text-lagos-green',
      summary: 'Statewide community afforestation drive launched on June 4, 2026. Encouraging citizens, schools, and corporate institutions to plant and nurture indigenous trees with a ₦2.5 Million Grand Prize.',
      timeline: 'Launch: June 4, 2026 | Duration: 12 Months | Awards: June 5, 2027',
      details: [
        'Grand Prize: ₦2,500,000 for the best-nurtured urban micro-forest / canopy.',
        '1st Runner-Up: ₦1,500,000; 2nd Runner-Up: ₦1,000,000.',
        'Youth & Schools Category: ₦1,000,000 Education Grants.',
        'Free tree saplings distributed statewide across all 57 LASPARK collection nurseries.'
      ]
    },
    {
      id: 'flood-free',
      title: 'Flood-Free Lagos & Continuous Canal Desilting',
      tag: 'Drainage & Stormwater Resilience',
      icon: Droplets,
      color: 'border-blue-200 bg-blue-50/50',
      iconColor: 'text-blue-600',
      summary: 'Year-round mechanical dredging and channelization of major stormwater corridors across Lagos, preventing residential inundation during intense rainfall episodes.',
      timeline: 'All-Year Operational Readiness by Emergency Flood Action Group (EFAG)',
      details: [
        'Dredging of 52 primary drainage channels and over 300 secondary collector canals.',
        'Rapid response clearing of arterial bottlenecks before and during peak precipitation.',
        'Zero tolerance for building or erecting structures within statutory drainage setbacks.',
        'Installation of solar-powered real-time flood monitoring gauges.'
      ]
    },
    {
      id: 'zero-open-defecation',
      title: 'Clean Lagos: Zero Tolerance for Open Defecation',
      tag: 'Sanitation & Public Health',
      icon: Sparkles,
      color: 'border-amber-200 bg-amber-50/50',
      iconColor: 'text-lagos-orange',
      summary: 'Enforcement of Executive Order E0/BOS/01 mandating sanitary public convenience facilities across transit interchanges, markets, and highway rest stops.',
      timeline: 'Ongoing Statewide Enforcement',
      details: [
        'Construction and public-private concessioning of 120 modern public restrooms.',
        'Mandatory hygiene certification for all commercial establishments and event centers.',
        'Mobilization of LAGESC / KAI marshals for highway sanitation surveillance.',
        'Free registration on the Lagos State Health Scheme (LSHS / ILERA EKO).'
      ]
    },
    {
      id: 'waste-to-wealth',
      title: 'Plastic Waste Circular Economy & Material Recovery Facilities (MRF)',
      tag: 'Waste Management',
      icon: Globe,
      color: 'border-green-200 bg-green-50/50',
      iconColor: 'text-emerald-700',
      summary: 'Transitioning Lagos from linear waste disposal to a circular economy, featuring the operational Agbowa MRF and statewide plastic buyback programs.',
      timeline: 'Phase 1: Operational | Phase 2 Expansion: 2026–2028',
      details: [
        'Processing 500 tons of plastic, organic, and recyclable waste daily at Agbowa MRF.',
        'Enforcement of the ban on single-use styrofoam food containers across commercial food operators.',
        'Incentivized neighborhood community plastic drop-off hubs in partnership with LAWMA.',
        'Waste-to-energy pilot facilities converting municipal refuse to renewable power.'
      ]
    },
    {
      id: 'climate-adaptation',
      title: 'Lagos State Climate Adaptation & Resilient Megacity Action Plan',
      tag: 'Climate Resilience',
      icon: Shield,
      color: 'border-teal-200 bg-teal-50/50',
      iconColor: 'text-teal-700',
      summary: 'Strategic multi-sectoral roadmap to mitigate rising sea levels, ocean surges along the Atlantic coast, and urban heat island effects through nature-based coastal buffers.',
      timeline: 'Strategic Horizon: 2025–2035',
      details: [
        'Revetment and groynes construction shielding coastal settlements in Lekki and Badagry.',
        'Annual Lagos International Climate Change Summit bringing global climate funds to the state.',
        'Statewide greenhouse gas inventory monitoring and industrial emissions standards.',
        'Promotion of solar street lighting and energy-efficient building codes.'
      ]
    },
    {
      id: 'walk-for-nature',
      title: 'Annual Walk for Nature & Ecological Advocacy',
      tag: 'Civic Enlightenment',
      icon: Award,
      color: 'border-indigo-200 bg-indigo-50/50',
      iconColor: 'text-indigo-700',
      summary: 'Flagship environmental sensitization walk organized annually in partnership with the Nigerian Conservation Foundation (NCF) to mobilize civic action for biodiversity.',
      timeline: 'Annual Observance (October)',
      details: [
        'Mobilization of thousands of youths, environmentalists, civil servants, and civic leaders.',
        'Public tree-planting ceremonies and ecological pledges across local governments.',
        'Youth art, debate, and science competitions on environmental innovations.',
        'Recognition of green corporate partners supporting state ecological initiatives.'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Programmes & Initiatives</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-lagos-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strategic Impact Pillars</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-950">
            Ministerial Programmes & Environmental Campaigns
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Empowering residents, industries, and communities to build a greener, cleaner, flood-resilient Lagos through collaborative environmental initiatives.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="space-y-8">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className={`bg-white rounded-3xl p-6 sm:p-10 border ${item.color} shadow-sm hover:shadow-md transition space-y-6`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl bg-gray-50 border border-gray-150 ${item.iconColor} flex-shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-lagos-orange">
                        {item.tag}
                      </span>
                      <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-950 mt-1">
                        {item.title}
                      </h2>
                      <div className="text-xs font-semibold text-gray-500 mt-1">
                        {item.timeline}
                      </div>
                    </div>
                  </div>

                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-lagos-green hover:underline sm:self-center"
                  >
                    <span>Partner on Initiative</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400 mb-2">
                      Strategic Objective
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400 mb-2">
                      Key Highlights & Action Items
                    </h3>
                    <ul className="space-y-2">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tree Challenge Callout */}
        <section className="bg-gradient-to-r from-emerald-900 to-green-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
              World Environment Day 2026
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black">
              Ready to take the "My Tree Challenge"?
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Plant a tree today, register your GPS coordinates on our portal, document its growth monthly, and stand a chance to win ₦2,500,000 at the World Environment Day Awards on June 5, 2027!
            </p>
          </div>
          <Link 
            to="/#tree-challenge" 
            className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-[#e55e00] text-white px-7 py-3.5 rounded-xl font-bold transition shadow-lg whitespace-nowrap"
          >
            <span>View Challenge Guidelines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
