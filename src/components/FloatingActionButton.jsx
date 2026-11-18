import React, { useState } from 'react';
import { MessageCircle, Phone, AlertTriangle, X, ShieldAlert } from 'lucide-react';

export default function FloatingActionButton({ onOpenComplaints }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Expanded Quick Options Menu */}
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 space-y-2 w-64 animate-scaleUp">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 pt-1">
            Emergency & Inquiries
          </div>

          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/2348102553775?text=Hello%20Lagos%20Ministry%20of%20Environment"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-green-50 transition text-gray-800 hover:text-lagos-green"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Chat on WhatsApp</div>
              <div className="text-[10px] text-gray-500">+234 810 255 3775</div>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:+2348102553775"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-green-50 transition text-gray-800 hover:text-lagos-green"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Call Ministry Line</div>
              <div className="text-[10px] text-gray-500">24/7 Rapid Response</div>
            </div>
          </a>

          {/* Report an Incident */}
          <button
            onClick={() => { setExpanded(false); onOpenComplaints(); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition text-lagos-orange text-left"
          >
            <div className="w-8 h-8 rounded-full bg-lagos-orange text-white flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Log Rapid Complaint</div>
              <div className="text-[10px] text-orange-700">Flooding / Waste / Noise</div>
            </div>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle Quick Contact Options"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-lagos-green text-white shadow-2xl hover:shadow-green-600/40 flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white ring-4 ring-green-600/20"
      >
        {expanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
