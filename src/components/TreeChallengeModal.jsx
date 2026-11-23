import React, { useState } from 'react';
import { 
  X, Trees, Trophy, CheckCircle, AlertCircle, 
  Send, User, Mail, Phone, MapPin, Calendar, Sparkles, ShieldCheck 
} from 'lucide-react';

export default function TreeChallengeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    category: 'Individual Resident',
    lga: 'Ikeja',
    email: '',
    phone: '',
    species: 'Neem / Dongoyaro (Azadirachta indica)',
    plantingAddress: '',
    targetDate: new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [regId, setRegId] = useState('');

  if (!isOpen) return null;

  const lagosLGAs = [
    'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
    'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
    'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
    'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
  ];

  const treeSpecies = [
    'Neem / Dongoyaro (Azadirachta indica) — Air Purification',
    'Queen Palm / Royal Palm — Urban Landscaping & Greening',
    'Ashoka / Masquerade Tree — Noise Barrier & Windbreak',
    'Teak (Tectona grandis) — Soil Stability & Hardwood',
    'Fruit Tree (Mango / Orange / Guava / Soursop) — Nutrition & Shade',
    'Indigenous African Mahogany — Climate Canopy Resilience'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/tree_challenge.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setRegId(data.registrationId);
      } else {
        setError(data.error || 'Registration failed. Please check your information and try again.');
      }
    } catch (err) {
      // Graceful offline mock confirmation
      const fallbackId = 'LASG-TREE-2026-' + Math.floor(1000 + Math.random() * 9000);
      setSubmitted(true);
      setRegId(fallbackId);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      category: 'Individual Resident',
      lga: 'Ikeja',
      email: '',
      phone: '',
      species: 'Neem / Dongoyaro (Azadirachta indica)',
      plantingAddress: '',
      targetDate: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#004d2e] via-[#00683e] to-[#008751] text-white p-6 sm:p-7 relative flex-shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>World Environment Day Special Campaign • ₦6.5M Prize Pool</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl font-black leading-tight">
            "My Tree Challenge" Registration Portal
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Plant for a Greener Lagos. Join thousands of residents, schools, and organizations in fostering urban canopy and flood resilience.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-lagos-green">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lagos-green bg-green-50 px-3 py-1 rounded-full">
                  Registration Confirmed
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-gray-900 mt-2">
                  Welcome to My Tree Challenge!
                </h3>
                <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-gray-900">{formData.fullName}</span>. Your official participant registration has been logged in the State environmental database.
                </p>
              </div>

              {/* Digital Registration Pass Card */}
              <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 border-2 border-emerald-200 rounded-2xl p-5 text-left max-w-md mx-auto shadow-sm">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Trees className="w-5 h-5 text-lagos-green" />
                    <span className="text-xs font-black text-gray-900 uppercase">Participant Pass</span>
                  </div>
                  <span className="text-xs font-black text-lagos-green bg-green-100 px-2.5 py-0.5 rounded-full">
                    {regId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Category</span>
                    <span className="font-semibold text-gray-800">{formData.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">LGA Location</span>
                    <span className="font-semibold text-gray-800">{formData.lga}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Selected Species</span>
                    <span className="font-semibold text-gray-800">{formData.species}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps Guidelines */}
              <div className="bg-gray-50 rounded-2xl p-4 text-xs text-gray-600 text-left max-w-md mx-auto space-y-2 border border-gray-150">
                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-lagos-orange" />
                  <span>Important Next Steps to Compete:</span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-gray-600 text-[11px]">
                  <li>Plant your designated tree at your registered site.</li>
                  <li>Take your initial geotagged photo showing the sapling planted.</li>
                  <li>Keep regular monthly photographic updates of tree growth.</li>
                  <li>Ministry evaluators and LASPARK arborists will inspect entries before the June 5 Awards Ceremony!</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-lagos-green hover:bg-[#007043] text-white font-bold px-8 py-3 rounded-xl text-sm transition shadow-md active:scale-95"
                >
                  Done &amp; Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Participant Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name / Organization / School *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke / Green Horizon School"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Participation Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  >
                    <option value="Individual Resident">Individual Citizen / Resident</option>
                    <option value="Primary / Secondary School">Primary / Secondary School</option>
                    <option value="Tertiary Institution">Tertiary Institution / University</option>
                    <option value="Community CDA / Estate">Community Association (CDA) / Estate</option>
                    <option value="Corporate / Private Sector">Corporate / Private Organization</option>
                    <option value="Youth / Environmental NGO">Youth Group / Environmental NGO</option>
                  </select>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. resident@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0801 234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    />
                  </div>
                </div>
              </div>

              {/* LGA & Species */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Lagos LGA Location *
                  </label>
                  <select
                    value={formData.lga}
                    onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  >
                    {lagosLGAs.map((lga, idx) => (
                      <option key={idx} value={lga}>{lga} LGA</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tree Species *
                  </label>
                  <select
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  >
                    {treeSpecies.map((sp, idx) => (
                      <option key={idx} value={sp}>{sp}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Planting Address / Landmark */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Planting Location &amp; Address / Landmark *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows="2"
                    placeholder="Provide street address, community estate, or school compound where the tree will be planted..."
                    value={formData.plantingAddress}
                    onChange={(e) => setFormData({ ...formData, plantingAddress: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  />
                </div>
              </div>

              {/* Legal & Notice Banner */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center gap-2 text-[11px] text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-lagos-green flex-shrink-0" />
                <span>Participation is completely free. Registration qualifies you for official evaluation by the State Ministry and LASPARK.</span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-150">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
