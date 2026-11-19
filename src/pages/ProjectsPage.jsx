import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, MapPin, CheckCircle, Clock, 
  Filter, Layers, ArrowRight, ExternalLink, Search,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import projectsData from '../data/projects.json';

const CATEGORY_IMAGES = {
  'Stormwater Drainage': 'https://moelagos.gov.ng/wp-content/uploads/2024/07/canal-clearing.jpg',
  'Urban Greening': 'https://moelagos.gov.ng/wp-content/uploads/2024/07/tree-planting.jpg',
  'Waste Management': 'https://moelagos.gov.ng/wp-content/uploads/2024/07/mrf-agbowa.jpg',
  'Sanitation & Hygiene': 'https://moelagos.gov.ng/wp-content/uploads/2024/07/sanitation-hub.jpg',
  'Environmental Protection': 'https://moelagos.gov.ng/wp-content/uploads/2024/07/air-quality.jpg'
};

const DEFAULT_PROJECT_IMG = 'https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = ['All', 'Stormwater Drainage', 'Urban Greening', 'Waste Management', 'Sanitation & Hygiene', 'Environmental Protection'];
  const statuses = ['All', 'Ongoing', 'Completed'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter(proj => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term || 
        proj.title.toLowerCase().includes(term) ||
        (proj.location && proj.location.toLowerCase().includes(term)) ||
        (proj.target && proj.target.toLowerCase().includes(term)) ||
        (proj.description && proj.description.toLowerCase().includes(term));
      const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  // Reset page when filter changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleStatusChange = (stat) => {
    setSelectedStatus(stat);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            Environmental & Drainage Projects ({projectsData.length})
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Tracking 91 primary stormwater drainage channels, urban beautification corridors, and sanitation infrastructure delivering a cleaner, flood-free Lagos.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by canal name, community, target or LGA (e.g. Duro Simi Eti, Ikate, Lekki, Kosofe)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider mr-2 hidden lg:inline">Sector:</span>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategoryChange(cat)}
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
                    onClick={() => handleStatusChange(stat)}
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

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-2">
          <span>Showing {paginatedProjects.length} of {filteredProjects.length} matching infrastructure projects</span>
          {totalPages > 1 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedProjects.map((proj) => {
            const isCompleted = proj.status === 'Completed';
            const imgSource = proj.image || CATEGORY_IMAGES[proj.category] || DEFAULT_PROJECT_IMG;

            return (
              <div 
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Status Tag */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <img 
                      src={imgSource} 
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_PROJECT_IMG;
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
                      <span className="truncate">{proj.location}</span>
                    </div>

                    <h2 className="font-heading font-extrabold text-lg text-gray-950 group-hover:text-lagos-green transition leading-snug">
                      {proj.title}
                    </h2>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {proj.description || proj.target}
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
                {proj.target && (
                  <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 text-xs text-gray-600">
                    <span className="font-bold text-gray-800">Target Objective: </span>
                    <span className="line-clamp-2">{proj.target}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs transition ${
                        currentPage === p
                          ? 'bg-lagos-green text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

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
