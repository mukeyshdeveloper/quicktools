'use client'

import { useState, useEffect } from 'react'
import {
  type ResumeData,
  type Experience,
  type Education,
  getDefaultResume,
  generateId,
} from './utils'
import { Plus, Trash2, Download, Settings2, FileText, Briefcase, GraduationCap, Code, User, FileOutput, LayoutTemplate } from 'lucide-react'
import { TEMPLATES, renderTemplate, type TemplateId } from './templates'

function exportHTMLToWord(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const clone = element.cloneNode(true) as HTMLElement;
  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Resume</title>
    <style>
      body { font-family: Arial, sans-serif; }
      h1, h2, h3 { color: #111; }
    </style>
    </head><body>
    ${clone.innerHTML}
    </body></html>
  `;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
  const downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);
  
  // @ts-ignore for IE/Edge
  if(navigator.msSaveOrOpenBlob) {
    // @ts-ignore
    navigator.msSaveOrOpenBlob(blob, filename + '.doc');
  } else {
    downloadLink.href = url;
    downloadLink.download = filename + '.doc';
    downloadLink.click();
  }
  document.body.removeChild(downloadLink);
}

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData | null>(null)
  const [template, setTemplate] = useState<TemplateId>('minimal')

  useEffect(() => {
    setData(getDefaultResume())
  }, [])

  if (!data) return null;

  function updateField<K extends keyof ResumeData>(field: K, value: ResumeData[K]) {
    setData((prev) => prev ? ({ ...prev, [field]: value }) : prev)
  }

  function addExperience() {
    setData((prev) => prev ? ({
      ...prev,
      experience: [...prev.experience, { id: generateId(), company: '', role: '', startDate: '', endDate: '', description: '' }],
    }) : prev)
  }

  function updateExperience(id: string, field: keyof Experience, value: string | boolean) {
    setData((prev) => prev ? ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }) : prev)
  }

  function removeExperience(id: string) {
    setData((prev) => prev ? ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }) : prev)
  }

  function addEducation() {
    setData((prev) => prev ? ({
      ...prev,
      education: [...prev.education, { id: generateId(), institution: '', degree: '', startDate: '', endDate: '', description: '' }],
    }) : prev)
  }

  function updateEducation(id: string, field: keyof Education, value: string | boolean) {
    setData((prev) => prev ? ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }) : prev)
  }

  function removeEducation(id: string) {
    setData((prev) => prev ? ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }) : prev)
  }

  function handlePrint() {
    window.print()
  }

  function handleWordExport() {
    exportHTMLToWord('resume-preview', 'Resume');
  }

  const skillsList = data.skills.split(',').map(s => s.trim()).filter(s => s.length > 0)

  return (
    <div className="w-full mx-auto print:p-0">
      <div className="mb-10 text-center print:hidden">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full mb-4">
          <FileText size={14} /> Career Tool
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Professional Resume Builder
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Craft a standout, ATS-friendly resume in minutes. See updates live and download securely as a PDF or Word Doc.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Editor Pane */}
        <div className="w-full xl:w-[45%] flex-shrink-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8 print:hidden transition-all h-[900px] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-5 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur z-10 -mx-6 px-6 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings2 className="text-indigo-500" size={20} /> Build Resume
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleWordExport}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  <FileOutput size={16} /> Word
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Download size={16} /> PDF
                </button>
              </div>
            </div>
            
            {/* Template Selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 shrink-0">
                <LayoutTemplate size={16} /> Template:
              </div>
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${template === t.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-10">
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
                <input type="text" placeholder="Website / LinkedIn" value={data.website} onChange={(e) => updateField('website', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
              </div>
            </section>

            {/* Professional Summary */}
            <section className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <FileText size={16} className="text-indigo-500" /> Professional Summary
              </h4>
              <textarea placeholder="Write a brief professional summary about your career goals and achievements..." value={data.summary} onChange={(e) => updateField('summary', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white text-sm resize-none h-28" />
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Briefcase size={16} className="text-indigo-500" /> Experience
              </h4>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 group">
                    <button onClick={() => removeExperience(exp.id)} className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" disabled={data.experience.length === 1}>
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                      <input type="text" placeholder="Role / Job Title" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium px-1">Start Date</label>
                        <input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between px-1">
                           <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">End Date</label>
                           <label className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">
                             <input type="checkbox" checked={exp.isCurrent || false} onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                             Currently working here
                           </label>
                        </div>
                        <input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} disabled={exp.isCurrent} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800" />
                      </div>
                    </div>
                    <textarea placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm resize-none h-24" />
                  </div>
                ))}
              </div>
              <button onClick={addExperience} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl">
                <Plus size={16} /> Add Experience
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
                    <button onClick={() => removeEducation(edu.id)} className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                      <input type="text" placeholder="Degree / Certificate" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium px-1">Start Date</label>
                        <input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between px-1">
                           <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">End Date</label>
                           <label className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">
                             <input type="checkbox" checked={edu.isCurrent || false} onChange={(e) => updateEducation(edu.id, 'isCurrent', e.target.checked)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                             Currently studying here
                           </label>
                        </div>
                        <input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} disabled={edu.isCurrent} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800" />
                      </div>
                    </div>
                    <textarea placeholder="Details (GPA, Honors, etc.)" value={edu.description} onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white shadow-sm resize-none h-16" />
                  </div>
                ))}
              </div>
              <button onClick={addEducation} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl">
                <Plus size={16} /> Add Education
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
        </div>

        {/* Live Preview / Print Area */}
        <div className="w-full xl:flex-1 sticky top-8 print:w-full print:static print:h-auto">
          <div id="resume-preview" className="bg-white text-gray-900 p-10 md:p-14 rounded-3xl shadow-xl border border-gray-200 print:shadow-none print:border-none print:p-0 min-h-[1056px] w-full transition-all relative overflow-hidden">
            {renderTemplate(template, { data, skillsList })}
          </div>
        </div>
      </div>
    </div>
  )
}
