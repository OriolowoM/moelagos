import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, MapPin, CheckCircle, Clock, 
  Filter, Layers, ArrowRight, ExternalLink 
} from 'lucide-react';
import projectsData from '../data/projects.json';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'Stormwater Drainage', 'Urban Greening', 'Waste Management', 'Sanitation & Hygiene', 'Environmental Protection'];
  const statuses = ['All', 'Ongoing', 'Completed'];

  const filteredProjects = projectsData.filter(proj => {
    const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    return matchesCat && matchesStatus;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Projects & Infrastructure</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">THEMES+ Infrastructure Tracker</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-950">
            Environmental & Drainage Projects
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Tracking primary canal dredging, stormwater defenses, waste recovery facilities, and urban greening projects delivering a cleaner, flood-free Lagos.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider mr-2 hidden lg:inline">Sector:</span>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-lagos-green text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Selector */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-bold text-gray-500">Status:</span>
              <div className="flex items-center p-1 bg-gray-100 rounded-xl text-xs font-bold">
                {statuses.map((stat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStatus(stat)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      selectedStatus === stat
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {stat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj) => {
            const isCompleted = proj.status === 'Completed';
            return (
              <div 
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Status Tag */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                        {proj.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ${
                        isCompleted 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-lagos-orange text-white'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>{proj.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                      <MapPin className="w-4 h-4 text-lagos-green flex-shrink-0" />
                      <span>{proj.location}</span>
                    </div>

                    <h2 className="font-heading font-extrabold text-lg text-gray-950 group-hover:text-lagos-green transition leading-snug">
                      {proj.title}
                    </h2>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Completion Bar */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-500">Project Delivery Progress</span>
                        <span className={isCompleted ? 'text-emerald-600' : 'text-lagos-orange'}>
                          {proj.completion}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-emerald-500' : 'bg-lagos-orange'
                          }`}
                          style={{ width: `${proj.completion}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Footer */}
                <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 text-xs text-gray-600">
                  <span className="font-bold text-gray-800">Target Objective: </span>
                  <span>{proj.target}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-3xl p-8 border border-gray-150 text-center space-y-4 max-w-3xl mx-auto shadow-sm">
          <h3 className="font-heading font-bold text-xl text-gray-900">
            Witnessing an ongoing drainage or environmental construction issue?
          </h3>
          <p className="text-sm text-gray-600">
            Citizens can directly report canal blockages, contractor delays, or infrastructure concerns to our Complaints & Citizen Feedback Desk.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-lagos-green hover:bg-[#007043] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <span>Lodge a Report at Complaints Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
