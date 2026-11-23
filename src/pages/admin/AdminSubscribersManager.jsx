import React, { useState, useEffect } from 'react';
import { 
  Mail, Trees, Search, Download, Trash2, CheckCircle2, 
  Calendar, MapPin, User, Phone, ShieldCheck, RefreshCw, AlertCircle
} from 'lucide-react';

export default function AdminSubscribersManager({ userRole }) {
  const [activeSubTab, setActiveSubTab] = useState('newsletter'); // 'newsletter' | 'treeChallenge'
  const [newsletterList, setNewsletterList] = useState([]);
  const [treeList, setTreeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Initial fetch and synchronization
  useEffect(() => {
    fetchSubscribers();
    fetchTreeRegistrations();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter.php?action=list');
      if (res.ok) {
        const data = await res.json();
        if (data.subscribers && Array.isArray(data.subscribers)) {
          setNewsletterList(data.subscribers);
          localStorage.setItem('moelagos_subscribers', JSON.stringify(data.subscribers));
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend list fetch error, loading localStorage:', e);
    }

    // LocalStorage fallback / sample records
    try {
      const stored = JSON.parse(localStorage.getItem('moelagos_subscribers') || '[]');
      if (stored.length === 0) {
        const initialSamples = [
          { email: 'citizen.feedback@lagosstate.gov.ng', date: '2026-11-20T10:15:00Z', status: 'Active' },
          { email: 'adeyemi.sustainability@ecoafrica.org', date: '2026-11-21T14:30:00Z', status: 'Active' },
          { email: 'folashade.lawal@unilag.edu.ng', date: '2026-11-22T08:45:00Z', status: 'Active' },
          { email: 'babajide.okunola@chamberofcommerce.ng', date: '2026-11-23T11:20:00Z', status: 'Active' }
        ];
        localStorage.setItem('moelagos_subscribers', JSON.stringify(initialSamples));
        setNewsletterList(initialSamples);
      } else {
        setNewsletterList(stored);
      }
    } catch (err) {}
    setLoading(false);
  };

  const fetchTreeRegistrations = async () => {
    try {
      const res = await fetch('/api/tree_challenge.php?action=list');
      if (res.ok) {
        const data = await res.json();
        if (data.registrations && Array.isArray(data.registrations)) {
          setTreeList(data.registrations);
          localStorage.setItem('moelagos_tree_challenge_registrations', JSON.stringify(data.registrations));
          return;
        }
      }
    } catch (e) {
      console.warn('Backend tree list fetch error:', e);
    }

    // LocalStorage fallback / sample records
    try {
      const stored = JSON.parse(localStorage.getItem('moelagos_tree_challenge_registrations') || '[]');
      if (stored.length === 0) {
        const initialTrees = [
          {
            regId: 'LASG-TREE-2026-4819',
            fullName: 'Oluwaseun Balogun',
            category: 'Individual Resident',
            lga: 'Ikeja',
            email: 'o.balogun@gmail.com',
            phone: '+234 803 219 8840',
            species: 'Neem / Dongoyaro (Azadirachta indica)',
            plantingAddress: '14 Allen Avenue, Ikeja',
            submittedAt: '2026-11-22T12:00:00Z'
          },
          {
            regId: 'LASG-TREE-2026-8924',
            fullName: 'Green Horizon Secondary School Club',
            category: 'School / Academic Institution',
            lga: 'Alimosho',
            email: 'greenclub@greenhorizon.edu.ng',
            phone: '+234 812 555 0192',
            species: 'Indigenous African Mahogany',
            plantingAddress: 'School Quadrangle, Egbeda-Idimu Road',
            submittedAt: '2026-11-23T09:15:00Z'
          }
        ];
        localStorage.setItem('moelagos_tree_challenge_registrations', JSON.stringify(initialTrees));
        setTreeList(initialTrees);
      } else {
        setTreeList(stored);
      }
    } catch (err) {}
  };

  // Export Newsletter CSV
  const exportNewsletterCSV = () => {
    const headers = ['Email Address,Subscription Date,Status'];
    const rows = newsletterList.map(s => {
      const d = s.date ? new Date(s.date).toISOString().replace('T', ' ').substring(0, 19) : 'N/A';
      return `"${s.email}","${d}","${s.status || 'Active'}"`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moelagos_newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Tree Challenge CSV
  const exportTreeCSV = () => {
    const headers = ['Participant ID,Full Name,Category,LGA,Email,Phone,Tree Species,Planting Address,Date Registered'];
    const rows = treeList.map(t => {
      const d = t.submittedAt ? new Date(t.submittedAt).toISOString().replace('T', ' ').substring(0, 19) : 'N/A';
      return `"${t.regId || ''}","${t.fullName || ''}","${t.category || ''}","${t.lga || ''}","${t.email || ''}","${t.phone || ''}","${t.species || ''}","${(t.plantingAddress || '').replace(/"/g, '""')}","${d}"`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moelagos_tree_challenge_participants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteSubscriber = (email) => {
    if (userRole !== 'Super Administrator' && userRole !== 'Editor') {
      alert('Only administrators or editors may delete subscriber records.');
      return;
    }
    if (!confirm(`Are you sure you want to remove ${email} from the mailing list?`)) return;
    const updated = newsletterList.filter(s => s.email !== email);
    setNewsletterList(updated);
    localStorage.setItem('moelagos_subscribers', JSON.stringify(updated));
    setNotification(`Subscriber ${email} removed.`);
    setTimeout(() => setNotification(''), 3000);
  };

  // Filtered lists
  const filteredNewsletter = newsletterList.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTree = treeList.filter(t => 
    (t.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.regId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.lga || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner & Tab Switcher */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-lagos-green mb-1">
            Community Engagement & Public Subscriptions
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">
            Citizen Subscribers &amp; Registrations
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage official newsletter subscribers and participants of the World Environment Day "My Tree Challenge".
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveSubTab('newsletter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'newsletter'
                ? 'bg-white text-lagos-green shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Newsletter ({newsletterList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('treeChallenge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'treeChallenge'
                ? 'bg-white text-lagos-green shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trees className="w-4 h-4 text-emerald-600" />
            <span>Tree Challenge ({treeList.length})</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Control Bar: Search & Export */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeSubTab === 'newsletter' ? "Search subscribers by email..." : "Search by name, ID, LGA, email..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-lagos-green"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={activeSubTab === 'newsletter' ? fetchSubscribers : fetchTreeRegistrations}
            title="Refresh List"
            className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={activeSubTab === 'newsletter' ? exportNewsletterCSV : exportTreeCSV}
            className="inline-flex items-center gap-2 bg-lagos-green hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NEWSLETTER SUBSCRIBERS */}
      {activeSubTab === 'newsletter' && (
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50/60 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Showing {filteredNewsletter.length} registered subscribers</span>
            <span className="font-semibold text-lagos-green">Notifications dispatched to: Env.wr@lagosstate.gov.ng</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">Subscriber Email</th>
                  <th className="px-6 py-3.5">Date Subscribed</th>
                  <th className="px-6 py-3.5">Delivery Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNewsletter.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                      No subscribers found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredNewsletter.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-lagos-green flex items-center justify-center flex-shrink-0">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span>{sub.email}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {sub.date ? new Date(sub.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active / Subscribed</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(sub.email)}
                          title="Remove Subscriber"
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MY TREE CHALLENGE REGISTRATIONS */}
      {activeSubTab === 'treeChallenge' && (
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50/60 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Showing {filteredTree.length} registered participants (₦6.5M Prize Pool)</span>
            <span className="font-semibold text-emerald-700">Flagship Campaign: World Environment Day 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">Participant ID</th>
                  <th className="px-6 py-3.5">Full Name &amp; Category</th>
                  <th className="px-6 py-3.5">LGA / Planting Location</th>
                  <th className="px-6 py-3.5">Tree Species Chosen</th>
                  <th className="px-6 py-3.5">Contact Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTree.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                      No tree registrations found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredTree.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition">
                      <td className="px-6 py-4 font-mono font-bold text-lagos-green">
                        {item.regId || `LASG-TREE-2026-${1000 + idx}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{item.fullName}</div>
                        <div className="text-[10px] text-gray-400">{item.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{item.lga} LGA</div>
                        <div className="text-[10px] text-gray-500 truncate max-w-xs">{item.plantingAddress}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-medium text-[11px]">
                          {item.species}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{item.email}</span>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-1 text-[11px]">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
