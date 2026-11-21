import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Mail, GraduationCap, Building2, Shield, ArrowRight,
  History, Users, Phone, MapPin, Search, Calendar, ChevronRight
} from 'lucide-react';
import leadershipData from '../data/leadership.json';

export default function LeadershipPage() {
  const [activeTab, setActiveTab] = useState('executives');
  const [officialsSearch, setOfficialsSearch] = useState('');
  const [commSearch, setCommSearch] = useState('');
  const [psSearch, setPsSearch] = useState('');

  const executives = leadershipData.executives || [];
  const pastCommissioners = leadershipData.pastCommissioners || [];
  const pastPermanentSecretaries = leadershipData.pastPermanentSecretaries || [];
  const keyOfficials = leadershipData.keyOfficials || [];

  const filteredOfficials = keyOfficials.filter(o => 
    o.name.toLowerCase().includes(officialsSearch.toLowerCase()) ||
    o.designation.toLowerCase().includes(officialsSearch.toLowerCase()) ||
    o.office.toLowerCase().includes(officialsSearch.toLowerCase())
  );

  const filteredPastComm = pastCommissioners.filter(c =>
    c.name.toLowerCase().includes(commSearch.toLowerCase()) ||
    c.period.toLowerCase().includes(commSearch.toLowerCase())
  );

  const filteredPastPs = pastPermanentSecretaries.filter(p =>
    p.name.toLowerCase().includes(psSearch.toLowerCase()) ||
    p.period.toLowerCase().includes(psSearch.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <Link to="/about" className="hover:text-lagos-green transition font-medium">About Us</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Leadership & Management</span>
        </nav>

        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-lagos-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Governance</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-950">
            Ministry Leadership & Principal Officers
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Dedicated leadership guiding Lagos State's environmental protection, drainage infrastructure, and water resources sustainability.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('executives')}
              className={`px-5 py-3 font-heading font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'executives'
                  ? 'border-lagos-green text-lagos-green'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Executive Leadership</span>
            </button>
            <button
              onClick={() => setActiveTab('officials')}
              className={`px-5 py-3 font-heading font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'officials'
                  ? 'border-lagos-green text-lagos-green'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Key Ministry Officials ({keyOfficials.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('past-commissioners')}
              className={`px-5 py-3 font-heading font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'past-commissioners'
                  ? 'border-lagos-green text-lagos-green'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Past Commissioners ({pastCommissioners.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('past-ps')}
              className={`px-5 py-3 font-heading font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'past-ps'
                  ? 'border-lagos-green text-lagos-green'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Past Permanent Secretaries ({pastPermanentSecretaries.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: EXECUTIVE LEADERSHIP */}
        {activeTab === 'executives' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {executives.map((leader) => (
                <div 
                  key={leader.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Photo & Header */}
                    <div className="relative bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-center justify-center p-6 bg-gray-100">
                      <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-gray-200 flex-shrink-0">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = leader.fallbackImage || '/placeholder-leader.jpg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-lagos-green bg-green-50 px-2.5 py-1 rounded-md">
                          {leader.department}
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-950 mt-2">
                          {leader.name}
                        </h2>
                        <div className="text-sm font-semibold text-lagos-orange mt-0.5">
                          {leader.role}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        {leader.bio}
                      </p>

                      {leader.education && (
                        <div className="flex items-start gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                          <GraduationCap className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                          <span>{leader.education}</span>
                        </div>
                      )}

                      {leader.name.toLowerCase().includes('wahab') && (
                        <div className="pt-3">
                          <Link 
                            to="/honourable-commissioner"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-lagos-green hover:bg-[#007043] px-4 py-2 rounded-xl transition shadow-xs"
                          >
                            <span>View Full Profile &amp; Detailed Biography</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Footer */}
                  <div className="bg-gray-50 px-6 sm:px-8 py-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                    <a 
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-1.5 font-semibold text-lagos-green hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{leader.email}</span>
                    </a>
                    <span className="text-gray-400">Block 16, Alausa</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Permanent Secretary Mandate Overview */}
            <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Administrative Structure</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold">
                  Twin-Pillar Administrative Structure
                </h3>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  The Lagos State Ministry of the Environment and Water Resources operates through two specialized administrative arms: the <strong>Office of Environmental Services (OES)</strong> handling pollution control, sanitation, and waste governance; and the <strong>Office of Drainage Services & Water Resources (ODS&WR)</strong> managing stormwater infrastructure, canal channelization, and water resource regulation.
                </p>
              </div>
              <Link 
                to="/departments" 
                className="bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-3.5 rounded-2xl font-bold text-sm transition shadow-md flex items-center gap-2 flex-shrink-0"
              >
                <span>View All Departments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>
        )}

        {/* TAB 2: KEY MINISTRY OFFICIALS */}
        {activeTab === 'officials' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900">
                  Key Ministry Officials Directory
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Official directory of commissioners, special advisers, permanent secretaries, and directorate heads.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search officials by name or designation..."
                  value={officialsSearch}
                  onChange={(e) => setOfficialsSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                    <th className="py-3 px-4 w-12 text-center">S/N</th>
                    <th className="py-3 px-4">Official Name</th>
                    <th className="py-3 px-4">Designation</th>
                    <th className="py-3 px-4">Office Location</th>
                    <th className="py-3 px-4">Phone Contact</th>
                    <th className="py-3 px-4">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOfficials.map((off) => (
                    <tr key={off.sn} className="hover:bg-gray-50 transition">
                      <td className="py-3.5 px-4 text-center font-bold text-gray-500">{off.sn}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{off.name}</td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium">{off.designation}</td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span>{off.office}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium">
                        {off.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-lagos-green flex-shrink-0" />
                            <span>{off.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {off.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                            <span>{off.email}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredOfficials.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500">
                        No officials found matching "{officialsSearch}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PAST COMMISSIONERS */}
        {activeTab === 'past-commissioners' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900">
                  Roll of Past Honourable Commissioners
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Distinguished public servants who have led the Ministry from 1979 to date.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search past commissioners..."
                  value={commSearch}
                  onChange={(e) => setCommSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-50 text-lagos-darkGreen font-semibold border-b border-emerald-100">
                    <th className="py-3 px-4 w-16 text-center">S/N</th>
                    <th className="py-3 px-6">Name of Commissioner</th>
                    <th className="py-3 px-6">Tenure / Period</th>
                    <th className="py-3 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPastComm.map((comm) => (
                    <tr key={comm.sn} className="hover:bg-gray-50 transition">
                      <td className="py-3.5 px-4 text-center font-bold text-gray-500">{comm.sn}</td>
                      <td className="py-3.5 px-6 font-bold text-gray-900">{comm.name}</td>
                      <td className="py-3.5 px-6 text-gray-700 font-semibold">
                        <div className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md text-xs font-mono">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span>{comm.period}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Past Commissioner
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredPastComm.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No commissioner found matching "{commSearch}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PAST PERMANENT SECRETARIES */}
        {activeTab === 'past-ps' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900">
                  Roll of Past Permanent Secretaries
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Administrative heads and career civil servants who steered the Ministry from 1979 to 2022.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search past permanent secretaries..."
                  value={psSearch}
                  onChange={(e) => setPsSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-50 text-lagos-darkGreen font-semibold border-b border-emerald-100">
                    <th className="py-3 px-4 w-16 text-center">S/N</th>
                    <th className="py-3 px-6">Name of Permanent Secretary</th>
                    <th className="py-3 px-6">Tenure / Period</th>
                    <th className="py-3 px-6 text-right">Cadre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPastPs.map((ps) => (
                    <tr key={ps.sn} className="hover:bg-gray-50 transition">
                      <td className="py-3.5 px-4 text-center font-bold text-gray-500">{ps.sn}</td>
                      <td className="py-3.5 px-6 font-bold text-gray-900">{ps.name}</td>
                      <td className="py-3.5 px-6 text-gray-700 font-semibold">
                        <div className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md text-xs font-mono">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span>{ps.period}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          Permanent Secretary
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredPastPs.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No permanent secretary found matching "{psSearch}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
