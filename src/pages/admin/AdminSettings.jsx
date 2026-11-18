import React, { useState } from 'react';
import { Settings, Save, AlertTriangle, ShieldCheck, Mail, Phone, MapPin, Globe, Check } from 'lucide-react';

export default function AdminSettings({ userRole }) {
  const [ministryName, setMinistryName] = useState('Lagos State Ministry of the Environment and Water Resources');
  const [tagline, setTagline] = useState('Eko O Ni Baje — Towards a Cleaner, Greener & Resilient Lagos');
  const [hotline, setHotline] = useState('+234 810 255 3775');
  const [emergencyPhone, setEmergencyPhone] = useState('+234 802 345 6789');
  const [primaryEmail, setPrimaryEmail] = useState('env.wr@lagosstate.gov.ng');
  const [backupEmail, setBackupEmail] = useState('lagosstateministryoftheenviron@gmail.com');
  const [address, setAddress] = useState('Block 16 & 17, The Secretariat, Alausa, Ikeja, Lagos State, Nigeria');
  
  // Public Notice Banner Toggle
  const [noticeActive, setNoticeActive] = useState(true);
  const [noticeTitle, setNoticeTitle] = useState('Executive Order E0/BOS/01: Mandatory Lagos State Health Scheme (LSHS / ILERA EKO) Registration');
  
  // Maintenance Mode Toggle
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const config = {
      ministryName,
      tagline,
      hotline,
      emergencyPhone,
      primaryEmail,
      backupEmail,
      address,
      noticeActive,
      noticeTitle,
      maintenanceMode
    };
    localStorage.setItem('moelagos_site_settings', JSON.stringify(config));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            Portal & Ministry Settings
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure global contact information, dual-email routing, public notice banners, and maintenance status.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
        
        {/* Institutional Identity Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
          <h2 className="font-heading font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-lagos-green" />
            <span>Institutional Identity & Brand</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Official Ministry Name
              </label>
              <input 
                type="text" 
                value={ministryName}
                onChange={(e) => setMinistryName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                State Motto & Vision Tagline
              </label>
              <input 
                type="text" 
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
              />
            </div>
          </div>
        </div>

        {/* Contact & Email Routing Directives */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
          <h2 className="font-heading font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
            <Mail className="w-4 h-4 text-lagos-green" />
            <span>Official Inboxes & Hotlines</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Primary Official Email
              </label>
              <input 
                type="email" 
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Secondary Dispatch Email (Directive)
              </label>
              <input 
                type="email" 
                value={backupEmail}
                onChange={(e) => setBackupEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Official Citizen Hotline
              </label>
              <input 
                type="text" 
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Rainy Season Emergency Line
              </label>
              <input 
                type="text" 
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Secretariat Physical Address
              </label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Public Notice Banner Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-heading font-extrabold text-base text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-lagos-orange" />
              <span>Public Notice Modal & Banners</span>
            </h2>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={noticeActive}
                onChange={(e) => setNoticeActive(e.target.checked)}
                className="w-4 h-4 accent-lagos-green rounded"
              />
              <span className="font-bold text-xs text-gray-800">Enable Popup</span>
            </label>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Public Notice Headline
            </label>
            <input 
              type="text" 
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
            />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-base text-gray-900">
                Maintenance Mode
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Displays a friendly maintenance notice to the general public while administrators remain logged in.
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 accent-lagos-orange rounded"
              />
              <span className="font-bold text-xs text-gray-800">{maintenanceMode ? 'Active' : 'Disabled'}</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-lagos-green hover:bg-[#007043] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
