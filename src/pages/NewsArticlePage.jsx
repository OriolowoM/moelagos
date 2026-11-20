import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, User, Clock, MapPin, Tag, Share2, 
  ChevronLeft, ChevronRight, Check, ArrowLeft, 
  Megaphone, ExternalLink, Printer 
} from 'lucide-react';
import { formatArticleContent } from '../utils/contentFormatter';
import { useDocumentSEO } from '../components/SEO';

export default function NewsArticlePage({ posts }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Scroll to top on load or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find post by slug or ID
  const currentIndex = posts.findIndex(p => p.slug === slug || String(p.id) === slug || String(p.wpId) === slug);
  const post = currentIndex !== -1 ? posts[currentIndex] : null;

  // Dynamic Open Graph & Social Sharing SEO
  useDocumentSEO({
    title: post ? post.title : 'Article Archive',
    description: post ? (post.excerpt || post.content?.replace(/<[^>]+>/g, '').slice(0, 180) + '...') : '',
    image: post ? post.featuredImage : undefined,
    url: post ? (typeof window !== 'undefined' ? window.location.href : `https://moelagos.gov.ng/news/${post.slug}`) : undefined,
    type: 'article'
  });

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <h1 className="text-3xl font-heading font-black text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The requested publication or news article could not be located in our archive.</p>
        <Link 
          to="/#news" 
          className="inline-flex items-center gap-2 bg-lagos-green text-white px-6 py-3 rounded-xl font-bold hover:bg-[#007043] transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Newsroom Archive</span>
        </Link>
      </div>
    );
  }

  // Previous & Next posts
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Related articles (same category, excluding current)
  const mainCategory = post.categories && post.categories[0] ? post.categories[0] : 'News';
  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.categories && p.categories.includes(mainCategory))
    .slice(0, 3);

  // Estimated reading time calculation (approx 200 words per minute)
  const textContent = (post.content || post.excerpt || '').replace(/<[^>]+>/g, ' ');
  const wordCount = textContent.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const isPressRelease = post.contentType === 'press_release' || 
    (post.categories && post.categories.some(c => /press release/i.test(c)));

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://moelagos.gov.ng/news/${post.slug}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - ' + currentUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}&via=followlasg`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  // Parse and format the rich content, converting [caption] shortcodes into clean figures
  const formattedBody = formatArticleContent(post.content || `<p>${post.excerpt}</p>`);

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-lagos-green transition flex items-center gap-1 font-medium">
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link to="/#news" className="hover:text-lagos-green transition font-medium">
            <span>News & Publications</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[280px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-150 overflow-hidden">
          
          {/* Article Header Banner */}
          <div className="p-6 sm:p-10 lg:p-12 border-b border-gray-100">
            {/* Category Badges & Print/Share */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-lagos-green text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                  {mainCategory}
                </span>
                {isPressRelease && (
                  <span className="bg-orange-100 text-lagos-orange text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1">
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>Official Press Release</span>
                  </span>
                )}
              </div>

              {/* Print & Quick Actions */}
              <button 
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition p-2 rounded-lg hover:bg-gray-100"
                title="Print this official release"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>

            {/* Official Title */}
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-950 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-500 py-4 border-y border-gray-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-lagos-green" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-lagos-green" />
                <span>By <strong className="text-gray-900">{post.author || 'Directorate of Public Affairs'}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lagos-green" />
                <span>Lagos, Nigeria</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-lagos-green" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative bg-gray-100 max-h-[560px] overflow-hidden flex items-center justify-center border-b border-gray-100">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-auto max-h-[560px] object-cover"
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

          {/* Article Body Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            
            {/* Press Release Callout */}
            {isPressRelease && (
              <div className="mb-8 p-4 rounded-2xl bg-orange-50 border-l-4 border-lagos-orange text-orange-900 flex items-start gap-3">
                <Megaphone className="w-5 h-5 text-lagos-orange flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-xs tracking-wider uppercase text-lagos-orange">
                    LAGOS STATE GOVERNMENT — FOR IMMEDIATE RELEASE
                  </div>
                  <div className="text-xs text-orange-800/90 mt-0.5">
                    Authorized and issued by the Directorate of Public Affairs, Ministry of the Environment and Water Resources, Alausa, Ikeja.
                  </div>
                </div>
              </div>
            )}

            {/* Editorial Excerpt */}
            {post.excerpt && (
              <div className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed italic border-l-4 border-lagos-green pl-4 mb-8 bg-green-50/50 py-3 rounded-r-xl">
                {post.excerpt}
              </div>
            )}

            {/* Sanitized Rich HTML Content with Rendered Images and Styled Captions */}
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6 break-words"
              dangerouslySetInnerHTML={{ __html: formattedBody }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Subject Matter Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-lagos-green transition px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share Bar */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Share2 className="w-4 h-4 text-lagos-green" />
                <span>Share this article:</span>
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href={shareWhatsApp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  title="Share to WhatsApp"
                >
                  <span>WhatsApp</span>
                </a>

                <a 
                  href={shareTwitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  title="Share on X / Twitter"
                >
                  <span>X (Twitter)</span>
                </a>

                <a 
                  href={shareFacebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  title="Share to Facebook"
                >
                  <span>Facebook</span>
                </a>

                <button 
                  onClick={handleCopyLink}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm border ${
                    copied 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                  }`}
                  title="Copy permanent article link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Previous / Next Article Navigation Footer */}
          <div className="bg-gray-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {prevPost ? (
              <Link 
                to={`/news/${prevPost.slug}`}
                className="p-6 hover:bg-white transition flex flex-col group"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1 mb-1 group-hover:text-lagos-green">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Article</span>
                </span>
                <span className="font-heading font-bold text-sm text-gray-800 line-clamp-2 group-hover:text-lagos-green">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div className="p-6"></div>}

            {nextPost ? (
              <Link 
                to={`/news/${nextPost.slug}`}
                className="p-6 hover:bg-white transition flex flex-col items-end text-right group"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1 mb-1 group-hover:text-lagos-green">
                  <span>Next Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-heading font-bold text-sm text-gray-800 line-clamp-2 group-hover:text-lagos-green">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div className="p-6"></div>}
          </div>

        </article>

        {/* Related News Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-lagos-green rounded-full"></span>
              <span>Related Publications in {mainCategory}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map(rel => (
                <Link 
                  key={rel.id} 
                  to={`/news/${rel.slug}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-150 hover:shadow-md hover:border-lagos-green/40 transition group flex flex-col h-full"
                >
                  <div className="h-40 rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
                    <img 
                      src={rel.featuredImage || "https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg"} 
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        if (!e.target.dataset.triedLive && rel.featuredImage && rel.featuredImage.startsWith('/uploads/')) {
                          e.target.dataset.triedLive = '1';
                          e.target.src = 'https://moelagos.gov.ng/wp-content' + rel.featuredImage;
                          return;
                        }
                        e.target.onerror = null;
                        e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg";
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lagos-green mb-1">
                    {new Date(rel.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-lagos-green transition leading-snug flex-grow">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
