import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Mail, GraduationCap, Building2, Shield, ArrowRight } from 'lucide-react';
import leadershipData from '../data/leadership.json';

export default function LeadershipPage() {
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

        {/* Leadership Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {leadershipData.map((leader) => (
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
                        e.target.src = leader.fallbackImage;
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
          <div className="space-y-3 max-w-2xl">
            <h3 className="font-heading text-2xl font-black">Want to connect with a Directorate or Parastatal?</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Explore our full directory of 7 operational departments, 8 specialized advisory units, and 8 regulatory parastatals.
            </p>
          </div>
          <Link 
            to="/departments" 
            className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-[#e55e00] text-white px-6 py-3 rounded-xl font-bold transition shadow-md whitespace-nowrap"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
