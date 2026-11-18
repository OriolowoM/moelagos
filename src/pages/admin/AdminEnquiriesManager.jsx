import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Search, Filter, Download, 
  CheckCircle2, Clock, Phone, Mail, MapPin, 
  FileText, ExternalLink, X, ChevronRight 
} from 'lucide-react';

export default function AdminEnquiriesManager({ userRole }) {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeComplaint, setActiveComplaint] = useState(null);

  // Load complaints from localStorage with sample default data if empty
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('moelagos_complaints') || '[]');
      if (stored.length === 0) {
        const samples = [
          {
            trackingRef: 'LASG-MOE-2026-8421',
            fullName: 'Alhaji Rasheed Balogun',
            phone: '+234 802 311 4455',
            email: 'r.balogun@gmail.com',
            lga: 'Kosofe',
            landmark: 'Near Ketu-Alapere canal bridge',
            category: 'Drainage & Flooding Concerns',
            description: 'Canal silt build-up causing stormwater backflow during the recent heavy rainfall.',
            status: 'pending',
            emailsDispatchedTo: 'lagosstateministryoftheenviron@gmail.com, env.wr@lagosstate.gov.ng',
            submittedAt: '2026-10-22T09:30:00Z'
          },
          {
            trackingRef: 'LASG-MOE-2026-6190',
            fullName: 'Mrs. Funke Adeyemi',
            phone: '+234 818 900 1234',
            email: 'adeyemi.f@yahoo.com',
            lga: 'Ikeja',
            landmark: 'Alade Market axis, Allen Avenue',
            category: 'Illegal Waste Dumping / PSP Issues',
            description: 'PSP truck has not collected commercial refuse for two weeks, resulting in roadside spillage.',
            status: 'dispatched',
            emailsDispatchedTo: 'lagosstateministryoftheenviron@gmail.com, env.wr@lagosstate.gov.ng',
            submittedAt: '2026-10-21T14:15:00Z'
          },
          {
            trackingRef: 'LASG-MOE-2026-3304',
            fullName: 'Engr. Emeka Okafor',
            phone: '+234 803 777 8899',
            email: 'e.okafor@eng-consult.ng',
            lga: 'Eti-Osa',
            landmark: 'Lekki Phase 1, Admirality Way',
            category: 'EIA Review & Environmental Clearance',
            description: 'Application for statutory EIA site audit and environmental clearance verification.',
            status: 'in_review',
            emailsDispatchedTo: 'lagosstateministryoftheenviron@gmail.com, env.wr@lagosstate.gov.ng',
            submittedAt: '2026-10-20T11:00:00Z'
          }
        ];
        localStorage.setItem('moelagos_complaints', JSON.stringify(samples));
        setComplaints(samples);
      } else {
        setComplaints(stored);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleStatusChange = (trackingRef, newStatus) => {
    const updated = complaints.map(c => {
      if (c.trackingRef === trackingRef) {
        return { ...c, status: newStatus };
      }
      return c;
    });
    setComplaints(updated);
    localStorage.setItem('moelagos_complaints', JSON.stringify(updated));
    if (activeComplaint && activeComplaint.trackingRef === trackingRef) {
      setActiveComplaint({ ...activeComplaint, status: newStatus });
    }
  };

  const filtered = complaints.filter(c => {
    const matchesSearch = (c.trackingRef || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.lga || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || (c.status || 'pending') === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Export to CSV Functionality
  const exportToCsv = () => {
    if (complaints.length === 0) {
      alert('No complaints to export.');
      return;
    }

    const headers = ['Tracking Ref', 'Full Name', 'Phone', 'Email', 'LGA', 'Landmark', 'Category', 'Description', 'Status', 'Emails Dispatched To', 'Date Submitted'];
    const rows = complaints.map(c => [
      `"${c.trackingRef || ''}"`,
      `"${(c.fullName || '').replace(/"/g, '""')}"`,
      `"${c.phone || ''}"`,
      `"${c.email || ''}"`,
      `"${c.lga || ''}"`,
      `"${(c.landmark || '').replace(/"/g, '""')}"`,
      `"${(c.category || '').replace(/"/g, '""')}"`,
      `"${(c.description || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${c.status || 'pending'}"`,
      `"${c.emailsDispatchedTo || ''}"`,
      `"${c.submittedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moelagos_complaints_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Export Button */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            Citizen Complaints & Public Enquiries Desk
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time feed of citizen drainage reports, waste dumping issues, and EIA inquiries.
          </p>
        </div>

        <button
          onClick={exportToCsv}
          className="px-4 py-2.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-2 whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Export All to CSV</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by tracking code (e.g. LASG-MOE-2026-XXXX), complainant name, or LGA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="dispatched">Dispatched</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints List Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4 sm:px-6">Tracking Ref</th>
                <th className="py-3.5 px-4">Complainant</th>
                <th className="py-3.5 px-4">LGA & Landmark</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 transition cursor-pointer" onClick={() => setActiveComplaint(item)}>
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-lagos-green whitespace-nowrap">
                    {item.trackingRef}
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900">{item.fullName}</div>
                    <div className="text-[11px] text-gray-400">{item.phone}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-800">{item.lga} LGA</div>
                    <div className="text-[11px] text-gray-500 truncate max-w-xs">{item.landmark}</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="bg-orange-50 text-lagos-orange text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      item.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'in_review' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status || 'pending'}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveComplaint(item); }}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[11px] transition"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {activeComplaint && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Official Report Details</span>
                <h2 className="font-mono font-black text-lg text-lagos-green">
                  {activeComplaint.trackingRef}
                </h2>
              </div>
              <button onClick={() => setActiveComplaint(null)} className="p-1 text-gray-400 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-150">
                <div>
                  <span className="text-gray-400 font-bold uppercase">Complainant:</span>
                  <div className="font-bold text-gray-900 mt-0.5">{activeComplaint.fullName}</div>
                  <div className="text-gray-600 mt-0.5">{activeComplaint.phone}</div>
                  {activeComplaint.email && <div className="text-gray-600">{activeComplaint.email}</div>}
                </div>

                <div>
                  <span className="text-gray-400 font-bold uppercase">Location:</span>
                  <div className="font-bold text-gray-900 mt-0.5">{activeComplaint.lga} LGA</div>
                  <div className="text-gray-600 mt-0.5">{activeComplaint.landmark}</div>
                </div>
              </div>

              <div>
                <span className="text-gray-400 font-bold uppercase">Category:</span>
                <div className="font-bold text-lagos-orange mt-0.5">{activeComplaint.category}</div>
              </div>

              <div>
                <span className="text-gray-400 font-bold uppercase">Complaint Description:</span>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-800 mt-1 leading-relaxed">
                  {activeComplaint.description}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px]">
                <strong>Dispatched To:</strong> {activeComplaint.emailsDispatchedTo}
              </div>

              {/* Status Update Control */}
              <div className="pt-2">
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Update Investigation / Resolution Status:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'in_review', 'dispatched', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(activeComplaint.trackingRef, st)}
                      className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[10px] transition ${
                        (activeComplaint.status || 'pending') === st
                          ? 'bg-lagos-green text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-150 flex justify-end">
              <button
                onClick={() => setActiveComplaint(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
