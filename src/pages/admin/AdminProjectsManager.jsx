import React, { useState } from 'react';
import { Layers, Plus, Edit3, Trash2, CheckCircle, Clock, MapPin, X } from 'lucide-react';
import initialProjects from '../../data/projects.json';

export default function AdminProjectsManager({ userRole }) {
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Stormwater Drainage');
  const [formLocation, setFormLocation] = useState('');
  const [formStatus, setFormStatus] = useState('Ongoing');
  const [formCompletion, setFormCompletion] = useState(75);
  const [formTarget, setFormTarget] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('/uploads/2024/07/canal-clearing.jpg');

  const openCreateModal = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormTitle('');
    setFormCategory('Stormwater Drainage');
    setFormLocation('Ikeja / Kosofe LGA');
    setFormStatus('Ongoing');
    setFormCompletion(50);
    setFormTarget('De-flooding catchment corridors');
    setFormDesc('');
    setFormImage('/uploads/2024/07/canal-clearing.jpg');
  };

  const openEditModal = (proj) => {
    setIsCreating(false);
    setEditingProject(proj);
    setFormTitle(proj.title);
    setFormCategory(proj.category);
    setFormLocation(proj.location);
    setFormStatus(proj.status);
    setFormCompletion(proj.completion);
    setFormTarget(proj.target);
    setFormDesc(proj.description);
    setFormImage(proj.image);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isCreating) {
      const newProj = {
        id: Date.now(),
        title: formTitle,
        category: formCategory,
        location: formLocation,
        status: formStatus,
        completion: Number(formCompletion),
        target: formTarget,
        description: formDesc,
        image: formImage
      };
      setProjectsList([newProj, ...projectsList]);
    } else if (editingProject) {
      setProjectsList(projectsList.map(p => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: formTitle,
            category: formCategory,
            location: formLocation,
            status: formStatus,
            completion: Number(formCompletion),
            target: formTarget,
            description: formDesc,
            image: formImage
          };
        }
        return p;
      }));
    }
    setIsCreating(false);
    setEditingProject(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this infrastructure project?')) {
      setProjectsList(projectsList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900">
            Projects & Infrastructure Manager
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track canal dredging, deflooding systems, MRFs, and LASPARK urban greening.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-lagos-green hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsList.map((proj) => {
          const isDone = proj.status === 'Completed';
          return (
            <div 
              key={proj.id}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                    {proj.category}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {isDone ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{proj.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-black text-base text-gray-950 group-hover:text-lagos-green transition">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-lagos-green" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {proj.description}
                </p>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-500">Completion</span>
                    <span className={isDone ? 'text-emerald-600' : 'text-lagos-orange'}>{proj.completion}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isDone ? 'bg-emerald-500' : 'bg-lagos-orange'}`}
                      style={{ width: `${proj.completion}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400">Target: {proj.target}</span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="font-heading font-black text-lg text-gray-950">
                {isCreating ? 'Add Infrastructure Project' : 'Edit Project Details'}
              </h2>
              <button onClick={() => { setIsCreating(false); setEditingProject(null); }} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input 
                  type="text" 
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Sector
                  </label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  >
                    <option value="Stormwater Drainage">Stormwater Drainage</option>
                    <option value="Urban Greening">Urban Greening</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Sanitation & Hygiene">Sanitation & Hygiene</option>
                    <option value="Environmental Protection">Environmental Protection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Location (LGA / Ward)
                </label>
                <input 
                  type="text" 
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Completion Percentage ({formCompletion}%)
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100"
                  value={formCompletion}
                  onChange={(e) => setFormCompletion(e.target.value)}
                  className="w-full accent-lagos-green"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Target Objective
                </label>
                <input 
                  type="text" 
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Project Description
                </label>
                <textarea 
                  rows="3"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-gray-150 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingProject(null); }}
                  className="px-4 py-2 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-lagos-green text-white rounded-xl font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
