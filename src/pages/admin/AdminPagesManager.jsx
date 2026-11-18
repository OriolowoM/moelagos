import React, { useState } from 'react';
import { FileText, Search, Edit3, Eye, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import initialPages from '../../data/pages.json';

export default function AdminPagesManager({ userRole }) {
  const [pagesList, setPagesList] = useState(initialPages);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPage, setEditingPage] = useState(null);
  const [previewPage, setPreviewPage] = useState(null);

  // Form State
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editContent, setEditContent] = useState('');

  const itemsPerPage = 12;

  const filteredPages = pagesList.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenEdit = (page) => {
    setEditingPage(page);
    setEditTitle(page.title);
    setEditSlug(page.slug);
    setEditContent(page.content || '');
  };

  const handleSavePage = (e) => {
    e.preventDefault();
    setPagesList(prev => prev.map(p => {
      if (p.id === editingPage.id) {
        return {
          ...p,
          title: editTitle,
          slug: editSlug,
          content: editContent
        };
      }
      return p;
    }));
    setEditingPage(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            Institutional Pages Manager
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage 81 migrated institutional pages covering mandates, organograms, and departments.
          </p>
        </div>

        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-blue-100">
          81 Published Pages
        </span>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search pages by title or slug (e.g. 'honourable-commissioner', 'about', 'structure')..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 font-medium">
          <span>Found {filteredPages.length} institutional pages</span>
          <span>Page {currentPage} of {totalPages || 1}</span>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4 sm:px-6">Page Title</th>
                <th className="py-3.5 px-4">Permanent Slug</th>
                <th className="py-3.5 px-4">WP ID</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-4 px-4 sm:px-6 font-heading font-bold text-gray-950 max-w-xs truncate">
                    {page.title}
                  </td>

                  <td className="py-4 px-4 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                    /{page.slug}
                  </td>

                  <td className="py-4 px-4 text-gray-400 font-mono text-[11px]">
                    #{page.id}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Published</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewPage(page)}
                        className="p-1.5 text-gray-400 hover:text-lagos-green transition rounded-lg hover:bg-green-50"
                        title="Preview Content"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(page)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
                        title="Edit Page"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPages.length)} of {filteredPages.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-bold text-gray-700">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 flex-shrink-0">
              <h2 className="font-heading font-black text-lg text-gray-950">
                Edit Institutional Page (#{editingPage.id})
              </h2>
              <button onClick={() => setEditingPage(null)} className="p-1 text-gray-400 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePage} className="p-2 overflow-y-auto space-y-4 flex-grow text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Page Title
                </label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  URL Slug
                </label>
                <input 
                  type="text" 
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Page Content
                </label>
                <textarea 
                  rows="8"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                />
              </div>

              <div className="pt-3 border-t border-gray-150 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-lagos-green text-white hover:bg-[#007043] rounded-xl font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewPage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">
                Page Preview
              </span>
              <button onClick={() => setPreviewPage(null)} className="p-1 text-gray-400 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-heading font-black text-xl text-gray-950">
              {previewPage.title}
            </h2>

            <div 
              className="prose prose-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: previewPage.content || '<p>No content provided for this page.</p>' }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
