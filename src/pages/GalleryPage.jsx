import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Search, Filter, X, ChevronLeft, 
  ChevronRight, ZoomIn, Calendar, Tag, ExternalLink 
} from 'lucide-react';
import galleryData from '../data/gallery.json';

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const itemsPerPage = 25;

  const categories = [
    'All',
    'Tree Planting & Greening',
    'Drainage & Canal Desilting',
    'Sanitation & Waste Management',
    'Enforcement & Compliance',
    'Events & Conferences',
    'Ministerial Activities'
  ];

  const filteredItems = galleryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.caption.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activePhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Photo & Media Gallery</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-lagos-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Archive</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-950">
            Ministry Photographic Gallery
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Documenting ministerial operations, canal dredging milestones, enforcement missions, and statewide environmental stewardship across Lagos.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search gallery photographs by activity, caption, or location..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
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
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100 font-medium">
            <span>Showing {filteredItems.length} documented media assets</span>
            <span>Page {currentPage} of {totalPages || 1} (25 items per page)</span>
          </div>
        </div>

        {/* Gallery Grid (Responsive 25 items per page) */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {paginatedItems.map((item, idx) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + idx;
              return (
                <div 
                  key={item.id}
                  onClick={() => setLightboxIndex(globalIndex)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition cursor-pointer border border-gray-150 aspect-square flex flex-col justify-end"
                >
                  <img 
                    src={item.src} 
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = item.fallbackSrc;
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-3 text-white">
                    <div className="flex justify-end">
                      <span className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        {item.category}
                      </span>
                      <h3 className="font-heading font-bold text-xs line-clamp-2 mt-0.5 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-150">
            <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <div className="font-bold text-gray-800">No media photographs match your search</div>
            <p className="text-xs text-gray-500 mt-1">Try selecting another category or clearing search terms.</p>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 text-xs font-bold">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl transition ${
                      currentPage === pageNum
                        ? 'bg-lagos-green text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Full-Screen Lightbox Modal */}
        {activePhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Lightbox Controls */}
            <div className="flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="bg-lagos-green text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-gray-400">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                  aria-label="Close Lightbox (Esc)"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Central Media Image & Nav Arrows */}
            <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
                }}
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img 
                src={activePhoto.src} 
                alt={activePhoto.title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = activePhoto.fallbackSrc;
                }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Metadata */}
            <div className="bg-black/80 rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto text-center text-white flex-shrink-0">
              <h2 className="font-heading font-extrabold text-base sm:text-lg mb-1">
                {activePhoto.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
