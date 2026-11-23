import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Target, Eye, ShieldCheck, Trees, 
  Droplets, Award, FileText, CheckCircle2, ArrowRight,
  ExternalLink, Sparkles, Scale, Landmark
} from 'lucide-react';

export default function AboutPage() {
  const responsibilities = [
    'Formulation and enforcement of state policies on air, water, and soil pollution control.',
    'Statewide municipal solid waste management regulation and circular economy transition.',
    'Construction, maintenance, desilting, and deflooding of primary and secondary stormwater drainage canals.',
    'Environmental Impact Assessment (EIA) certification, environmental audits, and ecological monitoring.',
    'Urban greening, botanical garden management, and tree protection through LASPARK.',
    'Wastewater regulation, sewage treatment compliance, and industrial effluent monitoring.',
    'Implementation of climate change mitigation policies and coastal erosion barrier protection.',
    'Public enlightenment, environmental health education, and enforcement of zero open defecation laws.'
  ];

  const offices = [
    {
      title: 'Office of Environmental Services (OES)',
      subtitle: 'Environmental Protection, Waste Regulation & Climate Resilience',
      leader: 'Dr. Gaji Omobolaji Tajudeen',
      leaderRole: 'Permanent Secretary',
      leaderUrl: '/permanent-secretary-oes',
      desc: 'Oversees municipal solid waste governance (LAWMA), pollution and air quality enforcement (LASEPA), urban parks and botanical reserves (LASPARK), environmental health standards, climate change adaptation strategies, and conservation ecology across all 20 LGAs and 37 LCDAs.',
      icon: Trees,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconColor: 'text-lagos-green',
      departments: [
        'Conservation & Ecology (C&E)',
        'Sanitation Services Department (SSD)',
        'Climate Change & Environmental Planning',
        'Monitoring, Enforcement & Compliance (MEC)',
        'Environmental Impact Assessment (EIA)'
      ]
    },
    {
      title: 'Office of Drainage Services & Water Resources (ODS&WR)',
      subtitle: 'Stormwater Infrastructure, Canal Dredging & Water Resource Governance',
      leader: 'Engr. Mahamood Olakunle Adegbite, FNSE',
      leaderRole: 'Permanent Secretary',
      leaderUrl: '/permanent-secretary-odswr',
      desc: 'Mandated with designing, constructing, and maintaining primary, secondary, and tertiary stormwater drainage corridors across Lagos State. Coordinates continuous mechanical desilting, deflooding emergency operations, wastewater regulation (LSWMO), and potable water distribution (LWC & LAWRECO).',
      icon: Droplets,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
      iconColor: 'text-blue-600',
      departments: [
        'Drainage Construction Directorate',
        'Drainage Maintenance Directorate (Emergency Flood Operations EFAG)',
        'Water Resources Governance',
        'Lagos State Wastewater Management Office (LSWMO)',
        'Lagos State Water Regulatory Commission (LAWRECO)'
      ]
    }
  ];

  const parastatals = [
    { name: 'LAWMA', full: 'Lagos State Waste Management Authority', url: 'https://lawma.gov.ng', role: 'Solid waste management & PSP logistics' },
    { name: 'LASEPA', full: 'Lagos State Environmental Protection Agency', url: 'https://lasepa.gov.ng', role: 'Air, water & industrial pollution monitoring' },
    { name: 'LASPARK', full: 'Lagos State Parks and Gardens Agency', url: 'https://laspark.lagosstate.gov.ng', role: 'Urban greening, tree planting & recreational parks' },
    { name: 'LASAA', full: 'Lagos State Signage & Advertisement Agency', url: 'https://lasaa.lg.gov.ng', role: 'Outdoor advertising & aesthetic signage regulation' },
    { name: 'LAGESC / KAI', full: 'Lagos Environmental Sanitation Corps', url: 'https://lagesc.lagosstate.gov.ng', role: 'Enforcement of environmental sanitation laws' },
    { name: 'LSWMO', full: 'Lagos State Wastewater Management Office', url: 'https://lswmo.lg.gov.ng', role: 'Decentralized wastewater treatment & sewage safety' },
    { name: 'LWC', full: 'Lagos Water Corporation', url: 'https://lagoswater.org', role: 'Potable public water supply infrastructure' },
    { name: 'LSWRC / LAWRECO', full: 'Lagos State Water Regulatory Commission', url: 'https://lswrc.lagosstate.gov.ng', role: 'Economic and technical regulation of water services' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">About the Ministry</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#004d2e] via-[#00683e] to-[#008751] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
            <Building2 className="w-96 h-96" />
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Institutional Profile</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold leading-tight">
              Lagos State Ministry of the Environment & Water Resources
            </h1>

            <p className="text-emerald-100 text-base sm:text-xl leading-relaxed font-normal">
              Established in 1979 by the first civilian Executive Governor of Lagos State, 
              <strong> Alhaji Lateef Jakande</strong>, the Ministry has continually evolved as the vanguard of environmental resilience, flood prevention, and sustainable resource management for Africa's most populous megacity.
            </p>
          </div>
        </section>

        {/* Vision, Mission & Core Values */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-lagos-green flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl font-extrabold text-gray-900">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                To build a world-class, clean, healthy, flood-resilient, and aesthetically pleasing environment that supports economic growth, biodiversity, and superior quality of life for all residents of Lagos State.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold uppercase tracking-wider text-lagos-green flex items-center gap-1.5">
              <span>Towards a Resilient Megacity</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-lagos-orange flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl font-extrabold text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                To secure a sustainable, ecologically balanced, and flood-free environment through forward-looking policies, rigorous law enforcement, robust drainage infrastructure, community advocacy, and strategic partnerships.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold uppercase tracking-wider text-lagos-orange flex items-center gap-1.5">
              <span>Action-Oriented Governance</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </section>

        {/* Dual Ministerial Structure */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">Executive Architecture</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-950 mt-1">
              Two Specialized Ministerial Offices
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Structured into two dedicated directorate branches under the leadership of the Honourable Commissioner to ensure focused execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offices.map((off, idx) => {
              const Icon = off.icon;
              return (
                <div key={idx} className={`rounded-3xl p-8 sm:p-10 border ${off.color} bg-white shadow-sm flex flex-col justify-between`}>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-gray-50 border border-gray-150 ${off.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-extrabold text-gray-900">{off.title}</h3>
                        <div className="text-xs font-medium text-gray-500 mt-0.5">{off.subtitle}</div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {off.desc}
                    </p>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Key Operational Directorates:</div>
                      <ul className="space-y-1.5">
                        {off.departments.map((dept, dIdx) => (
                          <li key={dIdx} className="text-xs font-semibold text-gray-800 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-lagos-green"></span>
                            <span>{dept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Leadership Link */}
                    {off.leader && (
                      <div className="mt-4 p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-gray-500">{off.leaderRole}</div>
                          <div className="text-xs font-bold text-gray-900">{off.leader}</div>
                        </div>
                        <Link to={off.leaderUrl} className="text-[11px] font-bold text-lagos-green hover:underline flex items-center gap-1">
                          <span>View Official Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-150 flex items-center justify-between">
                    <Link to="/departments" className="inline-flex items-center gap-2 text-xs font-bold text-lagos-green hover:underline">
                      <span>Explore Directorates & Units</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {off.leaderUrl && (
                      <Link to={off.leaderUrl} className="text-xs font-bold text-gray-600 hover:text-lagos-green">
                        Leadership Profile →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Statutory Responsibilities */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-150 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">Legal Mandate</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
              Core Statutory Responsibilities
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Pursuant to the laws of Lagos State and the THEMES+ Developmental Agenda:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {responsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-200 transition">
                <CheckCircle2 className="w-5 h-5 text-lagos-green flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-800 leading-relaxed">{resp}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Parastatal Agencies Directory */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">Regulatory Ecosystem</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
                Supervised Parastatal Agencies
              </h2>
            </div>
            <Link to="/contact" className="text-xs font-bold text-lagos-green hover:underline flex items-center gap-1">
              <span>Agency Directory & Contacts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {parastatals.map((agency, idx) => (
              <a 
                key={idx} 
                href={agency.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 border border-gray-150 hover:border-lagos-green/40 hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-lg text-gray-950 group-hover:text-lagos-green transition">
                      {agency.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-lagos-green" />
                  </div>
                  <div className="text-xs font-semibold text-gray-800 mt-1 leading-snug">
                    {agency.full}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                    {agency.role}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
