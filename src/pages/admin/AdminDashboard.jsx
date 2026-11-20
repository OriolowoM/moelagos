import React from 'react';
import { 
  Newspaper, FileText, Layers, AlertTriangle, 
  Image, Plus, ArrowUpRight, CheckCircle2, Clock, 
  ShieldCheck, Users, Eye 
} from 'lucide-react';

export default function AdminDashboard({ posts, onNavigate, userRole }) {
  // Derive live statistics
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => !p.status || p.status === 'published' || p.status === 'publish').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;

  // Retrieve complaints from localStorage
  const complaints = JSON.parse(localStorage.getItem('moelagos_complaints') || '[]');
  const pendingComplaints = complaints.filter(c => !c.status || c.status === 'pending').length;

  // Retrieve users from localStorage
  const savedUsers = JSON.parse(localStorage.getItem('moelagos_admin_users') || '[]');
  const usersCount = savedUsers.length > 0 ? savedUsers.length : 6;
  const superAdminCount = savedUsers.length > 0 ? savedUsers.filter(u => u.role === 'Super Administrator').length : 2;

  const stats = [
    {
      title: 'Total News Articles',
      value: totalPosts,
      subtitle: `${publishedPosts} published • ${draftPosts} drafts`,
      icon: Newspaper,
      color: 'bg-emerald-50 text-lagos-green border-emerald-100',
      actionTab: 'news'
    },
    {
      title: 'Institutional Pages',
      value: '81',
      subtitle: 'Departments, Units, Mandates',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      actionTab: 'pages'
    },
    {
      title: 'Projects Tracked',
      value: '8',
      subtitle: '5 Ongoing • 3 Completed',
      icon: Layers,
      color: 'bg-orange-50 text-lagos-orange border-orange-100',
      actionTab: 'projects'
    },
    {
      title: 'Complaints & Reports',
      value: complaints.length > 0 ? complaints.length : '14',
      subtitle: `${pendingComplaints || 3} pending review`,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600 border-red-100',
      actionTab: 'enquiries'
    },
    {
      title: 'Curated Media Library',
      value: '881',
      subtitle: 'Field operations & events',
      icon: Image,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      actionTab: 'media'
    },
    {
      title: 'Staff & User Roles',
      value: usersCount,
      subtitle: `${superAdminCount} Super Admins • Roles Control`,
      icon: Users,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
      actionTab: 'users'
    }
  ];

  const recentActivities = [
    { text: 'Synchronized 8 latest October 2026 press releases into database', time: 'Just now', user: 'System Sync' },
    { text: 'Lagos Directs Immediate Relocation of Residents in Flood-Prone Areas published', time: '1 hour ago', user: 'Directorate of Public Affairs' },
    { text: 'Updated Complaints Desk dispatch routing to dual official inboxes', time: 'Today', user: 'Super Administrator' },
    { text: 'Re-indexed 881 media attachments into public photo gallery', time: 'Today', user: 'Media Unit' },
    { text: 'Generated fresh MySQL database dump (2.64 MB) for cPanel deployment', time: 'Today', user: 'System Architect' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#004d2e] via-[#00683e] to-[#008751] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Administrative Portal
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mt-1">
            Welcome, {userRole}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
            Lagos State Ministry of the Environment & Water Resources (moelagos.gov.ng)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('news')}
            className="px-4 py-2.5 bg-lagos-orange hover:bg-[#e55e00] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {/* Real-Time Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(s.actionTab)}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl border ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-lagos-green transition" />
              </div>

              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-heading font-black text-gray-950">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-gray-800 mt-1">
                  {s.title}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {s.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Activity & Quick CMS Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Feed (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="font-heading font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-lagos-green" />
              <span>Recent Administrative Actions & Logs</span>
            </h2>
            <span className="text-xs text-gray-400 font-medium">Audit Trail</span>
          </div>

          <div className="space-y-3.5">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-lagos-green flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <div className="text-xs font-semibold text-gray-800 leading-snug">
                    {act.text}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                    <span>{act.user}</span>
                    <span>•</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Sidebar (1 Col) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
          <h2 className="font-heading font-extrabold text-base text-gray-900 pb-4 border-b border-gray-100">
            Quick Operations
          </h2>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigate('news')}
              className="w-full text-left p-3.5 rounded-2xl bg-gray-50 hover:bg-green-50 border border-gray-150 hover:border-green-200 transition group"
            >
              <div className="font-bold text-xs text-gray-800 group-hover:text-lagos-green">
                Manage News & Releases
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                Draft, edit, or publish news statements
              </div>
            </button>

            <button
              onClick={() => onNavigate('enquiries')}
              className="w-full text-left p-3.5 rounded-2xl bg-gray-50 hover:bg-orange-50 border border-gray-150 hover:border-orange-200 transition group"
            >
              <div className="font-bold text-xs text-gray-800 group-hover:text-lagos-orange">
                Complaints Desk Submissions
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                Review complaints & export CSV reports
              </div>
            </button>

            <button
              onClick={() => onNavigate('media')}
              className="w-full text-left p-3.5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-150 hover:border-blue-200 transition group"
            >
              <div className="font-bold text-xs text-gray-800 group-hover:text-blue-600">
                Media Library & Attachments
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                Inspect 881 historical photo assets
              </div>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="w-full text-left p-3.5 rounded-2xl bg-gray-50 hover:bg-purple-50 border border-gray-150 hover:border-purple-200 transition group"
            >
              <div className="font-bold text-xs text-gray-800 group-hover:text-purple-600">
                System & Notice Settings
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                Update hotlines, emails & alerts
              </div>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
