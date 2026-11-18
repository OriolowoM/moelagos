import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Trees, Droplets, Shield, FileText, 
  Users, Landmark, Scale, Newspaper, Globe, 
  Sparkles, Mail, Phone, ChevronRight, CheckCircle2 
} from 'lucide-react';

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState('departments');

  const departments = [
    {
      id: 'ce',
      name: 'Conservation & Ecology (C&E)',
      icon: Trees,
      office: 'Office of Environmental Services',
      overview: 'Coordinates the preservation of wetlands, coastal ecosystems, wildlife corridors, and natural reserves in Lagos State, preventing habitat loss and ecological degradation.',
      mandate: 'Ecological balance, biodiversity conservation, wetland delineation, and botanical habitat preservation.',
      responsibilities: [
        'Survey and gazetting of designated wetland protection zones across the coastal shelf.',
        'Ecological remediation of polluted or compromised natural ecosystems.',
        'Collaboration with Nigerian Conservation Foundation (NCF) on the annual Walk for Nature.',
        'Coordination of urban biodiversity and botanical preservation strategies with LASPARK.'
      ]
    },
    {
      id: 'ssd',
      name: 'Sanitation Services Department (SSD)',
      icon: Sparkles,
      office: 'Office of Environmental Services',
      overview: 'Ensures optimal public hygiene standards across markets, transit stations, and residential communities, overseeing commercial PSP waste collectors and municipal cleaning standards.',
      mandate: 'Zero open defecation, market hygiene compliance, solid waste storage guidelines, and public health protection.',
      responsibilities: [
        'Enforcement of statewide sanitation schedules and Thursday weekly market cleaning.',
        'Inspection and certification of public convenience facilities across motor parks.',
        'Coordination with LAWMA on waste containerization and domestic bin audits.',
        'Grassroots hygiene enlightenment campaigns across all local councils.'
      ]
    },
    {
      id: 'ccep',
      name: 'Climate Change & Environmental Planning',
      icon: Globe,
      office: 'Office of Environmental Services',
      overview: 'Formulates state climate adaptation policies, tracking greenhouse gas inventories, advancing renewable energy, and coordinating international environmental development partnerships.',
      mandate: 'Climate resilience, decarbonization roadmaps, carbon mitigation, and green economy acceleration.',
      responsibilities: [
        'Development of the Lagos State Climate Adaptation & Resilience Action Plan.',
        'Organization of the annual Lagos State International Climate Change Summit.',
        'Green bond coordination and international climate financing mechanisms.',
        'Integration of climate risk mitigation into state infrastructural planning.'
      ]
    },
    {
      id: 'mec',
      name: 'Monitoring, Enforcement & Compliance (MEC)',
      icon: Shield,
      office: 'Office of Environmental Services',
      overview: 'The primary field enforcement arm, upholding zero tolerance against illegal street trading, drainage blockage, unauthorized construction on canal right-of-ways, and environmental infractions.',
      mandate: 'Environmental compliance, demolition of drainage obstructions, and operational direction of LAGESC / KAI.',
      responsibilities: [
        'Routine and emergency inspections of drainage corridors and canal setbacks.',
        'Issuance of statutory contravention notices and removal orders.',
        'Sealing and sanctioning of industrial and commercial environmental violators.',
        'Joint enforcement raids with LASEPA and Lagos State Task Force.'
      ]
    },
    {
      id: 'eia',
      name: 'Environmental Impact Assessment (EIA)',
      icon: FileText,
      office: 'Office of Environmental Services',
      overview: 'Reviews and certifies Environmental Impact Assessments, Environmental Audits (EAR), and Environmental Management Plans for all infrastructural, residential, and industrial developments in Lagos State.',
      mandate: 'Mandatory environmental due diligence, pre-construction impact reviews, and statutory ecological safeguards.',
      responsibilities: [
        'Screening and review of EIA draft reports submitted by project proponents.',
        'Convening public hearings and stakeholder forums for high-impact developments.',
        'Site verification inspections and post-approval compliance monitoring.',
        'Issuance of official Lagos State Environmental Impact Assessment Clearance.'
      ]
    },
    {
      id: 'ahr',
      name: 'Administration & Human Resources',
      icon: Users,
      office: 'Ministry Secretariat',
      overview: 'Manages the career progression, training, welfare, registry, and public service compliance of civil service personnel across all directorates.',
      mandate: 'Institutional capacity building, administrative governance, and optimal human capital deployment.',
      responsibilities: [
        'Coordination of staff postings, promotions, and ministerial recruitment.',
        'Continuous professional development and specialized environmental capacity workshops.',
        'Custody of official government records, gazettes, and service documentation.',
        'Industrial harmony and inter-ministerial liaison with the Public Service Commission.'
      ]
    },
    {
      id: 'fa',
      name: 'Finance & Accounts',
      icon: Landmark,
      office: 'Ministry Secretariat',
      overview: 'Oversees budgetary planning, fund allocation, payroll, fiscal accounting, and compliance with statutory financial regulations and public procurement guidelines.',
      mandate: 'Prudent fiscal management, transparent budget implementation, and compliance with state financial regulations.',
      responsibilities: [
        'Preparation of the Ministry’s Medium Term Expenditure Framework (MTEF) and annual budget.',
        'Disbursement and accounting of capital project allocations and operational expenditure.',
        'Liaison with the Office of the State Auditor-General on fiscal inspection.',
        'Revenue accounting for statutory fees, clearance permits, and regulatory charges.'
      ]
    }
  ];

  const units = [
    {
      name: 'Legal Unit',
      icon: Scale,
      desc: 'Provides statutory legal counsel, drafts environmental executive orders, prosecutes environmental offenders at the Lagos Special Offences Court, and manages contract agreements.'
    },
    {
      name: 'Planning Unit',
      icon: FileText,
      desc: 'Conducts strategic policy research, monitors Key Performance Indicators (KPIs), and aligns ministerial projects with the State THEMES+ Development Agenda.'
    },
    {
      name: 'Environmental Education Unit (EEU)',
      icon: Users,
      desc: 'Drives community enlightenment, coordinates Environmental Clubs in primary and secondary schools, and produces educational materials on tree conservation and plastic recycling.'
    },
    {
      name: 'Procurement Unit',
      icon: Landmark,
      desc: 'Ensures absolute adherence to the Lagos State Public Procurement Agency (PPA) guidelines for all drainage contracts, equipment tenders, and infrastructure works.'
    },
    {
      name: 'Public Affairs & Research',
      icon: Newspaper,
      desc: 'Serves as the official voice of the Ministry, issuing press releases, media advisories, stakeholder communiques, managing the portal, and driving civic feedback.'
    },
    {
      name: 'ICT Unit',
      icon: Globe,
      desc: 'Administers ministerial digital portals, IT infrastructure, complaint tracking desks, electronic document archiving, and server security.'
    },
    {
      name: 'Internal Audit',
      icon: Shield,
      desc: 'Carries out continuous pre-payment and post-payment financial audits, monitoring internal control mechanisms and ensuring zero tolerance for financial impropriety.'
    },
    {
      name: 'Environmental Health Unit (EHU)',
      icon: Sparkles,
      desc: 'Monitors public health indicators, vector control (mosquito and pest eradication), food hygiene standards, and public sanitary inspection across the metropolis.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Departments & Units</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">Organisational Structure</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-950">
            Directorates & Advisory Units
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            The operational engine executing environmental stewardship, climate action, drainage channels, and civic sanitation across Lagos State.
          </p>

          {/* Tab Filter */}
          <div className="inline-flex p-1.5 bg-gray-200/80 rounded-2xl gap-1 mt-4">
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'departments'
                  ? 'bg-white text-lagos-green shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              7 Operational Departments
            </button>
            <button
              onClick={() => setActiveTab('units')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'units'
                  ? 'bg-white text-lagos-green shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              8 Specialized Units
            </button>
          </div>
        </div>

        {/* Departments View */}
        {activeTab === 'departments' && (
          <div className="space-y-8 animate-fadeIn">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div 
                  key={dept.id}
                  className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-sm hover:shadow-md transition space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-green-50 text-lagos-green border border-green-100 flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-lagos-orange">
                          {dept.office}
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-950 mt-1">
                          {dept.name}
                        </h2>
                      </div>
                    </div>

                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-lagos-green hover:underline sm:self-center"
                    >
                      <span>Inquire with Department</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400">
                        Overview & Core Mandate
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {dept.overview}
                      </p>
                      <div className="p-4 rounded-2xl bg-green-50/60 border border-green-100 text-xs text-emerald-900 font-medium">
                        <strong>Mandate:</strong> {dept.mandate}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {dept.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Units View */}
        {activeTab === 'units' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {units.map((unit, idx) => {
              const Icon = unit.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 text-lagos-green flex items-center justify-center border border-green-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-lg font-extrabold text-gray-950">
                      {unit.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {unit.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500">
                    Location: Block 16, The Secretariat, Alausa, Ikeja
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
