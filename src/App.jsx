import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Global Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import PublicNoticeModal from './components/PublicNoticeModal';
import FloatingActionButton from './components/FloatingActionButton';
import ComplaintsDeskModal from './components/ComplaintsDeskModal';
import PostDetailModal from './components/PostDetailModal';

// Public Pages
import HomePage from './pages/HomePage';
import NewsArticlePage from './pages/NewsArticlePage';
import GenericPageView from './pages/GenericPageView';
import AboutPage from './pages/AboutPage';
import LeadershipPage from './pages/LeadershipPage';
import DepartmentsPage from './pages/DepartmentsPage';
import InitiativesPage from './pages/InitiativesPage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Administrative CMS Portal
import AdminPortal from './pages/admin/AdminPortal';

// Migrated posts data with full body content, images, and captions (490 published posts)
import initialPostsData from './data/posts.json';

const DATA_VERSION = 'v3_full_content_migration_2026_11_19';

// App content wrapper that knows the current route
function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Posts state with automated cache invalidation to prevent stale excerpt caching
  const [posts, setPosts] = useState(() => {
    try {
      const storedVersion = localStorage.getItem('moelagos_posts_version');
      if (storedVersion !== DATA_VERSION) {
        localStorage.removeItem('moelagos_custom_posts');
        localStorage.setItem('moelagos_posts_version', DATA_VERSION);
        return initialPostsData;
      }
      const stored = localStorage.getItem('moelagos_custom_posts');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0 && parsed[0].content && parsed[0].content.length > 200) {
          return parsed;
        }
      }
      return initialPostsData;
    } catch (e) {
      return initialPostsData;
    }
  });

  const [complaintsOpen, setComplaintsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleUpdatePosts = (newPosts) => {
    setPosts(newPosts);
    try {
      localStorage.setItem('moelagos_custom_posts', JSON.stringify(newPosts));
      localStorage.setItem('moelagos_posts_version', DATA_VERSION);
    } catch (e) {
      console.warn('Storage quota:', e);
    }
  };

  const handleFilterFromIcon = (category) => {
    setActiveCategory(category);
    const newsEl = document.getElementById('news');
    if (newsEl) {
      newsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchClick = () => {
    const newsEl = document.getElementById('news');
    if (newsEl) {
      newsEl.scrollIntoView({ behavior: 'smooth' });
      const searchInput = newsEl.querySelector('input[type="text"]');
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 w-full max-w-full overflow-x-hidden">
      
      {/* 4.1 Mandatory Public Notice Modal (Only on Public Pages) */}
      {!isAdmin && <PublicNoticeModal />}

      {/* 4.2 Global Sticky Header & Navigation (Only on Public Pages) */}
      {!isAdmin && (
        <Header 
          onOpenComplaints={() => setComplaintsOpen(true)}
          onSearchClick={handleSearchClick}
        />
      )}

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Home */}
          <Route 
            path="/" 
            element={
              <HomePage 
                posts={posts} 
                onSelectPost={(post) => setSelectedPost(post)} 
                onOpenComplaints={() => setComplaintsOpen(true)}
                activeCategory={activeCategory}
                onFilterCategory={handleFilterFromIcon}
              />
            } 
          />

          {/* Dedicated Individual News Article Page: /news/:slug */}
          <Route 
            path="/news/:slug" 
            element={<NewsArticlePage posts={posts} />} 
          />

          {/* About Us */}
          <Route path="/about" element={<AboutPage />} />

          {/* Leadership & Management */}
          <Route path="/leadership" element={<LeadershipPage />} />

          {/* Departments & Units */}
          <Route path="/departments" element={<DepartmentsPage />} />

          {/* Programmes & Strategic Initiatives */}
          <Route path="/initiatives" element={<InitiativesPage />} />

          {/* Infrastructure Projects & Dredging */}
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Publications, EIA Guidelines & Gazettes */}
          <Route path="/publications" element={<PublicationsPage />} />

          {/* Photo & Media Gallery */}
          <Route path="/gallery" element={<GalleryPage />} />

          {/* Contact & Public Enquiries */}
          <Route 
            path="/contact" 
            element={<ContactPage onOpenComplaints={() => setComplaintsOpen(true)} />} 
          />

          {/* Administrative CMS Portal */}
          <Route 
            path="/admin/*" 
            element={
              <AdminPortal 
                posts={posts} 
                onUpdatePosts={handleUpdatePosts} 
              />
            } 
          />

          {/* Generic WordPress Page / Slug Resolver (e.g. /past-commissioners, /stormwater-drainage-projects, or post slug) */}
          <Route 
            path="/:slug" 
            element={<GenericPageView posts={posts} />} 
          />

          {/* Fallback to Generic Page View / 404 */}
          <Route 
            path="*" 
            element={<GenericPageView posts={posts} />} 
          />
        </Routes>
      </main>

      {/* Global Accessible Footer (Only on Public Pages) */}
      {!isAdmin && (
        <Footer 
          onOpenComplaints={() => setComplaintsOpen(true)} 
        />
      )}

      {/* Floating Action Button (Only on Public Pages) */}
      {!isAdmin && (
        <FloatingActionButton 
          onOpenComplaints={() => setComplaintsOpen(true)} 
        />
      )}

      {/* Interactive Complaints Desk Modal */}
      <ComplaintsDeskModal 
        isOpen={complaintsOpen} 
        onClose={() => setComplaintsOpen(false)} 
      />

      {/* Article Detail Reader Modal (Quick View) */}
      <PostDetailModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
