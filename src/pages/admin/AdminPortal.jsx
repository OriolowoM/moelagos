import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Newspaper, FileText, Layers, 
  Users, Download, Image, AlertTriangle, Sliders, 
  Settings, LogOut, Shield, CheckCircle, ChevronRight,
  Menu, X, Lock, Eye, Bell, ArrowLeft, Bot, Sparkles
} from 'lucide-react';

import AdminDashboard from './AdminDashboard';
import AdminNewsManager from './AdminNewsManager';
import AdminPagesManager from './AdminPagesManager';
import AdminProjectsManager from './AdminProjectsManager';
import AdminEnquiriesManager from './AdminEnquiriesManager';
import AdminMediaLibrary from './AdminMediaLibrary';
import AdminUsersManager from './AdminUsersManager';
import AdminAIKnowledgeManager from './AdminAIKnowledgeManager';
import AdminSettings from './AdminSettings';

export default function AdminPortal({ posts, onUpdatePosts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('moelagos_admin_auth') === 'true';
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('moelagos_admin_role') || 'Super Administrator';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('Super Administrator');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter your administrator credentials.');
      return;
    }

    // Check if user exists in saved users
    let determinedRole = loginRole;
    try {
      const savedUsers = JSON.parse(localStorage.getItem('moelagos_admin_users') || '[]');
      const matched = savedUsers.find(u => 
        u.email.toLowerCase() === loginEmail.trim().toLowerCase() ||
        u.username.toLowerCase() === loginEmail.trim().toLowerCase()
      );
      if (matched && matched.role) {
        determinedRole = matched.role;
      }
    } catch (err) {}

    // Authenticate (supports official government formats)
    setIsAuthenticated(true);
    setCurrentRole(determinedRole);
    localStorage.setItem('moelagos_admin_auth', 'true');
    localStorage.setItem('moelagos_admin_role', determinedRole);
    localStorage.setItem('moelagos_admin_email', loginEmail.trim());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('moelagos_admin_auth');
  };

  const navItems = [
    { id: 'dashboard', name: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'news', name: 'News & Publications', icon: Newspaper, badge: posts.length },
    { id: 'pages', name: 'Institutional Pages', icon: FileText, badge: '81' },
    { id: 'projects', name: 'Projects & Infrastructure', icon: Layers, badge: '8' },
    { id: 'enquiries', name: 'Citizen Complaints Desk', icon: AlertTriangle, badge: 'Live' },
    { id: 'ai-knowledge', name: 'AI Assistant & Knowledge', icon: Bot, badge: 'RAG' },
    { id: 'media', name: 'Media Library', icon: Image, badge: '881' },
    { id: 'users', name: 'Users & Roles', icon: Users, badge: 'Staff' },
    { id: 'settings', name: 'Portal Settings', icon: Settings }
  ];

  // If not logged in, show Executive Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003822] via-[#004d2e] to-[#002818] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-emerald-900/30 overflow-hidden animate-scaleUp">
          
          {/* Header */}
          <div className="bg-[#004d2e] p-8 text-white text-center border-b border-emerald-700/60">
            <div className="w-16 h-16 rounded-2xl bg-white/10 p-2 mx-auto mb-4 border border-emerald-400/30 flex items-center justify-center">
              <img 
                src="/moe-logo.png" 
                alt="Lagos State Emblem"
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png";
                }}
              />
            </div>

            <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Lagos State Government
            </div>
            <h1 className="font-heading text-xl font-extrabold mt-1">
              Ministry Administrative CMS
            </h1>
            <p className="text-xs text-emerald-100/80 mt-1">
              Secure Central Management Portal (MOE&WR)
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Staff Email / Username
              </label>
              <input 
                type="text" 
                placeholder="admin@moelagos.gov.ng or moel"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Secret Access Key / Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Authorised Role Scope
              </label>
              <select 
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              >
                <option value="Super Administrator">Super Administrator (Full System Control)</option>
                <option value="Administrator">Administrator (Content & Complaints)</option>
                <option value="Editor">Editor (News & Publications)</option>
                <option value="Contributor">Contributor (Draft Articles Only)</option>
              </select>
            </div>

            {/* Quick-Fill Helper for Localhost / Demo */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-950 block">Default Admin Login:</span>
                <span className="text-gray-600 font-mono text-[11px]">admin@moelagos.gov.ng / admin123</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@moelagos.gov.ng');
                  setLoginPassword('admin123');
                  setLoginError('');
                }}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] transition shadow-2xs"
              >
                Auto-Fill
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Authenticate Staff Portal</span>
            </button>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-gray-500 hover:text-lagos-green transition flex items-center justify-center gap-1 font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col antialiased">
      
      {/* Top Administrative Bar */}
      <header className="bg-[#004d2e] text-white border-b border-[#00683e] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="/moe-logo.png" 
                alt="Logo"
                className="h-8 w-auto object-contain bg-white/10 rounded p-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://moelagos.gov.ng/wp-content/uploads/2019/12/moe-logo.png";
                }}
              />
              <div className="hidden sm:block">
                <div className="text-xs font-bold leading-tight tracking-wider uppercase text-emerald-300">
                  MOE&WR Lagos
                </div>
                <div className="text-[10px] text-emerald-100 font-medium">
                  Administrative CMS
                </div>
              </div>
            </Link>
          </div>

          {/* User Profile & Role Selector */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden md:inline text-emerald-200 font-medium">Role:</span>
              <select 
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value);
                  localStorage.setItem('moelagos_admin_role', e.target.value);
                }}
                className="bg-emerald-950/80 border border-emerald-700 text-white rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none"
              >
                <option value="Super Administrator">Super Administrator</option>
                <option value="Administrator">Administrator</option>
                <option value="Editor">Editor</option>
                <option value="Contributor">Contributor</option>
              </select>
            </div>

            <Link 
              to="/" 
              target="_blank"
              className="text-xs bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white px-3 py-1.5 rounded-lg transition font-semibold flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 text-emerald-300 hover:text-red-300 transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav (Desktop + Mobile Drawer) */}
        <aside className={`md:w-64 flex-shrink-0 ${
          mobileNavOpen ? 'block' : 'hidden md:block'
        }`}>
          <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-1.5 sticky top-24">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              CMS Operations
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-lagos-green text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="flex-grow min-w-0">
          {activeTab === 'dashboard' && (
            <AdminDashboard 
              posts={posts} 
              onNavigate={(tab) => setActiveTab(tab)} 
              userRole={currentRole}
            />
          )}

          {activeTab === 'news' && (
            <AdminNewsManager 
              posts={posts} 
              onUpdatePosts={onUpdatePosts}
              userRole={currentRole}
            />
          )}

          {activeTab === 'pages' && (
            <AdminPagesManager 
              userRole={currentRole}
            />
          )}

          {activeTab === 'projects' && (
            <AdminProjectsManager 
              userRole={currentRole}
            />
          )}

          {activeTab === 'enquiries' && (
            <AdminEnquiriesManager 
              userRole={currentRole}
            />
          )}

          {activeTab === 'ai-knowledge' && (
            <AdminAIKnowledgeManager 
              userRole={currentRole}
            />
          )}

          {activeTab === 'media' && (
            <AdminMediaLibrary 
              userRole={currentRole}
            />
          )}

          {activeTab === 'users' && (
            <AdminUsersManager 
              currentUserRole={currentRole}
              currentEmail={localStorage.getItem('moelagos_admin_email') || loginEmail || 'admin@moelagos.gov.ng'}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings 
              userRole={currentRole}
            />
          )}
        </main>

      </div>

    </div>
  );
}
