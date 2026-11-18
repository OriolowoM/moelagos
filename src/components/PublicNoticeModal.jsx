import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, AlertCircle, Check } from 'lucide-react';

export default function PublicNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already acknowledged notice in localStorage
    const hasSeenNotice = localStorage.getItem('moelagos_lshs_notice_v1');
    if (!hasSeenNotice) {
      // Small timeout to allow page layout to settle smoothly
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('moelagos_lshs_notice_v1', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border-4 border-lagos-green overflow-hidden transform transition-all animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header Ribbon */}
        <div className="bg-lagos-green text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-yellow-300" />
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider uppercase">
              Official Public Notice
            </span>
          </div>
          <button 
            onClick={handleClose}
            aria-label="Close Notice"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Dual Logos: LASHMA and ILERA EKO */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-orange-50 p-4 rounded-xl border border-green-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm p-1.5 flex items-center justify-center border border-green-200">
                <span className="font-black text-lagos-green text-xs text-center leading-none">
                  LASHMA
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-800">Lagos State Health Scheme</div>
                <div className="text-[10px] text-gray-500">Universal Health Coverage</div>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block bg-lagos-orange text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
                ILERA EKO
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">Enrolment Mandatory</div>
            </div>
          </div>

          {/* Banner Graphic if available from live site */}
          <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
            <img 
              src="https://moelagos.gov.ng/wp-content/uploads/2026/02/lashma.jpg" 
              alt="LASHMA ILERA EKO Executive Order Notice"
              className="w-full h-auto object-cover max-h-48"
              onError={(e) => {
                // Hide fallback cleanly if image fails
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Notice Copy */}
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <div className="font-bold text-gray-900 text-base border-b border-gray-100 pb-2">
              Mandatory Registration on Lagos State Health Scheme (LSHS) for ALL Residents
            </div>
            
            <p>
              In accordance with <strong className="text-lagos-green">Executive Order E0/BOS/01</strong> of the Executive Governor of Lagos State, 
              <strong> Mr. Babajide Sanwo-Olu</strong>, signed on the <strong>16th of July 2024</strong>, registration on the Lagos State Health Scheme (LSHS) is 
              compulsory for <strong>ALL residents and business operators</strong> in Lagos State.
            </p>

            <p className="bg-amber-50 border-l-4 border-amber-400 p-3 text-xs text-amber-900 rounded-r">
              <strong>Important Notice:</strong> It has become <strong>MANDATORY</strong> for Individuals, Organizations, Contractors, and Associations 
              seeking access to <em>ANY service, clearance, or partnership</em> of the Ministry of the Environment and Water Resources to present evidence 
              of active subscription through LASHMA or an accredited provider.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a 
              href="https://www.lashma.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-lagos-green hover:bg-lagos-darkGreen text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition transform active:scale-95"
            >
              <span>Visit LASHMA Portal (www.lashma.com)</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button 
              onClick={handleClose}
              className="sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 text-lagos-green" />
              <span>Acknowledge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
