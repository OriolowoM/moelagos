import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 py-10 sm:py-16 animate-fadeIn">
      <SEO 
        title="Privacy Policy | Lagos State Ministry of the Environment & Water Resources"
        description="Official privacy policy and citizen data protection guidelines for the Lagos State Ministry of the Environment & Water Resources portal."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link to="/" className="hover:text-lagos-green">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-lagos-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Citizen Data Protection</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-gray-950">
            Privacy &amp; Data Protection Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Effective Date: November 2026 • Pursuant to the Nigeria Data Protection Act (NDPA) and Lagos State E-Governance Regulations
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-gray-900">1. Commitment to Privacy</h2>
            <p>
              The Lagos State Ministry of the Environment and Water Resources (MOE&WR) is committed to protecting the privacy, security, and confidentiality of all citizens, business operators, contractors, and visitors who access our digital portals (`moelagos.gov.ng`).
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-150">
            <h2 className="font-heading text-lg font-bold text-gray-900">2. Information We Collect</h2>
            <p>We only collect personal information that you voluntarily provide when:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li>Subscribing to official Ministry environmental bulletins, alerts, and advisories.</li>
              <li>Filing an environmental complaint or reporting drainage encroachment via our Complaints Desk.</li>
              <li>Registering for official sustainability campaigns, such as the "My Tree Challenge".</li>
              <li>Requesting Environmental Impact Assessment (EIA) clearance or downloading regulatory documents.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-150">
            <h2 className="font-heading text-lg font-bold text-gray-900">3. Purpose and Use of Collected Data</h2>
            <p>
              Personal data collected (including names, emails, phone numbers, and location details) is utilized exclusively for legitimate public service administration, verifying complaints, dispatching emergency flood advisories, processing EIA applications, and evaluating campaign entries.
            </p>
            <p className="font-semibold text-lagos-green">
              We never sell, rent, commercialize, or transfer citizen data to unauthorized third parties.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-150">
            <h2 className="font-heading text-lg font-bold text-gray-900">4. Inter-Agency Collaboration</h2>
            <p>
              Where an environmental report or request pertains to a specialized statutory agency (e.g. LAWMA for waste management, LASEPA for industrial pollution, LASPARK for public trees, or ODS&WR for canal blockages), case details are securely transferred within the official Lagos State Government network to facilitate rapid operational resolution.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-150">
            <h2 className="font-heading text-lg font-bold text-gray-900">5. Contact Information &amp; Data Protection Officer</h2>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
              <div className="font-bold text-gray-900">Public Affairs &amp; ICT Directorate / Data Protection Office</div>
              <div>Lagos State Ministry of the Environment and Water Resources</div>
              <div>Block 16 &amp; 17, The Secretariat Annex, Alausa, Ikeja, Lagos State.</div>
              <div>Email: <a href="mailto:Env.wr@lagosstate.gov.ng" className="text-lagos-green font-bold hover:underline">Env.wr@lagosstate.gov.ng</a></div>
              <div>Helpline: <a href="tel:+2348102553775" className="text-lagos-green font-bold hover:underline">+234 810 255 3775</a></div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
