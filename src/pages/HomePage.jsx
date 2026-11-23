import React from 'react';
import HeroSlider from '../components/HeroSlider';
import QuickServiceIcons from '../components/QuickServiceIcons';
import WorldEnvironmentDayBanner from '../components/WorldEnvironmentDayBanner';
import MinistryOverview from '../components/MinistryOverview';
import CommissionerProfile from '../components/CommissionerProfile';
import VideoMessages from '../components/VideoMessages';
import NewsSection from '../components/NewsSection';

export default function HomePage({ posts, onSelectPost, onOpenComplaints, onOpenTreeChallenge, activeCategory, onFilterCategory }) {
  return (
    <>
      {/* Hero Section (Featured Slider with top 3 recent items) */}
      <HeroSlider 
        posts={posts} 
        onSelectPost={onSelectPost} 
      />

      {/* 8 Circular Quick Service Icons */}
      <QuickServiceIcons 
        onFilterCategory={onFilterCategory} 
      />

      {/* Featured Graphic Banner: World Environment Day 2026 (My Tree Challenge) */}
      <WorldEnvironmentDayBanner onOpenRegister={onOpenTreeChallenge} />

      {/* Ministry Overview & Dual Offices (OES&WR and ODS&WR) */}
      <MinistryOverview />

      {/* Commissioner's Profile & Message (Mr. Tokunbo Wahab) */}
      <CommissionerProfile />

      {/* Public Video Messages (Flood Free Lagos & Food Safety) */}
      <VideoMessages />

      {/* Latest News, Press Releases & Deep Archive (2013 - 2026) */}
      <NewsSection 
        posts={posts} 
        onSelectPost={onSelectPost}
        initialCategory={activeCategory}
      />
    </>
  );
}
