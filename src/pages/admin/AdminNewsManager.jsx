import React, { useState } from 'react';
import { 
  Newspaper, Plus, Search, Edit3, Trash2, 
  CheckCircle, XCircle, Eye, Calendar, Tag, 
  ChevronLeft, ChevronRight, X, ExternalLink, Megaphone 
} from 'lucide-react';

export default function AdminNewsManager({ posts, onUpdatePosts, userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Editor Modal State
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('News');
  const [formAuthor, setFormAuthor] = useState('Directorate of Public Affairs');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formImage, setFormImage] = useState('/uploads/2025/02/DSC_0126-scaled.jpg');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('Lagos, Environment, Sanitation');
  const [formStatus, setFormStatus] = useState('published');
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDesc, setFormSeoDesc] = useState('');

  const categories = ['All', 'News', 'Press Releases', 'Environment', 'Event', 'Reports'];

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || (p.categories && p.categories.includes(selectedCategory));
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openCreateModal = () => {
    setEditingPost(null);
    setIsCreating(true);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('News');
    setFormAuthor('Directorate of Public Affairs');
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormImage('/uploads/2025/02/DSC_0126-scaled.jpg');
    setFormExcerpt('');
    setFormContent('');
    setFormTags('Lagos, Environment, Sanitation');
    setFormStatus('published');
    setFormSeoTitle('');
    setFormSeoDesc('');
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.categories && post.categories[0] ? post.categories[0] : 'News');
    setFormAuthor(post.author || 'Directorate of Public Affairs');
    setFormDate(post.date ? post.date.slice(0, 10) : new Date().toISOString().slice(0, 10));
    setFormImage(post.featuredImage || '/uploads/2025/02/DSC_0126-scaled.jpg');
    setFormExcerpt(post.excerpt || '');
    setFormContent(post.content || '');
    setFormTags(post.tags ? post.tags.join(', ') : '');
    setFormStatus(post.status || 'published');
    setFormSeoTitle(post.title);
    setFormSeoDesc(post.excerpt || '');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const tagArray = formTags.split(',').map(t => t.trim()).filter(Boolean);
    const slug = formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (isCreating) {
      const newPost = {
        id: Date.now(),
        wpId: String(Date.now()),
        title: formTitle,
        slug: slug,
        categories: [formCategory],
        author: formAuthor,
        date: formDate + ' 12:00:00',
        year: new Date(formDate).getFullYear(),
        featuredImage: formImage,
        excerpt: formExcerpt || formContent.replace(/<[^>]+>/g, '').slice(0, 180) + '...',
        content: formContent,
        tags: tagArray,
        status: formStatus,
        contentType: formCategory === 'Press Releases' ? 'press_release' : 'news'
      };

      const updated = [newPost, ...posts];
      if (onUpdatePosts) onUpdatePosts(updated);
    } else if (editingPost) {
      const updated = posts.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            title: formTitle,
            slug: slug,
            categories: [formCategory],
            author: formAuthor,
            date: formDate + ' ' + (p.date ? p.date.slice(11) : '12:00:00'),
            featuredImage: formImage,
            excerpt: formExcerpt,
            content: formContent,
            tags: tagArray,
            status: formStatus,
            contentType: formCategory === 'Press Releases' ? 'press_release' : 'news'
          };
        }
        return p;
      });
      if (onUpdatePosts) onUpdatePosts(updated);
    }

    setIsCreating(false);
    setEditingPost(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publication from the database?')) {
      const updated = posts.filter(p => p.id !== id);
      if (onUpdatePosts) onUpdatePosts(updated);
    }
  };

  const handleTogglePublish = (id) => {
    const updated = posts.map(p => {
      if (p.id === id) {
        const current = p.status || 'published';
        return { ...p, status: current === 'published' ? 'draft' : 'published' };
      }
      return p;
    });
    if (onUpdatePosts) onUpdatePosts(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            News & Publications Manager
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage 475 historical & current published releases, articles, and public notices.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Publication</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by article title, keywords, or date..."
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
          <span>Found {filteredPosts.length} publications</span>
          <span>Page {currentPage} of {totalPages || 1}</span>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4 sm:px-6">Title & Summary</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedPosts.map((post) => {
                const isPublished = !post.status || post.status === 'published' || post.status === 'publish';
                return (
                  <tr key={post.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-4 px-4 sm:px-6 max-w-md">
                      <div className="font-heading font-bold text-gray-950 line-clamp-1">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                        slug: /{post.slug}
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-green-50 text-lagos-green text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                        {post.categories && post.categories[0] ? post.categories[0] : 'News'}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-gray-600">
                      {post.author || 'Directorate of Public Affairs'}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-gray-500">
                      {post.date ? post.date.slice(0, 10) : '2026-10-22'}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(post.id)}
                        className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full transition ${
                          isPublished
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {isPublished ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-amber-600" />}
                        <span>{isPublished ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewPost(post)}
                          className="p-1.5 text-gray-400 hover:text-lagos-green transition rounded-lg hover:bg-green-50"
                          title="Preview Article"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
                          title="Edit Article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length}
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

      {/* Create / Edit Modal */}
      {(isCreating || editingPost) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            <div className="bg-[#004d2e] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
              <h2 className="font-heading font-extrabold text-base">
                {isCreating ? 'Create New Official Publication' : 'Edit Publication Details'}
              </h2>
              <button 
                onClick={() => { setIsCreating(false); setEditingPost(null); }}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-grow text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Publication Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. LAGOS EXPANDS DRAINAGE DESILTING OPERATIONS IN KOSOFE"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  >
                    <option value="News">News</option>
                    <option value="Press Releases">Press Releases</option>
                    <option value="Environment">Environment</option>
                    <option value="Event">Event</option>
                    <option value="Reports">Reports</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Publication Date
                  </label>
                  <input 
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Unpublished)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Featured Image URL
                </label>
                <input 
                  type="text" 
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="/uploads/2025/02/DSC_0126-scaled.jpg"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Editorial Summary / Excerpt
                </label>
                <textarea 
                  rows="2"
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Short briefing summary displayed on cards..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Article Body (Rich HTML / Text)
                </label>
                <textarea 
                  rows="6"
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="<p>Full official text of the press release or news story...</p>"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tags (Comma separated)
                </label>
                <input 
                  type="text" 
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Lagos, Environment, Sanitation, LAWMA"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingPost(null); }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold transition shadow-sm"
                >
                  Save Publication
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-lagos-green">
                Publication Preview
              </span>
              <button onClick={() => setPreviewPost(null)} className="p-1 text-gray-400 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-heading font-black text-xl text-gray-950">
              {previewPost.title}
            </h2>

            {previewPost.featuredImage && (
              <img 
                src={previewPost.featuredImage} 
                alt="" 
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}

            <div 
              className="prose prose-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: previewPost.content || `<p>${previewPost.excerpt}</p>` }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
