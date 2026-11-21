import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, BookOpen, Briefcase, GraduationCap, 
  MapPin, Mail, Calendar, ShieldCheck, ChevronRight, 
  ExternalLink, FileText, Newspaper, Heart, CheckCircle2,
  Users, ArrowLeft, Phone, Building2, Droplets, Waves
} from 'lucide-react';
import SEO from '../components/SEO';

export default function PermanentSecretaryODSWRPage({ posts = [] }) {
  // Filter recent posts featuring or citing Engr. Adegbite / Drainage Services
  const officerNews = posts.filter(p => {
    const text = ((p.title || '') + ' ' + (p.content || '') + ' ' + (p.excerpt || '')).toLowerCase();
    return text.includes('adegbite') || text.includes('mahamood') || text.includes('mahmood') || text.includes('drainage services') || text.includes('odswr');
  }).slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      
      <SEO 
        title="Engr. Mahamood Olakunle Adegbite — Permanent Secretary, Office of Drainage Services & Water Resources | Lagos State MOE&WR"
        description="Official profile and comprehensive biography of Engr. Mahamood Olakunle Adegbite (FNSE), Permanent Secretary of the Office of Drainage Services & Water Resources, Lagos State Ministry of the Environment and Water Resources."
        image="/uploads/officials/engr-mahmood-adegbite.jpg"
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
            <span className="text-lagos-darkGreen font-bold">Permanent Secretary (ODS&amp;WR)</span>
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
              Engr. Mahamood Olakunle Adegbite, <span className="text-emerald-300 text-2xl sm:text-4xl font-bold">FNSE</span>
            </h1>
            
            <p className="font-heading text-lg sm:text-2xl text-emerald-200 font-semibold mt-3">
              Permanent Secretary, Office of Drainage Services and Water Resources (ODS&amp;WR)
            </p>

            <p className="text-sm sm:text-base text-emerald-100/80 mt-4 leading-relaxed">
              Fellow of the Nigerian Society of Engineers (FNSE), Hydraulic &amp; Water Resources Engineer with over 25 years of public service leadership. Directing statewide stormwater infrastructure, canal channelization, flood mitigation, and water governance.
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
                  src="/uploads/officials/engr-mahmood-adegbite.jpg" 
                  alt="Engr. Mahamood Olakunle Adegbite (FNSE) - Permanent Secretary, Office of Drainage Services and Water Resources"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/uploads/2024/10/WhatsApp-Image-2024-10-18-at-15.50.28_9b2029ff-e1729287637986.jpg";
                  }}
                />
                
                {/* Official Ribbon */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                    Lagos State Government
                  </div>
                  <div className="text-base font-bold leading-snug">
                    Engr. Mahamood Adegbite, FNSE
                  </div>
                  <div className="text-xs text-gray-200">
                    Permanent Secretary, ODS&amp;WR
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
                  <a href="mailto:ps.odswr@lagosstate.gov.ng" className="text-lagos-green hover:underline font-semibold">
                    ps.odswr@lagosstate.gov.ng
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
              <div className="mt-5 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-950">
                <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                  <Waves className="w-4 h-4 text-blue-600" />
                  <span>Office of Drainage Services &amp; Water Resources</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Executing capital drainage construction, primary and secondary collector canal dredging, Right-of-Way (ROW) enforcement, flood abatement, and potable water regulation.
                </p>
              </div>

              {/* Professional Affiliations Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Fellowships &amp; Accreditations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['FNSE (Fellow)', 'COREN Reg.', 'NIEE', 'NICE'].map((badge, idx) => (
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
                  Biography &amp; Engineering Leadership
                </h2>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  <strong>Engineer Mahamood Olakunle Adegbite (FNSE)</strong>, an astute civil engineer with ample and diverse experience in project planning, administration, and infrastructure management with a specialist bias for environmental protection and hydraulics, was born on Lagos Island, Lagos State, on April 19, 1969.
                </p>
                <p>
                  He serves as the <strong>Permanent Secretary, Office of Drainage Services and Water Resources (ODS&amp;WR)</strong> within the Lagos State Ministry of the Environment and Water Resources, having risen to the pinnacle of public service with his appointment by the Governor of Lagos State, <strong>Mr. Babajide Olusola Sanwo-Olu</strong>.
                </p>
              </div>

              {/* Academic Qualifications */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-lagos-green" />
                  <span>Educational Qualifications</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="text-xs font-bold text-lagos-green uppercase tracking-wider">1991</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">Obafemi Awolowo University (OAU), Ile-Ife</div>
                    <div className="text-xs text-gray-500 mt-0.5">B.Sc. in Civil Engineering</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150">
                    <div className="text-xs font-bold text-lagos-green uppercase tracking-wider">1997</div>
                    <div className="font-bold text-sm text-gray-900 mt-1">University of Lagos, Akoka</div>
                    <div className="text-xs text-gray-500 mt-0.5">M.Sc. in Civil Engineering (Water Resources &amp; Environmental Engineering)</div>
                  </div>
                </div>
              </div>

              {/* Landmark Engineering Projects & Public Service */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-lagos-green" />
                  <span>Landmark Engineering Accomplishments</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-lagos-green flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Director of Drainage Enforcement and Compliance (ODSWR)</div>
                      <div className="text-xs text-lagos-green font-semibold">August 2019 – Appointment as Permanent Secretary</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Pioneered the enforcement and re-establishment of Right-of-Way (ROW) alignments across major state drainage channels, including <strong>System 6B (Ladipo channel)</strong>, <strong>System 43 (Lekki II – Ikota channel)</strong>, and <strong>System 1 (Odo Iya Akari channel)</strong>, as well as formulating regulatory guidelines for the preservation of Lagos drainage basins and wetlands.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Technical Director • Ministry of Waterfront Infrastructure Development</div>
                      <div className="text-xs text-gray-500">October 2015 – August 2019</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Responsible for the overall technical management of coastal engineering projects, delivering holistic engineering solutions to the <strong>Lagos Ocean Surge between Goshen Estate and Alpha Beach</strong>, reclamation and shoreline protection at Epe Marina, Lekki Foreshore, Badagry Marina, Oworonshoki reclamation, and technical reviews for the Oshodi Transport Interchange.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 rounded-full bg-blue-300 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Project Engineer • Lagos Metropolitan Development &amp; Governance Project (LMDGP)</div>
                      <div className="text-xs text-gray-500">May 2006 – October 2010 (World Bank Assisted)</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Managed technical supervision and contract execution for multi-billion naira civil and hydraulic infrastructure contracts across priority municipal upgrading zones in Lagos State.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Competencies & Professional Fellowships */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-lagos-green" />
                  <span>Core Competencies &amp; Professional Recognition</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="font-bold text-xs text-gray-900">Hydrology &amp; Drainage</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Stormwater modeling, channel design &amp; flood mitigation</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="font-bold text-xs text-gray-900">Contract Administration</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Tender preparation, FIDIC/civil bid assessment &amp; execution</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="font-bold text-xs text-gray-900">Shoreline Engineering</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Coastal surge defense, jetties &amp; land reclamation</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  Engr. Adegbite is a distinguished <strong>Fellow of the Nigerian Society of Engineers (FNSE)</strong>, Member of the Nigerian Institute of Environmental Engineers (NIEE), Member of the Nigerian Institute of Civil Engineers (NICE), and registered with the Council for the Regulation of Engineering in Nigeria (COREN).
                </p>
              </div>

            </div>

            {/* Recent News & Press Statements Featuring Engr. Adegbite */}
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
                          {article.category || 'Drainage & Water Resources'}
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
                to="/permanent-secretary-oes"
                className="inline-flex items-center gap-2 text-sm font-bold text-lagos-green hover:underline"
              >
                <span>Permanent Secretary (OES) Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
