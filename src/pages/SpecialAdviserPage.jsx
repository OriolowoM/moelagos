import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, BookOpen, Briefcase, GraduationCap, 
  MapPin, Mail, Calendar, ShieldCheck, ChevronRight, 
  ExternalLink, FileText, Newspaper, Heart, CheckCircle2,
  Users, ArrowLeft, Phone, Quote
} from 'lucide-react';
import SEO from '../components/SEO';

export default function SpecialAdviserPage({ posts = [] }) {
  // Filter recent posts featuring or citing the Special Adviser
  const officerNews = posts.filter(p => {
    const text = ((p.title || '') + ' ' + (p.content || '') + ' ' + (p.excerpt || '')).toLowerCase();
    return text.includes('rotimi') || text.includes('akodu') || text.includes('special adviser');
  }).slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      
      <SEO 
        title="Engr. Olakunle Olamidosu Rotimi-Akodu — Special Adviser to the Governor on Environment | Lagos State MOE&WR"
        description="Official profile and comprehensive biography of Engr. Olakunle Olamidosu Rotimi-Akodu, Special Adviser to the Governor on Environment, Lagos State Ministry of the Environment and Water Resources."
        image="/uploads/officials/engr-olakunle-rotimi-akodu.jpg"
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
            <span className="text-lagos-darkGreen font-bold">Special Adviser to the Governor</span>
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
              <span>Special Adviser to the Governor • Lagos State Government</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Engr. Olakunle Olamidosu Rotimi-Akodu
            </h1>
            
            <p className="font-heading text-lg sm:text-2xl text-emerald-200 font-semibold mt-3">
              Special Adviser to the Governor on Environment
            </p>

            <p className="text-sm sm:text-base text-emerald-100/80 mt-4 leading-relaxed">
              Distinguished Agricultural & Environmental Engineer, Public Administrator, and Community Advocate. Championing grassroots sanitation compliance, environmental advocacy, and the THEMES+ sustainability agenda for Lagos State.
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
                  src="/uploads/officials/engr-olakunle-rotimi-akodu.jpg" 
                  alt="Engr. Olakunle Olamidosu Rotimi-Akodu - Special Adviser to the Governor on Environment"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/uploads/2024/10/Olkunle-Rotimi-SA-Environment.jpg";
                  }}
                />
                
                {/* Official Ribbon */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                    Lagos State Government
                  </div>
                  <div className="text-base font-bold leading-snug">
                    Engr. Olakunle Rotimi-Akodu
                  </div>
                  <div className="text-xs text-gray-200">
                    Special Adviser on Environment
                  </div>
                </div>
              </div>

              {/* Quick Contact & Secretariat Card */}
              <div className="space-y-3 pt-2 text-xs border-t border-gray-100">
                <div className="flex items-start gap-2.5 text-gray-600">
                  <MapPin className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <span>Office of the Special Adviser, Block 16, The Secretariat Annex, Alausa, Ikeja, Lagos</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Mail className="w-4 h-4 text-lagos-green flex-shrink-0" />
                  <a href="mailto:sa.environment@lagosstate.gov.ng" className="text-lagos-green hover:underline font-semibold">
                    sa.environment@lagosstate.gov.ng
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

              {/* Personal Philosophy Quote */}
              <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-950 italic">
                <Quote className="w-4 h-4 text-lagos-green mb-1 opacity-70" />
                "There is enough for our needs, but never enough for our greed."
                <div className="mt-2 not-italic font-bold text-lagos-darkGreen text-[11px]">
                  — Guiding Philosophy (Mahatma Gandhi)
                </div>
              </div>

              {/* Professional Affiliations Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Professional Accreditations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['COREN Reg.', 'NSE', 'NES', 'SETPOM'].map((badge, idx) => (
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
                  Biography &amp; Executive Background
                </h2>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  <strong>Engr. Olakunle Olamidosu Rotimi-Akodu</strong> was born on March 7, 1973, at the renowned Lagos Island Maternity in Odon, Lagos State. He is a distinguished figure in engineering, environmental sustainability, public administration, and community advocacy. His late father, affectionately known as Mr. Rotimi, was a well-respected secondary school teacher in Lagos State. Engr. Rotimi-Akodu is the third child and first son among seven siblings.
                </p>
                <p>
                  He currently serves as the <strong>Special Adviser on Environment to the Governor of Lagos State, Mr. Babajide Olusola Sanwo-Olu</strong>, playing a central role in articulating environmental policy, fostering grassroots stakeholder compliance, and championing the State’s circular economy and waste-to-wealth programmes.
                </p>
              </div>

              {/* Academic Trajectory */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-lagos-green" />
                  <span>Educational Qualifications</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="text-xs font-bold text-lagos-green uppercase tracking-wider">1985 – 1991</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">St. Gregory's College, Lagos</div>
                    <div className="text-xs text-gray-500 mt-0.5">Secondary School Education (Following Ife-Oluwa / LILG Primary School)</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="text-xs font-bold text-lagos-green uppercase tracking-wider">1998</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">University of Ilorin</div>
                    <div className="text-xs text-gray-500 mt-0.5">B.Engr. in Agricultural Engineering</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="text-xs font-bold text-lagos-green uppercase tracking-wider">2010</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">University of Lagos, Akoka</div>
                    <div className="text-xs text-gray-500 mt-0.5">Master’s in Environmental Management (MEM)</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="text-xs font-bold text-lagos-green uppercase tracking-wider">2015</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">University of Lagos, Akoka</div>
                    <div className="text-xs text-gray-500 mt-0.5">Master’s in Public Administration (MPA)</div>
                  </div>
                </div>
              </div>

              {/* Professional Experience & Public Service */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-lagos-green" />
                  <span>Professional Career &amp; Public Service</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-lagos-green flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Special Adviser on Environment to the Governor</div>
                      <div className="text-xs text-lagos-green font-semibold">Lagos State Government • Present</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Formulating high-impact grassroots sanitation policies, school environmental clubs, coastal community advocacy, and driving inter-agency synergy with LAWMA, LASEPA, and LASPARK.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-emerald-300 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Park Manager • Trucks Transit Parks (TTP)</div>
                      <div className="text-xs text-gray-500">Lagos Port Corridors</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Pioneered electronic call-up system logistics managing container truck congestion and environmental sanitization along the Apapa-Tin Can port corridors.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-emerald-200 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Legislative &amp; Local Government Leadership</div>
                      <div className="text-xs text-gray-500">Ikoyi-Obalende LCDA</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Served as Honourable Councilor and Deputy Leader of the Legislative House; Special Adviser on Education and Political Matters (2007–2011); Supervisor for Environment and Sanitation Services (2011–2014).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Private Sector &amp; Academic Contributions</div>
                      <div className="text-xs text-gray-500">Corporate &amp; Academic Practice</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Lecturer at Federal Polytechnic Mubi, Adamawa State; educator at St. Gregory's College; engineering experience at Total Nigeria Plc Ibadan; and co-founder of Meridian Multipurpose Limited.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Values & Memberships */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-lagos-green" />
                  <span>Core Values &amp; Professional Associations</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 font-semibold text-xs text-gray-800">
                    Integrity
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 font-semibold text-xs text-gray-800">
                    Goal-Driven Purpose
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 font-semibold text-xs text-gray-800">
                    Engineering Competence
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 font-semibold text-xs text-gray-800">
                    Social Empathy
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  Registered with the Council for the Regulation of Engineering in Nigeria (COREN), Member of Nigerian Society of Engineers (NSE), Nigerian Environmental Society (NES), and Society for Environmental Toxicology &amp; Pollution Mitigation (SETPOM).
                </p>
              </div>

            </div>

            {/* Recent News & Press Statements Featuring Special Adviser */}
            {officerNews.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lagos-green">
                    <Newspaper className="w-5 h-5" />
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      Recent Press Statements &amp; Activities
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
                          {article.category || 'Press Release'}
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
                to="/honourable-commissioner"
                className="inline-flex items-center gap-2 text-sm font-bold text-lagos-green hover:underline"
              >
                <span>Honourable Commissioner Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
