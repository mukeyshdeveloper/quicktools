import type { CardData, CardDesignSettings } from './utils';
import { getFontFamilyStyle } from './utils';

export interface TemplateProps {
  data: CardData;
  design: CardDesignSettings;
}

export const TEMPLATES = [
  { id: 'classic-center', name: 'Classic Center' },
  { id: 'modern-bar', name: 'Modern Bar' },
  { id: 'minimal-clean', name: 'Minimal Clean' },
  { id: 'bold-header', name: 'Bold Header' },
  { id: 'elegant-serif', name: 'Elegant Serif' },
  { id: 'corporate-split', name: 'Corporate Split' },
  { id: 'creative-angle', name: 'Creative Angle' },
  { id: 'gradient-fade', name: 'Gradient Fade' },
  { id: 'dark-luxe', name: 'Dark Luxe' },
  { id: 'photo-sidebar', name: 'Photo Sidebar' },
  { id: 'geometric', name: 'Geometric' },
  { id: 'tech-stack', name: 'Tech Stack' },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]['id'];

function baseStyle(design: CardDesignSettings): React.CSSProperties {
  return {
    fontFamily: getFontFamilyStyle(design.fontFamily),
    color: design.textColor,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };
}

function ContactLine({
  icon,
  value,
  color,
}: {
  icon: string;
  value: string;
  color: string;
}): React.ReactElement | null {
  if (!value.trim()) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color, lineHeight: 1.3 }}>
      <span style={{ opacity: 0.7, fontSize: 8 }}>{icon}</span>
      <span>{value}</span>
    </div>
  );
}

function CustomFieldsBlock({
  fields,
  color,
  compact = false,
}: {
  fields: CardData['customFields'];
  color: string;
  compact?: boolean;
}): React.ReactElement | null {
  const visible = fields.filter((f) => f.label.trim() || f.value.trim());
  if (visible.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 2 : 4, marginTop: compact ? 4 : 6 }}>
      {visible.map((f) => (
        <div key={f.id} style={{ fontSize: compact ? 8 : 9, color, lineHeight: 1.3 }}>
          {f.label.trim() && (
            <span style={{ fontWeight: 600, marginRight: 4 }}>{f.label}:</span>
          )}
          <span>{f.value}</span>
        </div>
      ))}
    </div>
  );
}

function ClassicCenterTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center' }}>
      <div style={{ width: 40, height: 3, background: design.primaryColor, marginBottom: 10, borderRadius: 2 }} />
      {data.fullName && <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{data.fullName}</div>}
      {data.jobTitle && <div style={{ fontSize: 10, color: design.primaryColor, marginTop: 3, fontWeight: 500 }}>{data.jobTitle}</div>}
      {data.company && <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>{data.company}</div>}
      {data.tagline && <div style={{ fontSize: 8, opacity: 0.55, marginTop: 6, fontStyle: 'italic', maxWidth: 240 }}>{data.tagline}</div>}
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <ContactLine icon="✉" value={data.email} color={design.textColor} />
        <ContactLine icon="☎" value={data.phone} color={design.textColor} />
        <ContactLine icon="🌐" value={data.website} color={design.textColor} />
      </div>
      <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
    </div>
  );
}

function ModernBarTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), display: 'flex' }}>
      <div style={{ width: 8, background: design.primaryColor, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data.fullName && <div style={{ fontSize: 17, fontWeight: 700 }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 10, color: design.primaryColor, marginTop: 2 }}>{data.jobTitle}</div>}
        {data.company && <div style={{ fontSize: 9, opacity: 0.65, marginTop: 1 }}>{data.company}</div>}
        <div style={{ width: 30, height: 2, background: design.accentColor, marginTop: 8, marginBottom: 8 }} />
        <ContactLine icon="✉" value={data.email} color={design.textColor} />
        <ContactLine icon="☎" value={data.phone} color={design.textColor} />
        <ContactLine icon="🌐" value={data.website} color={design.textColor} />
        <ContactLine icon="📍" value={data.address} color={design.textColor} />
        <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
      </div>
    </div>
  );
}

function MinimalCleanTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {data.fullName && <div style={{ fontSize: 16, fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4, letterSpacing: '0.05em' }}>{data.jobTitle}</div>}
      </div>
      <div>
        <div style={{ borderTop: `1px solid ${design.primaryColor}33`, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ContactLine icon="" value={data.email} color={design.textColor} />
          <ContactLine icon="" value={data.phone} color={design.textColor} />
          <ContactLine icon="" value={data.website} color={design.textColor} />
          <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
        </div>
      </div>
    </div>
  );
}

function BoldHeaderTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: design.primaryColor, padding: '14px 18px', color: '#fff' }}>
        {data.fullName && <div style={{ fontSize: 16, fontWeight: 700 }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 9, opacity: 0.85, marginTop: 2 }}>{data.jobTitle}</div>}
      </div>
      <div style={{ padding: '12px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {data.company && <div style={{ fontSize: 10, fontWeight: 600, color: design.primaryColor }}>{data.company}</div>}
        {data.tagline && <div style={{ fontSize: 8, opacity: 0.6, marginBottom: 4 }}>{data.tagline}</div>}
        <ContactLine icon="✉" value={data.email} color={design.textColor} />
        <ContactLine icon="☎" value={data.phone} color={design.textColor} />
        <ContactLine icon="🌐" value={data.website} color={design.textColor} />
        <ContactLine icon="📍" value={data.address} color={design.textColor} />
        <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
      </div>
    </div>
  );
}

function ElegantSerifTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), padding: 18, border: `1px solid ${design.primaryColor}44`, margin: 6, height: 'calc(100% - 12px)', width: 'calc(100% - 12px)', boxSizing: 'border-box' }}>
      <div style={{ borderBottom: `1px solid ${design.primaryColor}33`, paddingBottom: 8, marginBottom: 8 }}>
        {data.fullName && <div style={{ fontSize: 17, fontWeight: 400, fontStyle: 'italic' }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3, color: design.primaryColor }}>{data.jobTitle}</div>}
      </div>
      {data.company && <div style={{ fontSize: 10, marginBottom: 6 }}>{data.company}</div>}
      <ContactLine icon="✉" value={data.email} color={design.textColor} />
      <ContactLine icon="☎" value={data.phone} color={design.textColor} />
      <ContactLine icon="🌐" value={data.website} color={design.textColor} />
      <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
    </div>
  );
}

function CorporateSplitTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), display: 'flex' }}>
      <div style={{ width: '42%', background: `${design.primaryColor}12`, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data.fullName && <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 9, color: design.primaryColor, marginTop: 4 }}>{data.jobTitle}</div>}
        {data.company && <div style={{ fontSize: 8, opacity: 0.6, marginTop: 6 }}>{data.company}</div>}
      </div>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
        <ContactLine icon="✉" value={data.email} color={design.textColor} />
        <ContactLine icon="☎" value={data.phone} color={design.textColor} />
        <ContactLine icon="🌐" value={data.website} color={design.textColor} />
        <ContactLine icon="📍" value={data.address} color={design.textColor} />
        <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
      </div>
    </div>
  );
}

function CreativeAngleTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design) }}>
      <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, background: design.primaryColor, transform: 'rotate(25deg)', opacity: 0.9 }} />
      <div style={{ position: 'absolute', bottom: -20, left: -10, width: 80, height: 80, background: design.accentColor, transform: 'rotate(-15deg)', opacity: 0.4 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: 20, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data.fullName && <div style={{ fontSize: 17, fontWeight: 800 }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 10, color: design.primaryColor, marginTop: 2 }}>{data.jobTitle}</div>}
        {data.tagline && <div style={{ fontSize: 8, opacity: 0.55, marginTop: 4, maxWidth: 200 }}>{data.tagline}</div>}
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ContactLine icon="✉" value={data.email} color={design.textColor} />
          <ContactLine icon="☎" value={data.phone} color={design.textColor} />
          <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
        </div>
      </div>
    </div>
  );
}

function GradientFadeTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div
      style={{
        ...baseStyle(design),
        background: `linear-gradient(135deg, ${design.primaryColor}18 0%, ${design.accentColor}28 50%, transparent 100%)`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {data.fullName && <div style={{ fontSize: 18, fontWeight: 700, background: `linear-gradient(90deg, ${design.primaryColor}, ${design.accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{data.fullName}</div>}
      {data.jobTitle && <div style={{ fontSize: 10, marginTop: 3 }}>{data.jobTitle}</div>}
      {data.company && <div style={{ fontSize: 9, opacity: 0.65, marginTop: 1 }}>{data.company}</div>}
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ContactLine icon="✉" value={data.email} color={design.textColor} />
        <ContactLine icon="☎" value={data.phone} color={design.textColor} />
        <ContactLine icon="🌐" value={data.website} color={design.textColor} />
        <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
      </div>
    </div>
  );
}

function DarkLuxeTemplate({ data, design }: TemplateProps): React.ReactElement {
  const light = '#f5f4f0';
  return (
    <div style={{ ...baseStyle(design), background: '#1a1917', color: light, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: 24, height: 2, background: design.accentColor, marginBottom: 10 }} />
      {data.fullName && <div style={{ fontSize: 17, fontWeight: 600, color: light }}>{data.fullName}</div>}
      {data.jobTitle && <div style={{ fontSize: 10, color: design.accentColor, marginTop: 3 }}>{data.jobTitle}</div>}
      {data.company && <div style={{ fontSize: 9, opacity: 0.5, marginTop: 2 }}>{data.company}</div>}
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ContactLine icon="✉" value={data.email} color={light} />
        <ContactLine icon="☎" value={data.phone} color={light} />
        <ContactLine icon="🌐" value={data.website} color={light} />
        <CustomFieldsBlock fields={data.customFields} color={light} compact />
      </div>
    </div>
  );
}

function PhotoSidebarTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), display: 'flex' }}>
      <div style={{ width: 72, background: `${design.primaryColor}15`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid ${design.primaryColor}44`, opacity: 0.3 }} />
      </div>
      <div style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data.fullName && <div style={{ fontSize: 15, fontWeight: 700 }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 9, color: design.primaryColor, marginTop: 2 }}>{data.jobTitle}</div>}
        {data.company && <div style={{ fontSize: 8, opacity: 0.6, marginTop: 1 }}>{data.company}</div>}
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ContactLine icon="✉" value={data.email} color={design.textColor} />
          <ContactLine icon="☎" value={data.phone} color={design.textColor} />
          <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
        </div>
      </div>
    </div>
  );
}

function GeometricTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design) }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 50px 50px 0', borderColor: `transparent ${design.primaryColor} transparent transparent` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '40px 0 0 40px', borderColor: `transparent transparent transparent ${design.accentColor}55` }} />
      <div style={{ position: 'relative', zIndex: 1, padding: 20, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data.fullName && <div style={{ fontSize: 16, fontWeight: 700 }}>{data.fullName}</div>}
        {data.jobTitle && <div style={{ fontSize: 10, color: design.primaryColor, marginTop: 2 }}>{data.jobTitle}</div>}
        {data.company && <div style={{ fontSize: 9, opacity: 0.65, marginTop: 1 }}>{data.company}</div>}
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ContactLine icon="✉" value={data.email} color={design.textColor} />
          <ContactLine icon="☎" value={data.phone} color={design.textColor} />
          <ContactLine icon="📍" value={data.address} color={design.textColor} />
          <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
        </div>
      </div>
    </div>
  );
}

function TechStackTemplate({ data, design }: TemplateProps): React.ReactElement {
  return (
    <div style={{ ...baseStyle(design), padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: design.primaryColor }} />
        <div style={{ width: 8, height: 8, borderRadius: 2, background: design.accentColor }} />
        <div style={{ width: 8, height: 8, borderRadius: 2, background: `${design.primaryColor}44` }} />
        <div style={{ flex: 1, height: 1, background: `${design.textColor}15`, marginLeft: 4 }} />
      </div>
      {data.fullName && <div style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-mono), monospace' }}>{data.fullName}</div>}
      {data.jobTitle && <div style={{ fontSize: 9, color: design.primaryColor, marginTop: 2, fontFamily: 'var(--font-mono), monospace' }}>{'// '}{data.jobTitle}</div>}
      <div style={{ marginTop: 8, padding: '8px 10px', background: `${design.primaryColor}08`, borderRadius: 6, border: `1px solid ${design.primaryColor}18`, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ContactLine icon=">" value={data.email} color={design.textColor} />
        <ContactLine icon=">" value={data.phone} color={design.textColor} />
        <ContactLine icon=">" value={data.website} color={design.textColor} />
        <CustomFieldsBlock fields={data.customFields} color={design.textColor} compact />
      </div>
    </div>
  );
}

export function renderTemplate(id: TemplateId, props: TemplateProps): React.ReactElement {
  switch (id) {
    case 'classic-center':
      return <ClassicCenterTemplate {...props} />;
    case 'modern-bar':
      return <ModernBarTemplate {...props} />;
    case 'minimal-clean':
      return <MinimalCleanTemplate {...props} />;
    case 'bold-header':
      return <BoldHeaderTemplate {...props} />;
    case 'elegant-serif':
      return <ElegantSerifTemplate {...props} />;
    case 'corporate-split':
      return <CorporateSplitTemplate {...props} />;
    case 'creative-angle':
      return <CreativeAngleTemplate {...props} />;
    case 'gradient-fade':
      return <GradientFadeTemplate {...props} />;
    case 'dark-luxe':
      return <DarkLuxeTemplate {...props} />;
    case 'photo-sidebar':
      return <PhotoSidebarTemplate {...props} />;
    case 'geometric':
      return <GeometricTemplate {...props} />;
    case 'tech-stack':
      return <TechStackTemplate {...props} />;
    default:
      return <ModernBarTemplate {...props} />;
  }
}