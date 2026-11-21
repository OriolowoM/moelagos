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

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
      <div className="bg-[#004d2e] text-white border-b border-[#00683e] text-[10px] sm:text-[11px] lg:text-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 overflow-hidden">
          {/* Left: State Official Tag & Motto */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-emerald-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden xs:inline">Lagos State Government</span>
              <span className="xs:hidden">LASG</span>
            </div>
            <span className="hidden md:inline text-emerald-600/80">•</span>
            <span className="hidden lg:inline text-emerald-100 font-medium italic truncate max-w-md">
              "Eko O Ni Baje" — Towards a Cleaner, Greener & Resilient Lagos
            </span>
          </div>

          {/* Right: Citizen Direct Hotlines, Headquarters & Staff Access */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
            <a 
              href="tel:+2348102553775" 
              className="flex items-center gap-1 font-semibold text-white hover:text-emerald-200 transition group whitespace-nowrap"
              title="Official Citizen Rapid Response Hotline"
            >
              <Phone className="w-3 h-3 text-lagos-orange group-hover:scale-110 transition flex-shrink-0" />
              <span><span className="hidden xs:inline">Hotline: </span><strong className="text-emerald-200">+234 810 255 3775</strong></span>
            </a>

            <span className="hidden xl:flex items-center gap-1 text-emerald-100/90 whitespace-nowrap">
              <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span>Block 16, Alausa, Ikeja</span>
            </span>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-emerald-700/60">
              <a 
                href="http://moelagos.gov.ng/webmail" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-200 hover:text-white transition font-medium flex items-center gap-1 text-[10px] sm:text-[11px]"
              >
                <span>Staff Mail</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>

              <Link 
                to="/admin" 
                className="text-emerald-300 hover:text-white transition font-bold bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1"
                title="Staff CMS Portal Access"
              >
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN EXECUTIVE NAVIGATION BAR                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-gray-150 ${
        scrolled ? 'shadow-md py-1.5 sm:py-2' : 'shadow-xs py-2 sm:py-2.5'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Identity / Official Ministry Logo */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0 group focus:outline-none min-w-0"
            aria-label="Lagos State Ministry of the Environment and Water Resources Home"
          >
            <img 
              src="/moe-logo.png" 
              alt="Lagos State Ministry of the Environment and Water Resources" 
              className="h-7 xs:h-8 sm:h-10 md:h-12 w-auto max-w-[145px] xs:max-w-[180px] sm:max-w-[240px] md:max-w-[280px] object-contain transition duration-300 group-hover:opacity-95"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png";
              }}
            />
          </Link>

          {/* Desktop Menu Navigation (Scales smoothly from 1280px without overflowing) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 text-[12.5px] 2xl:text-[13.5px] font-semibold text-gray-700 min-w-0">
            {/* Home */}
            <Link 
              to="/" 
              className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition ${
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
                className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition flex items-center gap-1 group-hover:text-lagos-green ${
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
                    <Building2 className="w-4 h-4 text-lagos-green flex-shrink-0" />
                    <div>
                      <div>Ministry Mandate & History</div>
                      <div className="text-[10px] text-gray-400 font-normal">Founding history (1979) & objectives</div>
                    </div>
                  </Link>
                  <Link to="/honourable-commissioner" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Award className="w-4 h-4 text-lagos-green flex-shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900">Honourable Commissioner</div>
                      <div className="text-[10px] text-gray-500 font-normal">Mr. Tokunbo Philip Wahab Profile &amp; Bio</div>
                    </div>
                  </Link>
                  <Link to="/leadership" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Users className="w-4 h-4 text-lagos-green flex-shrink-0" />
                    <div>
                      <div>Leadership &amp; Principal Officers</div>
                      <div className="text-[10px] text-gray-400 font-normal">Special Advisers &amp; Permanent Secretaries</div>
                    </div>
                  </Link>
                  <Link to="/about" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Trees className="w-4 h-4 text-lagos-green flex-shrink-0" />
                    <div>
                      <div>Office of Environmental Services</div>
                      <div className="text-[10px] text-gray-400 font-normal">Solid waste, sanitation & climate</div>
                    </div>
                  </Link>
                  <Link to="/about" className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-lagos-green rounded-xl transition">
                    <Droplets className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
                className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition flex items-center gap-1 group-hover:text-lagos-green ${
                  location.pathname === '/departments'
                    ? 'text-lagos-green bg-green-50/80 font-bold'
                    : 'hover:text-lagos-green hover:bg-gray-50'
                }`}
              >
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-lagos-green group-hover:rotate-180 transition duration-200" />
              </Link>

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block w-[480px] 2xl:w-[520px] z-50 animate-fadeIn">
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
                          className="p-2 rounded-xl hover:bg-green-50/70 transition group/item border border-transparent hover:border-green-100"
                        >
                          <div className="flex items-start gap-2">
                            <Icon className="w-4 h-4 text-lagos-green mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-gray-800 group-hover/item:text-lagos-green leading-snug truncate">
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
                className="whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg hover:text-lagos-green hover:bg-gray-50 transition flex items-center gap-1 group-hover:text-lagos-green"
              >
                <span>Agencies</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-lagos-green group-hover:rotate-180 transition duration-200" />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block w-[440px] z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-150 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-lagos-green px-2 pb-2 mb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>Parastatals & Regulatory Authorities</span>
                    <span className="text-[10px] text-gray-400 font-normal">Official Directory</span>
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
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-gray-900 group-hover/a:text-lagos-green truncate">
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
              className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition ${
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
              className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition ${
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
              className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition ${
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
              className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition ${
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
              className={`whitespace-nowrap px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-lg transition ${
                location.pathname === '/contact' 
                  ? 'text-lagos-green bg-green-50/80 font-bold' 
                  : 'hover:text-lagos-green hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Cluster (Search, Complaints CTA, Mobile Toggle) */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Search Trigger Button */}
            <button 
              onClick={onSearchClick}
              aria-label="Search articles and publications"
              className="p-2 sm:p-2.5 text-gray-600 hover:text-lagos-green hover:bg-green-50 rounded-xl transition border border-gray-200/80 shadow-xs flex-shrink-0"
              title="Search the portal"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Desktop / Tablet Complaints Desk Button */}
            <button 
              onClick={onOpenComplaints}
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-lagos-orange to-[#e55e00] hover:from-[#e55e00] hover:to-[#c85200] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap flex-shrink-0"
            >
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce flex-shrink-0" />
              <span>Complaints Desk</span>
            </button>

            {/* Mobile Icon-Only Complaints Trigger (< sm) */}
            <button
              onClick={onOpenComplaints}
              aria-label="Lodge Environmental Complaint"
              title="Complaints Desk"
              className="sm:hidden p-2 rounded-xl bg-gradient-to-r from-lagos-orange to-[#e55e00] text-white shadow-xs flex-shrink-0 active:scale-95"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            {/* Mobile & Tablet Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2 sm:p-2.5 rounded-xl text-gray-800 bg-gray-50 hover:bg-gray-100 hover:text-lagos-green transition border border-gray-200 flex-shrink-0 active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MODERN MOBILE & TABLET SLIDE-OVER NAVIGATION DRAWER             */}
      {/* ------------------------------------------------------------------ */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed Backdrop with Blur */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <aside 
            className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out animate-slideInRight"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-gray-150 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src="/moe-logo.png" 
                  alt="Lagos State MOE&WR" 
                  className="h-8 w-auto max-w-[180px] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png";
                  }}
                />
              </div>

              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition shadow-xs border border-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Quick Search in Drawer */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news, reports, publications..."
                  onClick={() => { setMobileMenuOpen(false); onSearchClick(); }}
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 cursor-pointer transition"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 text-sm font-semibold text-gray-800">
                <Link 
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl transition ${
                    location.pathname === '/' 
                      ? 'bg-green-50 text-lagos-green font-bold' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Home
                </Link>

                {/* Mobile Accordion: About */}
                <div className="rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleMobileSection('about')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition text-left"
                  >
                    <span>About the Ministry</span>
                    <ChevronDown className={`w-4 h-4 transition ${activeMobileSection === 'about' ? 'rotate-180 text-lagos-green' : 'text-gray-400'}`} />
                  </button>
                  {activeMobileSection === 'about' && (
                    <div className="pl-4 pr-3 py-2 space-y-2 text-xs bg-gray-50 rounded-xl mt-1">
                      <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-lagos-green font-medium">
                        • Mandate & Institutional History
                      </Link>
                      <Link to="/honourable-commissioner" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-900 font-bold hover:text-lagos-green">
                        • Hon. Commissioner (Mr. Tokunbo Wahab)
                      </Link>
                      <Link to="/leadership" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-lagos-green font-medium">
                        • Principal Officers &amp; Leadership
                      </Link>
                      <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-lagos-green font-medium">
                        • Dual Ministerial Directorates (OES & ODS)
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Accordion: Departments */}
                <div className="rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleMobileSection('departments')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition text-left"
                  >
                    <span>Departments & Directorates</span>
                    <ChevronDown className={`w-4 h-4 transition ${activeMobileSection === 'departments' ? 'rotate-180 text-lagos-green' : 'text-gray-400'}`} />
                  </button>
                  {activeMobileSection === 'departments' && (
                    <div className="pl-4 pr-3 py-2 space-y-2 text-xs bg-gray-50 rounded-xl mt-1">
                      <Link to="/departments" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-bold text-lagos-green hover:underline">
                        Explore All 7 Directorates & 8 Units →
                      </Link>
                      {departments.map((d, i) => (
                        <Link key={i} to="/departments" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-700 hover:text-lagos-green">
                          <div className="font-bold">{d.name}</div>
                          <div className="text-[10px] text-gray-400">{d.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Accordion: Agencies */}
                <div className="rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleMobileSection('agencies')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition text-left"
                  >
                    <span>Parastatals & Agencies</span>
                    <ChevronDown className={`w-4 h-4 transition ${activeMobileSection === 'agencies' ? 'rotate-180 text-lagos-green' : 'text-gray-400'}`} />
                  </button>
                  {activeMobileSection === 'agencies' && (
                    <div className="pl-4 pr-3 py-2 space-y-1.5 text-xs bg-gray-50 rounded-xl mt-1">
                      {agencies.map((agency, i) => (
                        <a 
                          key={i} 
                          href={agency.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-between py-1 text-gray-700 hover:text-lagos-green"
                        >
                          <div>
                            <span className="font-bold">{agency.name}</span>
                            <span className="text-[10px] text-gray-400 block">{agency.tag}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-gray-400 ml-1" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  to="/initiatives" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Programmes & Initiatives
                </Link>

                <Link 
                  to="/projects" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Projects & Infrastructure
                </Link>

                <Link 
                  to="/publications" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Publications & EIA Manuals
                </Link>

                <Link 
                  to="/gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Photo & Media Gallery
                </Link>

                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Contact Headquarters
                </Link>

                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl bg-emerald-50 text-lagos-green font-bold transition flex items-center justify-between"
                >
                  <span>Staff CMS Admin Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Drawer Footer Actions: Complaints CTA & Hotline */}
              <div className="pt-4 border-t border-gray-150 space-y-2.5">
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
          </aside>
        </div>
      )}
    </header>
  );
}
