'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  type CardData,
  type CardDesignSettings,
  type CardImageSettings,
  type CustomField,
  type FontFamily,
  CARD_WIDTH,
  CARD_HEIGHT,
  FONT_OPTIONS,
  getDefaultCardData,
  getDefaultDesignSettings,
  getSampleCardData,
  generateId,
  readImageFile,
  exportCardToPng,
  exportCardToPdf,
  exportCardSheetToPdf,
  getCardFilename,
  printCard,
  printCardSheet,
  downloadDataUrl,
  clampImagePosition,
  clampImageSize,
  SHEET_CARD_COUNT,
} from './utils';
import { TEMPLATES, renderTemplate, type TemplateId } from './templates';
import ResetButton from '@/components/ui/ResetButton';
import {
  Download,
  LayoutTemplate,
  Palette,
  Type,
  Image as ImageIcon,
  Plus,
  Trash2,
  Move,
  Maximize2,
  FileText,
  Sparkles,
  Loader2,
  Printer,
  FileDown,
  LayoutGrid,
} from 'lucide-react';

const PRINT_TARGET_ID = 'visiting-card-print-target';
const SHEET_PRINT_TARGET_ID = 'visiting-card-sheet-print';

const STORAGE_KEY = 'quickutils_visiting_card';

function getInitialState(): { data: CardData; design: CardDesignSettings } {
  if (typeof window === 'undefined') {
    return { data: getDefaultCardData(), design: getDefaultDesignSettings() };
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as { data: CardData; design: CardDesignSettings };
      return {
        data: parsed.data ?? getDefaultCardData(),
        design: { ...getDefaultDesignSettings(), ...parsed.design },
      };
    }
  } catch {
    /* use defaults */
  }
  return { data: getDefaultCardData(), design: getDefaultDesignSettings() };
}

const COLOR_PRESETS = [
  { primary: '#2d6a4f', accent: '#52b788', text: '#1a1917' },
  { primary: '#2563eb', accent: '#60a5fa', text: '#1e293b' },
  { primary: '#7c3aed', accent: '#a78bfa', text: '#1e1b4b' },
  { primary: '#be123c', accent: '#fb7185', text: '#1a1917' },
  { primary: '#b45309', accent: '#fbbf24', text: '#1a1917' },
  { primary: '#0f766e', accent: '#2dd4bf', text: '#134e4a' },
  { primary: '#1e293b', accent: '#64748b', text: '#0f172a' },
  { primary: '#9333ea', accent: '#e879f9', text: '#1a1917' },
];

const STANDARD_FIELDS: { key: keyof CardData; label: string; placeholder: string }[] = [
  { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
  { key: 'jobTitle', label: 'Job Title', placeholder: 'Product Manager' },
  { key: 'company', label: 'Company', placeholder: 'Acme Corp' },
  { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210' },
  { key: 'email', label: 'Email', placeholder: 'john@example.com' },
  { key: 'website', label: 'Website', placeholder: 'www.example.com' },
  { key: 'address', label: 'Address', placeholder: 'City, State, Country' },
  { key: 'tagline', label: 'Tagline', placeholder: 'Your professional motto' },
];

interface CardImageOverlayProps {
  settings: CardImageSettings;
  onChange: (patch: Partial<CardImageSettings>) => void;
  interactive: boolean;
}

function CardImageOverlay({
  settings,
  onChange,
  interactive,
}: CardImageOverlayProps): React.ReactElement | null {
  const dragRef = useRef<{
    mode: 'drag' | 'resize' | null;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  }>({ mode: null, startX: 0, startY: 0, origX: 0, origY: 0, origW: 0, origH: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, mode: 'drag' | 'resize') => {
      if (!interactive || !settings.src) return;
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        mode,
        startX: e.clientX,
        startY: e.clientY,
        origX: settings.x,
        origY: settings.y,
        origW: settings.width,
        origH: settings.height,
      };
    },
    [interactive, settings],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current;
      if (!d.mode) return;

      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;

      if (d.mode === 'drag') {
        const pos = clampImagePosition(d.origX + dx, d.origY + dy, settings.width, settings.height);
        onChange(pos);
      } else {
        const size = clampImageSize(d.origW + dx, d.origH + dy);
        const pos = clampImagePosition(settings.x, settings.y, size.width, size.height);
        onChange({ ...size, ...pos });
      }
    },
    [onChange, settings.x, settings.y, settings.width, settings.height],
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current.mode = null;
  }, []);

  if (!settings.enabled || !settings.src) return null;

  return (
    <div
      className={interactive ? 'group' : ''}
      style={{
        position: 'absolute',
        left: settings.x,
        top: settings.y,
        width: settings.width,
        height: settings.height,
        zIndex: 20,
        cursor: interactive ? 'grab' : 'default',
        touchAction: 'none',
      }}
      onPointerDown={(e) => handlePointerDown(e, 'drag')}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <img
        src={settings.src}
        alt="Card image"
        draggable={false}
        className="h-full w-full rounded-lg object-cover shadow-md"
        style={{
          border: interactive ? '2px solid rgba(45, 106, 79, 0.6)' : 'none',
          pointerEvents: 'none',
        }}
      />
      {interactive && (
        <div
          className="absolute -bottom-1 -right-1 flex h-5 w-5 cursor-se-resize items-center justify-center rounded-full bg-brand text-white opacity-0 shadow transition group-hover:opacity-100"
          onPointerDown={(e) => handlePointerDown(e, 'resize')}
          aria-label="Resize image"
        >
          <Maximize2 size={10} />
        </div>
      )}
    </div>
  );
}

interface CardPreviewProps {
  data: CardData;
  design: CardDesignSettings;
  templateId: TemplateId;
  interactive?: boolean;
  onImageChange?: (patch: Partial<CardImageSettings>) => void;
  id?: string;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

function CardPreview({
  data,
  design,
  templateId,
  interactive = false,
  onImageChange,
  id,
  cardRef,
  className = '',
}: CardPreviewProps): React.ReactElement {
  return (
    <div
      id={id}
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: design.backgroundColor,
      }}
    >
      {design.backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${design.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: design.backgroundImageOpacity,
          }}
        />
      )}
      <div className="relative z-10 h-full w-full">
        {renderTemplate(templateId, { data, design })}
      </div>
      <CardImageOverlay
        settings={design.cardImage}
        onChange={onImageChange ?? (() => undefined)}
        interactive={interactive}
      />
    </div>
  );
}

export default function VisitingCardGenerator(): React.ReactElement {
  const [data, setData] = useState<CardData>(() => getInitialState().data);
  const [design, setDesign] = useState<CardDesignSettings>(() => getInitialState().design);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [exporting, setExporting] = useState<'png' | 'pdf' | 'sheet' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, design }));
  }, [data, design]);

  function updateField<K extends keyof CardData>(key: K, value: CardData[K]): void {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateDesign(patch: Partial<CardDesignSettings>): void {
    setDesign((prev) => ({ ...prev, ...patch }));
  }

  function updateCardImage(patch: Partial<CardImageSettings>): void {
    setDesign((prev) => ({
      ...prev,
      cardImage: { ...prev.cardImage, ...patch },
    }));
  }

  function addCustomField(): void {
    setData((prev) =>
      prev
        ? {
            ...prev,
            customFields: [...prev.customFields, { id: generateId(), label: '', value: '' }],
          }
        : prev,
    );
  }

  function updateCustomField(id: string, key: 'label' | 'value', value: string): void {
    setData((prev) =>
      prev
        ? {
            ...prev,
            customFields: prev.customFields.map((f) =>
              f.id === id ? { ...f, [key]: value } : f,
            ),
          }
        : prev,
    );
  }

  function removeCustomField(id: string): void {
    setData((prev) =>
      prev
        ? { ...prev, customFields: prev.customFields.filter((f) => f.id !== id) }
        : prev,
    );
  }

  async function handleBackgroundUpload(file: File): Promise<void> {
    const src = await readImageFile(file);
    if (!src) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    updateDesign({ backgroundImage: src });
  }

  async function handleCardImageUpload(file: File): Promise<void> {
    const src = await readImageFile(file);
    if (!src) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    updateCardImage({ src, enabled: true });
  }

  function handleReset(): void {
    if (!confirm('Reset all card data and design settings?')) return;
    setData(getDefaultCardData());
    setDesign(getDefaultDesignSettings());
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  function loadSample(): void {
    if (!confirm('Replace current data with sample card?')) return;
    setData(getSampleCardData());
  }

  async function handleDownloadPng(): Promise<void> {
    if (!cardRef.current || !data) return;
    setExporting('png');
    setError(null);
    try {
      const dataUrl = await exportCardToPng(cardRef.current);
      downloadDataUrl(dataUrl, getCardFilename(data.fullName, 'png'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PNG export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  }

  async function handleDownloadPdf(): Promise<void> {
    if (!cardRef.current || !data) return;
    setExporting('pdf');
    setError(null);
    try {
      await exportCardToPdf(cardRef.current, getCardFilename(data.fullName, 'pdf'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  }

  function handlePrint(): void {
    printCard(PRINT_TARGET_ID);
  }

  async function handleDownloadSheetPdf(): Promise<void> {
    if (!cardRef.current || !data) return;
    setExporting('sheet');
    setError(null);
    try {
      await exportCardSheetToPdf(
        cardRef.current,
        getCardFilename(data.fullName, 'pdf', 'sheet'),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sheet PDF export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  }

  function handlePrintSheet(): void {
    printCardSheet(SHEET_PRINT_TARGET_ID);
  }

  const templateId = (TEMPLATES.some((t) => t.id === design.templateId)
    ? design.templateId
    : 'modern-bar') as TemplateId;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="tool-pill">Business Card Maker</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Visiting Card Generator
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          Design professional business cards with 12 templates. Customize colors, fonts,
          background images, and add a draggable logo or photo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Controls */}
        <div className="lg:col-span-5">
          <div className="tool-panel space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'content'
                    ? 'bg-brand text-white'
                    : 'border border-border bg-background text-muted hover:text-text'
                }`}
              >
                <FileText size={16} />
                Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('design')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'design'
                    ? 'bg-brand text-white'
                    : 'border border-border bg-background text-muted hover:text-text'
                }`}
              >
                <Palette size={16} />
                Design
              </button>
            </div>

            {activeTab === 'content' && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {STANDARD_FIELDS.map((field) => (
                    <div key={field.key} className={field.key === 'tagline' ? 'sm:col-span-2' : ''}>
                      <label htmlFor={field.key} className="tool-label">
                        {field.label}
                      </label>
                      <input
                        id={field.key}
                        type="text"
                        value={data[field.key] as string}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="tool-input"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="tool-label mb-0">Custom Fields</span>
                    <button
                      type="button"
                      onClick={addCustomField}
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-brand hover:bg-brand/10"
                    >
                      <Plus size={14} />
                      Add Field
                    </button>
                  </div>
                  {data.customFields.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-xs text-muted">
                      Add custom label-value pairs like LinkedIn, Skype, or license numbers.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {data.customFields.map((field: CustomField) => (
                        <div key={field.id} className="flex gap-2">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateCustomField(field.id, 'label', e.target.value)}
                            placeholder="Label"
                            className="tool-input w-28 shrink-0"
                            aria-label="Custom field label"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                            placeholder="Value"
                            className="tool-input flex-1"
                            aria-label="Custom field value"
                          />
                          <button
                            type="button"
                            onClick={() => removeCustomField(field.id)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-muted transition hover:border-red-300 hover:text-red-500"
                            aria-label="Remove custom field"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <LayoutTemplate size={14} className="text-muted" />
                    <span className="tool-label mb-0">Template ({TEMPLATES.length})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => updateDesign({ templateId: t.id })}
                        className={`rounded-xl border px-2 py-2 text-center text-[10px] font-semibold leading-tight transition ${
                          templateId === t.id
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-border hover:border-muted'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Palette size={14} className="text-muted" />
                    <span className="tool-label mb-0">Color Presets</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          updateDesign({
                            primaryColor: preset.primary,
                            accentColor: preset.accent,
                            textColor: preset.text,
                          })
                        }
                        className="flex h-8 w-8 overflow-hidden rounded-full border-2 border-border transition hover:scale-110"
                        title="Apply color preset"
                      >
                        <span className="h-full w-1/2" style={{ background: preset.primary }} />
                        <span className="h-full w-1/2" style={{ background: preset.accent }} />
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div>
                      <label className="tool-label">Primary</label>
                      <input
                        type="color"
                        value={design.primaryColor}
                        onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                        className="h-10 w-full cursor-pointer rounded-xl border border-border bg-background p-1"
                      />
                    </div>
                    <div>
                      <label className="tool-label">Accent</label>
                      <input
                        type="color"
                        value={design.accentColor}
                        onChange={(e) => updateDesign({ accentColor: e.target.value })}
                        className="h-10 w-full cursor-pointer rounded-xl border border-border bg-background p-1"
                      />
                    </div>
                    <div>
                      <label className="tool-label">Text</label>
                      <input
                        type="color"
                        value={design.textColor}
                        onChange={(e) => updateDesign({ textColor: e.target.value })}
                        className="h-10 w-full cursor-pointer rounded-xl border border-border bg-background p-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Type size={14} className="text-muted" />
                    <span className="tool-label mb-0">Font</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FONT_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => updateDesign({ fontFamily: f.id as FontFamily })}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          design.fontFamily === f.id
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-border hover:border-muted'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <ImageIcon size={14} className="text-muted" />
                    <span className="tool-label mb-0">Card Background Image</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="btn-secondary cursor-pointer text-xs">
                      Upload Background
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void handleBackgroundUpload(file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    {design.backgroundImage && (
                      <button
                        type="button"
                        onClick={() => updateDesign({ backgroundImage: null })}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {design.backgroundImage && (
                    <div className="mt-2">
                      <label className="tool-label">
                        Background Opacity ({Math.round(design.backgroundImageOpacity * 100)}%)
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={design.backgroundImageOpacity * 100}
                        onChange={(e) =>
                          updateDesign({ backgroundImageOpacity: Number(e.target.value) / 100 })
                        }
                        className="w-full accent-brand"
                      />
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Move size={14} className="text-muted" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Image on Card (Optional)
                      </span>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={design.cardImage.enabled}
                        onChange={(e) => updateCardImage({ enabled: e.target.checked })}
                        className="accent-brand"
                      />
                      Enable
                    </label>
                  </div>
                  <p className="mb-3 text-xs text-muted">
                    Add a logo or photo. Drag to reposition and use the corner handle to resize on
                    the preview.
                  </p>
                  <label className="btn-secondary inline-block cursor-pointer text-xs">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleCardImageUpload(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  {design.cardImage.src && (
                    <button
                      type="button"
                      onClick={() => updateCardImage({ src: null, enabled: false })}
                      className="ml-3 text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void handleDownloadPdf()}
                  disabled={exporting !== null}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 disabled:opacity-60 sm:flex-none"
                >
                  {exporting === 'pdf' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <FileDown size={16} />
                  )}
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={exporting !== null}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-60"
                >
                  <Printer size={16} />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => void handleDownloadPng()}
                  disabled={exporting !== null}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-60"
                >
                  {exporting === 'png' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Download size={16} />
                  )}
                  PNG
                </button>
              </div>
              <p className="text-xs text-muted">
                PDF is sized at 3.5&quot; × 2&quot; — ready for print shops. Use Print for your
                home printer.
              </p>

              <div className="rounded-xl border border-border bg-background p-4">
                <div className="mb-2 flex items-center gap-2">
                  <LayoutGrid size={14} className="text-muted" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    A4 Sheet — {SHEET_CARD_COUNT} Cards
                  </span>
                </div>
                <p className="mb-3 text-xs text-muted">
                  Print {SHEET_CARD_COUNT} identical cards on one A4 page (2×5 grid). Cut along the
                  dashed guides after printing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void handleDownloadSheetPdf()}
                    disabled={exporting !== null}
                    className="btn-primary flex flex-1 items-center justify-center gap-2 text-xs disabled:opacity-60 sm:flex-none"
                  >
                    {exporting === 'sheet' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <FileDown size={14} />
                    )}
                    Download A4 Sheet PDF
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintSheet}
                    disabled={exporting !== null}
                    className="btn-secondary flex items-center gap-2 text-xs disabled:opacity-60"
                  >
                    <Printer size={14} />
                    Print Sheet
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={loadSample}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Sparkles size={16} />
                  Sample
                </button>
                <ResetButton onClick={handleReset} />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7">
          <div className="tool-panel">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-muted">
              Live Preview — Standard 3.5&quot; × 2&quot; ratio
            </p>
            <div className="flex items-center justify-center rounded-2xl bg-background p-6 sm:p-10">
              <CardPreview
                id={PRINT_TARGET_ID}
                cardRef={cardRef}
                data={data}
                design={design}
                templateId={templateId}
                interactive
                onImageChange={updateCardImage}
                className="rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              />
            </div>
            {design.cardImage.enabled && design.cardImage.src && (
              <p className="mt-3 text-center text-xs text-muted">
                Drag the image to move · Corner handle to resize
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Off-screen A4 sheet — moved to body & shown only when printing */}
      <div
        id={SHEET_PRINT_TARGET_ID}
        aria-hidden="true"
        className="visiting-card-sheet-screen-hide pointer-events-none"
      >
        <div className="visiting-card-sheet-grid">
          {Array.from({ length: SHEET_CARD_COUNT }, (_, index) => (
            <div key={index} className="visiting-card-sheet-cell">
              <CardPreview
                data={data}
                design={design}
                templateId={templateId}
                interactive={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}