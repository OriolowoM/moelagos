import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Shield, ShieldAlert, Key, 
  Trash2, Edit3, Search, Filter, CheckCircle2, 
  AlertCircle, X, Check, Lock, Mail, Phone, 
  Calendar, RefreshCw, UserCheck
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Executive Super Administrator',
    username: 'admin',
    email: 'admin@moelagos.gov.ng',
    role: 'Super Administrator',
    phone: '+234 800 000 1111',
    status: 'Active',
    dateAdded: '2026-01-15',
    lastLogin: 'Today, 08:30 AM'
  },
  {
    id: 'usr-2',
    name: 'Tokunbo Wahab (Hon. Commissioner)',
    username: 'tokunbo.wahab',
    email: 'tokunbo.wahab@lagosstate.gov.ng',
    role: 'Super Administrator',
    phone: '+234 802 333 4444',
    status: 'Active',
    dateAdded: '2026-02-01',
    lastLogin: 'Yesterday, 04:15 PM'
  },
  {
    id: 'usr-3',
    name: 'Media & Publicity Directorate',
    username: 'moel',
    email: 'info@moelagos.gov.ng',
    role: 'Administrator',
    phone: '+234 803 555 6666',
    status: 'Active',
    dateAdded: '2026-03-10',
    lastLogin: '2 days ago'
  },
  {
    id: 'usr-4',
    name: 'State House Press Corps',
    username: 'press.corps',
    email: 'press@moelagos.gov.ng',
    role: 'Editor',
    phone: '+234 801 777 8888',
    status: 'Active',
    dateAdded: '2026-04-12',
    lastLogin: '3 days ago'
  },
  {
    id: 'usr-5',
    name: 'Drainage Enforcement Field Unit',
    username: 'field.officer',
    email: 'drainage@moelagos.gov.ng',
    role: 'Author',
    phone: '+234 809 999 0000',
    status: 'Active',
    dateAdded: '2026-06-20',
    lastLogin: '1 week ago'
  },
  {
    id: 'usr-6',
    name: 'Environmental Policy Analyst',
    username: 'policy.contributor',
    email: 'policy@moelagos.gov.ng',
    role: 'Contributor',
    phone: '+234 805 111 2222',
    status: 'Active',
    dateAdded: '2026-08-05',
    lastLogin: '2 weeks ago'
  }
];

export default function AdminUsersManager({ currentUserRole = 'Super Administrator', currentEmail = 'admin@moelagos.gov.ng' }) {
  // Load users from localStorage or initial list
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('moelagos_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [notification, setNotification] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: 'Administrator',
    phone: '',
    password: '',
    confirmPassword: '',
    sendNotification: true
  });

  const [formError, setFormError] = useState('');

  // Persist to localStorage whenever users update
  useEffect(() => {
    localStorage.setItem('moelagos_admin_users', JSON.stringify(users));
  }, [users]);

  // Flash notifications
  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper: count super admins
  const superAdminCount = users.filter(u => u.role === 'Super Administrator').length;

  // Filtered users
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Handle open Add Modal
  const openAddModal = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      role: 'Administrator',
      phone: '',
      password: '',
      confirmPassword: '',
      sendNotification: true
    });
    setFormError('');
    setShowAddModal(true);
  };

  // Handle Save New User
  const handleCreateUser = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim()) {
      setFormError('Please fill in all required fields (Name, Username, Email).');
      return;
    }

    if (!formData.password) {
      setFormError('Please provide a secure password for this user account.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match. Please verify and try again.');
      return;
    }

    // Check username or email collision
    const existing = users.find(u => 
      u.username.toLowerCase() === formData.username.trim().toLowerCase() ||
      u.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (existing) {
      setFormError('A user with this username or email address already exists.');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name.trim(),
      username: formData.username.trim().toLowerCase().replace(/\s+/g, '.'),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      phone: formData.phone.trim() || '+234 800 000 0000',
      status: 'Active',
      dateAdded: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };

    setUsers([newUser, ...users]);
    setShowAddModal(false);
    notify(`New user "${newUser.name}" (${newUser.role}) successfully created.`);
  };

  // Handle open Edit Modal
  const openEditModal = (u) => {
    setEditingUser({ ...u });
    setFormError('');
  };

  // Handle Update User
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!editingUser.name.trim() || !editingUser.email.trim()) {
      setFormError('Name and Email cannot be empty.');
      return;
    }

    // Prevent demoting the only remaining super admin
    if (editingUser.role !== 'Super Administrator') {
      const original = users.find(u => u.id === editingUser.id);
      if (original && original.role === 'Super Administrator' && superAdminCount <= 1) {
        setFormError('Cannot change role: There must be at least one active Super Administrator in the system.');
        return;
      }
    }

    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    notify(`User "${editingUser.name}" details updated.`);
  };

  // Handle Delete User
  const confirmDelete = () => {
    if (!deletingUser) return;

    // Safety: Cannot delete last remaining Super Admin
    if (deletingUser.role === 'Super Administrator' && superAdminCount <= 1) {
      notify('Cannot delete: At least one Super Administrator must remain in the system.', 'error');
      setDeletingUser(null);
      return;
    }

    setUsers(users.filter(u => u.id !== deletingUser.id));
    notify(`User "${deletingUser.name}" has been removed from the portal.`, 'success');
    setDeletingUser(null);
  };

  // Helper for role pill styles
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Administrator':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Administrator':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Editor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Author':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contributor':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner / Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              WordPress-Style Role Control
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {users.length} Registered Accounts
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
            Users & Administrative Roles
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            Manage administrative staff, editorial privileges, super admins, authors, and contributors. Add new staff, modify roles, or remove accounts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition flex items-center gap-2 self-start md:self-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold border ${
          notification.type === 'error' 
            ? 'bg-red-50 text-red-800 border-red-200' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        } animate-fadeIn`}>
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{notification.msg}</span>
          </div>
          <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Role Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Super Admins</span>
            <Shield className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{superAdminCount}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Full unrestricted system control</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Administrators</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">
            {users.filter(u => u.role === 'Administrator').length}
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">Content, complaints & settings</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Editors</span>
            <Edit3 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">
            {users.filter(u => u.role === 'Editor').length}
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">Can publish and edit any post</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Authors & Staff</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">
            {users.filter(u => u.role === 'Author' || u.role === 'Contributor').length}
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">Writers and field contributors</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, username, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
          />
        </div>

        {/* Role Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {['All', 'Super Administrator', 'Administrator', 'Editor', 'Author', 'Contributor'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                roleFilter === role
                  ? 'bg-lagos-green text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {role === 'Super Administrator' ? 'Super Admin' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 sm:px-6">User / Staff Member</th>
                <th className="py-3.5 px-4 sm:px-6">Contact / Email</th>
                <th className="py-3.5 px-4 sm:px-6">Assigned Role</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6">Date Added</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No users found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrentSession = u.email === currentEmail || u.username === 'admin';
                  const initials = u.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

                  return (
                    <tr key={u.id} className="hover:bg-gray-50/60 transition">
                      
                      {/* Name & Username */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 flex items-center gap-2">
                              <span>{u.name}</span>
                              {isCurrentSession && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-gray-500 text-xs font-mono">@{u.username}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email & Phone */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="text-gray-800 font-medium flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span>{u.email}</span>
                        </div>
                        {u.phone && (
                          <div className="text-gray-500 text-xs flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span>{u.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Role Pill */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadge(u.role)}`}>
                          <Shield className="w-3 h-3" />
                          <span>{u.role}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{u.status}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 text-gray-500 text-xs">
                        <div>{u.dateAdded}</div>
                        <div className="text-[11px] text-gray-400">Active: {u.lastLogin}</div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openEditModal(u)}
                            className="p-1.5 text-gray-500 hover:text-lagos-green hover:bg-emerald-50 rounded-lg transition"
                            title="Edit User & Role"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingUser(u)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ADD NEW USER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-lagos-green rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900">Add New Staff / User</h3>
                  <p className="text-xs text-gray-500">Create a new administrative user with assigned privileges</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="mt-5 space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Engr. Babatunde Adeyemi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. b.adeyemi"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    placeholder="b.adeyemi@moelagos.gov.ng"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    User Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green font-semibold"
                  >
                    <option value="Super Administrator">Super Administrator (Full System Control)</option>
                    <option value="Administrator">Administrator (Content & Desk)</option>
                    <option value="Editor">Editor (News & Publications)</option>
                    <option value="Author">Author (Create & Publish Articles)</option>
                    <option value="Contributor">Contributor (Submit Drafts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone / Unit
                  </label>
                  <input
                    type="text"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    required
                  />
                </div>
              </div>

              {/* Generate Password Helper */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const pass = 'Moe' + Math.random().toString(36).slice(-6) + '!2026';
                    setFormData({ ...formData, password: pass, confirmPassword: pass });
                  }}
                  className="text-lagos-green font-bold hover:underline flex items-center gap-1"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Generate Strong Password</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Create User
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900">Edit User Profile</h3>
                  <p className="text-xs text-gray-500">Update staff details, contact information, and role</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingUser(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateUser} className="mt-5 space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editingUser.username}
                    disabled
                    className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green font-semibold"
                  >
                    <option value="Super Administrator">Super Administrator (Full System Control)</option>
                    <option value="Administrator">Administrator (Content & Desk)</option>
                    <option value="Editor">Editor (News & Publications)</option>
                    <option value="Author">Author (Create & Publish Articles)</option>
                    <option value="Contributor">Contributor (Submit Drafts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Account Status
                  </label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone / Extension
                </label>
                <input
                  type="text"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lagos-green/20 focus:border-lagos-green"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 text-center">
            
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="font-heading text-xl font-bold text-gray-900">
              Remove User Account?
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Are you sure you want to remove <span className="font-bold text-gray-900">{deletingUser.name}</span> (@{deletingUser.username})?
            </p>

            {deletingUser.role === 'Super Administrator' && (
              <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 font-semibold">
                Warning: This user holds a <span className="font-bold">Super Administrator</span> role. Removing this account will revoke all system-level permissions.
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Yes, Remove User
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
