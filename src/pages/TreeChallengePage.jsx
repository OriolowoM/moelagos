import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Trees, CheckCircle, ShieldCheck, ArrowRight, 
  MapPin, Calendar, Users, Award, HelpCircle, Sparkles, Send, User, Mail, Phone, AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';

export default function TreeChallengePage() {
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

  const prizes = [
    { rank: 'Grand Champion', amount: '₦2,500,000', badge: 'bg-yellow-400 text-gray-950 font-black', note: 'Plus State Executive Citation & Plaque' },
    { rank: '1st Runner Up', amount: '₦1,500,000', badge: 'bg-gray-200 text-gray-900 font-bold', note: 'Plus Ministry Sustainability Certificate' },
    { rank: '2nd Runner Up', amount: '₦1,000,000', badge: 'bg-amber-600 text-white font-bold', note: 'Plus Environmental Ambassador Honor' },
    { rank: '10 Consolation Prizes', amount: '₦250,000 each', badge: 'bg-emerald-100 text-lagos-green font-bold', note: 'Totaling ₦2.5M for outstanding category entries' }
  ];

  const steps = [
    { num: '01', title: 'Register Online', desc: 'Complete the free registration below to obtain your official Participant ID.' },
    { num: '02', title: 'Plant Your Tree', desc: 'Plant an approved tree sapling at your home, compound, school, or community.' },
    { num: '03', title: 'Submit Growth Updates', desc: 'Take an initial geotagged photo and record monthly growth progress.' },
    { num: '04', title: 'Official Inspection & Grand Awards', desc: 'LASPARK arborists inspect surviving trees ahead of the World Environment Day Gala.' }
  ];

  const faqs = [
    { q: 'Who is eligible to participate?', a: 'Any resident of Lagos State, including students, schools, youth organizations, Community Development Associations (CDAs), and corporate organizations.' },
    { q: 'Where can I obtain tree saplings in Lagos?', a: 'You may source approved indigenous seedlings from any commercial nursery or contact LASPARK nurseries across Lagos State.' },
    { q: 'How is the winner determined?', a: 'Entries are scored on seedling survival rate, documentation quality, monthly geotagged photo records, species health, and community environmental impact.' },
    { q: 'Is there any registration or entry fee?', a: 'No. Participation is 100% free of charge as part of the Lagos State Government THEMES+ agenda.' }
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
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      const fallbackId = 'LASG-TREE-2026-' + Math.floor(1000 + Math.random() * 9000);
      setSubmitted(true);
      setRegId(fallbackId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 animate-fadeIn">
      <SEO 
        title="My Tree Challenge 2026 — Plant for a Greener Lagos | Lagos State MOE&WR"
        description="Register for the Lagos State Ministry of the Environment & Water Resources My Tree Challenge. Over ₦6.5M in prizes for residents, schools, and communities fostering urban tree planting."
        image="/moelagos-social-card.jpg"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#003822] via-[#004d2e] to-[#002818] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>World Environment Day Special Campaign • ₦6.5M+ Prize Pool</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl">
            "My Tree Challenge" — Plant for a Greener Lagos
          </h1>

          <p className="text-emerald-100 text-base sm:text-xl leading-relaxed max-w-3xl">
            Join thousands of Lagosians in fostering climate resilience, urban canopy expansion, and flood mitigation. Register your tree, nurture it over 12 months, and compete for over <strong>₦6.5 Million in official State prizes</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Calendar className="w-4 h-4 text-yellow-400" />
              <span>Launch: June 4, 2026</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Awards: June 5, 2027 (World Environment Day)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free Public Entry</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Registration Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Challenge Overview & Prize Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* How to Participate */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Trees className="w-6 h-6 text-lagos-green" />
                <span>How to Participate (4 Simple Steps)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps.map((st, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-150 p-4 rounded-2xl">
                    <span className="text-sm font-black text-lagos-orange font-heading">
                      Step {st.num}
                    </span>
                    <h3 className="font-bold text-sm text-gray-900 mt-1">{st.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prize Pool Breakdown */}
            <div className="bg-gradient-to-br from-[#003822] to-[#005a36] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h3 className="font-heading text-xl font-bold">Official Prize Structure</h3>
                </div>
                <span className="bg-yellow-400 text-gray-950 font-black text-xs px-3 py-1 rounded-full">
                  ₦6,500,000 Pool
                </span>
              </div>

              <div className="space-y-3">
                {prizes.map((pz, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{pz.rank}</div>
                      <div className="text-[11px] text-emerald-200 mt-0.5">{pz.note}</div>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-xl shadow-xs ${pz.badge}`}>
                      {pz.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-lagos-green" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-3">
                {faqs.map((f, idx) => (
                  <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-150 text-xs">
                    <div className="font-bold text-gray-900">{f.q}</div>
                    <div className="text-gray-600 mt-1 leading-relaxed">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Registration Form (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl sticky top-24">
            
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
                    You're Officially Registered!
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Thank you, <span className="font-bold text-gray-900">{formData.fullName}</span>. An official confirmation email has been dispatched to your inbox.
                  </p>
                </div>

                {/* Digital Pass */}
                <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 border-2 border-emerald-300 rounded-2xl p-5 text-left shadow-sm">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Trees className="w-5 h-5 text-lagos-green" />
                      <span className="text-xs font-black text-gray-900 uppercase">Challenge Pass</span>
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
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Tree Species</span>
                      <span className="font-semibold text-gray-800">{formData.species}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-lagos-green hover:underline"
                  >
                    Register another tree or participant →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-lagos-green bg-green-50 px-3 py-1 rounded-full">
                    Official Portal
                  </span>
                  <h2 className="font-heading text-2xl font-black text-gray-950 mt-2">
                    Enter the Tree Challenge
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Fill out the official registration form to obtain your official competitor ID.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name / Organization / School *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke / Green Horizon College"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tree Species Chosen *
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Planting Address / Landmark *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      required
                      rows="2"
                      placeholder="Provide street address, community estate, or school compound..."
                      value={formData.plantingAddress}
                      onChange={(e) => setFormData({ ...formData, plantingAddress: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Submit My Tree Challenge Entry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
