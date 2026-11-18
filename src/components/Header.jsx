import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Mail, Search, Menu, X, ChevronDown, 
  ExternalLink, AlertTriangle, Shield, Droplets, 
  Trees, Building2, FileText, CheckCircle, Clock,
  MapPin, Sparkles, Newspaper, Users, Award,
  Landmark, Scale, Globe, ArrowRight, Camera, BookOpen
} from 'lucide-react';

export default function Header({ onOpenComplaints, onSearchClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSection = (name) => {
    setActiveMobileSection(activeMobileSection === name ? null : name);
  };

  const departments = [
    { name: 'Conservation & Ecology (C&E)', desc: 'Wetlands, coastal zones & biodiversity protection', icon: Trees },
    { name: 'Sanitation Services Department (SSD)', desc: 'Statewide sanitation standards & hygiene monitoring', icon: Sparkles },
    { name: 'Climate Change & Env. Planning', desc: 'Resilience policies, carbon mitigation & green roadmaps', icon: Globe },
    { name: 'Monitoring, Enforcement & Compliance', desc: 'Zero tolerance enforcement of environmental laws', icon: Shield },
    { name: 'Environmental Impact Assessment (EIA)', desc: 'Project approvals, environmental audits & reviews', icon: FileText },
    { name: 'Administration & Human Resources', desc: 'Staff development & public service administration', icon: Users },
    { name: 'Finance & Accounts', desc: 'Fiscal governance, planning & procurement compliance', icon: Landmark }
  ];

  const units = [
    { name: 'Legal Unit', desc: 'Statutory compliance & litigation', icon: Scale },
    { name: 'Planning Unit', desc: 'Strategic policy roadmaps', icon: FileText },
    { name: 'Environmental Education (EEU)', desc: 'Grassroots advocacy & schools', icon: Users },
    { name: 'Procurement Unit', desc: 'Due process & public tenders', icon: Landmark },
    { name: 'Public Affairs & Research', desc: 'Citizen relations & press media', icon: Newspaper },
    { name: 'ICT Unit', desc: 'Digital portal & IT infrastructure', icon: Globe },
    { name: 'Internal Audit', desc: 'Financial controls & inspection', icon: Shield },
    { name: 'Environmental Health (EHU)', desc: 'Vector mitigation & food safety', icon: Sparkles }
  ];

  const agencies = [
    { name: 'LASEPA', full: 'Lagos State Environmental Protection Agency', url: 'https://lasepa.gov.ng', tag: 'Pollution & Air Quality' },
    { name: 'LAWMA', full: 'Lagos State Waste Management Authority', url: 'https://lawma.gov.ng', tag: 'Waste & PSP Logistics' },
    { name: 'LASPARK', full: 'Lagos State Parks and Gardens Agency', url: 'https://laspark.lg.gov.ng', tag: 'Urban Greening & Parks' },
    { name: 'LASAA', full: 'Lagos State Signage & Advertisement Agency', url: 'https://lasaa.lg.gov.ng', tag: 'Outdoor Signage Control' },
    { name: 'LAGESC / KAI', full: 'Lagos Environmental Sanitation Corps', url: '#', tag: 'Law Enforcement' },
    { name: 'LSWMO', full: 'Lagos State Wastewater Management Office', url: '#', tag: 'Wastewater Treatment' },
    { name: 'LAWRECO', full: 'Lagos State Water Regulatory Commission', url: '#', tag: 'Water Licensing & Tariffs' },
    { name: 'LWC', full: 'Lagos Water Corporation', url: 'https://lagoswater.org', tag: 'Potable Water Distribution' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP PRESTIGE GOVERNMENT UTILITY BAR                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-[#004d2e] text-white border-b border-[#00683e] text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap justify-between items-center gap-y-1.5">
          {/* Left: State Official Tag & Motto */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-emerald-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Lagos State Government</span>
            </div>
            <span className="hidden md:inline text-emerald-600/80">•</span>
            <span className="hidden md:inline text-emerald-100 font-medium italic">
              "Eko O Ni Baje" — Towards a Cleaner, Greener & Resilient Lagos
            </span>
          </div>

          {/* Right: Citizen Direct Hotlines, Headquarters & Staff Access */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <a 
              href="tel:+2348102553775" 
              className="flex items-center gap-1.5 font-semibold text-white hover:text-emerald-200 transition group whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-lagos-orange group-hover:scale-110 transition" />
              <span>Hotline: <strong className="text-emerald-200">+234 810 255 3775</strong></span>
            </a>

            <span className="hidden lg:flex items-center gap-1.5 text-emerald-100/90">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Block 16, Alausa, Ikeja</span>
            </span>

            <div className="flex items-center gap-3 pl-2 border-l border-emerald-700/60">
              <a 
                href="http://moelagos.gov.ng/webmail" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-200 hover:text-white transition font-medium flex items-center gap-1"
              >
                <span>Staff Mail</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>

              <Link 
                to="/admin" 
                className="text-emerald-300 hover:text-white transition font-bold bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1"
                title="Staff CMS Portal Access"
              >
                <span>CMS Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN EXECUTIVE NAVIGATION BAR                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-gray-150 ${
        scrolled ? 'shadow-md py-2' : 'shadow-sm py-2.5 sm:py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand Identity / Official Ministry Logo */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0 group focus:outline-none"
            aria-label="Lagos State Ministry of the Environment and Water Resources Home"
          >
            <img 
              src="/moe-logo.png" 
              alt="Lagos State Ministry of the Environment and Water Resources" 
              className="h-10 sm:h-12 md:h-13 w-auto max-w-[240px] sm:max-w-[310px] md:max-w-[360px] object-contain transition duration-300 group-hover:opacity-95"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png";
              }}
            />
          </Link>

          {/* Desktop Menu Navigation (Clean, balanced, non-overlapping) */}
          <nav className="hidden xl:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 text-[13px] xl:text-[13.5px] font-semibold text-gray-700">
            {/* Home */}
            <Link 
              to="/" 
              className={`whitespace-nowrap px-3 py-2 rounded-lg transition ${
                location.pathname === '/' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            {/* About Us Dropdown */}
            <div className="relative group">
              <Link 
                to="/about"
                className={`whitespace-nowrap px-3 py-2 rounded-lg transition flex items-center gap-1 group-hover:text-lagos-green ${
                  location.pathname === '/about' || location.pathname === '/leadership'
                    ? 'text-lagos-green bg-green-50/80 font-bold'
                    : 'hover:text-lagos-green hover:bg-gray-50'
                }`}
                aria-haspopup="true"
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-lagos-green group-hover:rotate-180 transition duration-200" />
              </Link>
              
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-72 z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-150 p-2 space-y-1">
                  <Link to="/about" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Building2 className="w-4 h-4 text-lagos-green" />
                    <div>
                      <div>Ministry Mandate & History</div>
                      <div className="text-[10px] text-gray-400 font-normal">Founding history (1979) & objectives</div>
                    </div>
                  </Link>
                  <Link to="/leadership" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Award className="w-4 h-4 text-lagos-green" />
                    <div>
                      <div>Leadership & Principal Officers</div>
                      <div className="text-[10px] text-gray-400 font-normal">Hon. Commissioner Mr. Tokunbo Wahab</div>
                    </div>
                  </Link>
                  <Link to="/about" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Trees className="w-4 h-4 text-lagos-green" />
                    <div>
                      <div>Office of Environmental Services</div>
                      <div className="text-[10px] text-gray-400 font-normal">Solid waste, sanitation & climate</div>
                    </div>
                  </Link>
                  <Link to="/about" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <div>
                      <div>Office of Drainage Services</div>
                      <div className="text-[10px] text-gray-400 font-normal">Canal dredging & stormwater systems</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Departments Mega-Menu */}
            <div className="relative group">
              <Link 
                to="/departments"
                className={`whitespace-nowrap px-3 py-2 rounded-lg transition flex items-center gap-1 group-hover:text-lagos-green ${
                  location.pathname === '/departments'
                    ? 'text-lagos-green bg-green-50/80 font-bold'
                    : 'hover:text-lagos-green hover:bg-gray-50'
                }`}
              >
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-lagos-green group-hover:rotate-180 transition duration-200" />
              </Link>

              <div className="absolute -left-24 top-full pt-2 hidden group-hover:block w-[520px] z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-150 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-lagos-green px-2 pb-2 mb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>Operational Directorates</span>
                    <Link to="/departments" className="text-[10px] text-lagos-green hover:underline">
                      View Directory →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {departments.map((dept, idx) => {
                      const Icon = dept.icon;
                      return (
                        <Link 
                          key={idx} 
                          to="/departments"
                          className="p-2.5 rounded-xl hover:bg-green-50/70 transition group/item border border-transparent hover:border-green-100"
                        >
                          <div className="flex items-start gap-2">
                            <Icon className="w-4 h-4 text-lagos-green mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-bold text-xs text-gray-800 group-hover/item:text-lagos-green leading-snug">
                                {dept.name}
                              </div>
                              <div className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                                {dept.desc}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Agencies Dropdown */}
            <div className="relative group">
              <button 
                className="whitespace-nowrap px-3 py-2 rounded-lg hover:text-lagos-green hover:bg-gray-50 transition flex items-center gap-1 group-hover:text-lagos-green"
              >
                <span>Agencies</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-lagos-green group-hover:rotate-180 transition duration-200" />
              </button>

              <div className="absolute -left-24 top-full pt-2 hidden group-hover:block w-[460px] z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-150 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-lagos-green px-2 pb-2 mb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>Parastatals & Regulatory Authorities</span>
                    <span className="text-[10px] text-gray-400 font-normal">Official Agency Directory</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {agencies.map((agency, idx) => (
                      <a 
                        key={idx} 
                        href={agency.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-xl hover:bg-green-50/70 transition group/a border border-transparent hover:border-green-100 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-xs text-gray-900 group-hover/a:text-lagos-green">
                            {agency.name}
                          </div>
                          <div className="text-[10px] text-gray-500 line-clamp-1">
                            {agency.tag}
                          </div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-300 group-hover/a:text-lagos-green flex-shrink-0 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Initiatives Link */}
            <Link 
              to="/initiatives" 
              className={`whitespace-nowrap px-3 py-2 rounded-lg transition ${
                location.pathname === '/initiatives' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Initiatives
            </Link>

            {/* Projects Link */}
            <Link 
              to="/projects" 
              className={`whitespace-nowrap px-3 py-2 rounded-lg transition ${
                location.pathname === '/projects' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Projects
            </Link>

            {/* Publications Link */}
            <Link 
              to="/publications" 
              className={`whitespace-nowrap px-3 py-2 rounded-lg transition ${
                location.pathname === '/publications' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Publications
            </Link>

            {/* Media Gallery Link */}
            <Link 
              to="/gallery" 
              className={`whitespace-nowrap px-3 py-2 rounded-lg transition ${
                location.pathname === '/gallery' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Gallery
            </Link>

            {/* Contact */}
            <Link 
              to="/contact" 
              className={`whitespace-nowrap px-3 py-2 rounded-lg transition ${
                location.pathname === '/contact' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Cluster (Search & Primary High-Impact CTA) */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Search Trigger Button */}
            <button 
              onClick={onSearchClick}
              aria-label="Search articles and publications"
              className="p-2.5 text-gray-600 hover:text-lagos-green hover:bg-green-50 rounded-xl transition border border-gray-200/80 shadow-xs"
              title="Search the portal"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* High-Impact Executive Complaints CTA */}
            <button 
              onClick={onOpenComplaints}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-lagos-orange to-[#e55e00] hover:from-[#e55e00] hover:to-[#c85200] text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>Complaints Desk</span>
            </button>

            {/* Mobile & Tablet Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2.5 rounded-xl text-gray-700 hover:text-lagos-green hover:bg-gray-100 transition border border-gray-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MOBILE & TABLET SLIDE-DOWN DRAWER MENU                          */}
      {/* ------------------------------------------------------------------ */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Quick Search in Mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search portal, announcements, reports..."
                onClick={() => { setMobileMenuOpen(false); onSearchClick(); }}
                readOnly
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-pointer"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Links List */}
            <div className="space-y-1 text-sm font-semibold text-gray-800">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
              >
                Home
              </Link>

              {/* Mobile Accordion: About */}
              <div>
                <button 
                  onClick={() => toggleMobileSection('about')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
                >
                  <span>About Us</span>
                  <ChevronDown className={`w-4 h-4 transition ${activeMobileSection === 'about' ? 'rotate-180 text-lagos-green' : 'text-gray-400'}`} />
                </button>
                {activeMobileSection === 'about' && (
                  <div className="pl-6 pr-3 py-2 space-y-2 text-xs text-gray-600 bg-gray-50 rounded-xl mt-1">
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-lagos-green font-medium">Ministry Mandate & History</Link>
                    <Link to="/leadership" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-lagos-green font-medium">Honourable Commissioner & Officers</Link>
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-lagos-green font-medium">Dual Ministerial Offices</Link>
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Departments */}
              <div>
                <button 
                  onClick={() => toggleMobileSection('departments')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
                >
                  <span>Departments & Units</span>
                  <ChevronDown className={`w-4 h-4 transition ${activeMobileSection === 'departments' ? 'rotate-180 text-lagos-green' : 'text-gray-400'}`} />
                </button>
                {activeMobileSection === 'departments' && (
                  <div className="pl-4 pr-3 py-2 space-y-2 text-xs bg-gray-50 rounded-xl mt-1">
                    <Link to="/departments" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold text-lagos-green hover:underline">
                      Explore All 7 Directorates & 8 Units →
                    </Link>
                    {departments.map((d, i) => (
                      <Link key={i} to="/departments" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700">
                        <div className="font-bold">{d.name}</div>
                        <div className="text-[10px] text-gray-400">{d.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/initiatives" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
              >
                Programmes & Initiatives
              </Link>

              <Link 
                to="/projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
              >
                Projects & Infrastructure
              </Link>

              <Link 
                to="/publications" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
              >
                Publications & EIA Manuals
              </Link>

              <Link 
                to="/gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
              >
                Photo & Media Gallery
              </Link>

              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 hover:text-lagos-green transition"
              >
                Contact Headquarters
              </Link>

              <Link 
                to="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl bg-emerald-50 text-lagos-green font-bold transition"
              >
                Staff CMS Admin Portal
              </Link>
            </div>

            {/* Mobile Actions: Complaints CTA & Hotline */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenComplaints(); }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lagos-orange to-[#e55e00] text-white py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Launch Complaints Desk</span>
              </button>

              <a 
                href="tel:+2348102553775" 
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-lagos-darkGreen border border-emerald-200/80 py-2.5 rounded-xl font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-lagos-green" />
                <span>Call Hotline: +234 810 255 3775</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
