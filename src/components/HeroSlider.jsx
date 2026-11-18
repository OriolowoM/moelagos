import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function HeroSlider({ posts, onSelectPost }) {
  // Extract the top 3 featured posts or default fallbacks
  const featuredPosts = posts && posts.length >= 3 ? posts.slice(0, 3) : [
    {
      id: 'featured-1',
      title: 'LAGOS TO GET OVER 200 NEW COMPACTOR TRUCKS TO IMPROVE WASTE EVACUATION',
      date: '2026-09-01',
      featuredImage: 'https://moelagos.gov.ng/wp-content/uploads/2026/09/1000315059.jpg',
      category: 'Press Releases',
      excerpt: 'As Deputy Governor Kadri Hamzat leads inspection of sanitation operations, the State Government accelerates the deployment of over 200 new high-capacity compactor trucks to revolutionize waste evacuation across all 20 LGAs.'
    },
    {
      id: 'featured-2',
      title: 'LAGOS SEEKS STRONGER REGULATION, COLLABORATION WITH WASTE MANAGERS TO IMPROVE WASTE DISPOSAL',
      date: '2026-09-01',
      featuredImage: 'https://moelagos.gov.ng/wp-content/uploads/2026/09/375501.jpg',
      category: 'Waste Management',
      excerpt: 'The Lagos State Government has reiterated its commitment to strengthening the regulation of Private Sector Participation (PSP) operators and enhancing operational standards across the waste management value chain.'
    },
    {
      id: 'featured-3',
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
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Graphic Slide */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center">
        {/* Background Image with Dark & Green Gradients */}
        <div className="absolute inset-0 z-0">
          <img 
            src={current.featuredImage || "https://moelagos.gov.ng/wp-content/uploads/2026/09/1000315059.jpg"} 
            alt={current.title}
            className="w-full h-full object-cover object-center filter brightness-[0.4] transition-all duration-700 transform scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-lagos-green/20 mix-blend-multiply"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-6">
            {/* Category & Status Pill */}
            <div className="inline-flex items-center gap-2 bg-lagos-green/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-green-400/30">
              <Tag className="w-3.5 h-3.5 text-yellow-300" />
              <span>{current.categories && current.categories[0] ? current.categories[0] : (current.category || 'Featured Announcement')}</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              {current.title}
            </h1>

            {/* Excerpt */}
            <p className="text-gray-200 text-sm sm:text-base lg:text-lg line-clamp-3 leading-relaxed max-w-2xl">
              {current.excerpt}
            </p>

            {/* Date & Read Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <Calendar className="w-4 h-4 text-lagos-orange" />
                <span>{new Date(current.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>

              <Link 
                to={`/news/${current.slug}`}
                className="inline-flex items-center gap-2 bg-lagos-orange hover:bg-lagos-darkOrange text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Manual Arrow Controls */}
        <div className="absolute right-4 sm:right-8 bottom-8 z-20 flex items-center gap-2">
          <button 
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-3 bg-black/40 hover:bg-lagos-green text-white rounded-full backdrop-blur-sm border border-white/20 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-3 bg-black/40 hover:bg-lagos-green text-white rounded-full backdrop-blur-sm border border-white/20 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="absolute bottom-8 left-4 sm:left-8 z-20 flex items-center gap-2">
          {featuredPosts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-lagos-orange' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
