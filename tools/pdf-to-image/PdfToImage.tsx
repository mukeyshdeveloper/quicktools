'use client';

import { useState, useEffect } from 'react';
import {
  Upload,
  Download,
  FileImage,
  AlertCircle,
  Loader2,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  convertPdfPageToImage,
  downloadDataUrl,
  type PdfJsDocument,
  type ConvertedPage,
} from './utils';
import ResetButton from '@/components/ui/ResetButton';

declare global {
  interface Window {
    pdfjsLib?: {
      GlobalWorkerOptions: {
        workerSrc: string;
      };
      getDocument: (source: { data: Uint8Array }) => {
        promise: Promise<PdfJsDocument>;
      };
    };
    JSZip?: unknown;
    docx?: {
      renderAsync: (
        data: ArrayBuffer | Blob,
        bodyContainer: HTMLElement,
        styleContainer?: HTMLElement | null,
        options?: Record<string, unknown>
      ) => Promise<void>;
    };
    html2canvas?: (
      element: HTMLElement,
      options?: Record<string, unknown>
    ) => Promise<HTMLCanvasElement>;
  }
}

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'pdf' | 'docx' | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PdfJsDocument | null>(null);
  const [docxBuffer, setDocxBuffer] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  
  // Settings
  const [scale, setScale] = useState<number>(2.0); // Resolution multiplier
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [quality, setQuality] = useState<number>(90);
  
  // Script loading states
  const [scriptsLoaded, setScriptsLoaded] = useState<boolean>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [converting, setConverting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Dynamic script loading for PDF.js, JSZip, Docx-Preview, and Html2Canvas
  useEffect(() => {
    const loadScript = (src: string, checkGlobal: keyof Window): Promise<boolean> => {
      return new Promise((resolve) => {
        if (window[checkGlobal]) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        // Load PDF.js
        const pdfLoaded = await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
          'pdfjsLib'
        );
        if (pdfLoaded && window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        // Load JSZip (needed for Docx-Preview)
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', 'JSZip');

        // Load Docx-Preview
        await loadScript('https://cdn.jsdelivr.net/npm/docx-preview@0.3.5/dist/docx-preview.js', 'docx');

        // Load Html2Canvas
        await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js', 'html2canvas');

        setScriptsLoaded(true);
      } catch (err) {
        console.error('Failed to load required third-party libraries:', err);
        setError('Failed to load libraries. Please check your internet connection and refresh the page.');
      }
    };

    loadAllScripts();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await loadDocumentFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await loadDocumentFile(e.target.files[0]);
    }
  };

  const loadDocumentFile = async (selectedFile: File) => {
    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf');
    const isDocx = selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || selectedFile.name.endsWith('.docx');

    if (!isPdf && !isDocx) {
      setError('Please select a valid PDF (.pdf) or Word (.docx) document.');
      return;
    }

    setError(null);
    setLoadingFile(true);
    setFile(selectedFile);
    setFileType(isPdf ? 'pdf' : 'docx');
    setConvertedPages([]);
    setProgress(0);
    setPdfDoc(null);
    setDocxBuffer(null);

    // Clear hidden renderer if any
    const hiddenContainer = document.getElementById('docx-hidden-container');
    if (hiddenContainer) {
      hiddenContainer.innerHTML = '';
    }

    if (!scriptsLoaded) {
      setError('Document engines are still loading. Please wait a moment.');
      setLoadingFile(false);
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      if (isPdf) {
        if (!window.pdfjsLib) throw new Error('PDF Engine not initialized');
        const doc = await window.pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } else {
        if (!window.docx) throw new Error('Word Engine not initialized');
        setDocxBuffer(arrayBuffer);
        
        // Render it into hidden container to determine page count
        if (hiddenContainer) {
          await window.docx.renderAsync(arrayBuffer, hiddenContainer, null, {
            className: 'docx',
            inWrapper: true,
            breakPages: true,
          });
          
          // Wait briefly for layout and styling calculations
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          // Docx-preview renders pages in individual sections
          const docxPages = hiddenContainer.querySelectorAll('.docx-wrapper > section');
          setNumPages(docxPages.length > 0 ? docxPages.length : 1);
        }
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to read ${isPdf ? 'PDF' : 'Word'} document. It might be password-protected or corrupted.`);
      setFile(null);
      setFileType(null);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setConvertedPages([]);
    setError(null);

    try {
      if (fileType === 'pdf' && pdfDoc) {
        // PDF conversion
        const pagesList: ConvertedPage[] = [];
        for (let i = 1; i <= numPages; i++) {
          const pageImg = await convertPdfPageToImage(
            pdfDoc,
            i,
            scale,
            format,
            quality / 100
          );
          pagesList.push(pageImg);
          setProgress(i);
        }
        setConvertedPages(pagesList);
      } else if (fileType === 'docx' && docxBuffer) {
        // Word document conversion using html2canvas on rendered pages
        const pagesList: ConvertedPage[] = [];
        const hiddenContainer = document.getElementById('docx-hidden-container');
        if (!hiddenContainer || !window.html2canvas) {
          throw new Error('Word renderer or screenshot engine not available');
        }

        const docxPages = hiddenContainer.querySelectorAll('.docx-wrapper > section');
        const pagesToRender = docxPages.length > 0 ? Array.from(docxPages) : [hiddenContainer];

        for (let i = 0; i < pagesToRender.length; i++) {
          const element = pagesToRender[i] as HTMLElement;

          const canvas = await window.html2canvas(element, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          });

          const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
          const dataUrl = canvas.toDataURL(mimeType, format === 'png' ? undefined : quality / 100);

          pagesList.push({
            pageNumber: i + 1,
            dataUrl,
            width: canvas.width,
            height: canvas.height,
          });
          setProgress(i + 1);
        }
        setConvertedPages(pagesList);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during page conversion. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = (page: ConvertedPage) => {
    if (!file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const filename = `${baseName}_page_${page.pageNumber}.${format}`;
    downloadDataUrl(page.dataUrl, filename);
  };

  const handleDownloadAll = () => {
    if (!file || convertedPages.length === 0) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    
    convertedPages.forEach((page, index) => {
      setTimeout(() => {
        const filename = `${baseName}_page_${page.pageNumber}.${format}`;
        downloadDataUrl(page.dataUrl, filename);
      }, index * 200);
    });
  };

  const handleReset = () => {
    setFile(null);
    setFileType(null);
    setPdfDoc(null);
    setDocxBuffer(null);
    setNumPages(0);
    setConvertedPages([]);
    setProgress(0);
    setError(null);

    const hiddenContainer = document.getElementById('docx-hidden-container');
    if (hiddenContainer) {
      hiddenContainer.innerHTML = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + (sizes[i] || '');
  };

  return (
    <div className="space-y-6">
      {/* Script Load Status */}
      {!scriptsLoaded && !error && (
        <div className="flex items-center justify-center p-4 bg-muted/30 rounded-2xl border border-border">
          <Loader2 className="animate-spin text-brand mr-2" size={18} />
          <span className="text-sm">Initializing offline document processors...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-sm" role="alert">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <div>{error}</div>
        </div>
      )}

      {/* File Upload Zone */}
      {!file && scriptsLoaded && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('pdf-file-input')?.click()}
          className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition duration-200 bg-card hover:bg-card/50 ${
            dragActive ? 'border-brand bg-brand/5' : 'border-border hover:border-brand/50'
          }`}
        >
          <Upload className="mx-auto mb-4 text-muted" size={40} />
          <p className="font-semibold text-lg">Drag & drop your PDF or Word (.docx) file here</p>
          <p className="text-sm text-muted mt-1">or click to browse from your device</p>
          <p className="text-xs text-muted mt-3">Fully client-side processing • Files never leave your browser</p>
          <input
            id="pdf-file-input"
            type="file"
            accept=".pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* File Details & Options */}
      {file && (
        <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-3 bg-brand/10 text-brand rounded-2xl shrink-0">
                <FileImage size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base truncate font-mono">{file.name}</h3>
                <p className="text-xs text-muted">
                  {formatFileSize(file.size)} • {loadingFile ? 'Loading document structure...' : `${numPages} page${numPages > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <ResetButton onClick={handleReset} />
            </div>
          </div>

          {/* Settings Grid */}
          {!loadingFile && (pdfDoc || docxBuffer) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="format-select" className="label">Output Image Format</label>
                <div className="flex gap-2 mt-1">
                  {(['png', 'jpeg'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`flex-1 py-2 rounded-2xl border text-sm font-semibold transition ${
                        format === fmt
                          ? 'bg-brand text-white border-brand'
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="scale-select" className="label">Image Resolution (Quality)</label>
                <select
                  id="scale-select"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="tool-input mt-1"
                >
                  <option value="1.0">1.0x (Web Resolution / Standard)</option>
                  <option value="1.5">1.5x (Medium / Balanced)</option>
                  <option value="2.0">2.0x (High / Recommended)</option>
                  <option value="3.0">3.0x (Ultra HD / Print-ready)</option>
                </select>
              </div>

              {format === 'jpeg' && (
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="quality-slider" className="label">JPEG Quality</label>
                    <span className="text-xs font-mono font-bold">{quality}%</span>
                  </div>
                  <input
                    id="quality-slider"
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-brand mt-3"
                  />
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {!loadingFile && (pdfDoc || docxBuffer) && convertedPages.length === 0 && !converting && (
            <button
              type="button"
              onClick={handleConvert}
              className="w-full py-3.5 rounded-2xl bg-brand hover:bg-brand/90 text-white font-bold transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Convert {fileType === 'pdf' ? 'PDF' : 'Word'} to Images
            </button>
          )}

          {/* Converting / Progress */}
          {converting && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <Loader2 className="animate-spin text-brand" size={16} />
                  Converting pages to images...
                </span>
                <span className="font-mono font-semibold">
                  {progress} / {numPages} ({Math.round((progress / numPages) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-300"
                  style={{ width: `${(progress / numPages) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden Container for docx-preview styling & layout rendering */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '100vw',
          width: '816px',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: -9999,
        }}
      >
        <div id="docx-hidden-container" className="bg-white text-black" />
      </div>

      {/* Results grid */}
      {convertedPages.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border rounded-3xl p-6">
            <div>
              <h4 className="font-bold text-lg">Converted Pages ({convertedPages.length})</h4>
              <p className="text-xs text-muted">Each page converted successfully at {scale}x resolution.</p>
            </div>
            <button
              type="button"
              onClick={handleDownloadAll}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download All (Sequence)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {convertedPages.map((page) => (
              <div key={page.pageNumber} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:border-brand/40 transition duration-200">
                <div className="aspect-[3/4] relative bg-muted/20 border-b border-border flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="max-h-full max-w-full object-contain rounded shadow-md border bg-white"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs font-mono font-bold">
                    Page {page.pageNumber}
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted font-mono">
                    {page.width} × {page.height} px
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(page)}
                    className="p-2 bg-brand/10 hover:bg-brand text-brand hover:text-white rounded-xl transition"
                    title={`Download Page ${page.pageNumber}`}
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
