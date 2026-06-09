'use client'

import { useState, useEffect, useRef } from 'react'
import {
  type ResumeData,
  getDefaultResume,
  getSampleResume,
  generateId,
  type Experience,
  type Education,
  type Project,
  type Certification,
  type Language
} from './utils'
import { Plus, Trash2, Download, Settings2, FileText, Briefcase, GraduationCap, Code, User, FileOutput, LayoutTemplate, Palette, Type, Maximize2, RefreshCw, Upload, DownloadCloud, Languages, Award, Folders, X } from 'lucide-react'
import { TEMPLATES, renderTemplate, type TemplateId } from './templates'

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData | null>(null)
  const [template, setTemplate] = useState<TemplateId>('modern')
  const [themeColor, setThemeColor] = useState<string>('indigo')
  const [fontFamily, setFontFamily] = useState<string>('sans')
  const [spacing, setSpacing] = useState<'compact' | 'normal' | 'spacious'>('normal')
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem('quickutils_resume_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setData(parsed.data || getDefaultResume())
        if (parsed.settings) {
          setTemplate(parsed.settings.template || 'modern')
          setThemeColor(parsed.settings.themeColor || 'indigo')
          setFontFamily(parsed.settings.fontFamily || 'sans')
          setSpacing(parsed.settings.spacing || 'normal')
        }
      } catch (e) {
        setData(getDefaultResume())
      }
    } else {
      setData(getDefaultResume())
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem('quickutils_resume_data', JSON.stringify({
        data,
        settings: { template, themeColor, fontFamily, spacing }
      }))
    }
  }, [data, template, themeColor, fontFamily, spacing])

  if (!data) return null;

  function updateField<K extends keyof ResumeData>(field: K, value: ResumeData[K]) {
    setData((prev) => prev ? ({ ...prev, [field]: value }) : prev)
  }

  function addArrayItem<K extends 'experience' | 'education' | 'projects' | 'certifications' | 'languages'>(
    field: K,
    newItem: any
  ) {
    setData((prev) => prev ? ({
      ...prev,
      [field]: [...prev[field], newItem],
    }) : prev)
  }

  function updateArrayItem<K extends 'experience' | 'education' | 'projects' | 'certifications' | 'languages'>(
    field: K,
    id: string,
    key: string,
    value: any
  ) {
    setData((prev) => prev ? ({
      ...prev,
      [field]: prev[field].map((item: any) => (item.id === id ? { ...item, [key]: value } : item)),
    }) : prev)
  }

  function removeArrayItem<K extends 'experience' | 'education' | 'projects' | 'certifications' | 'languages'>(
    field: K,
    id: string
  ) {
    setData((prev) => prev ? ({
      ...prev,
      [field]: prev[field].filter((item: any) => item.id !== id),
    }) : prev)
  }

  function loadSample() {
    if (confirm('This will replace your current resume data. Continue?')) {
      setData(getSampleResume())
    }
  }

  function clearData() {
    if (confirm('Are you sure you want to clear all data?')) {
      setData(getDefaultResume())
    }
  }

  function handlePrint() {
    window.print()
  }

  function handleExportJson() {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ data, settings: { template, themeColor, fontFamily, spacing } })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "resume.json";
    link.click();
  }

  function handleImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.data) setData(parsed.data);
        if (parsed.settings) {
          setTemplate(parsed.settings.template || 'modern');
          setThemeColor(parsed.settings.themeColor || 'indigo');
          setFontFamily(parsed.settings.fontFamily || 'sans');
          setSpacing(parsed.settings.spacing || 'normal');
        }
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset
  }

  const skillsList = data.skills.split(',').map(s => s.trim()).filter(s => s.length > 0)

  const colors = [
    { id: 'indigo', hex: '#4f46e5' },
    { id: 'emerald', hex: '#059669' },
    { id: 'blue', hex: '#2563eb' },
    { id: 'rose', hex: '#e11d48' },
    { id: 'violet', hex: '#7c3aed' },
    { id: 'amber', hex: '#d97706' },
    { id: 'slate', hex: '#475569' },
    { id: 'crimson', hex: '#be123c' },
  ]

  const fonts = [
    { id: 'sans', name: 'Modern Sans' },
    { id: 'serif', name: 'Classic Serif' },
    { id: 'mono', name: 'Tech Mono' },
  ]

  return (
    <div className="w-full mx-auto print:p-0">
      <div className="mb-10 text-center print:hidden">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full mb-4">
          <FileText size={14} /> Career Tool
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Professional Resume Builder
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button onClick={loadSample} className="px-4 py-2 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition flex items-center gap-2">
            <RefreshCw size={14} /> Load Sample Data
          </button>
          <button onClick={clearData} className="px-4 py-2 text-sm font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition flex items-center gap-2">
            <Trash2 size={14} /> Clear All
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2">
            <Upload size={14} /> Import JSON
          </button>
          <input type="file" accept=".json" ref={fileInputRef} onChange={handleImportJson} className="hidden" />
          <button onClick={handleExportJson} className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2">
            <DownloadCloud size={14} /> Export JSON
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Editor Pane */}
        <div className="w-full xl:w-[400px] 2xl:w-[450px] flex-shrink-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8 print:hidden transition-all h-[900px] overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 mb-6 shrink-0">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'content' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <FileText size={16} /> Edit Content
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'design' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <Settings2 size={16} /> Customize Design
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10 space-y-10">
            {activeTab === 'design' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <LayoutTemplate size={16} className="text-indigo-500" /> Choose Template
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={`p-3 text-sm font-bold rounded-xl border text-left transition-all ${template === t.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Palette size={16} className="text-indigo-500" /> Accent Color
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setThemeColor(c.id)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform ${themeColor === c.id ? 'border-gray-900 dark:border-white scale-110 shadow-md' : 'border-transparent hover:scale-110'}`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={`Select color ${c.id}`}
                      />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Type size={16} className="text-indigo-500" /> Typography
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontFamily(f.id)}
                        className={`p-3 text-sm font-bold rounded-xl border text-center transition-all ${fontFamily === f.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                      >
                        <span className={`block font-${f.id}`}>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Maximize2 size={16} className="text-indigo-500" /> Layout Density
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['compact', 'normal', 'spacious'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpacing(s)}
                        className={`p-3 text-sm font-bold rounded-xl border text-center capitalize transition-all ${spacing === s ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Personal Details */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <User size={16} className="text-indigo-500" /> Personal Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={data.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="text" placeholder="Job Title" value={data.jobTitle} onChange={(e) => updateField('jobTitle', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="email" placeholder="Email Address" value={data.email} onChange={(e) => updateField('email', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="text" placeholder="Phone Number" value={data.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="text" placeholder="Location / Address" value={data.address} onChange={(e) => updateField('address', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="text" placeholder="Website" value={data.website} onChange={(e) => updateField('website', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="text" placeholder="LinkedIn URL" value={data.linkedin} onChange={(e) => updateField('linkedin', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                    <input type="text" placeholder="GitHub URL" value={data.github} onChange={(e) => updateField('github', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                  </div>
                </section>

                {/* Professional Summary */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <FileText size={16} className="text-indigo-500" /> Summary
                  </h4>
                  <textarea placeholder="Write a brief professional summary..." value={data.summary} onChange={(e) => updateField('summary', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm resize-none h-28" />
                </section>

                {/* Experience */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <Briefcase size={16} className="text-indigo-500" /> Experience
                  </h4>
                  <div className="space-y-6">
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="relative p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 group">
                        <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <input type="text" placeholder="Role / Job Title" value={exp.role} onChange={(e) => updateArrayItem('experience', exp.id, 'role', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500 font-medium px-1">Start Date (e.g. 2020-05)</label>
                            <input type="month" value={exp.startDate} onChange={(e) => updateArrayItem('experience', exp.id, 'startDate', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between px-1">
                               <label className="text-xs text-gray-500 font-medium">End Date</label>
                               <label className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">
                                 <input type="checkbox" checked={exp.isCurrent || false} onChange={(e) => updateArrayItem('experience', exp.id, 'isCurrent', e.target.checked)} className="rounded border-gray-300 text-indigo-600" /> Current
                               </label>
                            </div>
                            <input type="month" value={exp.endDate} onChange={(e) => updateArrayItem('experience', exp.id, 'endDate', e.target.value)} disabled={exp.isCurrent} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm disabled:opacity-50" />
                          </div>
                        </div>
                        <textarea placeholder="Describe your responsibilities..." value={exp.description} onChange={(e) => updateArrayItem('experience', exp.id, 'description', e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm resize-none h-24" />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addArrayItem('experience', { id: generateId(), company: '', role: '', startDate: '', endDate: '', description: '', isCurrent: false })} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl hover:bg-indigo-100 transition">
                    <Plus size={16} /> Add Experience
                  </button>
                </section>

                {/* Projects */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <Folders size={16} className="text-indigo-500" /> Projects
                  </h4>
                  <div className="space-y-6">
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="relative p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 group">
                        <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => updateArrayItem('projects', proj.id, 'name', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <input type="text" placeholder="Link (URL)" value={proj.link} onChange={(e) => updateArrayItem('projects', proj.id, 'link', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <input type="text" placeholder="Technologies (e.g. React, Node.js)" value={proj.technologies} onChange={(e) => updateArrayItem('projects', proj.id, 'technologies', e.target.value)} className="w-full md:col-span-2 p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500 font-medium px-1">Start Date</label>
                            <input type="month" value={proj.startDate} onChange={(e) => updateArrayItem('projects', proj.id, 'startDate', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between px-1">
                               <label className="text-xs text-gray-500 font-medium">End Date</label>
                               <label className="flex items-center gap-1 text-xs text-indigo-600 font-medium cursor-pointer">
                                 <input type="checkbox" checked={proj.isCurrent || false} onChange={(e) => updateArrayItem('projects', proj.id, 'isCurrent', e.target.checked)} className="rounded border-gray-300 text-indigo-600" /> Current
                               </label>
                            </div>
                            <input type="month" value={proj.endDate} onChange={(e) => updateArrayItem('projects', proj.id, 'endDate', e.target.value)} disabled={proj.isCurrent} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm disabled:opacity-50" />
                          </div>
                        </div>
                        <textarea placeholder="Describe the project..." value={proj.description} onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm resize-none h-24" />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addArrayItem('projects', { id: generateId(), name: '', technologies: '', link: '', startDate: '', endDate: '', description: '', isCurrent: false })} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl hover:bg-indigo-100 transition">
                    <Plus size={16} /> Add Project
                  </button>
                </section>

                {/* Education */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <GraduationCap size={16} className="text-indigo-500" /> Education
                  </h4>
                  <div className="space-y-6">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="relative p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 group">
                        <button onClick={() => removeArrayItem('education', edu.id)} className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => updateArrayItem('education', edu.id, 'institution', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <input type="text" placeholder="Degree / Certificate" value={edu.degree} onChange={(e) => updateArrayItem('education', edu.id, 'degree', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500 font-medium px-1">Start Date</label>
                            <input type="month" value={edu.startDate} onChange={(e) => updateArrayItem('education', edu.id, 'startDate', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between px-1">
                               <label className="text-xs text-gray-500 font-medium">End Date</label>
                               <label className="flex items-center gap-1 text-xs text-indigo-600 font-medium cursor-pointer">
                                 <input type="checkbox" checked={edu.isCurrent || false} onChange={(e) => updateArrayItem('education', edu.id, 'isCurrent', e.target.checked)} className="rounded border-gray-300 text-indigo-600" /> Current
                               </label>
                            </div>
                            <input type="month" value={edu.endDate} onChange={(e) => updateArrayItem('education', edu.id, 'endDate', e.target.value)} disabled={edu.isCurrent} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm disabled:opacity-50" />
                          </div>
                        </div>
                        <textarea placeholder="Details (GPA, Honors, etc.)" value={edu.description} onChange={(e) => updateArrayItem('education', edu.id, 'description', e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm resize-none h-16" />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addArrayItem('education', { id: generateId(), institution: '', degree: '', startDate: '', endDate: '', description: '', isCurrent: false })} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl hover:bg-indigo-100 transition">
                    <Plus size={16} /> Add Education
                  </button>
                </section>

                {/* Certifications */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <Award size={16} className="text-indigo-500" /> Certifications
                  </h4>
                  <div className="space-y-4">
                    {data.certifications.map((cert) => (
                      <div key={cert.id} className="relative flex gap-3 items-center">
                        <input type="text" placeholder="Name" value={cert.name} onChange={(e) => updateArrayItem('certifications', cert.id, 'name', e.target.value)} className="flex-1 p-2 rounded-lg border border-gray-200 text-sm" />
                        <input type="text" placeholder="Issuer" value={cert.issuer} onChange={(e) => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)} className="flex-1 p-2 rounded-lg border border-gray-200 text-sm" />
                        <input type="month" value={cert.date} onChange={(e) => updateArrayItem('certifications', cert.id, 'date', e.target.value)} className="w-32 p-2 rounded-lg border border-gray-200 text-sm" />
                        <button onClick={() => removeArrayItem('certifications', cert.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addArrayItem('certifications', { id: generateId(), name: '', issuer: '', date: '', link: '', description: '' })} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
                    <Plus size={14} /> Add Certification
                  </button>
                </section>

                {/* Languages */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <Languages size={16} className="text-indigo-500" /> Languages
                  </h4>
                  <div className="space-y-4">
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="relative flex gap-3 items-center">
                        <input type="text" placeholder="Language" value={lang.name} onChange={(e) => updateArrayItem('languages', lang.id, 'name', e.target.value)} className="flex-1 p-2 rounded-lg border border-gray-200 text-sm" />
                        <input type="text" placeholder="Proficiency (e.g. Native, Fluent)" value={lang.proficiency} onChange={(e) => updateArrayItem('languages', lang.id, 'proficiency', e.target.value)} className="flex-1 p-2 rounded-lg border border-gray-200 text-sm" />
                        <button onClick={() => removeArrayItem('languages', lang.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addArrayItem('languages', { id: generateId(), name: '', proficiency: '' })} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
                    <Plus size={14} /> Add Language
                  </button>
                </section>

                {/* Skills */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <Code size={16} className="text-indigo-500" /> Skills
                  </h4>
                  <textarea placeholder="React, TypeScript, Next.js, Node.js (Comma separated)" value={data.skills} onChange={(e) => updateField('skills', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm resize-none h-24" />
                </section>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview / Print Area */}
        <div className="w-full xl:flex-1 sticky top-8 print:w-full print:static print:h-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 mb-4 print:hidden shadow-sm">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 px-2">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>
              Live Preview
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-xl transition-all"
              >
                <Maximize2 size={16} /> Full Screen
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          </div>

          <div id="resume-preview" className="bg-white text-gray-900 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-xl print:shadow-none print:ring-0 print:rounded-none overflow-hidden print:w-full transition-all w-full relative mx-auto max-w-[850px] min-h-[1100px]">
            {renderTemplate(template, { data, skillsList, themeColor, fontFamily, spacing })}
          </div>

          {isFullscreen && (
            <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8 print:hidden">
              <div className="w-full max-w-[900px] relative animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-4 sticky top-4 z-10 bg-gray-900/90 p-4 rounded-2xl backdrop-blur-md border border-gray-700 shadow-2xl">
                   <span className="text-white font-bold">Full Screen Preview</span>
                   <div className="flex gap-2">
                     <button
                       onClick={handlePrint}
                       className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg shadow-lg"
                     >
                       <Download size={16} /> PDF
                     </button>
                     <button
                       onClick={() => setIsFullscreen(false)}
                       className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm rounded-lg"
                     >
                       <X size={16} /> Close
                     </button>
                   </div>
                </div>
                <div className="bg-white text-gray-900 shadow-2xl ring-1 ring-gray-900/5 rounded-xl overflow-hidden w-full relative mx-auto min-h-[1100px]">
                  {renderTemplate(template, { data, skillsList, themeColor, fontFamily, spacing })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
