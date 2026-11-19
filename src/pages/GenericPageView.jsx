import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Calendar, ArrowLeft, Share2, 
  Check, Printer, Building2, ExternalLink, Search 
} from 'lucide-react';
import NewsArticlePage from './NewsArticlePage';
import pagesData from '../data/pages.json';
import { formatArticleContent } from '../utils/contentFormatter';

export default function GenericPageView({ posts }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // 1. Check if slug matches a post in posts archive
  const matchingPost = posts.find(p => p.slug === slug || String(p.id) === slug || String(p.wpId) === slug);
  if (matchingPost) {
    return <NewsArticlePage posts={posts} />;
  }

  // 2. Check if slug matches a WordPress page in pagesData
  const matchingPage = pagesData.find(p => 
    p.slug === slug || 
    String(p.id) === slug || 
    String(p.wpId) === slug ||
    (p.permalink && p.permalink.endsWith(`/${slug}/`))
  );

  if (matchingPage) {
    const formattedContent = formatArticleContent(matchingPage.content || '');

    return (
      <div className="bg-gray-50 min-h-screen py-8 sm:py-12 animate-fadeIn">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link to="/" className="hover:text-lagos-green transition font-medium">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold truncate max-w-[280px] sm:max-w-md">
              {matchingPage.title}
            </span>
          </nav>

          {/* Main Page Container */}
          <article className="bg-white rounded-3xl shadow-sm border border-gray-150 overflow-hidden">
            
            {/* Header Banner */}
            <div className="p-6 sm:p-10 border-b border-gray-100 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-lagos-darkGreen text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
                <FileText className="w-3.5 h-3.5 text-lagos-green" />
                <span>Official Ministry Publication</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-950 leading-tight">
                {matchingPage.title}
              </h1>

              {matchingPage.date && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Last Published: {new Date(matchingPage.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              )}
            </div>

            {/* Featured Image if present */}
            {matchingPage.featuredImage && (
              <div className="w-full bg-gray-100 max-h-[480px] overflow-hidden">
                <img 
                  src={matchingPage.featuredImage} 
                  alt={matchingPage.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg';
                  }}
                />
              </div>
            )}

            {/* Rich HTML Body */}
            <div className="p-6 sm:p-10 sm:py-12">
              <div 
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </div>

            {/* Footer Back & Navigation */}
            <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-lagos-green hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 bg-white px-4 py-2 rounded-xl transition shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>

          </article>
        </div>
      </div>
    );
  }

  // 3. Fallback: Not Found
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fadeIn">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl mx-auto mb-4 flex items-center justify-center border border-red-100">
        <FileText className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-heading font-black text-gray-900 mb-3">Resource Not Located</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm">
        The requested page or publication <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">/{slug}</code> could not be found in our current archives.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-lagos-green text-white px-6 py-3 rounded-xl font-bold hover:bg-[#007043] transition shadow-md text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link 
          to="/#news" 
          className="inline-flex items-center gap-2 bg-white text-gray-800 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition shadow-xs text-sm"
        >
          <Search className="w-4 h-4 text-lagos-green" />
          <span>Browse Newsroom</span>
        </Link>
      </div>
    </div>
  );
}
