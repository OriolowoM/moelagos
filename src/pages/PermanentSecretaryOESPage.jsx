import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, BookOpen, Briefcase, GraduationCap, 
  MapPin, Mail, Calendar, ShieldCheck, ChevronRight, 
  ExternalLink, FileText, Newspaper, Heart, CheckCircle2,
  Users, ArrowLeft, Phone, Building2, Stethoscope, Droplets, Leaf
} from 'lucide-react';
import SEO from '../components/SEO';

export default function PermanentSecretaryOESPage({ posts = [] }) {
  // Filter recent posts featuring or citing Dr. Gaji Omobolaji Tajudeen / OES
  const officerNews = posts.filter(p => {
    const text = ((p.title || '') + ' ' + (p.content || '') + ' ' + (p.excerpt || '')).toLowerCase();
    return text.includes('gaji') || text.includes('tajudeen') || text.includes('environmental services') || text.includes('oes');
  }).slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      
      <SEO 
        title="Dr. Gaji Omobolaji Tajudeen — Permanent Secretary, Office of Environmental Services | Lagos State MOE&WR"
        description="Official profile and executive biography of Dr. Gaji Omobolaji Tajudeen, Permanent Secretary of the Office of Environmental Services (OES), Lagos State Ministry of the Environment and Water Resources."
        image="/uploads/officials/dr-gaji-tajudeen.jpg"
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-lagos-green flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/about" className="hover:text-lagos-green">
              <span>About Ministry</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/leadership" className="hover:text-lagos-green">
              <span>Principal Officers</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-lagos-darkGreen font-bold">Permanent Secretary (OES)</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#003822] via-[#004d2e] to-[#002818] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Permanent Secretary • Lagos State Civil Service</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Dr. Gaji Omobolaji Tajudeen
            </h1>
            
            <p className="font-heading text-lg sm:text-2xl text-emerald-200 font-semibold mt-3">
              Permanent Secretary, Office of Environmental Services (OES)
            </p>

            <p className="text-sm sm:text-base text-emerald-100/80 mt-4 leading-relaxed">
              Distinguished Public Health Specialist, Environmental Administrator, and Career Civil Servant. Directing municipal waste governance, sanitation standards, pollution abatement, and climate resilience frameworks for over 20 million Lagosians.
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Official Portrait & Key Highlights (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Portrait Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-md overflow-hidden sticky top-24">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 mb-5 shadow-inner">
                <img 
                  src="/uploads/officials/dr-gaji-tajudeen.jpg" 
                  alt="Dr. Gaji Omobolaji Tajudeen - Permanent Secretary, Office of Environmental Services"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/uploads/2022/08/PS-Environmnet-320x414.png";
                  }}
                />
                
                {/* Official Ribbon */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                    Lagos State Government
                  </div>
                  <div className="text-base font-bold leading-snug">
                    Dr. Gaji Omobolaji Tajudeen
                  </div>
                  <div className="text-xs text-gray-200">
                    Permanent Secretary, OES
                  </div>
                </div>
              </div>

              {/* Quick Contact & Secretariat Card */}
              <div className="space-y-3 pt-2 text-xs border-t border-gray-100">
                <div className="flex items-start gap-2.5 text-gray-600">
                  <MapPin className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <span>Office of the Permanent Secretary, Block 16, The Secretariat Annex, Alausa, Ikeja, Lagos</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Mail className="w-4 h-4 text-lagos-green flex-shrink-0" />
                  <a href="mailto:ps.oes@lagosstate.gov.ng" className="text-lagos-green hover:underline font-semibold">
                    ps.oes@lagosstate.gov.ng
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Phone className="w-4 h-4 text-lagos-green flex-shrink-0" />
                  <a href="tel:+2348102553775" className="text-lagos-green hover:underline font-semibold">
                    +234 810 255 3775
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Calendar className="w-4 h-4 text-lagos-green flex-shrink-0" />
                  <span>Official Hours: Mon – Fri (8:00 AM – 4:00 PM)</span>
                </div>
              </div>

              {/* Administrative Arm Badge */}
              <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-950">
                <div className="font-bold text-lagos-darkGreen flex items-center gap-1.5 mb-1">
                  <Building2 className="w-4 h-4 text-lagos-green" />
                  <span>Office of Environmental Services (OES)</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  The primary administrative arm executing solid waste policy, sanitation guidelines, air and noise emissions control, and public health environmental safeguards.
                </p>
              </div>

              {/* Affiliated Parastatals */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Supervised Agencies &amp; Units
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['LAWMA', 'LASEPA', 'LASPARK', 'LAGESC / KAI', 'Sanitation Dept.'].map((badge, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Full Biography & Portfolio (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Executive Bio Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
              
              <div className="flex items-center gap-2 text-lagos-green">
                <Briefcase className="w-5 h-5" />
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900">
                  Profile &amp; Executive Leadership
                </h2>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  <strong>Dr. Gaji Omobolaji Tajudeen</strong> is the <strong>Permanent Secretary of the Office of Environmental Services (OES)</strong> within the Lagos State Ministry of the Environment and Water Resources. He is based at Block 16, The Secretariat Annex, Alausa, Ikeja, Lagos.
                </p>
                <p>
                  A seasoned medical professional, public health specialist, and senior administrator in the Lagos State Civil Service, Dr. Gaji leads the administrative and operational machinery of the Office of Environmental Services, executing government policy across municipal waste governance, environmental sanitation standards, air and noise pollution control, and climate change action planning.
                </p>
              </div>

              {/* Roles & Responsibilities Section */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-lagos-green" />
                  <span>Role &amp; Core Responsibilities</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Leaf className="w-4 h-4 text-lagos-green" />
                      <span>Municipal Waste &amp; Sanitation</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Leading statewide waste containment strategies, PSP operator logistics, landfill management, and community sanitation advocacy in direct collaboration with LAWMA.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Stethoscope className="w-4 h-4 text-emerald-600" />
                      <span>Public Health &amp; Hygiene Standards</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Leveraging over two decades of public health expertise to institute stringent sanitation regulations in markets, schools, motor parks, and industrial corridors.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Award className="w-4 h-4 text-lagos-orange" />
                      <span>Pollution Mitigation &amp; Air Quality</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Overseeing environmental compliance monitoring, industrial effluent control, and noise level enforcement in partnership with LASEPA.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>Twin-Pillar Ministry Synergy</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Ensuring seamless operational alignment with the Office of Drainage Services and Water Resources (ODS&amp;WR) under the leadership of the Honourable Commissioner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Background & Public Service Trajectory */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-lagos-green" />
                  <span>Background &amp; Civil Service Trajectory</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-lagos-green flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Permanent Secretary • Office of Environmental Services (OES)</div>
                      <div className="text-xs text-lagos-green font-semibold">Lagos State Ministry of the Environment &amp; Water Resources • Present</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Appointed as Permanent Secretary by Governor Babajide Olusola Sanwo-Olu in January 2021 (initially deployed to the Ministry of Special Duties &amp; Inter-Governmental Relations), before assuming leadership of OES.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-emerald-400 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Senior Special Assistant to the Governor (Health)</div>
                      <div className="text-xs text-gray-500">Lagos State Executive Council</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Provided high-level strategic counsel on healthcare delivery, epidemiology, occupational health systems, and environmental hygiene standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-emerald-200 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Director of Physiotherapy Services</div>
                      <div className="text-xs text-gray-500">Lagos State Health Service Commission (HSC)</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Spearheaded rehabilitation medicine, clinical governance, and statewide health facility standards across Lagos State public secondary and tertiary hospitals.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Over Two Decades of Dedicated Public Service</div>
                      <div className="text-xs text-gray-500">Lagos State Civil Service</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Extensive administrative, regulatory, and policy governance experience across multiple ministerial sectors in Lagos State.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Recent News & Press Statements Featuring Dr. Gaji */}
            {officerNews.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lagos-green">
                    <Newspaper className="w-5 h-5" />
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      Recent Activities &amp; Press Statements
                    </h3>
                  </div>
                  <Link to="/#news" className="text-xs text-lagos-green font-bold hover:underline">
                    View News Archive →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {officerNews.map((article) => (
                    <Link
                      key={article.id}
                      to={`/news/${article.slug || article.id}`}
                      className="group p-4 rounded-2xl border border-gray-150 hover:border-lagos-green/30 hover:bg-green-50/30 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-lagos-orange">
                          {article.category || 'Environmental Services'}
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-lagos-green mt-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {article.excerpt || article.content?.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                        <span>{article.date || 'Lagos State'}</span>
                        <span className="text-lagos-green font-semibold group-hover:translate-x-0.5 transition">Read Story →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Leadership Hub */}
            <div className="pt-2 flex items-center justify-between">
              <Link 
                to="/leadership"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-lagos-green transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to All Principal Officers</span>
              </Link>

              <Link 
                to="/permanent-secretary-odswr"
                className="inline-flex items-center gap-2 text-sm font-bold text-lagos-green hover:underline"
              >
                <span>Permanent Secretary (ODS&amp;WR) Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
