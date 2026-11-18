import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle, 
  ExternalLink, ArrowUp, Shield 
} from 'lucide-react';

export default function Footer({ onOpenComplaints }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const agencyLinks = [
    { name: 'LASEPA', desc: 'Environmental Protection Agency', url: 'https://lasepa.gov.ng' },
    { name: 'LAWMA', desc: 'Waste Management Authority', url: 'https://lawma.gov.ng' },
    { name: 'LASPARK', desc: 'Parks & Gardens Agency', url: 'https://laspark.lg.gov.ng' },
    { name: 'LASAA', desc: 'Signage & Advertisement Agency', url: 'https://lasaa.lg.gov.ng' },
    { name: 'LAGESC / KAI', desc: 'Environmental Sanitation Corps', url: '#' },
    { name: 'LSWMO', desc: 'Wastewater Management Office', url: '#' },
    { name: 'LAWRECO', desc: 'Water Regulatory Commission', url: '#' },
    { name: 'LASWA', desc: 'Lagos State Waterways Authority', url: 'https://laswa.lg.gov.ng' }
  ];

  const quickLinks = [
    { name: 'About the Ministry', href: '#overview' },
    { name: 'Honourable Commissioner', href: '#commissioner' },
    { name: 'Strategic Initiatives', href: '#initiatives' },
    { name: 'News & Press Releases', href: '#news' },
    { name: 'Stormwater Drainage Projects', href: '#projects' },
    { name: 'Complaints Desk', action: onOpenComplaints },
    { name: 'EIA Clearance Guidelines', href: '#eia' },
    { name: 'Staff Webmail Login', href: 'http://moelagos.gov.ng/webmail', external: true }
  ];

  return (
    <footer id="contact" className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t-4 border-lagos-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Footer: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-800">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png" 
                alt="Lagos State Ministry Logo" 
                className="h-14 w-auto object-contain bg-white/90 p-1 rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2023/04/Logo-1.png";
                }}
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-lagos-green">
                  Lagos State Government
                </div>
                <div className="text-base font-bold text-white">
                  Ministry of the Environment & Water Resources
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Committed to delivering a clean, flood-free, and sustainable mega-city through 
              strategic environmental governance, innovative waste recovery, and robust water infrastructure.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com/moelagos" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-lagos-green text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://twitter.com/LasgMOE" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-lagos-green text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a 
                href="https://instagram.com/lagosmoe" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-lagos-green text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Newsletter Subscription (7 cols) */}
          <div className="lg:col-span-7 bg-gray-900/80 p-6 sm:p-8 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-lagos-orange mb-1">
                Stay Informed
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                Subscribe to Official Environmental Bulletins & Alerts
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Receive official press statements, weather forecasts, sanitation schedules, and flood alerts directly in your inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-green-900/40 border border-green-600 text-green-200 text-xs p-3.5 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Thank you! You have been successfully subscribed to MOE&WR updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lagos-green"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Footer: Important Links & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-gray-800 text-xs">
          {/* Col 1: Parastatals & Agencies */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-lagos-green">
              Ministry Agencies
            </h4>
            <ul className="space-y-2">
              {agencyLinks.slice(0, 4).map((ag, i) => (
                <li key={i}>
                  <a 
                    href={ag.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-center gap-1.5"
                  >
                    <span className="font-bold text-gray-200">{ag.name}:</span>
                    <span className="text-gray-400">{ag.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: More Agencies */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-lagos-green">
              Partner Agencies
            </h4>
            <ul className="space-y-2">
              {agencyLinks.slice(4).map((ag, i) => (
                <li key={i}>
                  <a 
                    href={ag.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-center gap-1.5"
                  >
                    <span className="font-bold text-gray-200">{ag.name}:</span>
                    <span className="text-gray-400">{ag.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-lagos-green">
              Quick Portals
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((lk, i) => (
                <li key={i}>
                  {lk.action ? (
                    <button 
                      onClick={lk.action} 
                      className="text-left text-lagos-orange hover:underline font-bold"
                    >
                      {lk.name}
                    </button>
                  ) : (
                    <a 
                      href={lk.href} 
                      target={lk.external ? '_blank' : '_self'}
                      rel={lk.external ? 'noopener noreferrer' : ''}
                      className="hover:text-white transition"
                    >
                      {lk.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Secretariat */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-lagos-green">
              Official Headquarters
            </h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lagos-orange flex-shrink-0 mt-0.5" />
                <span>Block 16, The Secretariat Annex, Alausa, Ikeja, Lagos State, Nigeria.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lagos-orange flex-shrink-0" />
                <a href="tel:+2348102553775" className="hover:text-white font-semibold text-gray-200">+234 810 255 3775</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lagos-orange flex-shrink-0" />
                <a href="mailto:Env.wr@lagosstate.gov.ng" className="hover:text-white">Env.wr@lagosstate.gov.ng</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Lagos State Ministry of the Environment & Water Resources. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition">Accessibility (WCAG 2.1 AA)</a>
            <span>•</span>
            <button 
              onClick={scrollToTop} 
              aria-label="Scroll back to top"
              className="p-2 bg-gray-800 hover:bg-lagos-green text-white rounded-lg transition"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
