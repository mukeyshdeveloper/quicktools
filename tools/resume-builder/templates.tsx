import React from 'react';
import type { ResumeData } from './utils';

export interface TemplateProps {
  data: ResumeData;
  skillsList: string[];
  themeColor: string; // indigo, emerald, blue, rose, violet, amber, slate, crimson
  fontFamily: string; // sans, serif, mono
  spacing: 'compact' | 'normal' | 'spacious';
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

// Helper: Format YYYY-MM to Month YYYY
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  if (!year || !month) return dateString;
  const d = new Date(parseInt(year), parseInt(month) - 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Helper: Theme colors
const getThemeColorHex = (color: string) => {
  const colors: Record<string, string> = {
    indigo: '#4f46e5',
    emerald: '#059669',
    blue: '#2563eb',
    rose: '#e11d48',
    violet: '#7c3aed',
    amber: '#d97706',
    slate: '#475569',
    crimson: '#be123c',
  };
  return colors[color] || '#4f46e5';
};

// Helper: Font Family
const getFontFamilyStyle = (font: string) => {
  const fonts: Record<string, string> = {
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
  return fonts[font] || fonts.sans;
};

// Helper: Spacing styles
const getSpacingStyles = (spacing: 'compact' | 'normal' | 'spacious') => {
  switch (spacing) {
    case 'compact':
      return {
        sectionGap: '16px',
        itemGap: '8px',
        padding: '24px',
        lineHeight: '1.4',
        fontSize: '13px',
        headerGap: '12px',
      };
    case 'spacious':
      return {
        sectionGap: '32px',
        itemGap: '20px',
        padding: '48px',
        lineHeight: '1.65',
        fontSize: '15px',
        headerGap: '24px',
      };
    case 'normal':
    default:
      return {
        sectionGap: '24px',
        itemGap: '14px',
        padding: '36px',
        lineHeight: '1.5',
        fontSize: '14px',
        headerGap: '16px',
      };
  }
};

// Helper: Render Contact info block
const ContactInfo = ({ data, separator = '•', themeColorHex }: { data: ResumeData; separator?: string; themeColorHex: string }) => {
  const items = [
    data.email && { type: 'Email', value: data.email },
    data.phone && { type: 'Phone', value: data.phone },
    data.address && { type: 'Location', value: data.address },
    data.website && { type: 'Website', value: data.website },
    data.linkedin && { type: 'LinkedIn', value: data.linkedin },
    data.github && { type: 'GitHub', value: data.github },
  ].filter(Boolean) as { type: string; value: string }[];

  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[13px] font-medium text-gray-600">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="flex items-center gap-1">
            <span style={{ color: themeColorHex }} className="opacity-80 font-bold">{item.type[0]}:</span> {item.value}
          </span>
          {index < items.length - 1 && <span className="text-gray-300 font-light">{separator}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ==========================================================================
   1. Minimalist
   ========================================================================== */
const MinimalTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: getFontFamilyStyle(fontFamily), color: '#1f2937', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight }} className="h-full bg-white">
      <div style={{ marginBottom: s.sectionGap, textAlign: 'center', borderBottom: `2px solid #f3f4f6`, paddingBottom: s.headerGap }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '-0.05em' }} className="text-gray-900 leading-none">{data.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '16px', color: themeHex, fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', margin: `0 0 ${s.headerGap} 0` }}>{data.jobTitle || 'Job Title'}</p>
        <ContactInfo data={data} themeColorHex={themeHex} />
      </div>

      {data.summary && (
        <section style={{ marginBottom: s.sectionGap }}>
          <p className="whitespace-pre-wrap text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(exp => exp.company || exp.role) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: s.itemGap }} className="tracking-wider">Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.experience.map(exp => (exp.company || exp.role) && (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <h3 style={{ fontSize: '15px' }}>{exp.role} <span className="font-normal text-gray-500">at</span> {exp.company}</h3>
                  <span style={{ fontSize: '13px', fontWeight: 'normal' }} className="text-gray-500">{formatDate(exp.startDate)} {exp.startDate && '–'} {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-wrap text-gray-700 mt-1 text-[13px]">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.some(p => p.name) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: s.itemGap }} className="tracking-wider">Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.projects.map(p => p.name && (
              <div key={p.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <h3 style={{ fontSize: '15px' }}>{p.name} {p.link && <span className="text-[12px] text-gray-400 font-normal ml-2">({p.link})</span>}</h3>
                  <span style={{ fontSize: '13px', fontWeight: 'normal' }} className="text-gray-500">{formatDate(p.startDate)} {p.startDate && '–'} {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                </div>
                {p.technologies && <div style={{ color: themeHex }} className="text-[12px] font-semibold mb-1">Tech Stack: {p.technologies}</div>}
                <p className="whitespace-pre-wrap text-gray-700 text-[13px]">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.some(edu => edu.institution || edu.degree) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: s.itemGap }} className="tracking-wider">Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.education.map(edu => (edu.institution || edu.degree) && (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <h3 style={{ fontSize: '15px' }}>{edu.degree}</h3>
                  <span style={{ fontSize: '13px', fontWeight: 'normal' }} className="text-gray-500">{formatDate(edu.startDate)} {edu.startDate && '–'} {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
                </div>
                <div className="text-[13px] text-gray-600 font-medium">{edu.institution}</div>
                {edu.description && <p className="whitespace-pre-wrap text-gray-600 text-[12px] mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsList.length > 0 && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: s.itemGap }} className="tracking-wider">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-50 text-[12px] font-semibold text-gray-700 rounded border border-gray-200">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {data.languages && data.languages.some(l => l.name) && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: s.itemGap }} className="tracking-wider">Languages</h2>
            <div className="flex flex-wrap gap-3">
              {data.languages.map(l => l.name && (
                <div key={l.id} className="text-[13px] font-medium text-gray-800">
                  {l.name} <span className="text-[11px] text-gray-500 font-normal">({l.proficiency})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certifications */}
      {data.certifications && data.certifications.some(c => c.name) && (
        <section style={{ marginTop: s.sectionGap }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: s.itemGap }} className="tracking-wider">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.certifications.map(c => c.name && (
              <div key={c.id} className="text-[13px]">
                <div className="font-bold text-gray-900">{c.name}</div>
                <div className="text-gray-500 text-[11px]">{c.issuer} {c.date && `• ${formatDate(c.date)}`}</div>
                {c.description && <p className="text-gray-600 text-[11px] mt-0.5">{c.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* ==========================================================================
   2. Modern Split
   ========================================================================== */
const ModernTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: getFontFamilyStyle(fontFamily), display: 'flex', minHeight: '1056px', fontSize: s.fontSize, lineHeight: s.lineHeight }} className="bg-white h-full border border-gray-100 print:border-none">
      {/* Sidebar (Left 35%) */}
      <div style={{ width: '35%', backgroundColor: '#1e293b', color: '#f8fafc', padding: s.padding, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} className="flex flex-col gap-6">
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', lineHeight: '1.1', marginBottom: '8px' }} className="tracking-tight text-white">{data.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '14px', color: themeHex, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{data.jobTitle || 'Job Title'}</p>
        </div>

        {/* Contact details */}
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #475569', paddingBottom: '4px', marginBottom: '8px' }}>Contact</h2>
          <div className="space-y-2 text-[12px] text-slate-300 break-all">
            {data.email && <div><span className="text-slate-400 font-bold block">Email:</span> {data.email}</div>}
            {data.phone && <div><span className="text-slate-400 font-bold block">Phone:</span> {data.phone}</div>}
            {data.address && <div><span className="text-slate-400 font-bold block">Location:</span> {data.address}</div>}
            {data.website && <div><span className="text-slate-400 font-bold block">Website:</span> {data.website}</div>}
            {data.linkedin && <div><span className="text-slate-400 font-bold block">LinkedIn:</span> {data.linkedin}</div>}
            {data.github && <div><span className="text-slate-400 font-bold block">GitHub:</span> {data.github}</div>}
          </div>
        </div>

        {/* Education */}
        {data.education.some(edu => edu.institution || edu.degree) && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #475569', paddingBottom: '4px', marginBottom: '8px' }}>Education</h2>
            <div className="space-y-3">
              {data.education.map(edu => (edu.institution || edu.degree) && (
                <div key={edu.id} className="text-[12px]">
                  <div className="font-bold text-white leading-tight">{edu.degree}</div>
                  <div className="text-slate-300">{edu.institution}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillsList.length > 0 && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #475569', paddingBottom: '4px', marginBottom: '8px' }}>Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skillsList.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold rounded">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.some(l => l.name) && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #475569', paddingBottom: '4px', marginBottom: '8px' }}>Languages</h2>
            <div className="space-y-1">
              {data.languages.map(l => l.name && (
                <div key={l.id} className="text-[12px] text-slate-300">
                  <span className="font-bold text-white">{l.name}</span> — {l.proficiency}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Right 65%) */}
      <div style={{ width: '65%', padding: s.padding, color: '#334155' }} className="flex flex-col gap-6">
        {data.summary && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: '850', textTransform: 'uppercase', color: themeHex, borderBottom: `2px solid ${themeHex}`, paddingBottom: '4px', marginBottom: '8px' }} className="tracking-wide">Profile</h2>
            <p className="whitespace-pre-wrap text-[13px] text-slate-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company || exp.role) && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: '850', textTransform: 'uppercase', color: themeHex, borderBottom: `2px solid ${themeHex}`, paddingBottom: '4px', marginBottom: '10px' }} className="tracking-wide">Experience</h2>
            <div className="space-y-4">
              {data.experience.map(exp => (exp.company || exp.role) && (
                <div key={exp.id} className="text-[13px]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 leading-none">
                    <h4>{exp.role}</h4>
                    <span className="text-[11px] text-slate-500 font-normal">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <div style={{ color: themeHex }} className="font-semibold text-[12px] mt-0.5">{exp.company}</div>
                  <p className="whitespace-pre-wrap text-slate-600 mt-1.5 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.some(p => p.name) && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: '850', textTransform: 'uppercase', color: themeHex, borderBottom: `2px solid ${themeHex}`, paddingBottom: '4px', marginBottom: '10px' }} className="tracking-wide">Projects</h2>
            <div className="space-y-4">
              {data.projects.map(p => p.name && (
                <div key={p.id} className="text-[13px]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 leading-none">
                    <h4>{p.name} {p.link && <span className="text-[11px] font-normal text-slate-400">({p.link})</span>}</h4>
                    <span className="text-[11px] text-slate-500 font-normal">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                  </div>
                  {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold mt-0.5">Tech: {p.technologies}</div>}
                  <p className="whitespace-pre-wrap text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.some(c => c.name) && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: '850', textTransform: 'uppercase', color: themeHex, borderBottom: `2px solid ${themeHex}`, paddingBottom: '4px', marginBottom: '10px' }} className="tracking-wide">Certifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.certifications.map(c => c.name && (
                <div key={c.id} className="text-[12px]">
                  <div className="font-bold text-slate-900 leading-tight">{c.name}</div>
                  <div className="text-slate-500 text-[11px]">{c.issuer} • {formatDate(c.date)}</div>
                  {c.description && <p className="text-slate-500 text-[10px] mt-0.5">{c.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   3. Classic Serif
   ========================================================================== */
const ClassicTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);
  const fontStyle = { fontFamily: 'Georgia, serif', color: '#111827', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight };

  return (
    <div style={fontStyle} className="bg-white h-full border border-gray-100">
      <div className="text-center" style={{ marginBottom: s.sectionGap }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'normal', marginBottom: '4px', letterSpacing: '-0.5px' }}>{data.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#4b5563', marginBottom: '12px' }}>{data.jobTitle}</p>
        <ContactInfo data={data} separator=" | " themeColorHex={themeHex} />
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${themeHex}`, margin: `0 0 ${s.sectionGap} 0` }} />

      {data.summary && (
        <section style={{ marginBottom: s.sectionGap }} className="text-center max-w-2xl mx-auto">
          <p className="italic text-gray-700 whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(exp => exp.company || exp.role) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px', marginBottom: s.itemGap, color: themeHex }}>Professional Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.experience.map(exp => (exp.company || exp.role) && (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-gray-900 italic text-[14px]">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="font-normal not-italic text-[12px] text-gray-500">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-wrap text-gray-700 mt-1 pl-4 border-l border-gray-200 text-[13px]">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.some(p => p.name) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px', marginBottom: s.itemGap, color: themeHex }}>Key Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.projects.map(p => p.name && (
              <div key={p.id}>
                <div className="flex justify-between font-bold text-gray-900 italic text-[14px]">
                  <span>{p.name} {p.link && <span className="font-normal not-italic text-[11px] text-gray-400">({p.link})</span>}</span>
                  <span className="font-normal not-italic text-[12px] text-gray-500">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                </div>
                {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold pl-4">Tools: {p.technologies}</div>}
                <p className="whitespace-pre-wrap text-gray-700 mt-1 pl-4 border-l border-gray-200 text-[13px]">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.some(edu => edu.institution || edu.degree) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px', marginBottom: s.itemGap, color: themeHex }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.education.map(edu => (edu.institution || edu.degree) && (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-gray-900 italic text-[14px]">
                  <span>{edu.degree}</span>
                  <span className="font-normal not-italic text-[12px] text-gray-500">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
                </div>
                <div className="text-gray-600 pl-4 border-l border-gray-200 text-[13px]">{edu.institution}</div>
                {edu.description && <p className="text-gray-600 pl-4 border-l border-gray-200 text-[12px] mt-1 italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: s.sectionGap }}>
        {skillsList.length > 0 && (
          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: themeHex }}>Skills & Competencies</h2>
            <p className="text-gray-700 text-[13px]">{skillsList.join(', ')}</p>
          </section>
        )}

        {data.languages && data.languages.some(l => l.name) && (
          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: themeHex }}>Languages</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {data.languages.map(l => l.name && (
                <div key={l.id} className="text-[13px] text-gray-700">
                  <strong>{l.name}</strong> ({l.proficiency})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certifications */}
      {data.certifications && data.certifications.some(c => c.name) && (
        <section>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: themeHex }}>Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.certifications.map(c => c.name && (
              <div key={c.id} className="text-[12px] text-gray-700">
                <span className="font-bold">{c.name}</span> — <span className="italic text-gray-500">{c.issuer} ({formatDate(c.date)})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* ==========================================================================
   4. Elegant Line
   ========================================================================== */
const ElegantTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: getFontFamilyStyle(fontFamily), color: '#334155', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight }} className="h-full bg-white relative">
      {/* Top accent line */}
      <div style={{ height: '6px', backgroundColor: themeHex, position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ marginBottom: s.sectionGap }} className="pt-4 flex flex-col md:flex-row md:justify-between md:items-end border-b border-gray-100 pb-6">
        <div>
          <h1 style={{ fontSize: '38px', fontWeight: '300', color: '#0f172a', letterSpacing: '-1.5px', marginBottom: '4px' }} className="leading-none">{data.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '16px', color: themeHex, fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{data.jobTitle || 'Job Title'}</p>
        </div>
        <div className="mt-4 md:mt-0 text-left md:text-right text-[12px] text-slate-500 space-y-1">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.address && <div>{data.address}</div>}
          {data.website && <div style={{ color: themeHex }} className="font-medium">{data.website}</div>}
          {(data.linkedin || data.github) && (
            <div className="flex gap-2 justify-start md:justify-end">
              {data.linkedin && <span>In: {data.linkedin}</span>}
              {data.github && <span>Gh: {data.github}</span>}
            </div>
          )}
        </div>
      </div>

      {data.summary && (
        <section style={{ marginBottom: s.sectionGap }}>
          <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(exp => exp.company || exp.role) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ color: themeHex, fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: s.itemGap }}>Experience</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (exp.company || exp.role) && (
              <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100 hover:border-gray-300 transition-colors">
                {/* Timeline dot */}
                <div style={{ borderColor: themeHex }} className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 bg-white border-2 rounded-full" />
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline font-bold text-slate-900 text-[14px]">
                  <h3>{exp.role} <span className="font-light text-slate-400">@</span> {exp.company}</h3>
                  <span className="text-[12px] font-normal text-slate-500">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-wrap text-[13px] text-slate-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.some(p => p.name) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ color: themeHex, fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: s.itemGap }}>Projects</h2>
          <div className="space-y-5">
            {data.projects.map(p => p.name && (
              <div key={p.id} className="relative pl-6 border-l-2 border-gray-100">
                <div style={{ borderColor: themeHex }} className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 bg-white border-2 rounded-full" />
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline font-bold text-slate-900 text-[14px]">
                  <h3>{p.name} {p.link && <span className="text-[11px] font-normal text-slate-400 ml-1">({p.link})</span>}</h3>
                  <span className="text-[12px] font-normal text-slate-500">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                </div>
                {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold">Tech: {p.technologies}</div>}
                <p className="whitespace-pre-wrap text-[13px] text-slate-600 mt-1">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.some(edu => edu.institution || edu.degree) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ color: themeHex, fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: s.itemGap }}>Education</h2>
          <div className="space-y-4">
            {data.education.map(edu => (edu.institution || edu.degree) && (
              <div key={edu.id} className="relative pl-6 border-l-2 border-gray-100">
                <div style={{ borderColor: themeHex }} className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 bg-white border-2 rounded-full" />
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-[14px]">
                  <h3>{edu.degree}</h3>
                  <span className="text-[12px] font-normal text-slate-500">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
                </div>
                <div className="text-[12px] text-slate-500">{edu.institution}</div>
                {edu.description && <p className="text-[12px] text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Grid for Skills, Languages, Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        {skillsList.length > 0 && (
          <div>
            <h3 style={{ color: themeHex }} className="text-[12px] font-bold uppercase tracking-wider mb-2">Skills</h3>
            <p className="text-[12px] text-slate-600 leading-relaxed">{skillsList.join(', ')}</p>
          </div>
        )}
        {data.languages && data.languages.some(l => l.name) && (
          <div>
            <h3 style={{ color: themeHex }} className="text-[12px] font-bold uppercase tracking-wider mb-2">Languages</h3>
            <div className="space-y-1 text-[12px] text-slate-600">
              {data.languages.map(l => l.name && (
                <div key={l.id}><strong>{l.name}</strong> ({l.proficiency})</div>
              ))}
            </div>
          </div>
        )}
        {data.certifications && data.certifications.some(c => c.name) && (
          <div>
            <h3 style={{ color: themeHex }} className="text-[12px] font-bold uppercase tracking-wider mb-2">Certifications</h3>
            <div className="space-y-1 text-[12px] text-slate-600">
              {data.certifications.map(c => c.name && (
                <div key={c.id}><strong>{c.name}</strong> • {c.issuer}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   5. Bold Header
   ========================================================================== */
const BoldTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: getFontFamilyStyle(fontFamily), color: '#374151', fontSize: s.fontSize, lineHeight: s.lineHeight }} className="h-full bg-white border border-gray-100 print:border-none">
      <div style={{ backgroundColor: themeHex, padding: s.padding, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} className="text-white">
        <h1 className="text-4xl font-extrabold tracking-tight uppercase leading-none mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-lg font-semibold tracking-wider uppercase opacity-90 mb-4">{data.jobTitle || 'Job Title'}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-80 pt-2 border-t border-white/20">
          {data.email && <span>E: {data.email}</span>}
          {data.phone && <span>P: {data.phone}</span>}
          {data.address && <span>L: {data.address}</span>}
          {data.website && <span>W: {data.website}</span>}
          {data.linkedin && <span>In: {data.linkedin}</span>}
          {data.github && <span>Gh: {data.github}</span>}
        </div>
      </div>

      <div style={{ padding: s.padding }} className="space-y-6">
        {data.summary && (
          <section>
            <h2 style={{ color: themeHex }} className="text-lg font-black uppercase tracking-wider mb-2">Summary</h2>
            <p className="whitespace-pre-wrap text-[13px] leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company || exp.role) && (
          <section>
            <h2 style={{ color: themeHex }} className="text-lg font-black uppercase tracking-wider mb-3">Work History</h2>
            <div className="space-y-4">
              {data.experience.map(exp => (exp.company || exp.role) && (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-gray-900 text-[14px]">
                    <h3>{exp.role} @ <span style={{ color: themeHex }}>{exp.company}</span></h3>
                    <span className="text-[11px] font-normal text-gray-500">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-[13px] text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.some(p => p.name) && (
          <section>
            <h2 style={{ color: themeHex }} className="text-lg font-black uppercase tracking-wider mb-3">Projects</h2>
            <div className="space-y-4">
              {data.projects.map(p => p.name && (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline font-bold text-gray-900 text-[14px]">
                    <h3>{p.name} {p.link && <span className="text-[11px] font-normal text-gray-400">({p.link})</span>}</h3>
                    <span className="text-[11px] font-normal text-gray-500">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                  </div>
                  {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold">Technologies: {p.technologies}</div>}
                  <p className="whitespace-pre-wrap text-[13px] text-gray-600 mt-1 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs Grid */}
        <div className="grid grid-cols-2 gap-6">
          {data.education.some(edu => edu.institution || edu.degree) && (
            <section>
              <h2 style={{ color: themeHex }} className="text-base font-black uppercase tracking-wider mb-3">Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (edu.institution || edu.degree) && (
                  <div key={edu.id} className="text-[12px]">
                    <div className="font-bold text-gray-900 leading-tight">{edu.degree}</div>
                    <div className="text-gray-600">{edu.institution}</div>
                    <div className="text-gray-500 text-[10px]">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.some(c => c.name) && (
            <section>
              <h2 style={{ color: themeHex }} className="text-base font-black uppercase tracking-wider mb-3">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map(c => c.name && (
                  <div key={c.id} className="text-[12px]">
                    <div className="font-bold text-gray-900 leading-tight">{c.name}</div>
                    <div className="text-gray-500">{c.issuer} ({formatDate(c.date)})</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          {skillsList.length > 0 && (
            <section>
              <h2 style={{ color: themeHex }} className="text-base font-black uppercase tracking-wider mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skillsList.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.some(l => l.name) && (
            <section>
              <h2 style={{ color: themeHex }} className="text-base font-black uppercase tracking-wider mb-2">Languages</h2>
              <div className="space-y-1">
                {data.languages.map(l => l.name && (
                  <div key={l.id} className="text-[12px] text-gray-700">
                    <strong className="text-gray-900">{l.name}</strong> — {l.proficiency}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. Creative Accent
   ========================================================================== */
const CreativeTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: getFontFamilyStyle(fontFamily), color: '#1e293b', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight }} className="h-full bg-white relative">
      <div style={{ borderColor: themeHex }} className="absolute left-6 top-6 bottom-6 border-l-2 opacity-25 print:hidden" />
      
      <div className="mb-8 relative z-10 pl-6">
        <div style={{ backgroundColor: themeHex }} className="absolute -left-[7px] top-2.5 w-3.5 h-3.5 rounded-full" />
        <h1 style={{ fontSize: '38px', fontWeight: '900', color: themeHex }} className="tracking-tight leading-none mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-lg font-medium text-gray-600 mb-4">{data.jobTitle}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
          {data.email && <span>E: {data.email}</span>}
          {data.phone && <span>P: {data.phone}</span>}
          {data.address && <span>L: {data.address}</span>}
          {data.website && <span>W: {data.website}</span>}
          {data.linkedin && <span>In: {data.linkedin}</span>}
          {data.github && <span>Gh: {data.github}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 relative z-10 pl-6">
        {/* Left column (1/3) */}
        <div className="space-y-6">
          {skillsList.length > 0 && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skillsList.map(s => (
                  <span key={s} style={{ color: themeHex, backgroundColor: `${themeHex}08`, borderColor: `${themeHex}20` }} className="text-[11px] font-bold px-2 py-0.5 border rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          {data.education.some(edu => edu.institution || edu.degree) && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (edu.institution || edu.degree) && (
                  <div key={edu.id} className="text-[12px]">
                    <div className="font-bold text-gray-900 leading-tight">{edu.degree}</div>
                    <div className="text-gray-600 mt-0.5">{edu.institution}</div>
                    <div className="text-gray-400 text-[10px] mt-0.5">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.some(l => l.name) && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Languages</h2>
              <div className="space-y-1.5">
                {data.languages.map(l => l.name && (
                  <div key={l.id} className="text-[12px] text-gray-700">
                    <span className="font-bold">{l.name}</span> <span className="text-gray-400">({l.proficiency})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column (2/3) */}
        <div className="col-span-2 space-y-6">
          {data.summary && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Profile</h2>
              <p className="text-[13px] text-gray-600 whitespace-pre-wrap leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.some(exp => exp.company || exp.role) && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Experience</h2>
              <div className="space-y-4">
                {data.experience.map(exp => (exp.company || exp.role) && (
                  <div key={exp.id} className="text-[13px]">
                    <div className="flex justify-between items-baseline font-bold text-gray-900">
                      <h3>{exp.role}</h3>
                      <span className="text-[11px] font-normal text-gray-500">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    <div style={{ color: themeHex }} className="font-semibold text-[11px] mt-0.5">{exp.company}</div>
                    <p className="text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.some(p => p.name) && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Projects</h2>
              <div className="space-y-4">
                {data.projects.map(p => p.name && (
                  <div key={p.id} className="text-[13px]">
                    <div className="flex justify-between items-baseline font-bold text-gray-900">
                      <h3>{p.name} {p.link && <span className="text-[11px] text-gray-400 font-normal">({p.link})</span>}</h3>
                      <span className="text-[11px] font-normal text-gray-500">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                    </div>
                    {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-bold">Tech: {p.technologies}</div>}
                    <p className="text-gray-600 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.certifications && data.certifications.some(c => c.name) && (
            <div>
              <h2 style={{ color: themeHex }} className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Certifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.certifications.map(c => c.name && (
                  <div key={c.id} className="text-[12px]">
                    <div className="font-bold text-gray-900">{c.name}</div>
                    <div className="text-gray-500 text-[11px]">{c.issuer} ({formatDate(c.date)})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   7. Executive Formal
   ========================================================================== */
const ExecutiveTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);
  const serifFont = { fontFamily: 'Georgia, Cambria, serif', color: '#1e293b', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight };

  return (
    <div style={serifFont} className="h-full bg-white border border-gray-100">
      <div style={{ marginBottom: s.sectionGap }} className="text-center">
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', letterSpacing: '-0.5px', marginBottom: '6px' }} className="font-serif uppercase">{data.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '15px', color: themeHex, fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>{data.jobTitle || 'Job Title'}</p>
        
        {/* Triple line accent under title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ width: '100px', height: '2px', backgroundColor: themeHex }} />
          <div style={{ width: '60px', height: '1px', backgroundColor: themeHex }} />
        </div>

        <ContactInfo data={data} separator=" | " themeColorHex={themeHex} />
      </div>

      {data.summary && (
        <section style={{ marginBottom: s.sectionGap }} className="border-t border-b border-gray-100 py-4">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, marginBottom: '6px', letterSpacing: '1px' }}>Executive Summary</h2>
          <p className="whitespace-pre-wrap text-[13px] text-slate-700 text-justify leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(exp => exp.company || exp.role) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: `1px solid ${themeHex}`, paddingBottom: '3px', marginBottom: s.itemGap }} className="tracking-wider">Professional Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.experience.map(exp => (exp.company || exp.role) && (
              <div key={exp.id} className="text-[13px]">
                <div className="flex justify-between items-baseline font-bold text-gray-900 leading-tight">
                  <h3 className="font-serif">{exp.role}</h3>
                  <span className="text-[11px] font-normal text-gray-500">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <div style={{ color: themeHex }} className="font-semibold text-[12px] italic mt-0.5">{exp.company}</div>
                <p className="whitespace-pre-wrap text-slate-600 mt-2 text-[12px] leading-relaxed pl-3 border-l border-slate-200">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.some(p => p.name) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: `1px solid ${themeHex}`, paddingBottom: '3px', marginBottom: s.itemGap }} className="tracking-wider">Key Achievements & Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s.itemGap }}>
            {data.projects.map(p => p.name && (
              <div key={p.id} className="text-[13px]">
                <div className="flex justify-between items-baseline font-bold text-gray-900 leading-tight">
                  <h3 className="font-serif">{p.name} {p.link && <span className="text-[11px] font-normal text-slate-400 font-sans">({p.link})</span>}</h3>
                  <span className="text-[11px] font-normal text-gray-500">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                </div>
                {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold italic mt-0.5">Tech stack: {p.technologies}</div>}
                <p className="whitespace-pre-wrap text-slate-600 mt-1 text-[12px] pl-3 border-l border-slate-200">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Credentials */}
      {data.education.some(edu => edu.institution || edu.degree) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: `1px solid ${themeHex}`, paddingBottom: '3px', marginBottom: s.itemGap }} className="tracking-wider">Education & Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.education.map(edu => (edu.institution || edu.degree) && (
              <div key={edu.id} className="text-[12px]">
                <div className="font-bold text-gray-900 leading-tight">{edu.degree}</div>
                <div className="text-gray-500 italic mt-0.5">{edu.institution}</div>
                <div className="text-gray-400 text-[10px] mt-0.5">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills, Certs, Languages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        {skillsList.length > 0 && (
          <div>
            <h3 style={{ color: themeHex }} className="text-[12px] font-bold uppercase tracking-wider mb-1.5">Core Competencies</h3>
            <p className="text-[12px] text-slate-600 leading-relaxed font-sans">{skillsList.join(', ')}</p>
          </div>
        )}

        {data.certifications && data.certifications.some(c => c.name) && (
          <div>
            <h3 style={{ color: themeHex }} className="text-[12px] font-bold uppercase tracking-wider mb-1.5">Professional Certifications</h3>
            <div className="space-y-1 text-[11px] text-slate-600 leading-tight">
              {data.certifications.map(c => c.name && (
                <div key={c.id}><strong>{c.name}</strong> • {c.issuer}</div>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.some(l => l.name) && (
          <div>
            <h3 style={{ color: themeHex }} className="text-[12px] font-bold uppercase tracking-wider mb-1.5">Languages</h3>
            <div className="space-y-1 text-[11px] text-slate-600">
              {data.languages.map(l => l.name && (
                <div key={l.id}><strong>{l.name}</strong> ({l.proficiency})</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   8. Startup Vibe
   ========================================================================== */
const StartupTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: getFontFamilyStyle(fontFamily), color: '#334155', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight }} className="h-full bg-white border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1.5px', color: '#0f172a' }} className="leading-none mb-1">{data.fullName || 'Your Name'}</h1>
          <p style={{ color: themeHex }} className="text-base font-bold uppercase tracking-wider">{data.jobTitle || 'Job Title'}</p>
        </div>
        <div className="flex flex-wrap md:flex-col gap-x-4 gap-y-1 md:items-end text-[12px] text-slate-500">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
          {data.website && <span style={{ color: themeHex }} className="font-semibold underline">{data.website}</span>}
          {data.linkedin && <span className="text-slate-400">linkedin: {data.linkedin.split('/').pop()}</span>}
          {data.github && <span className="text-slate-400">github: {data.github.split('/').pop()}</span>}
        </div>
      </div>

      {data.summary && (
        <section style={{ marginBottom: s.sectionGap }} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-[13px] text-slate-700 whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(exp => exp.company || exp.role) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', marginBottom: s.itemGap }} className="flex items-center gap-2">
            <span style={{ backgroundColor: themeHex }} className="w-2 h-4 rounded-sm inline-block" />
            Work History
          </h2>
          <div className="space-y-5">
            {data.experience.map(exp => (exp.company || exp.role) && (
              <div key={exp.id} className="text-[13px]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3>{exp.role} <span style={{ color: themeHex }}>@ {exp.company}</span></h3>
                  <span className="text-[11px] font-normal text-slate-400">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-wrap text-slate-600 mt-1.5 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.some(p => p.name) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', marginBottom: s.itemGap }} className="flex items-center gap-2">
            <span style={{ backgroundColor: themeHex }} className="w-2 h-4 rounded-sm inline-block" />
            Featured Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map(p => p.name && (
              <div key={p.id} className="text-[13px]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3>{p.name} {p.link && <span className="text-[11px] font-normal text-slate-400">({p.link})</span>}</h3>
                  <span className="text-[11px] font-normal text-slate-400">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                </div>
                {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold mt-0.5">Tech stack: {p.technologies}</div>}
                <p className="whitespace-pre-wrap text-slate-600 mt-1 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.some(edu => edu.institution || edu.degree) && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', marginBottom: s.itemGap }} className="flex items-center gap-2">
            <span style={{ backgroundColor: themeHex }} className="w-2 h-4 rounded-sm inline-block" />
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map(edu => (edu.institution || edu.degree) && (
              <div key={edu.id} className="text-[12px]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <h3>{edu.degree}</h3>
                  <span className="text-[11px] font-normal text-slate-400">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
                </div>
                <div className="text-slate-500 mt-0.5">{edu.institution}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <section style={{ marginBottom: s.sectionGap }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', marginBottom: s.itemGap }} className="flex items-center gap-2">
            <span style={{ backgroundColor: themeHex }} className="w-2 h-4 rounded-sm inline-block" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span key={i} style={{ color: themeHex, backgroundColor: `${themeHex}08`, borderColor: `${themeHex}20` }} className="px-2.5 py-1 text-[11px] font-bold rounded-lg border">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Certs and Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        {data.certifications && data.certifications.some(c => c.name) && (
          <section>
            <h3 style={{ color: themeHex }} className="text-[12px] font-extrabold uppercase tracking-wider mb-2">Certifications</h3>
            <div className="space-y-1 text-[12px] text-slate-600">
              {data.certifications.map(c => c.name && (
                <div key={c.id}><strong>{c.name}</strong> • {c.issuer}</div>
              ))}
            </div>
          </section>
        )}

        {data.languages && data.languages.some(l => l.name) && (
          <section>
            <h3 style={{ color: themeHex }} className="text-[12px] font-extrabold uppercase tracking-wider mb-2">Languages</h3>
            <div className="flex flex-wrap gap-4 text-[12px] text-slate-600">
              {data.languages.map(l => l.name && (
                <div key={l.id}><strong>{l.name}</strong> ({l.proficiency})</div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   9. Tech Clean
   ========================================================================== */
const TechTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);

  return (
    <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Monaco, monospace', color: '#0f172a', padding: s.padding, fontSize: `calc(${s.fontSize} - 1px)`, lineHeight: s.lineHeight }} className="h-full bg-white border border-gray-100">
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex justify-between items-start flex-col sm:flex-row">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 leading-none">{data.fullName || 'Your Name'}</h1>
            <p style={{ color: themeHex }} className="text-xs font-extrabold">&lt; {data.jobTitle || 'Job Title'} /&gt;</p>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right text-[11px] text-gray-500 space-y-0.5">
            {data.email && <div>email: {data.email}</div>}
            {data.phone && <div>phone: {data.phone}</div>}
            {data.address && <div>loc: {data.address}</div>}
            {data.website && <div style={{ color: themeHex }}>web: {data.website}</div>}
            {data.linkedin && <div>in: {data.linkedin}</div>}
            {data.github && <div>github: {data.github}</div>}
          </div>
        </div>
      </div>

      {data.summary && (
        <section className="mb-6">
          <div className="text-[11px] text-gray-400 mb-1">// Summary</div>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[12px]">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.some(exp => exp.company || exp.role) && (
        <section className="mb-6">
          <div className="text-[11px] text-gray-400 mb-2">// Work Experience</div>
          <div className="space-y-4">
            {data.experience.map(exp => (exp.company || exp.role) && (
              <div key={exp.id} className="text-[12px]">
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-gray-900">{exp.role} @ {exp.company}</span>
                  <span className="text-[11px] text-gray-400 font-normal">{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-wrap text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.some(p => p.name) && (
        <section className="mb-6">
          <div className="text-[11px] text-gray-400 mb-2">// Featured Projects</div>
          <div className="space-y-4">
            {data.projects.map(p => p.name && (
              <div key={p.id} className="text-[12px]">
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-gray-900">{p.name} {p.link && `[${p.link}]`}</span>
                  <span className="text-[11px] text-gray-400 font-normal">{formatDate(p.startDate)} - {formatDate(p.endDate)}</span>
                </div>
                {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-bold mt-0.5">tech: {p.technologies}</div>}
                <p className="whitespace-pre-wrap text-gray-600 mt-1 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Grid */}
      {skillsList.length > 0 && (
        <section className="mb-6">
          <div className="text-[11px] text-gray-400 mb-2">// Skills & Technologies</div>
          <div className="flex flex-wrap gap-1">
            {skillsList.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 text-[11px] rounded">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        {data.education.some(edu => edu.institution || edu.degree) && (
          <section>
            <div className="text-[11px] text-gray-400 mb-1.5">// Education</div>
            <div className="space-y-3">
              {data.education.map(edu => (edu.institution || edu.degree) && (
                <div key={edu.id} className="text-[11px]">
                  <div className="font-bold text-gray-900">{edu.degree}</div>
                  <div className="text-gray-500">{edu.institution} ({formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)})</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.some(c => c.name) && (
          <section>
            <div className="text-[11px] text-gray-400 mb-1.5">// Certifications</div>
            <div className="space-y-2 text-[11px] text-gray-700">
              {data.certifications.map(c => c.name && (
                <div key={c.id}>
                  <strong>{c.name}</strong> • {c.issuer}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   10. Academic Standard
   ========================================================================== */
const AcademicTemplate = ({ data, skillsList, themeColor, fontFamily, spacing }: TemplateProps) => {
  const s = getSpacingStyles(spacing);
  const themeHex = getThemeColorHex(themeColor);
  const serifFont = { fontFamily: 'Georgia, "Times New Roman", Times, serif', color: '#111827', padding: s.padding, fontSize: s.fontSize, lineHeight: s.lineHeight };

  return (
    <div style={serifFont} className="h-full bg-white border border-gray-100">
      <div className="text-center" style={{ marginBottom: s.sectionGap }}>
        <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900 mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-base text-gray-600 tracking-wide uppercase italic mb-3">{data.jobTitle || 'Job Title'}</p>
        <ContactInfo data={data} separator=" | " themeColorHex={themeHex} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: s.sectionGap }}>
        {data.summary && (
          <section>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: s.itemGap }}>Statement of Purpose</h2>
            <p className="whitespace-pre-wrap text-justify text-[13px] text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Education */}
        {data.education.some(edu => edu.institution || edu.degree) && (
          <section>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: s.itemGap }}>Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (edu.institution || edu.degree) && (
                <div key={edu.id} className="text-[13px]">
                  <div className="flex justify-between items-baseline font-bold text-gray-900 leading-none">
                    <h3>{edu.institution}</h3>
                    <span className="text-[11px] font-normal text-gray-500">{formatDate(edu.startDate)} – {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</span>
                  </div>
                  <div className="italic text-gray-600 text-[12px] mt-0.5">{edu.degree}</div>
                  {edu.description && <p className="text-[12px] text-gray-600 mt-1.5 whitespace-pre-wrap">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company || exp.role) && (
          <section>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: s.itemGap }}>Academic & Research Experience</h2>
            <div className="space-y-4">
              {data.experience.map(exp => (exp.company || exp.role) && (
                <div key={exp.id} className="text-[13px]">
                  <div className="flex justify-between items-baseline font-bold text-gray-900 leading-none">
                    <h3>{exp.role}</h3>
                    <span className="text-[11px] font-normal text-gray-500">{formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <div className="italic text-gray-600 text-[12px] mt-0.5">{exp.company}</div>
                  <p className="whitespace-pre-wrap text-[12px] text-gray-600 mt-1.5 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.some(p => p.name) && (
          <section>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: s.itemGap }}>Selected Publications & Projects</h2>
            <div className="space-y-4">
              {data.projects.map(p => p.name && (
                <div key={p.id} className="text-[13px]">
                  <div className="flex justify-between items-baseline font-bold text-gray-900 leading-none">
                    <h3>{p.name} {p.link && <span className="text-[11px] font-normal text-gray-400 font-sans">({p.link})</span>}</h3>
                    <span className="text-[11px] font-normal text-gray-500">{formatDate(p.startDate)} – {p.isCurrent ? 'Present' : formatDate(p.endDate)}</span>
                  </div>
                  {p.technologies && <div style={{ color: themeHex }} className="text-[11px] font-semibold italic">Keywords: {p.technologies}</div>}
                  <p className="whitespace-pre-wrap text-[12px] text-gray-600 mt-1 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsList.length > 0 && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '8px' }}>Technical Skills</h2>
              <p className="text-[12px] text-gray-700 font-sans">{skillsList.join(', ')}</p>
            </section>
          )}

          {data.certifications && data.certifications.some(c => c.name) && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', color: themeHex, borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '8px' }}>Honors & Certifications</h2>
              <div className="space-y-1.5">
                {data.certifications.map(c => c.name && (
                  <div key={c.id} className="text-[12px] text-gray-700">
                    <strong>{c.name}</strong> ({c.issuer}, {formatDate(c.date)})
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
