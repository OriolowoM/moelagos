import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Calendar, Filter, ArrowRight, Tag, 
  ChevronRight, RefreshCw, FileText, Newspaper, 
  Megaphone, AlertCircle 
} from 'lucide-react';

export default function NewsSection({ posts, onSelectPost, initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // Available categories based on migrated data
  const categories = ['All', 'Press Releases', 'News', 'Environment', 'Reports', 'Event'];

  // Available years from 2026 back to 2013
  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // Category match
      if (selectedCategory !== 'All') {
        const matchesCategory = p.categories && p.categories.some(c => 
          c.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        const matchesContentType = p.contentType && p.contentType.toLowerCase() === selectedCategory.toLowerCase().replace(' ', '_');
        if (!matchesCategory && !matchesContentType) return false;
      }

      // Year match
      if (selectedYear !== 'All') {
        const postYear = p.date ? p.date.substring(0, 4) : '';
        if (postYear !== selectedYear) return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = p.title && p.title.toLowerCase().includes(query);
        const inExcerpt = p.excerpt && p.excerpt.toLowerCase().includes(query);
        if (!inTitle && !inExcerpt) return false;
      }

      return true;
    });
  }, [posts, selectedCategory, selectedYear, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="news" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-lagos-darkGreen text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <Newspaper className="w-3.5 h-3.5 text-lagos-green" />
              <span>Official Media Feed</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              News & Publications Archive
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Browse over 460 official press statements, weather bulletins, and environmental advisories dating back to 2013.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Showing <strong className="text-gray-900">{displayedPosts.length}</strong> of <strong className="text-gray-900">{filteredPosts.length}</strong> matching records
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search headlines, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green text-gray-800 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Year Archive Filter (3 cols) */}
            <div className="md:col-span-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <select
                value={selectedYear}
                onChange={(e) => { setSelectedYear(e.target.value); setVisibleCount(6); }}
                className="w-full py-2 px-3 text-xs font-semibold bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lagos-green text-gray-800"
              >
                <option value="All">All Years (2013 – 2026)</option>
                {years.filter(y => y !== 'All').map((yr) => (
                  <option key={yr} value={yr}>Archive {yr}</option>
                ))}
              </select>
            </div>

            {/* Quick Reset Filter (3 cols) */}
            <div className="md:col-span-3 flex justify-end">
              {(selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedYear('All');
                    setSearchQuery('');
                    setVisibleCount(6);
                  }}
                  className="text-xs font-semibold text-lagos-green hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-gray-200/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-lagos-green text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive News Card Grid */}
        {displayedPosts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No articles match your filter criteria</h3>
            <p className="text-xs text-gray-500 mt-1">Try broadening your search term or selecting "All Years".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedPosts.map((post) => {
              const isPressRelease = post.contentType === 'press_release' || 
                (post.categories && post.categories.some(c => /press release/i.test(c)));

              return (
                <article
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Featured Image Container */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                      <img
                        src={post.featuredImage || "https://moelagos.gov.ng/wp-content/uploads/2026/09/1000315059.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      
                      {/* Category Badge Top Left */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="bg-lagos-green/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                          {post.categories && post.categories[0] ? post.categories[0] : 'Environment'}
                        </span>
                        {isPressRelease && (
                          <span className="bg-lagos-orange text-white text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-md shadow-sm">
                            Official Release
                          </span>
                        )}
                      </div>

                      {/* Year Badge Top Right */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {post.year}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      {/* Standard FOR IMMEDIATE RELEASE Header for Press Releases */}
                      {isPressRelease && (
                        <div className="text-[10px] font-extrabold text-lagos-orange uppercase tracking-wider flex items-center gap-1 border-b border-orange-100 pb-1">
                          <Megaphone className="w-3 h-3" />
                          <span>FOR IMMEDIATE RELEASE</span>
                        </div>
                      )}

                      {/* Post Title */}
                      <Link 
                        to={`/news/${post.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 group-hover:text-lagos-green transition leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer with Date & Read Arrow */}
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>

                    <Link 
                      to={`/news/${post.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-lagos-green flex items-center gap-1 group-hover:translate-x-1 transition"
                    >
                      Read Full Story
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Dynamic Load More Archive Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 bg-lagos-green hover:bg-lagos-darkGreen text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Load More Historical Archives ({filteredPosts.length - displayedPosts.length} remaining)</span>
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
