import React, { useState } from 'react';
import { Bot, MessageCircle, Phone, AlertTriangle, X, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export default function FloatingActionButton({ onOpenComplaints, onOpenAIAssistant }) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-2.5">
      
      {/* 1. Quick Emergency & Inquiries Popover Menu */}
      {quickMenuOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-3 space-y-2 w-64 animate-scaleUp">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 pt-1 flex items-center justify-between">
            <span>Direct Channels</span>
            <span className="text-[9px] bg-emerald-100 text-lagos-darkGreen font-extrabold px-1.5 py-0.5 rounded-full">24/7 Rapid Desk</span>
          </div>

          {/* Smart AI Assistant */}
          <button
            onClick={() => { setQuickMenuOpen(false); onOpenAIAssistant(); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition text-lagos-darkGreen text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-lagos-green text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold leading-tight flex items-center gap-1">
                <span>AI Ministry Guide</span>
                <Sparkles className="w-3 h-3 text-lagos-orange" />
              </div>
              <div className="text-[10px] text-emerald-700">Instant Official Answers</div>
            </div>
          </button>

          {/* Citizen Complaints Desk */}
          <button
            onClick={() => { setQuickMenuOpen(false); onOpenComplaints(); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100 transition text-lagos-orange text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-lagos-orange text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold leading-tight">Complaints Desk</div>
              <div className="text-[10px] text-orange-700">Lodge Official Incident</div>
            </div>
          </button>

          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/2348102553775?text=Hello%20Lagos%20Ministry%20of%20Environment"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-green-50 transition text-gray-800 hover:text-lagos-green"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold leading-tight truncate">WhatsApp Desk</div>
              <div className="text-[10px] text-gray-500">+234 810 255 3775</div>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:+2348102553775"
            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-green-50 transition text-gray-800 hover:text-lagos-green"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold leading-tight truncate">Hotline Dispatch</div>
              <div className="text-[10px] text-gray-500">0810 255 3775</div>
            </div>
          </a>
        </div>
      )}

      {/* 2. Main Trigger Action Bar */}
      <div className="flex items-center gap-2">
        
        {/* Quick Menu Toggle (Dots/Chevron) */}
        <button
          onClick={() => setQuickMenuOpen(!quickMenuOpen)}
          aria-label="Toggle Quick Contact Options"
          className="w-10 h-10 rounded-2xl bg-white text-gray-700 hover:text-lagos-green shadow-lg border border-gray-200 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          title="Emergency Contact Channels"
        >
          {quickMenuOpen ? <X className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Primary Smart AI Assistant Trigger Button with Tooltip Pill */}
        <button
          onClick={onOpenAIAssistant}
          aria-label="Open Smart AI Ministry Assistant"
          className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-700 via-lagos-green to-emerald-600 text-white shadow-2xl hover:shadow-emerald-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white ring-4 ring-emerald-600/20"
        >
          {/* Animated Pulsing Bot Icon */}
          <div className="relative">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 border border-emerald-900 rounded-full animate-ping"></span>
          </div>

          <div className="text-left">
            <div className="text-xs sm:text-sm font-black tracking-tight leading-tight flex items-center gap-1">
              <span>Ask AI Guide</span>
              <Sparkles className="w-3 h-3 text-yellow-300 animate-spin [animation-duration:4s]" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-emerald-100 font-medium leading-none">
              Online • MOE&WR
            </div>
          </div>
        </button>

      </div>

    </div>
  );
}
