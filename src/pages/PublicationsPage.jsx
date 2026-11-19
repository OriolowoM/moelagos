import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Download, Search, Filter, 
  Calendar, FileCheck, ArrowRight, ShieldCheck 
} from 'lucide-react';
import publicationsData from '../data/publications.json';

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'EIA Guidelines', 'Climate Policy', 'Regulations & Laws', 'Drainage Reports', 'Policy Directives', 'Executive Orders', 'Ministry Periodicals', 'Urban Greening'];

  const filteredPublications = publicationsData.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Publications & Resources</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">Official Repository</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-950">
            Publications, EIA Guidelines & Gazette
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Access statutory environmental manuals, Climate Action Roadmaps, Executive Orders, and downloadable regulatory documentation.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search publications by title, keyword, or law..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
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
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <div 
                key={pub.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex-shrink-0">
                    <FileText className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-green-50 text-lagos-green text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                        {pub.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(pub.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">• {pub.size}</span>
                    </div>

                    <h2 className="font-heading font-extrabold text-lg text-gray-950 group-hover:text-lagos-green transition leading-snug">
                      {pub.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                      {pub.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 sm:self-center">
                  <a 
                    href={pub.downloadUrl}
                    download
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-lagos-green hover:bg-[#007043] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF ({pub.size})</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-150">
              <FileCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="font-bold text-gray-800">No publications matched your search criteria</div>
              <p className="text-xs text-gray-500 mt-1">Try searching for "EIA", "Climate", or "Sanitation Law".</p>
            </div>
          )}
        </div>

        {/* EIA Notice Box */}
        <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Statutory EIA Compliance</span>
            </div>
            <h3 className="font-heading text-2xl font-black">Applying for Environmental Impact Assessment (EIA) Clearance?</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              All infrastructure, commercial, and reclamation developers in Lagos State must obtain statutory EIA approval prior to site groundbreaking.
            </p>
          </div>
          <Link 
            to="/departments" 
            className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-[#e55e00] text-white px-6 py-3 rounded-xl font-bold transition shadow-md whitespace-nowrap"
          >
            <span>Contact EIA Directorate</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
