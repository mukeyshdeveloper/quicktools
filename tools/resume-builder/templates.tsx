import React from 'react';
import type { ResumeData } from './utils';

interface TemplateProps {
  data: ResumeData;
  skillsList: string[];
}

export const TEMPLATES = [
  { id: 'minimal', name: 'Minimalist' },
  { id: 'modern', name: 'Modern Split' },
  { id: 'classic', name: 'Classic Serif' },
  { id: 'elegant', name: 'Elegant Line' },
  { id: 'bold', name: 'Bold Header' },
  { id: 'creative', name: 'Creative Accent' },
  { id: 'executive', name: 'Executive Formal' },
  { id: 'startup', name: 'Startup Vibe' },
  { id: 'tech', name: 'Tech Clean' },
  { id: 'academic', name: 'Academic Standard' },
] as const;

export type TemplateId = typeof TEMPLATES[number]['id'];

export function renderTemplate(id: TemplateId, props: TemplateProps) {
  switch (id) {
    case 'minimal': return <MinimalTemplate {...props} />;
    case 'modern': return <ModernTemplate {...props} />;
    case 'classic': return <ClassicTemplate {...props} />;
    case 'elegant': return <ElegantTemplate {...props} />;
    case 'bold': return <BoldTemplate {...props} />;
    case 'creative': return <CreativeTemplate {...props} />;
    case 'executive': return <ExecutiveTemplate {...props} />;
    case 'startup': return <StartupTemplate {...props} />;
    case 'tech': return <TechTemplate {...props} />;
    case 'academic': return <AcademicTemplate {...props} />;
    default: return <MinimalTemplate {...props} />;
  }
}

// Helper to format YYYY-MM to Month YYYY
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  if (!year || !month) return dateString;
  const d = new Date(parseInt(year), parseInt(month) - 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Helper to render contact info safely
const ContactInfo = ({ data, separator = '•' }: { data: ResumeData, separator?: string }) => {
  const items = [data.email, data.phone, data.address, data.website].filter(Boolean);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }} className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm font-medium">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span style={{ display: 'inline-block' }}>{item}</span>
          {index < items.length - 1 && <span style={{ color: '#ccc' }} className="text-gray-300">{separator}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

// 1. Minimalist
const MinimalTemplate = ({ data, skillsList }: TemplateProps) => (
  <div style={{ fontFamily: 'sans-serif', color: '#111' }} className="font-sans text-gray-900">
    <header style={{ marginBottom: '32px', textAlign: 'center', borderBottom: '2px solid #f3f4f6', paddingBottom: '24px' }} className="mb-8 text-center border-b-2 border-gray-100 pb-6">
      <h1 style={{ fontSize: '36px', fontWeight: '900', margin: '0 0 8px 0', textTransform: 'uppercase' }} className="text-4xl font-black mb-2 uppercase">{data.fullName || 'Your Name'}</h1>
      <p style={{ fontSize: '18px', color: '#4f46e5', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0' }} className="text-lg text-indigo-600 font-semibold tracking-widest uppercase mb-4">{data.jobTitle || 'Job Title'}</p>
      <ContactInfo data={data} />
    </header>

    {data.summary && (
      <section style={{ marginBottom: '32px' }} className="mb-8">
        <p style={{ lineHeight: '1.6' }} className="leading-relaxed whitespace-pre-wrap">{data.summary}</p>
      </section>
    )}

    {data.experience.some(exp => exp.company || exp.role) && (
      <section style={{ marginBottom: '32px' }} className="mb-8">
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '8px', marginBottom: '16px' }} className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="space-y-6">
          {data.experience.map(exp => (exp.company || exp.role) && (
            <div key={exp.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }} className="flex justify-between items-baseline mb-1">
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }} className="font-bold">{exp.role}</h3>
                <span style={{ fontSize: '14px', color: '#6b7280' }} className="text-sm text-gray-500">{formatDate(exp.startDate)} {exp.startDate && (exp.isCurrent || exp.endDate) && '–'} {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#4f46e5', fontWeight: 'bold', marginBottom: '8px' }} className="text-sm font-bold text-indigo-600 mb-2">{exp.company}</div>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }} className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {data.education.some(edu => edu.institution || edu.degree) && (
      <section style={{ marginBottom: '32px' }} className="mb-8">
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '8px', marginBottom: '16px' }} className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Education</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="space-y-6">
          {data.education.map(edu => (edu.institution || edu.degree) && (
            <div key={edu.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }} className="flex justify-between items-baseline mb-1">
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }} className="font-bold">{edu.institution}</h3>
                <span style={{ fontSize: '14px', color: '#6b7280' }} className="text-sm text-gray-500">{formatDate(edu.startDate)} {edu.startDate && (edu.isCurrent || edu.endDate) && '–'} {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }} className="text-sm font-medium mb-1">{edu.degree}</div>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }} className="text-sm leading-relaxed whitespace-pre-wrap">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {skillsList.length > 0 && (
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '8px', marginBottom: '16px' }} className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} className="flex flex-wrap gap-2">
          {skillsList.map((skill, i) => (
            <span key={i} style={{ padding: '4px 12px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }} className="px-3 py-1 bg-gray-100 text-sm font-semibold rounded-md border border-gray-200">{skill}</span>
          ))}
        </div>
      </section>
    )}
  </div>
);

// 2. Modern Split
const ModernTemplate = ({ data, skillsList }: TemplateProps) => (
  <div style={{ display: 'flex', height: '100%', minHeight: '1000px', fontFamily: 'sans-serif' }} className="flex min-h-[1056px] font-sans -m-10 md:-m-14 print:m-0">
    <div style={{ width: '33%', backgroundColor: '#1e293b', color: '#fff', padding: '40px' }} className="w-1/3 bg-slate-800 text-white p-8">
      <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }} className="text-3xl font-black mb-2 leading-tight">{data.fullName || 'Your Name'}</h1>
      <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '32px' }} className="text-slate-400 font-medium mb-8">{data.jobTitle}</p>
      
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', color: '#cbd5e1', borderBottom: '1px solid #475569', paddingBottom: '8px', marginBottom: '16px' }} className="text-sm font-bold uppercase text-slate-300 border-b border-slate-600 pb-2 mb-4">Contact</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '32px' }} className="space-y-3 text-sm mb-8">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.address && <div>{data.address}</div>}
        {data.website && <div>{data.website}</div>}
      </div>

      {skillsList.length > 0 && (
        <>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', color: '#cbd5e1', borderBottom: '1px solid #475569', paddingBottom: '8px', marginBottom: '16px' }} className="text-sm font-bold uppercase text-slate-300 border-b border-slate-600 pb-2 mb-4">Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }} className="space-y-2 text-sm">
            {skillsList.map((skill, i) => <div key={i}>{skill}</div>)}
          </div>
        </>
      )}
    </div>
    
    <div style={{ width: '67%', padding: '40px', backgroundColor: '#fff', color: '#111' }} className="w-2/3 p-8 bg-white text-gray-900">
      {data.summary && (
        <section style={{ marginBottom: '32px' }} className="mb-8">
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }} className="text-xl font-bold uppercase border-b-2 border-gray-200 pb-2 mb-4">Profile</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }} className="text-sm leading-relaxed whitespace-pre-wrap">{data.summary}</p>
        </section>
      )}

      {data.experience.some(exp => exp.company) && (
        <section style={{ marginBottom: '32px' }} className="mb-8">
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }} className="text-xl font-bold uppercase border-b-2 border-gray-200 pb-2 mb-4">Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="space-y-6">
            {data.experience.map(exp => exp.company && (
              <div key={exp.id}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }} className="font-bold">{exp.role}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }} className="flex justify-between mb-2">
                  <span style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 'bold' }} className="text-sm font-bold text-blue-500">{exp.company}</span>
                  <span style={{ fontSize: '14px', color: '#64748b' }} className="text-sm text-slate-500">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.6' }} className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.some(edu => edu.institution) && (
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }} className="text-xl font-bold uppercase border-b-2 border-gray-200 pb-2 mb-4">Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="space-y-4">
            {data.education.map(edu => edu.institution && (
              <div key={edu.id}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }} className="font-bold">{edu.degree}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }} className="flex justify-between mb-1">
                  <span style={{ fontSize: '14px', color: '#333' }} className="text-sm">{edu.institution}</span>
                  <span style={{ fontSize: '14px', color: '#64748b' }} className="text-sm text-slate-500">{formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
                </div>
                <p style={{ fontSize: '14px' }} className="text-sm whitespace-pre-wrap">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

// 3. Classic Serif
const ClassicTemplate = ({ data, skillsList }: TemplateProps) => (
  <div style={{ fontFamily: 'Georgia, serif', color: '#000' }} className="font-serif text-black">
    <header style={{ textAlign: 'center', marginBottom: '32px' }} className="text-center mb-8">
      <h1 style={{ fontSize: '40px', margin: '0 0 4px 0' }} className="text-4xl mb-1">{data.fullName || 'Your Name'}</h1>
      <p style={{ fontSize: '16px', fontStyle: 'italic', marginBottom: '8px' }} className="italic text-lg mb-2">{data.jobTitle}</p>
      <div style={{ fontSize: '14px' }} className="text-sm">
        <ContactInfo data={data} separator=" | " />
      </div>
    </header>

    <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '0 0 24px 0' }} className="border-t-2 border-black mb-6" />

    {data.summary && (
      <section style={{ marginBottom: '24px' }} className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: '12px' }} className="text-lg font-bold uppercase text-center mb-3">Professional Summary</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.5' }} className="text-sm leading-relaxed">{data.summary}</p>
      </section>
    )}

    {data.experience.some(exp => exp.company) && (
      <section style={{ marginBottom: '24px' }} className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: '16px' }} className="text-lg font-bold uppercase text-center mb-4">Experience</h2>
        {data.experience.map(exp => exp.company && (
          <div key={exp.id} style={{ marginBottom: '16px' }} className="mb-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }} className="flex justify-between font-bold">
              <span>{exp.company}, {exp.role}</span>
              <span>{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
            </div>
            <p style={{ fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }} className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
          </div>
        ))}
      </section>
    )}

    {data.education.some(edu => edu.institution) && (
      <section style={{ marginBottom: '24px' }} className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: '16px' }} className="text-lg font-bold uppercase text-center mb-4">Education</h2>
        {data.education.map(edu => edu.institution && (
          <div key={edu.id} style={{ marginBottom: '12px' }} className="mb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }} className="flex justify-between font-bold">
              <span>{edu.institution}</span>
              <span>{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
            </div>
            <div style={{ fontStyle: 'italic', fontSize: '14px' }} className="italic text-sm">{edu.degree}</div>
          </div>
        ))}
      </section>
    )}

    {skillsList.length > 0 && (
      <section style={{ marginBottom: '24px' }} className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: '16px' }} className="text-lg font-bold uppercase text-center mb-4">Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }} className="flex flex-wrap gap-2 justify-center">
          {skillsList.map((skill, i) => (
            <span key={i} style={{ padding: '4px 8px', border: '1px solid #000', fontSize: '14px' }} className="px-2 py-1 border border-black text-sm">{skill}</span>
          ))}
        </div>
      </section>
    )}
  </div>
);

// We define basic structural differences for the others using minimal Tailwind
const ElegantTemplate = ({ data, skillsList }: TemplateProps) => (
  <div className="font-sans text-gray-800">
    <div className="border-l-4 border-rose-500 pl-6 mb-8">
      <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-2">{data.fullName}</h1>
      <p className="text-xl text-rose-500 font-medium mb-4">{data.jobTitle}</p>
      <div className="text-sm text-gray-500 space-y-1">
        <div>{data.email}</div>
        <div>{data.phone}</div>
        <div>{data.address}</div>
        <div>{data.website}</div>
      </div>
    </div>
    {/* Standard rendering for rest */}
    <div className="space-y-8">
      {data.summary && (<div><h2 className="text-rose-500 font-bold uppercase tracking-widest mb-2">Profile</h2><p className="text-sm leading-relaxed">{data.summary}</p></div>)}
      {data.experience.some(e=>e.company) && (<div><h2 className="text-rose-500 font-bold uppercase tracking-widest mb-4">Experience</h2><div className="space-y-4">{data.experience.map(e=>e.company && (<div key={e.id}><h3 className="font-bold text-gray-900">{e.role} <span className="text-gray-400 font-normal">at {e.company}</span></h3><p className="text-xs text-rose-400 mb-2">{formatDate(e.startDate)} - {e.isCurrent ? 'Present' : formatDate(e.endDate)}</p><p className="text-sm">{e.description}</p></div>))}</div></div>)}
      {data.education.some(e=>e.institution) && (<div><h2 className="text-rose-500 font-bold uppercase tracking-widest mb-4">Education</h2><div className="space-y-4">{data.education.map(e=>e.institution && (<div key={e.id}><h3 className="font-bold text-gray-900">{e.degree}</h3><p className="text-sm text-gray-600">{e.institution}</p><p className="text-xs text-rose-400">{formatDate(e.startDate)} - {e.isCurrent ? 'Present' : formatDate(e.endDate)}</p></div>))}</div></div>)}
      {skillsList.length > 0 && (<div><h2 className="text-rose-500 font-bold uppercase tracking-widest mb-4">Skills</h2><div className="flex flex-wrap gap-2">{skillsList.map((skill, i) => <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 text-sm rounded-full border border-rose-200">{skill}</span>)}</div></div>)}
    </div>
  </div>
);

const BoldTemplate = ({ data, skillsList }: TemplateProps) => (
  <div className="font-sans">
    <header className="bg-black text-white p-8 -m-10 md:-m-14 print:m-0 mb-8">
      <h1 className="text-5xl font-black uppercase mb-2">{data.fullName}</h1>
      <p className="text-xl font-bold text-yellow-400 mb-4">{data.jobTitle}</p>
      <div className="flex gap-4 text-sm text-gray-300 flex-wrap">
        <span>{data.email}</span><span>{data.phone}</span><span>{data.address}</span><span>{data.website}</span>
      </div>
    </header>
    <div className="space-y-8 mt-16 print:mt-12">
      {data.summary && (<div><h2 className="text-2xl font-black uppercase border-b-4 border-yellow-400 inline-block mb-4">Summary</h2><p>{data.summary}</p></div>)}
      {data.experience.some(e=>e.company) && (<div><h2 className="text-2xl font-black uppercase border-b-4 border-yellow-400 inline-block mb-6">Experience</h2><div className="space-y-6">{data.experience.map(e=>e.company && (<div key={e.id}><h3 className="text-xl font-bold">{e.role} @ {e.company}</h3><p className="font-bold text-gray-500 mb-2">{formatDate(e.startDate)} - {e.isCurrent ? 'Present' : formatDate(e.endDate)}</p><p>{e.description}</p></div>))}</div></div>)}
      {data.education.some(e=>e.institution) && (<div><h2 className="text-2xl font-black uppercase border-b-4 border-yellow-400 inline-block mb-6">Education</h2><div className="space-y-6">{data.education.map(e=>e.institution && (<div key={e.id}><h3 className="text-xl font-bold">{e.degree}</h3><p className="font-bold text-gray-500 mb-2">{e.institution} | {formatDate(e.startDate)} - {e.isCurrent ? 'Present' : formatDate(e.endDate)}</p></div>))}</div></div>)}
      {skillsList.length > 0 && (<div><h2 className="text-2xl font-black uppercase border-b-4 border-yellow-400 inline-block mb-6">Skills</h2><div className="flex flex-wrap gap-2">{skillsList.map((skill, i) => <span key={i} className="px-3 py-1 border-2 border-black font-bold uppercase text-sm">{skill}</span>)}</div></div>)}
    </div>
  </div>
);

const CreativeTemplate = ({ data, skillsList }: TemplateProps) => (
  <div className="font-sans relative">
    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl -z-10 -m-10"></div>
    <header className="text-right mb-10">
      <h1 className="text-5xl font-black text-teal-800 tracking-tighter mb-1">{data.fullName}</h1>
      <p className="text-2xl font-medium text-teal-600 mb-4">{data.jobTitle}</p>
      <div className="text-sm text-gray-600 space-y-1"><div>{data.email}</div><div>{data.phone}</div></div>
    </header>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1 space-y-8">
        {skillsList.length > 0 && (<div><h2 className="font-bold text-teal-800 mb-3 border-t-2 border-teal-200 pt-2">SKILLS</h2><div className="space-y-1">{skillsList.map(s=><div key={s} className="text-sm bg-teal-50 px-2 py-1 rounded text-teal-900 border border-teal-100">{s}</div>)}</div></div>)}
        <div><h2 className="font-bold text-teal-800 mb-3 border-t-2 border-teal-200 pt-2">CONTACT</h2><p className="text-sm">{data.address}<br/>{data.website}</p></div>
      </div>
      <div className="col-span-2 space-y-8">
        {data.summary && (<div><h2 className="font-bold text-teal-800 mb-3 border-t-2 border-teal-200 pt-2">PROFILE</h2><p className="text-sm">{data.summary}</p></div>)}
        {data.experience.some(e=>e.company) && (<div><h2 className="font-bold text-teal-800 mb-3 border-t-2 border-teal-200 pt-2">EXPERIENCE</h2><div className="space-y-4">{data.experience.map(e=>e.company && (<div key={e.id}><h3 className="font-bold">{e.role}</h3><p className="text-teal-600 text-sm font-medium">{e.company} | {formatDate(e.startDate)} - {e.isCurrent ? 'Present' : formatDate(e.endDate)}</p><p className="text-sm mt-1">{e.description}</p></div>))}</div></div>)}
        {data.education.some(e=>e.institution) && (<div><h2 className="font-bold text-teal-800 mb-3 border-t-2 border-teal-200 pt-2">EDUCATION</h2><div className="space-y-4">{data.education.map(e=>e.institution && (<div key={e.id}><h3 className="font-bold">{e.degree}</h3><p className="text-teal-600 text-sm font-medium">{e.institution} | {formatDate(e.startDate)} - {e.isCurrent ? 'Present' : formatDate(e.endDate)}</p></div>))}</div></div>)}
      </div>
    </div>
  </div>
);

// Fallbacks for remaining
const ExecutiveTemplate = MinimalTemplate;
const StartupTemplate = ModernTemplate;
const TechTemplate = BoldTemplate;
const AcademicTemplate = ClassicTemplate;
