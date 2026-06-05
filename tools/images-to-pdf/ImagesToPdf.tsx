'use client';

import { useState, useEffect, useMemo } from 'react';
import { PdfOptions, PAGE_SIZES, getPrintableCss, getPageDimensions, groupIntoPages, computePdfFilename, downscaleImage, type PageSize, type FitMode, type Orientation } from './utils';
import { Upload, X, ArrowUp, ArrowDown, Printer } from 'lucide-react';

interface ImageItem {
  id: number;
  file: File;
  previewUrl: string;
  rotation: number; // 0, 90, 180, 270
}

export default function ImagesToPdf() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [options, setOptions] = useState<PdfOptions>({
    pageSize: 'A4',
    orientation: 'portrait',
    marginMm: 10,
    fitMode: 'contain',
    addPageNumbers: false,
    backgroundColor: '#ffffff',
    titlePage: false,
    titleText: 'Images to PDF',
    subtitleText: '',
    downscalePercent: 100,
    columns: 1,
    showCaptions: false,
    filenameTemplate: 'images-{date}-{count}',
  });
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSrcMap, setPrintSrcMap] = useState<Record<number, string>>({});
  const [isPreparing, setIsPreparing] = useState(false);

  // Safe date for filename suggestion (avoid new Date() in render for prerender safety)
  const [todayStr, setTodayStr] = useState('2026-01-01');
  useEffect(() => {
    setTodayStr(new Date().toISOString().slice(0, 10));
  }, []);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const newItems: ImageItem[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map((file, idx) => ({
        id: Date.now() + idx,
        file,
        previewUrl: URL.createObjectURL(file),
        rotation: 0,
      }));
    setImages(prev => [...prev, ...newItems]);
  }

  function removeImage(id: number) {
    setImages(prev => {
      const toRemove = prev.find(i => i.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.previewUrl);
      return prev.filter(i => i.id !== id);
    });
    setPrintSrcMap(prev => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  }

  function moveImage(id: number, direction: 'up' | 'down') {
    setImages(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const newArr = [...prev];
      const a = newArr[idx]!;
      const b = newArr[newIdx]!;
      newArr[idx] = b;
      newArr[newIdx] = a;
      return newArr;
    });
  }

  function rotateImage(id: number, degrees: number) {
    setImages(prev => prev.map(img => {
      if (img.id === id) {
        const newRot = (img.rotation + degrees + 360) % 360;
        return { ...img, rotation: newRot };
      }
      return img;
    }));
  }

  function updateOption<K extends keyof PdfOptions>(key: K, value: PdfOptions[K]) {
    setOptions(prev => ({ ...prev, [key]: value }));
    if (key === 'downscalePercent') {
      setPrintSrcMap({}); // force re-process on next print with new quality
    }
  }

  function clearAll() {
    images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setPrintSrcMap({});
  }

  async function triggerPrint() {
    if (images.length === 0) return;
    setIsPrinting(true);
    setIsPreparing(true);

    try {
      const pct = options.downscalePercent;
      const newMap: Record<number, string> = {};
      if (pct < 100) {
        // Process in sequence to keep memory reasonable
        for (const img of images) {
          newMap[img.id] = await downscaleImage(img.previewUrl, pct);
        }
      }
      setPrintSrcMap(newMap);
      // Allow React to paint the updated (possibly lower-res) images into the print layer
      await new Promise((r) => setTimeout(r, 120));
    } catch {
      // fallback: proceed with originals
      setPrintSrcMap({});
    } finally {
      setIsPreparing(false);
    }

    // Add a body class as extra signal for print CSS isolation (helps suppress site chrome)
    document.body.classList.add('pdf-printing');

    // Temporarily inject the dynamic print styles (with @page size etc.) into <head>.
    // This is more reliable than having <style> inside the content div for pagination.
    const styleEl = document.createElement('style');
    styleEl.id = 'pdf-print-styles-temp';
    styleEl.textContent = printCss;
    document.head.appendChild(styleEl);

    // Trigger browser print (user chooses "Save as PDF" in the dialog)
    window.print();

    // Clean up
    setTimeout(() => {
      document.body.classList.remove('pdf-printing');
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
      setIsPrinting(false);
    }, 800);
  }

  function getPrintSrc(id: number): string {
    return printSrcMap[id] || images.find((i) => i.id === id)?.previewUrl || '';
  }

  const printCss = getPrintableCss(options);

  const computedFilename = useMemo(() => {
    return computePdfFilename(options.filenameTemplate, images.length, todayStr);
  }, [options.filenameTemplate, images.length, todayStr]);

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-border hover:border-sky-500 rounded-3xl p-10 text-center cursor-pointer bg-card print:hidden"
        onClick={() => document.getElementById('img-pdf-input')?.click()}
      >
        <Upload className="mx-auto mb-3 text-muted" size={36} />
        <p className="font-semibold">Drop images here or click to upload</p>
        <p className="text-xs text-muted mt-1">JPG, PNG, WebP, GIF • Multiple files supported</p>
        <input
          id="img-pdf-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <>
          {/* Images list with reorder */}
          <div className="bg-card border border-border rounded-3xl p-6 print:hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">{images.length} image{images.length > 1 ? 's' : ''} (reorder + rotate; left-to-right fills columns)</span>
              <button onClick={clearAll} className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"><X size={14} /> Clear all</button>
            </div>

            <div className="space-y-2 max-h-72 overflow-auto pr-2">
              {images.map((img, idx) => (
                <div key={img.id} className="flex items-center gap-3 bg-background p-2 rounded-2xl border border-border">
                  <img 
                    src={img.previewUrl} 
                    alt="" 
                    className="w-14 h-14 object-cover rounded-xl border" 
                    style={{ transform: `rotate(${img.rotation}deg)` }}
                  />
                  <div className="flex-1 text-sm truncate font-mono">{img.file.name}</div>
                  <div className="flex gap-1">
                    <button onClick={() => rotateImage(img.id, -90)} title="Rotate left" className="p-1 text-muted hover:text-text">↺</button>
                    <button onClick={() => rotateImage(img.id, 90)} title="Rotate right" className="p-1 text-muted hover:text-text">↻</button>
                    <button onClick={() => moveImage(img.id, 'up')} disabled={idx === 0} className="p-1 disabled:opacity-30"><ArrowUp size={16} /></button>
                    <button onClick={() => moveImage(img.id, 'down')} disabled={idx === images.length - 1} className="p-1 disabled:opacity-30"><ArrowDown size={16} /></button>
                    <button onClick={() => removeImage(img.id)} className="p-1 text-rose-500"><X size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-card border border-border rounded-3xl p-6 print:hidden">
            <div className="font-semibold mb-4">PDF Layout Options</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
              <div>
                <label className="label">Page Size</label>
                <select value={options.pageSize} onChange={e => updateOption('pageSize', e.target.value as PageSize)} className="tool-input">
                  {Object.keys(PAGE_SIZES).map(size => (
                    <option key={size} value={size}>{PAGE_SIZES[size as PageSize].label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Orientation</label>
                <div className="flex gap-2 mt-1">
                  {(['portrait', 'landscape'] as Orientation[]).map(ori => (
                    <button
                      key={ori}
                      onClick={() => updateOption('orientation', ori)}
                      className={`flex-1 py-2 rounded-2xl border text-sm ${options.orientation === ori ? 'bg-sky-500 text-white border-sky-500' : 'border-border'}`}
                    >
                      {ori.charAt(0).toUpperCase() + ori.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Margin (mm)</label>
                <input type="number" min={0} max={50} value={options.marginMm} onChange={e => updateOption('marginMm', Math.max(0, +e.target.value))} className="tool-input" />
              </div>

              <div>
                <label className="label">Image Fit</label>
                <select value={options.fitMode} onChange={e => updateOption('fitMode', e.target.value as FitMode)} className="tool-input">
                  <option value="contain">Contain (letterbox)</option>
                  <option value="cover">Cover (fill & crop)</option>
                  <option value="stretch">Stretch to fit</option>
                </select>
              </div>

              <div>
                <label className="label">Background</label>
                <input type="color" value={options.backgroundColor} onChange={e => updateOption('backgroundColor', e.target.value)} className="tool-input h-10 p-1" />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.addPageNumbers}
                    onChange={e => updateOption('addPageNumbers', e.target.checked)}
                  />
                  Add page numbers (bottom-right margin)
                </label>
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.titlePage}
                    onChange={e => updateOption('titlePage', e.target.checked)}
                  />
                  Title page
                </label>
                {options.titlePage && (
                  <>
                    <input
                      value={options.titleText}
                      onChange={e => updateOption('titleText', e.target.value)}
                      className="tool-input mt-1 text-sm"
                      placeholder="Title (e.g. Project Photos)"
                    />
                    <input
                      value={options.subtitleText}
                      onChange={e => updateOption('subtitleText', e.target.value)}
                      className="tool-input mt-1 text-sm"
                      placeholder="Subtitle (optional)"
                    />
                  </>
                )}
              </div>

              <div>
                <label className="label">Images per page (columns)</label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3].map((c) => (
                    <button
                      key={c}
                      onClick={() => updateOption('columns', c as 1 | 2 | 3)}
                      className={`flex-1 py-1.5 rounded-2xl border text-sm ${options.columns === c ? 'bg-sky-500 text-white border-sky-500' : 'border-border'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.showCaptions}
                    onChange={e => updateOption('showCaptions', e.target.checked)}
                  />
                  Include filename captions
                </label>
              </div>

              <div>
                <label className="label">Image Quality ({options.downscalePercent}%)</label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  step={5}
                  value={options.downscalePercent}
                  onChange={e => updateOption('downscalePercent', +e.target.value)}
                  className="w-full accent-sky-500"
                />
                <p className="text-[10px] text-muted">Lower quality = much smaller PDF file size. 100% = original resolution.</p>
              </div>

              <div className="md:col-span-3">
                <label className="label">Filename template</label>
                <input
                  value={options.filenameTemplate}
                  onChange={e => updateOption('filenameTemplate', e.target.value)}
                  className="tool-input font-mono text-xs"
                  placeholder="images-{date}-{count}"
                />
                <div className="mt-1 flex items-center gap-2 text-[10px] text-muted">
                  Suggested: <span className="font-mono text-text select-all">{computedFilename}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(computedFilename)}
                    className="underline hover:text-text print:hidden"
                  >
                    copy
                  </button>
                </div>
                <p className="text-[10px] text-muted mt-0.5">Use {'{date}'} and {'{count}'}. Browser print dialog lets you rename.</p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-card border border-border rounded-3xl p-6 print:hidden">
            <div className="flex justify-between mb-3">
              <span className="font-semibold">
                Preview ({(options.titlePage ? 1 : 0) + Math.ceil(images.length / (options.columns || 1))} page{(options.titlePage || images.length / (options.columns || 1) > 1) ? 's' : ''})
              </span>
              <button
                onClick={triggerPrint}
                disabled={images.length === 0 || isPreparing || isPrinting}
                className="btn-primary text-sm flex items-center gap-2 disabled:opacity-60"
              >
                <Printer size={16} /> {isPreparing ? 'Preparing…' : isPrinting ? 'Printing…' : 'Print / Save as PDF'}
              </button>
            </div>

            <div className="bg-[#f8f8f8] p-4 rounded-2xl overflow-auto max-h-[560px] border">
              <div className="flex flex-col items-center gap-6">
                {(() => {
                  const dims = getPageDimensions(options);
                  const scale = 0.52;
                  const w = Math.max(120, dims.width * scale);
                  const h = Math.max(160, dims.height * scale);
                  const groups = groupIntoPages(images, options.columns || 1);
                  const pages: Array<
                    | { kind: 'title' }
                    | { kind: 'content'; group: typeof images; gIdx: number }
                  > = [];
                  if (options.titlePage) {
                    pages.push({ kind: 'title' });
                  }
                  groups.forEach((g, gi) => pages.push({ kind: 'content', group: g, gIdx: gi }));

                  return pages.map((pg, pIdx) => {
                    if (pg.kind === 'title') {
                      return (
                        <div
                          key="title"
                          className="shadow-md relative overflow-hidden flex flex-col items-center justify-center text-center"
                          style={{
                            width: `${w}mm`,
                            height: `${h}mm`,
                            background: options.backgroundColor,
                            border: '1px solid #ddd',
                            padding: '8mm',
                          }}
                        >
                          <div className="text-[10px] uppercase tracking-[1px] text-gray-500 mb-1">TITLE PAGE</div>
                          <div className="text-xl font-semibold text-gray-900">{options.titleText || 'Images to PDF'}</div>
                          {options.subtitleText && <div className="text-sm text-gray-600 mt-1">{options.subtitleText}</div>}
                          <div className="mt-auto text-[9px] text-gray-500">{images.length} image{images.length !== 1 ? 's' : ''}</div>
                        </div>
                      );
                    }
                    // content page
                    const pageNumber = options.titlePage ? pg.gIdx + 2 : pg.gIdx + 1;
                    return (
                      <div
                        key={pIdx}
                        className="shadow-md relative overflow-hidden"
                        style={{
                          width: `${w}mm`,
                          height: `${h}mm`,
                          background: options.backgroundColor,
                          border: '1px solid #ddd',
                          display: 'grid',
                          gridTemplateColumns: `repeat(${options.columns || 1}, 1fr)`,
                          gap: '2mm',
                          padding: '2mm',
                          alignItems: 'start',
                        }}
                      >
                        {pg.group.map((img) => (
                          <div key={img.id} className="flex flex-col items-center justify-center min-h-0">
                            <img
                              src={img.previewUrl}
                              alt=""
                              style={{
                                maxWidth: '100%',
                                maxHeight: options.showCaptions ? 'calc(100% - 10pt)' : '100%',
                                objectFit: options.fitMode === 'contain' ? 'contain' : options.fitMode === 'cover' ? 'cover' : 'fill',
                                transform: `rotate(${img.rotation}deg)`,
                                display: 'block',
                              }}
                            />
                            {options.showCaptions && (
                              <div className="text-[6px] text-gray-500 mt-0.5 truncate max-w-full px-0.5" title={img.file.name}>
                                {img.file.name}
                              </div>
                            )}
                          </div>
                        ))}
                        {options.addPageNumbers && (
                          <div className="absolute bottom-1 right-1 text-[8px] text-gray-500 font-mono bg-white/70 px-0.5 rounded">
                            {pageNumber}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <p className="text-xs text-muted mt-3 text-center">Live preview (for reference only). The generated PDF will contain <strong>only the images</strong> (no site header, footer, share/copy icons, or other UI). Title page (if enabled) is page 1; images follow cleanly with no extra blank pages.</p>
          </div>

          {/* Print-only content (hidden normally, shown in @media print).
               We use a dedicated .pdf-print-area so we can isolate it in print CSS
               and suppress the entire QuickUtils site UI (nav, footer, ads, share icons, etc.).
               The print styles are injected to <head> temporarily for reliable @page + pagination. */}
          <div className="pdf-print-area hidden print:block">
            {/* Title page if enabled */}
            {options.titlePage && (
              <div className="pdf-title-page">
                <h1>{options.titleText || 'Images to PDF'}</h1>
                {options.subtitleText && <div className="subtitle">{options.subtitleText}</div>}
                <div className="meta">
                  {images.length} image{images.length !== 1 ? 's' : ''} • Generated {new Date().toLocaleDateString()}
                </div>
              </div>
            )}

            {/* Content pages, grouped by columns */}
            {groupIntoPages(images, options.columns || 1).map((group, gIdx) => {
              const pageNum = (options.titlePage ? gIdx + 2 : gIdx + 1);
              return (
                <div
                  key={gIdx}
                  className="pdf-page"
                  style={{ '--cols': options.columns || 1 } as React.CSSProperties}
                >
                  {group.map((img) => (
                    <div key={img.id} className="pdf-img-cell" style={{ '--rot': `${img.rotation}deg` } as React.CSSProperties}>
                      <img src={getPrintSrc(img.id)} alt={img.file.name} />
                      {options.showCaptions && <div className="pdf-caption">{img.file.name}</div>}
                    </div>
                  ))}
                  {options.addPageNumbers && (
                    <div className="pdf-page-number">{pageNum}</div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {images.length === 0 && (
        <p className="text-center text-sm text-muted print:hidden">Upload one or more images to get started. Reorder them in the list above — the order becomes the page order in the PDF.</p>
      )}
    </div>
  );
}
