import React from 'react';
import { X, Calendar, User, Tag, Share2, Megaphone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatArticleContent } from '../utils/contentFormatter';

export default function PostDetailModal({ post, onClose }) {
  if (!post) return null;

  const isPressRelease = post.contentType === 'press_release' || 
    (post.categories && post.categories.some(c => /press release/i.test(c)));

  const formattedContent = formatArticleContent(post.content || `<p>${post.excerpt}</p>`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-200 overflow-hidden transform transition-all animate-scaleUp flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="bg-[#004d2e] text-white px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md">
              {post.categories && post.categories[0] ? post.categories[0] : 'Official Publication'}
            </span>
            {isPressRelease && (
              <span className="bg-lagos-orange text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                Press Release
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            aria-label="Close article modal"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Press Release Badge */}
          {isPressRelease && (
            <div className="bg-orange-50 border-l-4 border-lagos-orange p-3.5 text-lagos-orange text-xs font-extrabold tracking-wider flex items-center gap-2 rounded-r-xl">
              <Megaphone className="w-4 h-4 flex-shrink-0" />
              <span>LAGOS STATE GOVERNMENT — FOR IMMEDIATE RELEASE</span>
            </div>
          )}

          {/* Title */}
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-950 leading-tight">
            {post.title}
          </h2>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-lagos-green" />
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-lagos-green" />
              Published by: <strong className="text-gray-800">{post.author || 'Directorate of Public Affairs'}</strong>
            </span>
            <span>•</span>
            <span>Year: <strong>{post.year}</strong></span>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-150 bg-gray-50">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full max-h-96 object-cover"
                onError={(e) => {
                  if (!e.target.dataset.triedLive && post.featuredImage && post.featuredImage.startsWith('/uploads/')) {
                    e.target.dataset.triedLive = '1';
                    e.target.src = 'https://moelagos.gov.ng/wp-content' + post.featuredImage;
                    return;
                  }
                  e.target.onerror = null;
                  e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg";
                }}
              />
            </div>
          )}

          {/* Sanitized Body Content with Parsed Images and Captions */}
          <div 
            className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed space-y-4 break-words"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Related Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tg, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 flex-shrink-0">
          <Link 
            to={`/news/${post.slug}`}
            onClick={onClose}
            className="text-lagos-green hover:underline font-bold flex items-center gap-1"
          >
            <span>Open in Full Article Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
