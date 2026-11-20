import React, { useState, useEffect, useRef } from 'react';
import { 
  Image, Search, Copy, Check, ExternalLink, Calendar, 
  ChevronLeft, ChevronRight, UploadCloud, Plus, X, 
  Trash2, FileAudio, FileImage, Sparkles, Filter 
} from 'lucide-react';
import galleryData from '../../data/gallery.json';

export default function AdminMediaLibrary({ userRole }) {
  // Load custom uploaded media from localStorage
  const [customMedia, setCustomMedia] = useState(() => {
    try {
      const stored = localStorage.getItem('moelagos_custom_media');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All'); // All, Images, Audio
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  // Upload UI State
  const [uploadOpen, setUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef(null);

  const itemsPerPage = 20;

  const categories = [
    'All',
    'Tree Planting & Greening',
    'Drainage & Canal Desilting',
    'Sanitation & Waste Management',
    'Enforcement & Compliance',
    'Events & Conferences',
    'Ministerial Activities',
    'Custom Uploads'
  ];

  // Combine custom uploads (first) with base gallery data
  const allMedia = [...customMedia, ...galleryData];

  const filteredMedia = allMedia.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || 
      (item.title && item.title.toLowerCase().includes(term)) ||
      (item.src && item.src.toLowerCase().includes(term));
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const isAudio = item.type === 'audio' || (item.src && /\.(mp3|wav|ogg|m4a)$/i.test(item.src));
    const matchesType = selectedType === 'All' || (selectedType === 'Audio' ? isAudio : !isAudio);
    return matchesSearch && matchesCat && matchesType;
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
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleDeleteCustomMedia = (id) => {
    if (window.confirm('Are you sure you want to remove this uploaded media asset?')) {
      const updated = customMedia.filter(item => item.id !== id);
      setCustomMedia(updated);
      try {
        localStorage.setItem('moelagos_custom_media', JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage quota:', e);
      }
    }
  };

  // Process multi-file selection
  const handleFilesSelected = async (filesList) => {
    if (!filesList || filesList.length === 0) return;
    const filesArray = Array.from(filesList);

    setIsUploading(true);
    setUploadMessage(`Processing ${filesArray.length} file(s)...`);

    const newUploadedItems = [];

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      const isAudio = file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a)$/i.test(file.name);
      const fileSize = (file.size / 1024).toFixed(1) + ' KB';

      // Read as Data URL for guaranteed offline & localhost availability
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const uniqueId = `custom-${Date.now()}-${i}-${Math.random().toString(36).substring(7)}`;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

      newUploadedItems.push({
        id: uniqueId,
        title: cleanTitle,
        src: dataUrl,
        fallbackSrc: '/placeholder-news.jpg',
        category: 'Custom Uploads',
        type: isAudio ? 'audio' : 'image',
        date: new Date().toISOString().slice(0, 10),
        size: fileSize,
        isCustom: true
      });

      // Try uploading to backend /api/upload.php if available
      try {
        const formData = new FormData();
        formData.append('file', file);
        fetch('/api/upload.php', { method: 'POST', body: formData })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.files && data.files[0]) {
              console.log('Saved to server uploads:', data.files[0].url);
            }
          })
          .catch(() => {});
      } catch (err) {}
    }

    const updatedCustom = [...newUploadedItems, ...customMedia];
    setCustomMedia(updatedCustom);
    try {
      localStorage.setItem('moelagos_custom_media', JSON.stringify(updatedCustom));
    } catch (e) {
      console.warn('Storage limit reached, keeping active in memory:', e);
    }

    setIsUploading(false);
    setUploadMessage(`Successfully uploaded ${filesArray.length} file(s)!`);
    setTimeout(() => setUploadMessage(''), 3500);
    setCurrentPage(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
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
            Manage, upload multiple images or audio files, and browse over {allMedia.length} historical media assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-purple-50 text-purple-700 font-bold px-3 py-1.5 rounded-xl border border-purple-100">
            {allMedia.length} Media Assets
          </span>

          <button
            onClick={() => setUploadOpen(prev => !prev)}
            className="inline-flex items-center gap-2 bg-lagos-green hover:bg-[#007043] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            {uploadOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{uploadOpen ? 'Close Uploader' : 'Add New Media'}</span>
          </button>
        </div>
      </div>

      {/* WordPress-Style Drag & Drop Multi-File Upload Zone */}
      {uploadOpen && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-emerald-300 shadow-sm space-y-4 animate-scaleUp">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-8 rounded-2xl border-2 border-dashed text-center transition flex flex-col items-center justify-center cursor-pointer ${
              isDragging
                ? 'border-lagos-green bg-emerald-50/80 scale-[1.01]'
                : 'border-gray-200 bg-gray-50/60 hover:bg-emerald-50/40 hover:border-emerald-300'
            }`}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-lagos-green flex items-center justify-center mb-3">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="font-heading font-extrabold text-base text-gray-900">
              Drop files anywhere to upload
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm">
              Supports multiple image files (JPG, PNG, WebP, GIF, SVG) and audio files (MP3, WAV, OGG).
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-2.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition"
            >
              Select Files from Computer
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,audio/*"
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Upload Status Alert */}
          {uploadMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{uploadMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Filter and Search Controls */}
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

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-bold flex-shrink-0">
            {['All', 'Images', 'Audio'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl transition ${
                  selectedType === type
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
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
        {paginatedMedia.map((media) => {
          const isAudio = media.type === 'audio' || (media.src && /\.(mp3|wav|ogg|m4a)$/i.test(media.src));

          return (
            <div 
              key={media.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group relative"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden flex items-center justify-center">
                {isAudio ? (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-teal-900 flex flex-col items-center justify-center text-white p-3 text-center">
                    <FileAudio className="w-8 h-8 text-emerald-300 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Audio Broadcast</span>
                  </div>
                ) : (
                  <img 
                    src={media.src} 
                    alt={media.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = media.fallbackSrc || '/placeholder-news.jpg';
                    }}
                  />
                )}

                <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm truncate max-w-[120px]">
                  {media.category}
                </span>

                {media.isCustom && (
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    New Upload
                  </span>
                )}
              </div>

              {/* Media Info & Copy Button */}
              <div className="p-3 space-y-2">
                <h3 className="font-heading font-bold text-xs text-gray-900 truncate" title={media.title}>
                  {media.title}
                </h3>
                
                <div className="text-[10px] text-gray-400 font-mono truncate" title={media.src}>
                  {media.src.startsWith('data:') ? 'Local Stored Data File' : media.src}
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{media.date}</span>

                  <div className="flex items-center gap-1">
                    {media.isCustom && (
                      <button
                        onClick={() => handleDeleteCustomMedia(media.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete uploaded file"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyUrl(media.id, media.src)}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                        copiedId === media.id
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      title="Copy media URL to clipboard"
                    >
                      {copiedId === media.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span className="text-[10px]">{copiedId === media.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Bar */}
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
