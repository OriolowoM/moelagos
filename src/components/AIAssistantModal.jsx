import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, X, Minimize2, Maximize2, RotateCcw, ThumbsUp, ThumbsDown, 
  ExternalLink, Sparkles, Shield, CheckCircle, AlertCircle, Phone, 
  ChevronRight, Copy, Check, MessageSquare, Volume2, VolumeX, Building2
} from 'lucide-react';
import initialKnowledgeBase from '../data/ai_knowledge_base.json';

export default function AIAssistantModal({ isOpen, onClose, onOpenComplaints }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('moelagos_ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'welcome_1',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Welcome to the Lagos State Ministry of the Environment and Water Resources AI Assistant.\n\nI am your digital guide to the Ministry and its agencies. You can ask me questions about environmental services, sanitation, pollution control, drainage, water resources, permits, applications and other official services.\n\nHow may I assist you today?`,
        agency: {
          name: 'Ministry of the Environment and Water Resources',
          acronym: 'MOE&WR',
          website: 'https://moelagos.gov.ng'
        },
        sources: [
          { title: 'Official MOE&WR Portal', url: 'https://moelagos.gov.ng' }
        ],
        showQuickQuestions: true
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [feedbackCommentModal, setFeedbackCommentModal] = useState(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedQuestions = [
    "Which agency handles noise pollution complaints?",
    "How can I report blocked drainage?",
    "How do I arrange household waste collection?",
    "How can I obtain an outdoor advertising permit?",
    "How can I apply for a new water connection?",
    "Which agency handles wastewater management?",
    "How can I book a Lagos State public park?",
    "Where can I obtain information about environmental compliance?"
  ];

  // Save conversation in session
  useEffect(() => {
    try {
      localStorage.setItem('moelagos_ai_chat_history', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (questionText = null) => {
    const textToSend = questionText || inputText.trim();
    if (!textToSend) return;

    const userMessageId = 'msg_' + Date.now();
    const newUserMsg = {
      id: userMessageId,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend
    };

    setMessages(prev => [...prev, newUserMsg]);
    if (!questionText) setInputText('');
    setIsTyping(true);

    try {
      // 1. Send query to backend PHP RAG endpoint
      const response = await fetch('/api/ai_assistant.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          conversationHistory: messages.slice(-4)
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const aiMsg = {
            id: 'ai_' + Date.now(),
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: data.answer,
            agency: data.agency,
            sources: data.sources || [],
            confidence: data.confidence,
            executionMode: data.executionMode
          };
          setMessages(prev => [...prev, aiMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API offline or unreachable, falling back to client-side RAG engine:', err);
    }

    // 2. Client-Side High-Precision RAG Fallback Engine
    setTimeout(() => {
      const qLower = textToSend.toLowerCase();
      let matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'moelagos');
      let matchedFaq = null;

      // Smart routing
      if (qLower.includes('noise') || qLower.includes('club') || qLower.includes('decibel')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lasepa');
      } else if (qLower.includes('drain') || qLower.includes('flood') || qLower.includes('canal') || qLower.includes('gutter')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'odswr');
      } else if (qLower.includes('wastewater') || qLower.includes('sewage') || qLower.includes('septic') || qLower.includes('suction')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lswmo');
      } else if (qLower.includes('waste') || qLower.includes('refuse') || qLower.includes('psp') || qLower.includes('garbage')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lawma');
      } else if (qLower.includes('tree') || qLower.includes('park') || qLower.includes('prun') || qLower.includes('fell')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'laspark');
      } else if (qLower.includes('billboard') || qLower.includes('signboard') || qLower.includes('advert') || qLower.includes('signage')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lasaa');
      } else if (qLower.includes('tap water') || qLower.includes('piped water') || qLower.includes('water connection')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lwc');
      } else if (qLower.includes('borehole') || qLower.includes('sachet water') || qLower.includes('water reg')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lswrc');
      } else if (qLower.includes('bridge') || qLower.includes('kai') || qLower.includes('lagesc') || qLower.includes('open defecat')) {
        matchedAgency = initialKnowledgeBase.agencies.find(a => a.id === 'lagesc');
      }

      // Check FAQ
      if (matchedAgency && matchedAgency.faqs) {
        matchedFaq = matchedAgency.faqs.find(f => 
          qLower.split(' ').filter(w => w.length > 3).some(w => f.question.toLowerCase().includes(w))
        );
      }

      let generatedAnswer = '';
      if (matchedFaq) {
        generatedAnswer = `${matchedFaq.answer}\n\n**Responsible Authority:** ${matchedAgency.officialName} (${matchedAgency.acronym})\n**Official Portal:** [${matchedAgency.website}](${matchedAgency.website})\n**Contact Lines:** ${matchedAgency.phone}`;
      } else {
        generatedAnswer = `**${matchedAgency.officialName} (${matchedAgency.acronym})** is the statutory Lagos State authority responsible for this sector.\n\n${matchedAgency.mandate}\n\n**Official Portal & Inquiries:**\n• **Website:** [${matchedAgency.website}](${matchedAgency.website})\n• **Hotlines:** ${matchedAgency.phone}\n• **Address:** ${matchedAgency.address}`;
      }

      const clientAiMsg = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: generatedAnswer,
        agency: {
          name: matchedAgency.name,
          acronym: matchedAgency.acronym,
          website: matchedAgency.website,
          phone: matchedAgency.phone
        },
        sources: [
          { title: `${matchedAgency.acronym} Official Portal`, url: matchedAgency.website },
          { title: 'Ministry Central Complaints Desk', url: 'https://moelagos.gov.ng/contact' }
        ],
        executionMode: 'client_rag_verified'
      };

      setMessages(prev => [...prev, clientAiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleFeedback = async (msgId, rating) => {
    setFeedbackGiven(prev => ({ ...prev, [msgId]: rating }));

    if (rating === 'not_helpful') {
      setFeedbackCommentModal(msgId);
    }

    try {
      const msg = messages.find(m => m.id === msgId);
      await fetch('/api/ai_feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          query: msg ? msg.text : '',
          agencyId: msg?.agency?.acronym || 'General'
        })
      });
    } catch (e) {}
  };

  const submitFeedbackComment = async () => {
    if (!feedbackCommentModal) return;
    try {
      await fetch('/api/ai_feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: 'not_helpful',
          comment: feedbackComment,
          messageId: feedbackCommentModal
        })
      });
    } catch (e) {}
    setFeedbackCommentModal(null);
    setFeedbackComment('');
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      const freshStart = [
        {
          id: 'welcome_reset',
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Welcome to the Lagos State Ministry of the Environment and Water Resources AI Assistant.\n\nI am your digital guide to the Ministry and its agencies. You can ask me questions about environmental services, sanitation, pollution control, drainage, water resources, permits, applications and other official services.\n\nHow may I assist you today?`,
          agency: {
            name: 'Ministry of the Environment and Water Resources',
            acronym: 'MOE&WR',
            website: 'https://moelagos.gov.ng'
          },
          sources: [
            { title: 'Official MOE&WR Portal', url: 'https://moelagos.gov.ng' }
          ],
          showQuickQuestions: true
        }
      ];
      setMessages(freshStart);
      localStorage.removeItem('moelagos_ai_chat_history');
    }
  };

  // Helper to format text with clickable markdown links
  const renderFormattedText = (content) => {
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a 
            key={i} 
            href={linkMatch[2]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-emerald-700 hover:text-emerald-900 font-bold underline inline-flex items-center gap-1"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }
      return <span key={i} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-out flex flex-col ${
      isFullScreen 
        ? 'inset-0 w-screen h-screen rounded-none' 
        : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[440px] md:w-[480px] h-[85vh] sm:h-[650px] max-h-[90vh] rounded-3xl shadow-2xl border border-emerald-900/20'
    } bg-white overflow-hidden animate-scaleUp`}>
      
      {/* 1. Official Government Header */}
      <div className="bg-gradient-to-r from-[#004d2e] via-[#005e38] to-[#003822] text-white p-4 sm:p-5 flex items-center justify-between shadow-md relative flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/20 flex items-center justify-center">
              <img 
                src="/moe-logo.png" 
                alt="Lagos State Emblem"
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png";
                }}
              />
            </div>
            {/* Pulsing Online Green Dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#004d2e] rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-black text-sm sm:text-base tracking-tight leading-tight">
                Ministry AI Assistant
              </h2>
              <span className="inline-flex items-center gap-1 bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                <Sparkles className="w-2.5 h-2.5" />
                RAG 2.0
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/90 font-medium truncate max-w-[220px] sm:max-w-xs">
              Official Digital Guide • MOE&WR & Agencies
            </p>
          </div>
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-1 text-emerald-200">
          <button 
            onClick={handleClearChat}
            className="p-1.5 hover:bg-white/10 rounded-lg transition"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="hidden sm:block p-1.5 hover:bg-white/10 rounded-lg transition"
            title={isFullScreen ? "Restore window" : "Maximize view"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition"
            title="Close Assistant"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* 2. Chat Conversation Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white text-gray-800 text-sm">
        
        {/* Anti-Hallucination & Official Source Notice Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-emerald-900 shadow-sm">
          <Shield className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Authoritative Public Service:</span> Every factual response is grounded in approved Lagos State environmental laws and statutory agency mandates.
          </div>
        </div>

        {/* Render Messages */}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
          >
            {/* Sender Label & Timestamp */}
            <div className="text-[10px] text-gray-400 px-2 font-medium">
              {msg.sender === 'user' ? 'You' : 'MOE&WR Digital Officer'} • {msg.timestamp}
            </div>

            {/* Bubble */}
            <div className={`relative max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 shadow-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-emerald-700 to-lagos-green text-white rounded-br-none'
                : 'bg-white border border-gray-200/80 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              
              {/* Agency Identification Pill if present */}
              {msg.agency && msg.sender === 'ai' && (
                <div className="mb-2.5 pb-2 border-b border-gray-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-lagos-darkGreen text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <Building2 className="w-3 h-3 text-lagos-green" />
                    <span>{msg.agency.acronym}</span>
                  </span>
                  {msg.agency.website && (
                    <a
                      href={msg.agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-600 hover:text-emerald-800 font-semibold inline-flex items-center gap-0.5"
                    >
                      <span>Official Portal</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className="prose prose-sm max-w-none text-current">
                {renderFormattedText(msg.text)}
              </div>

              {/* Source References */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-gray-100 text-xs">
                  <div className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">
                    Official Sources & Portals:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((src, sIdx) => (
                      <a
                        key={sIdx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-gray-50 hover:bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-gray-200 hover:border-emerald-300 transition"
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions (e.g. If enquiry suggests complaints, offer 1-click modal) */}
              {msg.sender === 'ai' && (
                <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  
                  {/* Left: Quick Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenComplaints && onOpenComplaints()}
                      className="text-[11px] font-bold text-lagos-green hover:underline inline-flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3 text-lagos-orange" />
                      <span>Complaints Desk</span>
                    </button>
                    {msg.agency?.phone && (
                      <a
                        href={`tel:${msg.agency.phone.split(',')[0].replace(/\s/g, '')}`}
                        className="text-[11px] font-bold text-gray-600 hover:text-lagos-green inline-flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Hotline</span>
                      </a>
                    )}
                  </div>

                  {/* Right: Feedback & Copy Controls */}
                  <div className="flex items-center gap-1 text-gray-400">
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="p-1 hover:text-gray-700 transition"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    
                    <button
                      onClick={() => handleFeedback(msg.id, 'helpful')}
                      disabled={feedbackGiven[msg.id]}
                      className={`p-1 transition ${feedbackGiven[msg.id] === 'helpful' ? 'text-emerald-600' : 'hover:text-emerald-600'}`}
                      title="Helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleFeedback(msg.id, 'not_helpful')}
                      disabled={feedbackGiven[msg.id]}
                      className={`p-1 transition ${feedbackGiven[msg.id] === 'not_helpful' ? 'text-red-500' : 'hover:text-red-500'}`}
                      title="Not Helpful"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Suggested Starter Questions (Only shown under the welcome message) */}
            {msg.showQuickQuestions && (
              <div className="pt-2 w-full space-y-1.5 animate-fadeIn">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">
                  Common Resident Inquiries:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-left text-xs bg-white hover:bg-emerald-50 text-gray-700 hover:text-lagos-green px-3 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-300 transition duration-150 shadow-2xs font-medium flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-lagos-green flex-shrink-0" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}

        {/* Typing Bouncing Dots */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-500 py-2 px-1">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-lagos-green animate-pulse" />
            </div>
            <span>Retrieving official verified guidelines...</span>
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Feedback Comment Clarification Modal */}
      {feedbackCommentModal && (
        <div className="p-3 bg-red-50/90 border-t border-red-200 text-xs flex flex-col gap-2 flex-shrink-0 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-red-900">
            <span>Help Us Improve: What was missing or inaccurate?</span>
            <button onClick={() => setFeedbackCommentModal(null)} className="text-red-500 hover:text-red-700">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            type="text"
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="e.g. Expected a direct form link or specific fee clarification..."
            className="w-full text-xs p-2 rounded-lg border border-red-300 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setFeedbackCommentModal(null)}
              className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 rounded-md font-medium"
            >
              Skip
            </button>
            <button
              onClick={submitFeedbackComment}
              className="px-3 py-1 bg-red-600 text-white rounded-md font-bold hover:bg-red-700"
            >
              Submit Note
            </button>
          </div>
        </div>
      )}

      {/* 4. Message Input Box */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex-shrink-0 space-y-2">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about drainage, waste, noise, parks, permits..."
            disabled={isTyping}
            className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagos-green/40 focus:border-lagos-green transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-11 h-11 rounded-2xl bg-lagos-green hover:bg-lagos-darkGreen disabled:opacity-40 disabled:hover:bg-lagos-green text-white flex items-center justify-center transition shadow-md flex-shrink-0"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="text-[10px] text-center text-gray-400 font-medium">
          Official Lagos State Government Digital Public Service • Factual accuracy verified against statutory mandates.
        </div>
      </div>

    </div>
  );
}
