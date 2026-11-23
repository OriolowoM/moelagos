import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, BookOpen, Briefcase, GraduationCap, 
  MapPin, Mail, Calendar, ShieldCheck, ChevronRight, 
  ExternalLink, FileText, Newspaper, Heart, CheckCircle2,
  Users, ArrowLeft
} from 'lucide-react';
import SEO from '../components/SEO';

export default function CommissionerPage({ posts = [] }) {
  // Filter recent posts featuring or citing the Commissioner
  const commissionerNews = posts.filter(p => {
    const text = ((p.title || '') + ' ' + (p.content || '') + ' ' + (p.excerpt || '')).toLowerCase();
    return text.includes('wahab') || text.includes('tokunbo') || text.includes('commissioner');
  }).slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      
      <SEO 
        title="Mr. Tokunbo Philip Wahab — Honourable Commissioner | Lagos State MOE&WR"
        description="Official profile and comprehensive biography of Mr. Tokunbo Philip Wahab, Honourable Commissioner for the Environment and Water Resources, Lagos State."
        image="/uploads/2025/05/TokunboWahab.jpg"
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
            <span className="text-lagos-darkGreen font-bold">Honourable Commissioner</span>
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
              <span>Executive Cabinet Member • Lagos State Government</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Mr. Tokunbo Philip Wahab
            </h1>
            
            <p className="font-heading text-lg sm:text-2xl text-emerald-200 font-semibold mt-3">
              Honourable Commissioner for the Environment and Water Resources
            </p>

            <p className="text-sm sm:text-base text-emerald-100/80 mt-4 leading-relaxed">
              Legal Practitioner, Public Administrator, and Alumnus of Harvard Kennedy School, Harvard Business School, and Wharton. Leading the sustainable transformation, flood resilience, and environmental sanitation of Lagos State.
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
                  src="/uploads/2025/05/TokunboWahab.jpg" 
                  alt="Mr. Tokunbo Philip Wahab - Honourable Commissioner"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/tokunbowahab.jpg";
                  }}
                />
                
                {/* Official Ribbon */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                    Lagos State Government
                  </div>
                  <div className="text-base font-bold leading-snug">
                    Mr. Tokunbo Philip Wahab
                  </div>
                  <div className="text-xs text-gray-200">
                    Sworn in: 13th September 2023
                  </div>
                </div>
              </div>

              {/* Quick Facts List */}
              <div className="space-y-3.5 text-xs text-gray-700 divide-y divide-gray-100">
                <div className="pt-2 flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Date of Birth:</span>
                    <span>17th May 1972</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Executive Education:</span>
                    <span>Harvard Kennedy School • Harvard Business School • Wharton School</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Legal Qualifications:</span>
                    <span>LL.B (Hons), University of Benin (1998) • BL, Nigerian Law School (2000)</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-3">
                  <Award className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Professional Bar Memberships:</span>
                    <span>Nigerian Bar Association (NBA) • International Bar Association (IBA)</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Prior Public Service:</span>
                    <span>Special Adviser on Education to the Governor of Lagos State (2019 – 2023)</span>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Official Secretariat Office:</span>
                    <span>Block 16, The Secretariat Annex, Alausa, Ikeja, Lagos, Nigeria</span>
                  </div>
                </div>
              </div>

              {/* Official Contact Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a
                  href="mailto:env.wr@lagosstate.gov.ng"
                  className="w-full py-2.5 px-4 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Commissioner's Office</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Full Comprehensive Biography (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Bio Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-gray-700">
              
              <div className="border-b border-gray-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">
                  Official Biography
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  Profile of Service, Leadership & Legal Excellence
                </h2>
              </div>

              {/* Paragraph 1: Introduction */}
              <p className="text-base sm:text-lg text-gray-900 font-medium leading-relaxed">
                <strong>Mr. Tokunbo Philip Wahab</strong>, the Honourable Commissioner for the Environment and Water Resources, is a highly accomplished and visionary legal practitioner with a proven track record. He was born on <strong>17th May 1972</strong> and is an alumnus of the prestigious <strong>Harvard Kennedy School</strong>, <strong>Harvard Business School</strong>, and the <strong>University of Pennsylvania, Wharton</strong>.
              </p>

              {/* Paragraph 2: Early Education */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                <h3 className="font-heading text-sm font-bold text-lagos-darkGreen uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-lagos-green" />
                  <span>Educational Foundation</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  He had his primary education at <strong>Army Barracks Primary School, Epe, Lagos</strong>, between 1978 and 1984 before proceeding to the <strong>Army Children High School, Epe</strong> from 1984 till 1989 for his secondary education as well as a <strong>National Diploma in Mass Communication</strong>, which he obtained from the former Ogun State Polytechnic (now Moshood Abiola Polytechnic, Abeokuta) in 1993.
                </p>
              </div>

              {/* Paragraph 3: Legal Education & Bar Admission */}
              <p>
                He graduated with a <strong>Bachelor of Laws (LL.B Hons.)</strong> from the <strong>University of Benin</strong> in 1998, proceeding to the <strong>Nigerian Law School</strong> in 1999 before graduating and being called to the Nigerian Bar in the year 2000.
              </p>

              {/* Paragraph 4: Legal Career & Practice */}
              <div className="space-y-3">
                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-lagos-green" />
                  <span>Distinguished Legal Career in Private Practice</span>
                </h3>
                <p>
                  He holds membership of the <strong>Nigerian Bar Association (NBA)</strong> and the <strong>International Bar Association (IBA)</strong> and has had cognate experience in top tier Nigerian law firms, including:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                    <strong className="block text-gray-900 text-sm font-bold">Wali &amp; Ace Legal Practitioners</strong>
                    <span className="text-gray-500">Managing Partner (Marina, Lagos)</span>
                    <span className="block font-semibold text-emerald-800 mt-1">January 2008 – August 2019</span>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                    <strong className="block text-gray-900 text-sm font-bold">Aluko &amp; Oyebode</strong>
                    <span className="text-gray-500">Senior Associate (Lagos)</span>
                    <span className="block font-semibold text-emerald-800 mt-1">February 2005 – June 2009</span>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                    <strong className="block text-gray-900 text-sm font-bold">Paul Usoro &amp; Co.</strong>
                    <span className="text-gray-500">Senior Counsel &amp; Head of Department</span>
                    <span className="block font-semibold text-emerald-800 mt-1">February 2003 – January 2005</span>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                    <strong className="block text-gray-900 text-sm font-bold">Jiti Ogunye &amp; Co. Associates</strong>
                    <span className="text-gray-500">Core Litigation Counsel</span>
                    <span className="block font-semibold text-emerald-800 mt-1">October 2000 – January 2003</span>
                  </div>
                </div>
              </div>

              {/* Paragraph 5 & 6: Public Service as Special Adviser on Education */}
              <div className="space-y-3 pt-2">
                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-lagos-green" />
                  <span>Public Service &amp; Tertiary Education Reforms (2019 – 2023)</span>
                </h3>
                <p>
                  Mr. Wahab served as the <strong>Special Adviser to the Governor of Lagos State on Education</strong> between August 2019 and May 2023. During this tenure, he spearheaded the formulation and execution of groundbreaking tertiary education policies under the THEMES agenda of Governor Babajide Olusola Sanwo-Olu.
                </p>
                <p>
                  He advised the Governor on key educational matters and leveraged data-driven insights and research to inform decision-making processes. He collaborated with various stakeholders, including government agencies, educational institutions, and community leaders, to foster a united approach to educational development and introduce innovative programs to enhance teacher training and professional development, which resulted in improved teaching standards across the state.
                </p>
                <p>
                  Under his stewardship, the Lagos State Government successfully transitioned and upgraded state polytechnics and colleges into full-fledged specialized universities, including the <strong>Lagos State University of Science and Technology (LASUSTECH)</strong> and the <strong>Lagos State University of Education (LASUED)</strong>.
                </p>
              </div>

              {/* Paragraph 7: Leadership Traits & Cabinet Role */}
              <div className="space-y-3 pt-2">
                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-lagos-green" />
                  <span>Strategic Leadership as Environment Commissioner</span>
                </h3>
                <p>
                  The cerebral Tokunbo Wahab, popularly called <strong>TKW</strong>, is highly skilled in public speaking and communication, budgeting and resource allocation, emotional intelligence, strategic planning and decision-making, team leadership and collaboration, ethics and professionalism, stakeholder engagement, and time management.
                </p>
                <p>
                  He was sworn in as the <strong>Honourable Commissioner for the Environment and Water Resources on the 13th of September 2023</strong>. In his current mandate, he has spearheaded decisive actions including:
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
                  <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                    <span>Zero tolerance for drainage encroachment and canal obstruction across all 20 LGAs.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                    <span>Statewide expansion of primary drainage channel dredging and flood mitigation defenses.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                    <span>Landmark ban and phase-out of styrofoam and single-use plastics to protect aquatic ecosystems.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                    <span>Deployment of over 200 new compactor trucks and development of Material Recovery Facilities (MRFs).</span>
                  </li>
                </ul>
              </div>

              {/* Personal Life */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Heart className="w-4 h-4 text-red-500" />
                <span>He is happily married with children.</span>
              </div>

            </div>

            {/* Recent Publications & Ministerial Statements by the Commissioner */}
            {commissionerNews.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">
                      Official Briefings &amp; Statements
                    </span>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mt-0.5">
                      Key Directives &amp; Activities by Hon. Tokunbo Wahab
                    </h3>
                  </div>
                  <Link 
                    to="/#news" 
                    className="text-xs font-bold text-lagos-green hover:underline flex items-center gap-1"
                  >
                    <span>View All News</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commissionerNews.map((post) => (
                    <Link
                      key={post.id}
                      to={`/news/${post.slug}`}
                      className="group p-4 bg-gray-50 hover:bg-emerald-50/60 rounded-2xl border border-gray-200 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          {post.date ? post.date.slice(0, 10) : '2026'}
                        </div>
                        <h4 className="font-heading text-xs sm:text-sm font-bold text-gray-900 group-hover:text-lagos-green transition mt-1 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-lagos-green group-hover:translate-x-1 transition-transform">
                        <span>Read Statement</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
