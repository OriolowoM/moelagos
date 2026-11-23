import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Global Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import PublicNoticeModal from './components/PublicNoticeModal';
import FloatingActionButton from './components/FloatingActionButton';
import ComplaintsDeskModal from './components/ComplaintsDeskModal';
import PostDetailModal from './components/PostDetailModal';
import TreeChallengeModal from './components/TreeChallengeModal';

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
import CommissionerPage from './pages/CommissionerPage';
import SpecialAdviserPage from './pages/SpecialAdviserPage';
import PermanentSecretaryOESPage from './pages/PermanentSecretaryOESPage';
import PermanentSecretaryODSWRPage from './pages/PermanentSecretaryODSWRPage';
import TreeChallengePage from './pages/TreeChallengePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AccessibilityPage from './pages/AccessibilityPage';
import AIAssistantModal from './components/AIAssistantModal';

// Administrative CMS Portal
import AdminPortal from './pages/admin/AdminPortal';

// Migrated posts data with full body content, images, and captions (490 published posts)
import initialPostsData from './data/posts.json';

const DATA_VERSION = 'v4_wp_published_date_reordered_2026_11_20';

// App content wrapper that knows the current route
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  // Legacy WordPress query parameter redirect (?page_id=18, ?page_id=20, ?page_id=22)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageId = params.get('page_id');
    if (pageId === '18') {
      navigate('/special-adviser', { replace: true });
    } else if (pageId === '20') {
      navigate('/permanent-secretary-oes', { replace: true });
    } else if (pageId === '22') {
      navigate('/permanent-secretary-odswr', { replace: true });
    }
  }, [location.search, navigate]);

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
  const [treeChallengeOpen, setTreeChallengeOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
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
          onOpenAIAssistant={() => setAiAssistantOpen(true)}
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
                onOpenTreeChallenge={() => setTreeChallengeOpen(true)}
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

          {/* Honourable Commissioner (Mr. Tokunbo Wahab) Dedicated Page */}
          <Route path="/honourable-commissioner" element={<CommissionerPage posts={posts} />} />
          <Route path="/commissioner" element={<CommissionerPage posts={posts} />} />
          <Route path="/about-moelagos/principal-officers/honourable-commissioner" element={<CommissionerPage posts={posts} />} />

          {/* Special Adviser to the Governor on Environment (Engr. Olakunle Rotimi-Akodu) */}
          <Route path="/special-adviser" element={<SpecialAdviserPage posts={posts} />} />
          <Route path="/special-adviser-environment" element={<SpecialAdviserPage posts={posts} />} />
          <Route path="/engr-olakunle-rotimi-akodu" element={<SpecialAdviserPage posts={posts} />} />
          <Route path="/special-adviser-to-governor" element={<SpecialAdviserPage posts={posts} />} />
          <Route path="/page_id=18" element={<SpecialAdviserPage posts={posts} />} />
          <Route path="/about-moelagos/principal-officers/special-adviser-to-the-governor" element={<SpecialAdviserPage posts={posts} />} />
          <Route path="/about-moelagos/principal-officers/special-adviser-environment" element={<SpecialAdviserPage posts={posts} />} />

          {/* Permanent Secretary, Office of Environmental Services (Dr. Gaji Omobolaji Tajudeen) */}
          <Route path="/permanent-secretary-oes" element={<PermanentSecretaryOESPage posts={posts} />} />
          <Route path="/dr-gaji-tajudeen" element={<PermanentSecretaryOESPage posts={posts} />} />
          <Route path="/page_id=20" element={<PermanentSecretaryOESPage posts={posts} />} />
          <Route path="/about-moelagos/principal-officers/permanent-secretary-oes" element={<PermanentSecretaryOESPage posts={posts} />} />

          {/* Permanent Secretary, Office of Drainage Services & Water Resources (Engr. Mahamood Olakunle Adegbite) */}
          <Route path="/permanent-secretary-odswr" element={<PermanentSecretaryODSWRPage posts={posts} />} />
          <Route path="/permanent-secretary-ods-wr" element={<PermanentSecretaryODSWRPage posts={posts} />} />
          <Route path="/engr-mahmood-adegbite" element={<PermanentSecretaryODSWRPage posts={posts} />} />
          <Route path="/page_id=22" element={<PermanentSecretaryODSWRPage posts={posts} />} />
          <Route path="/about-moelagos/principal-officers/permanent-secretary-odswr" element={<PermanentSecretaryODSWRPage posts={posts} />} />
          <Route path="/about-moelagos/principal-officers/permanent-secretary-ods-wr" element={<PermanentSecretaryODSWRPage posts={posts} />} />

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

          {/* World Environment Day - My Tree Challenge Dedicated Campaign */}
          <Route path="/my-tree-challenge" element={<TreeChallengePage onOpenRegister={() => setTreeChallengeOpen(true)} />} />
          <Route path="/tree-challenge" element={<TreeChallengePage onOpenRegister={() => setTreeChallengeOpen(true)} />} />

          {/* Privacy Policy & Accessibility Statements */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/accessibility-statement" element={<AccessibilityPage />} />

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
          onOpenTreeChallenge={() => setTreeChallengeOpen(true)}
        />
      )}

      {/* Floating Action Button (Only on Public Pages) */}
      {!isAdmin && (
        <FloatingActionButton 
          onOpenComplaints={() => setComplaintsOpen(true)} 
          onOpenAIAssistant={() => setAiAssistantOpen(true)}
        />
      )}

      {/* Smart AI Ministry Assistant (RAG 2.0 Information Officer) */}
      <AIAssistantModal 
        isOpen={aiAssistantOpen} 
        onClose={() => setAiAssistantOpen(false)}
        onOpenComplaints={() => {
          setAiAssistantOpen(false);
          setComplaintsOpen(true);
        }}
      />

      {/* Interactive Complaints Desk Modal */}
      <ComplaintsDeskModal 
        isOpen={complaintsOpen} 
        onClose={() => setComplaintsOpen(false)} 
      />

      {/* World Environment Day "My Tree Challenge" Registration Modal */}
      <TreeChallengeModal 
        isOpen={treeChallengeOpen} 
        onClose={() => setTreeChallengeOpen(false)} 
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
