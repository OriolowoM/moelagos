import React, { useState, useRef } from 'react';
import { 
  Newspaper, Plus, Search, Edit3, Trash2, 
  CheckCircle, XCircle, Eye, Calendar, Tag, 
  ChevronLeft, ChevronRight, X, ExternalLink, Megaphone,
  Upload, Image as ImageIcon, Music, Video, Bold, Italic,
  Heading, Quote, List, Link as LinkIcon, RefreshCw
} from 'lucide-react';
import galleryData from '../../data/gallery.json';

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

  // Media Pickers / Add Media Modals State
  const [mediaLibraryModalOpen, setMediaLibraryModalOpen] = useState(false);
  const [mediaLibraryTarget, setMediaLibraryTarget] = useState('featured'); // 'featured' or 'body'
  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState('image'); // 'image', 'audio', 'video'

  // Add Media form fields
  const [insertImageUrl, setInsertImageUrl] = useState('');
  const [insertImageCaption, setInsertImageCaption] = useState('');
  const [insertImageAlt, setInsertImageAlt] = useState('');
  const [insertImageAlignment, setInsertImageAlignment] = useState('center');
  const [insertAudioUrl, setInsertAudioUrl] = useState('');
  const [insertAudioTitle, setInsertAudioTitle] = useState('');
  const [insertVideoUrl, setInsertVideoUrl] = useState('');

  const featuredFileInputRef = useRef(null);
  const bodyFileInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const categories = ['All', 'News', 'Press Releases', 'Environment', 'Event', 'Reports'];

  // Combine custom media and gallery data
  const customMedia = (() => {
    try {
      const stored = localStorage.getItem('moelagos_custom_media');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  })();
  const allMediaAssets = [...customMedia, ...galleryData];

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
        contentType: formCategory === 'Press Releases' ? 'press_release' : formCategory === 'Event' ? 'event' : 'news'
      };
      onUpdatePosts([newPost, ...posts]);
    } else {
      const updated = posts.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            title: formTitle,
            slug: slug,
            categories: [formCategory],
            author: formAuthor,
            date: formDate + (p.date ? p.date.slice(10) : ' 12:00:00'),
            featuredImage: formImage,
            excerpt: formExcerpt,
            content: formContent,
            tags: tagArray,
            status: formStatus
          };
        }
        return p;
      });
      onUpdatePosts(updated);
    }

    setIsCreating(false);
    setEditingPost(null);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to permanently delete this publication record?')) {
      const updated = posts.filter(p => p.id !== postId);
      onUpdatePosts(updated);
    }
  };

  const handleTogglePublish = (postId) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const nextStatus = (!p.status || p.status === 'published' || p.status === 'publish') ? 'draft' : 'published';
        return { ...p, status: nextStatus };
      }
      return p;
    });
    onUpdatePosts(updated);
  };

  // Helper to insert text at textarea cursor position
  const insertTextAtCursor = (textToInsert) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setFormContent(prev => prev + '\n\n' + textToInsert);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = formContent.substring(0, start);
    const after = formContent.substring(end);
    setFormContent(before + textToInsert + after);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 50);
  };

  // Formatting helpers
  const handleFormat = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = formContent.substring(start, end) || 'text';
    const replacement = `${prefix}${selected}${suffix}`;
    insertTextAtCursor(replacement);
  };

  // Handle uploading new image from user's device for Featured Image
  const handleFeaturedImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setFormImage(dataUrl);

      // Save to custom media library for reuse
      const newMedia = {
        id: `custom-feat-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        src: dataUrl,
        fallbackSrc: '/placeholder-news.jpg',
        category: 'Featured Uploads',
        type: 'image',
        date: new Date().toISOString().slice(0, 10),
        size: (file.size / 1024).toFixed(1) + ' KB',
        isCustom: true
      };
      try {
        const stored = localStorage.getItem('moelagos_custom_media');
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem('moelagos_custom_media', JSON.stringify([newMedia, ...list]));
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  };

  // Handle uploading in-article image from device
  const handleInArticleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setInsertImageUrl(dataUrl);
      if (!insertImageAlt) setInsertImageAlt(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  // Handle uploading in-article audio from device
  const handleInArticleAudioUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setInsertAudioUrl(dataUrl);
      if (!insertAudioTitle) setInsertAudioTitle(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  // Execute Add Media Insertion
  const handleInsertMedia = () => {
    if (activeMediaTab === 'image') {
      if (!insertImageUrl) {
        alert('Please select or upload an image first.');
        return;
      }
      let alignClass = 'w-full';
      if (insertImageAlignment === 'left') alignClass = 'float-left mr-6 mb-4 max-w-md';
      else if (insertImageAlignment === 'right') alignClass = 'float-right ml-6 mb-4 max-w-md';
      else if (insertImageAlignment === 'center') alignClass = 'mx-auto block max-w-2xl';

      const figureHtml = `\n<figure class="my-6 block clear-both ${alignClass}">
  <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
    <img src="${insertImageUrl}" alt="${insertImageAlt || 'Ministry Photograph'}" class="w-full h-auto max-h-[600px] object-cover rounded-xl" />
  </div>
  ${insertImageCaption ? `<figcaption class="mt-2.5 text-xs sm:text-sm text-gray-700 font-medium italic bg-emerald-50/90 p-3 rounded-xl border-l-4 border-lagos-green leading-relaxed text-left">${insertImageCaption}</figcaption>` : ''}
</figure>\n`;

      insertTextAtCursor(figureHtml);
      setInsertImageUrl('');
      setInsertImageCaption('');
      setInsertImageAlt('');
    } else if (activeMediaTab === 'audio') {
      if (!insertAudioUrl) {
        alert('Please select or upload an audio file first.');
        return;
      }
      const audioHtml = `\n<div class="my-6 p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200">
  <div class="flex items-center gap-2 text-xs font-bold text-lagos-darkGreen uppercase tracking-wider mb-2">
    <span>🔊 Official Audio Broadcast:</span>
    <span class="text-gray-900 font-bold">${insertAudioTitle || 'Ministerial Press Audio Statement'}</span>
  </div>
  <audio controls class="w-full rounded-lg">
    <source src="${insertAudioUrl}" type="audio/mpeg">
    Your browser does not support audio playback.
  </audio>
</div>\n`;

      insertTextAtCursor(audioHtml);
      setInsertAudioUrl('');
      setInsertAudioTitle('');
    } else if (activeMediaTab === 'video') {
      if (!insertVideoUrl) {
        alert('Please enter a YouTube or video URL.');
        return;
      }
      let embedUrl = insertVideoUrl;
      const ytMatch = insertVideoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (ytMatch) {
        embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
      }
      const videoHtml = `\n<div class="my-6 relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-black">
  <iframe src="${embedUrl}" class="absolute top-0 left-0 w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>\n`;

      insertTextAtCursor(videoHtml);
      setInsertVideoUrl('');
    }

    setAddMediaModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Action Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            News & Publications Manager
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Create, edit, publish, or draft official press statements and news articles across the portal.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-lagos-green hover:bg-[#007043] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search news records by title or headline..."
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
                      <div className="font-semibold text-gray-900 text-xs">
                        {post.date ? post.date.slice(0, 10) : '2026-10-22'}
                      </div>
                      {post.date && post.date.length > 10 && (
                        <div className="text-[10px] text-gray-400 font-mono">
                          {post.date.slice(11, 16)}
                        </div>
                      )}
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

      {/* Article Create / Edit Modal */}
      {(isCreating || editingPost) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
            
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

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-grow text-xs">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green font-medium"
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

              {/* 1. FEATURED IMAGE UPLOAD & SELECTION (WordPress Style) */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-lagos-green" />
                    <span>Featured Image</span>
                  </label>
                  <span className="text-[11px] text-gray-500">Displayed on article header and social cards</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Thumbnail Preview */}
                  <div className="w-32 h-20 rounded-xl bg-gray-200 border border-gray-300 overflow-hidden flex-shrink-0 flex items-center justify-center relative group">
                    <img 
                      src={formImage} 
                      alt="Featured Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-news.jpg';
                      }}
                    />
                  </div>

                  {/* Upload & Choose Actions */}
                  <div className="flex-grow space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => featuredFileInputRef.current && featuredFileInputRef.current.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold text-xs transition shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Image</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMediaLibraryTarget('featured');
                          setMediaLibraryModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-xl font-bold text-xs transition shadow-2xs"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-lagos-green" />
                        <span>Choose from Media Library</span>
                      </button>

                      {formImage && (
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          className="px-2.5 py-2 text-gray-400 hover:text-red-600 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      ref={featuredFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFeaturedImageUpload(e.target.files[0])}
                      className="hidden"
                    />

                    <input 
                      type="text" 
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="/uploads/... or paste full image URL"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-mono text-gray-600 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Editorial Summary / Excerpt
                </label>
                <textarea 
                  rows="2"
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Short briefing summary displayed on cards and search results..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              {/* 2. ARTICLE BODY EDITOR WITH WORDPRESS-STYLE "ADD MEDIA" TOOLBAR */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-gray-700 uppercase tracking-wider">
                    Full Article Body (Rich Content) <span className="text-red-500">*</span>
                  </label>

                  {/* WordPress "Add Media" Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMediaTab('image');
                      setAddMediaModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Media</span>
                  </button>
                </div>

                {/* Rich Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 rounded-t-xl border border-gray-300 border-b-0 text-gray-700">
                  <button
                    type="button"
                    onClick={() => handleFormat('<b>', '</b>')}
                    className="p-1.5 rounded hover:bg-gray-200 font-bold"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('<em>', '</em>')}
                    className="p-1.5 rounded hover:bg-gray-200 italic"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('<h2>', '</h2>')}
                    className="px-2 py-1 rounded hover:bg-gray-200 font-bold text-[11px]"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('<h3>', '</h3>')}
                    className="px-2 py-1 rounded hover:bg-gray-200 font-bold text-[11px]"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('<blockquote>', '</blockquote>')}
                    className="p-1.5 rounded hover:bg-gray-200"
                    title="Quote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('<ul>\n  <li>', '</li>\n</ul>')}
                    className="p-1.5 rounded hover:bg-gray-200"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('<a href="https://" target="_blank" rel="noopener">', '</a>')}
                    className="p-1.5 rounded hover:bg-gray-200"
                    title="Insert Link"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-px h-4 bg-gray-300 mx-1"></div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMediaTab('image');
                      setAddMediaModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-gray-50 border border-gray-300 font-semibold text-[11px] text-gray-800"
                    title="Insert Image"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-lagos-green" />
                    <span>Insert Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMediaTab('audio');
                      setAddMediaModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-gray-50 border border-gray-300 font-semibold text-[11px] text-gray-800"
                    title="Insert Audio Broadcast"
                  >
                    <Music className="w-3.5 h-3.5 text-blue-600" />
                    <span>Insert Audio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMediaTab('video');
                      setAddMediaModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-gray-50 border border-gray-300 font-semibold text-[11px] text-gray-800"
                    title="Insert YouTube Video Embed"
                  >
                    <Video className="w-3.5 h-3.5 text-red-600" />
                    <span>Insert Video</span>
                  </button>
                </div>

                <textarea 
                  ref={textareaRef}
                  rows="9"
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="<p>Write your article paragraphs here...</p>"
                  className="w-full px-4 py-3 rounded-b-xl border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Author / Directorate
                  </label>
                  <input 
                    type="text" 
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Directorate of Public Affairs"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs"
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
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingPost(null); }}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-lagos-green hover:bg-[#007043] text-white font-bold uppercase tracking-wider transition shadow-md"
                >
                  {isCreating ? 'Publish to Live Archive' : 'Save Changes'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* WORDPRESS "ADD MEDIA" MODAL (INSERT IMAGES, AUDIO, OR VIDEO INTO BODY) */}
      {addMediaModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-scaleUp">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-8">
            <div className="bg-[#004d2e] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-300" />
                <h3 className="font-heading font-extrabold text-sm sm:text-base">
                  Add Media to Article Body
                </h3>
              </div>
              <button 
                onClick={() => setAddMediaModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Tabs */}
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-6 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveMediaTab('image')}
                className={`px-4 py-2 font-bold text-xs rounded-t-xl border-b-2 transition flex items-center gap-1.5 ${
                  activeMediaTab === 'image'
                    ? 'border-lagos-green text-lagos-green bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Insert Photograph</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('audio')}
                className={`px-4 py-2 font-bold text-xs rounded-t-xl border-b-2 transition flex items-center gap-1.5 ${
                  activeMediaTab === 'audio'
                    ? 'border-lagos-green text-lagos-green bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Insert Audio File</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`px-4 py-2 font-bold text-xs rounded-t-xl border-b-2 transition flex items-center gap-1.5 ${
                  activeMediaTab === 'video'
                    ? 'border-lagos-green text-lagos-green bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Insert Video Embed</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 space-y-4 text-xs">
              
              {/* TAB 1: INSERT IMAGE */}
              {activeMediaTab === 'image' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Image Source (Upload or choose)
                    </label>

                    <div className="flex items-center gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => bodyFileInputRef.current && bodyFileInputRef.current.click()}
                        className="px-3 py-1.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Computer</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMediaLibraryTarget('body');
                          setMediaLibraryModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-lagos-green" />
                        <span>Select from Media Library</span>
                      </button>

                      <input
                        ref={bodyFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInArticleImageUpload(e.target.files[0])}
                        className="hidden"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Paste image URL (/uploads/... or https://...)"
                      value={insertImageUrl}
                      onChange={(e) => setInsertImageUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                    />
                  </div>

                  {insertImageUrl && (
                    <div className="h-28 w-44 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mx-auto">
                      <img src={insertImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Caption Description (Displayed beneath photograph)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. L-R: Commissioner Tokunbo Wahab inspecting the canal dredging in Kosofe..."
                      value={insertImageCaption}
                      onChange={(e) => setInsertImageCaption(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Alternative Text (Alt)
                      </label>
                      <input
                        type="text"
                        placeholder="Image description for accessibility"
                        value={insertImageAlt}
                        onChange={(e) => setInsertImageAlt(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Alignment
                      </label>
                      <select
                        value={insertImageAlignment}
                        onChange={(e) => setInsertImageAlignment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                      >
                        <option value="center">Center (Full Width)</option>
                        <option value="left">Left (Wrap text right)</option>
                        <option value="right">Right (Wrap text left)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INSERT AUDIO */}
              {activeMediaTab === 'audio' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Audio File Source
                    </label>

                    <div className="flex items-center gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => audioFileInputRef.current && audioFileInputRef.current.click()}
                        className="px-3 py-1.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Audio File (MP3, WAV)</span>
                      </button>

                      <input
                        ref={audioFileInputRef}
                        type="file"
                        accept="audio/*,.mp3,.wav,.ogg,.m4a"
                        onChange={(e) => handleInArticleAudioUpload(e.target.files[0])}
                        className="hidden"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Paste audio URL (/uploads/... or https://...)"
                      value={insertAudioUrl}
                      onChange={(e) => setInsertAudioUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Audio Title / Broadcast Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Special Briefing on Flood Mitigation by Honourable Commissioner"
                      value={insertAudioTitle}
                      onChange={(e) => setInsertAudioTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>

                  {insertAudioUrl && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <audio controls className="w-full">
                        <source src={insertAudioUrl} />
                      </audio>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INSERT VIDEO */}
              {activeMediaTab === 'video' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      YouTube or Video Embed URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={insertVideoUrl}
                      onChange={(e) => setInsertVideoUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Paste full YouTube watch link or embed link. It will automatically convert to a responsive 16:9 player in the article.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setAddMediaModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleInsertMedia}
                className="px-5 py-2 rounded-xl bg-lagos-green hover:bg-[#007043] text-white font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Insert into Article Body
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEDIA LIBRARY PICKER MODAL (FOR FEATURED OR IN-BODY IMAGE) */}
      {mediaLibraryModalOpen && (
        <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-scaleUp">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-8 max-h-[85vh]">
            <div className="bg-[#004d2e] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-sm sm:text-base">
                Select Asset from Media Library ({allMediaAssets.length} Available)
              </h3>
              <button 
                onClick={() => setMediaLibraryModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow space-y-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {allMediaAssets.slice(0, 60).map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      if (mediaLibraryTarget === 'featured') {
                        setFormImage(asset.src);
                      } else {
                        setInsertImageUrl(asset.src);
                        if (!insertImageAlt) setInsertImageAlt(asset.title);
                      }
                      setMediaLibraryModalOpen(false);
                    }}
                    className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 hover:border-lagos-green hover:shadow-md cursor-pointer transition relative group"
                  >
                    <img src={asset.src} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2 text-center text-[10px] text-white font-bold">
                      {asset.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-right">
              <button
                type="button"
                onClick={() => setMediaLibraryModalOpen(false)}
                className="px-4 py-1.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Quick Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-[#004d2e] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-sm sm:text-base">
                Article Preview: {previewPost.title}
              </h3>
              <button 
                onClick={() => setPreviewPost(null)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {previewPost.featuredImage && (
                <div className="rounded-2xl overflow-hidden max-h-72 bg-gray-100">
                  <img src={previewPost.featuredImage} alt={previewPost.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h2 className="text-xl font-heading font-extrabold text-gray-900">{previewPost.title}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>By {previewPost.author || 'moel'}</span>
                <span>•</span>
                <span>{previewPost.date}</span>
              </div>
              <div 
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: previewPost.content }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
