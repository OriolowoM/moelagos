import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, Sparkles, ChevronRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';

export default function AccessibilityPage() {
  const standards = [
    'Semantic HTML5 structure ensuring smooth screen reader navigation (NVDA, JAWS, VoiceOver).',
    'WCAG 2.1 Level AA color contrast ratios for high visibility across all typography and icons.',
    'Full keyboard navigability allowing seamless tabbed browsing across all interactive elements.',
    'Mobile-first responsive typography and fluid layouts avoiding horizontal scrolling.',
    'Descriptive alt text for all official imagery, infographics, and commissioner portraits.',
    'Graceful degradation supporting low-bandwidth 3G/4G connections across Lagos State.'
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 py-10 sm:py-16 animate-fadeIn">
      <SEO 
        title="Web Accessibility Statement | Lagos State Ministry of the Environment & Water Resources"
        description="Official accessibility standards and digital inclusion policy of the Lagos State Ministry of the Environment & Water Resources portal."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link to="/" className="hover:text-lagos-green">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Accessibility Statement</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-lagos-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            <span>Inclusive Digital Governance</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-gray-950">
            Web Accessibility Statement
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Committed to ensuring digital accessibility for all residents, regardless of ability or technology.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-gray-900">Our Accessibility Commitment</h2>
            <p>
              The Lagos State Ministry of the Environment and Water Resources believes that public digital infrastructure must be accessible, transparent, and equitable for every citizen. We continually optimize `moelagos.gov.ng` in conformance with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-gray-150">
            <h2 className="font-heading text-lg font-bold text-gray-900">Implemented Accessibility Features</h2>
            <div className="grid grid-cols-1 gap-3">
              {standards.map((st, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-150">
                  <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-800">{st}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-150">
            <h2 className="font-heading text-lg font-bold text-gray-900">Accessibility Feedback &amp; Assistance</h2>
            <p>
              If you experience any accessibility barrier while browsing our site or need assistance with any document or form, please contact our ICT accessibility desk:
            </p>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
              <div>Email: <a href="mailto:Env.wr@lagosstate.gov.ng" className="text-lagos-green font-bold hover:underline">Env.wr@lagosstate.gov.ng</a></div>
              <div>Telephone Helpline: <a href="tel:+2348102553775" className="text-lagos-green font-bold hover:underline">+234 810 255 3775</a></div>
              <div>Secretariat: Block 16 &amp; 17, The Secretariat Annex, Alausa, Ikeja, Lagos State.</div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
