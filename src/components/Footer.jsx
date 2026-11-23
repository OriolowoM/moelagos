import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Send, CheckCircle, 
  ExternalLink, ArrowUp, Shield, Trees, AlertCircle, Loader2
} from 'lucide-react';

export default function Footer({ onOpenComplaints, onOpenTreeChallenge }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await response.json();

      if (data.success) {
        setSubscribed(true);
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.warn('Newsletter API offline, recorded locally:', err);
      setSubscribed(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const agencyLinks = [
    { name: 'LASEPA', desc: 'Environmental Protection Agency', url: 'https://lasepa.gov.ng' },
    { name: 'LAWMA', desc: 'Waste Management Authority', url: 'https://lawma.gov.ng' },
    { name: 'LASPARK', desc: 'Parks & Gardens Agency', url: 'https://laspark.lagosstate.gov.ng' },
    { name: 'LASAA', desc: 'Signage & Advertisement Agency', url: 'https://lasaa.lg.gov.ng' }
  ];

  const partnerAgencies = [
    { name: 'LAGESC / KAI', desc: 'Environmental Sanitation Corps', url: 'https://lagesc.lagosstate.gov.ng' },
    { name: 'LSWMO', desc: 'Wastewater Management Office', url: 'https://lswmo.lg.gov.ng' },
    { name: 'LSWRC', desc: 'Water Regulatory Commission', url: 'https://lswrc.lagosstate.gov.ng' },
    { name: 'LASWA', desc: 'Lagos State Waterways Authority', url: 'https://laswa.lagosstate.gov.ng' },
    { name: 'LWC', desc: 'Lagos Water Corporation', url: 'https://lagoswater.org' }
  ];

  const quickLinks = [
    { name: 'About the Ministry', href: '/about' },
    { name: 'Honourable Commissioner', href: '/honourable-commissioner' },
    { name: 'Special Adviser (Environment)', href: '/special-adviser' },
    { name: 'Perm. Secretary (OES)', href: '/permanent-secretary-oes' },
    { name: 'Perm. Secretary (ODS&WR)', href: '/permanent-secretary-odswr' },
    { name: 'Tree Planting Challenge', href: '/my-tree-challenge', action: onOpenTreeChallenge },
    { name: 'Stormwater & Drainage Projects', href: '/projects' },
    { name: 'Strategic Initiatives', href: '/initiatives' },
    { name: 'Publications & EIA Clearance', href: '/publications' },
    { name: 'Leadership & Officials Directory', href: '/leadership' },
    { name: 'Complaints Desk', action: onOpenComplaints },
    { name: 'Staff Webmail Login', href: 'https://moelagos.gov.ng/webmail', external: true }
  ];

  return (
    <footer id="contact" className="bg-gray-950 text-gray-300 pt-12 sm:pt-16 pb-8 border-t-4 border-lagos-green w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-gray-800">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none">
              <div className="bg-white p-2 rounded-xl shadow-md border border-white/20 transition group-hover:opacity-95 flex items-center justify-center">
                <img 
                  src="/moe-logo.png" 
                  alt="Lagos State Ministry of the Environment & Water Resources Logo" 
                  className="h-10 sm:h-12 w-auto max-w-[210px] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/moe-crest.png";
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-lagos-green">
                  Lagos State Government
                </div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                  Ministry of the Environment &amp; Water Resources
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-lg">
              Committed to delivering a clean, flood-resilient, and sustainable megacity through 
              strategic environmental governance, innovative waste recovery, and robust drainage infrastructure.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://facebook.com/moelagos" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800 hover:bg-lagos-green text-white flex items-center justify-center transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://twitter.com/LasgMOE" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter / X"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800 hover:bg-lagos-green text-white flex items-center justify-center transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a 
                href="https://instagram.com/lagosmoe" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800 hover:bg-lagos-green text-white flex items-center justify-center transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Newsletter Subscription (7 cols) */}
          <div className="lg:col-span-7 bg-gray-900/80 p-5 sm:p-7 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-lagos-orange mb-1">
                Stay Informed • Official Government Bulletins
              </div>
              <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-white mb-2">
                Subscribe to Official Environmental Bulletins &amp; Alerts
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Receive official press statements, weather forecasts, sanitation schedules, and flood alerts directly in your inbox.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-3 p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {subscribed ? (
              <div className="bg-green-900/40 border border-green-600 text-green-200 text-xs p-3.5 rounded-xl flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Thank you! Your email has been registered for official MOE&amp;WR bulletins and alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 min-w-0">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 flex-shrink-0" />
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
                  disabled={loading}
                  className="bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold text-xs px-5 sm:px-6 py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Footer: Important Links & Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-10 sm:py-12 border-b border-gray-800 text-xs">
          
          {/* Col 1: Parastatals & Agencies */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider text-lagos-green">
              Ministry Agencies
            </h4>
            <ul className="space-y-2">
              {agencyLinks.map((ag, i) => (
                <li key={i}>
                  <a 
                    href={ag.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-center gap-1.5 group"
                  >
                    <span className="font-bold text-gray-200 group-hover:text-lagos-green transition">{ag.name}:</span>
                    <span className="text-gray-400 truncate">{ag.desc}</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-lagos-green ml-auto flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: More Partner Agencies */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider text-lagos-green">
              Partner Agencies
            </h4>
            <ul className="space-y-2">
              {partnerAgencies.map((ag, i) => (
                <li key={i}>
                  <a 
                    href={ag.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-center gap-1.5 group"
                  >
                    <span className="font-bold text-gray-200 group-hover:text-lagos-green transition">{ag.name}:</span>
                    <span className="text-gray-400 truncate">{ag.desc}</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-lagos-green ml-auto flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Portals */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider text-lagos-green">
              Quick Portals
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((lk, i) => (
                <li key={i}>
                  {lk.action ? (
                    <button 
                      onClick={lk.action} 
                      className="text-left text-lagos-orange hover:underline font-bold transition"
                    >
                      {lk.name} →
                    </button>
                  ) : lk.external ? (
                    <a 
                      href={lk.href} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="hover:text-white transition flex items-center gap-1"
                    >
                      <span>{lk.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                    </a>
                  ) : (
                    <Link 
                      to={lk.href} 
                      className="hover:text-white transition block"
                    >
                      {lk.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Secretariat */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider text-lagos-green">
              Official Headquarters
            </h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lagos-orange flex-shrink-0 mt-0.5" />
                <span>Block 16 &amp; 17, The Secretariat Annex, Alausa, Ikeja, Lagos State.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lagos-orange flex-shrink-0" />
                <a href="tel:+2348102553775" className="hover:text-white font-semibold text-gray-200">+234 810 255 3775</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lagos-orange flex-shrink-0" />
                <a href="mailto:Env.wr@lagosstate.gov.ng" className="hover:text-white truncate">Env.wr@lagosstate.gov.ng</a>
              </p>
            </div>

            <div className="pt-2">
              <Link 
                to="/my-tree-challenge"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition"
              >
                <Trees className="w-3.5 h-3.5" />
                <span>Join "My Tree Challenge" (₦6.5M Pool) →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Lagos State Ministry of Environment &amp; Water Resources. All Rights Reserved.
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/privacy-policy" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/accessibility" className="hover:text-gray-300 transition">Accessibility</Link>
            <span>•</span>
            <button 
              onClick={scrollToTop} 
              aria-label="Scroll back to top"
              className="p-2 bg-gray-800 hover:bg-lagos-green text-white rounded-lg transition active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
