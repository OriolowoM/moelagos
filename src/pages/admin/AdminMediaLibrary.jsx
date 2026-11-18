import React, { useState } from 'react';
import { Image, Search, Copy, Check, ExternalLink, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import galleryData from '../../data/gallery.json';

export default function AdminMediaLibrary({ userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const itemsPerPage = 20;

  const categories = [
    'All',
    'Tree Planting & Greening',
    'Drainage & Canal Desilting',
    'Sanitation & Waste Management',
    'Enforcement & Compliance',
    'Events & Conferences',
    'Ministerial Activities'
  ];

  const filteredMedia = galleryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.src.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopyUrl = (id, url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            Administrative Media Library
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Browse 881 historical media assets stored in the local server filesystem (`/uploads/`).
          </p>
        </div>

        <span className="text-xs bg-purple-50 text-purple-700 font-bold px-3 py-1.5 rounded-xl border border-purple-100">
          881 Media Assets Indexed
        </span>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search media by title or filepath..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-lagos-green text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 font-medium">
          <span>Found {filteredMedia.length} media records</span>
          <span>Page {currentPage} of {totalPages || 1}</span>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {paginatedMedia.map((media) => (
          <div 
            key={media.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
              <img 
                src={media.src} 
                alt={media.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = media.fallbackSrc;
                }}
              />
              <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm truncate max-w-[120px]">
                {media.category}
              </span>
            </div>

            <div className="p-3 space-y-2">
              <h3 className="font-heading font-bold text-xs text-gray-900 truncate" title={media.title}>
                {media.title}
              </h3>
              
              <div className="text-[10px] text-gray-400 font-mono truncate" title={media.src}>
                {media.src}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{media.date}</span>

                <button
                  onClick={() => handleCopyUrl(media.id, media.src)}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                    copiedId === media.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Copy relative file URL"
                >
                  {copiedId === media.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span className="text-[10px]">{copiedId === media.id ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 bg-white rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between text-xs">
          <span className="text-gray-500 font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMedia.length)} of {filteredMedia.length}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 font-bold text-gray-700">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
