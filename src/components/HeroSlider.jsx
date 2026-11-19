import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function HeroSlider({ posts, onSelectPost }) {
  // Extract the top 3 featured posts or default fallbacks
  const featuredPosts = posts && posts.length >= 3 ? posts.slice(0, 3) : [
    {
      id: 'featured-1',
      slug: 'lagos-to-get-over-200-new-compactor-trucks-to-improve-waste-evacuation',
      title: 'LAGOS TO GET OVER 200 NEW COMPACTOR TRUCKS TO IMPROVE WASTE EVACUATION',
      date: '2026-09-01',
      featuredImage: 'https://moelagos.gov.ng/wp-content/uploads/2026/09/1000315059.jpg',
      category: 'Press Releases',
      excerpt: 'As Deputy Governor Kadri Hamzat leads inspection of sanitation operations, the State Government accelerates the deployment of over 200 new high-capacity compactor trucks to revolutionize waste evacuation across all 20 LGAs.'
    },
    {
      id: 'featured-2',
      slug: 'lagos-seeks-stronger-regulation-collaboration-with-waste-managers',
      title: 'LAGOS SEEKS STRONGER REGULATION, COLLABORATION WITH WASTE MANAGERS TO IMPROVE WASTE DISPOSAL',
      date: '2026-09-01',
      featuredImage: 'https://moelagos.gov.ng/wp-content/uploads/2026/09/375501.jpg',
      category: 'Waste Management',
      excerpt: 'The Lagos State Government has reiterated its commitment to strengthening the regulation of Private Sector Participation (PSP) operators and enhancing operational standards across the waste management value chain.'
    },
    {
      id: 'featured-3',
      slug: 'lasg-seeks-gets-communities-buy-in-to-commence-work-on-material-recovery-facility',
      title: 'LASG SEEKS, GETS COMMUNITIES BUY-IN TO COMMENCE WORK ON MATERIAL RECOVERY FACILITY (MRF) AT AGBOWA',
      date: '2026-09-01',
      featuredImage: 'https://moelagos.gov.ng/wp-content/uploads/2026/09/367494.jpg',
      category: 'Recycling & Infrastructure',
      excerpt: 'The Lagos State Government on Monday engaged the traditional rulers and stakeholders of Owu Ikosi and Agbowa communities, securing full grassroots endorsement for the state-of-the-art Material Recovery Facility.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
  };

  const current = featuredPosts[currentIndex];

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden w-full max-w-full">
      {/* Background Graphic Slide */}
      <div className="relative min-h-[440px] xs:min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center">
        {/* Background Image with Dark & Green Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={current.featuredImage || "https://moelagos.gov.ng/wp-content/uploads/2026/09/1000315059.jpg"} 
            alt={current.title}
            className="w-full h-full object-cover object-center filter brightness-[0.38] transition-all duration-700 transform scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-transparent"></div>
          <div className="absolute inset-0 bg-lagos-green/20 mix-blend-multiply"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:py-20 lg:py-24 w-full">
          <div className="max-w-2xl sm:max-w-3xl space-y-3 sm:space-y-5">
            {/* Category & Status Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-lagos-green/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-green-400/30">
              <Tag className="w-3 h-3 text-yellow-300" />
              <span>{current.categories && current.categories[0] ? current.categories[0] : (current.category || 'Featured Announcement')}</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-tight tracking-tight text-white drop-shadow-md line-clamp-3">
              {current.title}
            </h1>

            {/* Excerpt */}
            <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl">
              {current.excerpt}
            </p>

            {/* Date & Read Action */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-lagos-orange" />
                <span>{new Date(current.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>

              <Link 
                to={`/news/${current.slug || current.id}`}
                className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Controls Strip (Positioned safely at the bottom) */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-8 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
          {/* Dots Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            {featuredPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 sm:w-8 bg-lagos-orange' : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Manual Arrow Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <button 
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-2 sm:p-2.5 bg-black/50 hover:bg-lagos-green text-white rounded-full backdrop-blur-sm border border-white/20 transition active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-2 sm:p-2.5 bg-black/50 hover:bg-lagos-green text-white rounded-full backdrop-blur-sm border border-white/20 transition active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
