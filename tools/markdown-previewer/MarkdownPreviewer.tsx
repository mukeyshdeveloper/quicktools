'use client';

import { useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Copy, Check, Download, Expand, Shrink } from 'lucide-react';

const DEFAULT_MARKDOWN = `# Hello, QuickUtils Markdown Editor! 👋

Welcome to the **live** Markdown previewer. Edits appear *instantly* on the right.

---

## Features Supported

- **Bold** and *italic* and ~~strikethrough~~ text
- [Hyperlinks](https://quickutils.in)
- Inline \`code\` and fenced code blocks
- Tables, blockquotes, and ordered lists

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

## Table

| Tool | Category | Description |
|------|----------|-------------|
| EMI Calculator | Finance | Monthly loan repayments |
| Regex Tester | Developer | Live regex matching |
| QR Generator | Utility | Generate QR codes |

## Blockquote

> "The best tool is the one you always have with you."
>
> — QuickUtils

## Task List

- [x] Build regex tester
- [x] Build markdown previewer
- [ ] Add image resizer
`;

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState<'editor' | 'preview' | null>(null);

  // Configure marked
  useEffect(() => {
    marked.setOptions({ breaks: true, gfm: true } as Parameters<typeof marked.setOptions>[0]);
  }, []);

  useEffect(() => {
    const raw = marked(markdown) as string;
    const clean = DOMPurify.sanitize(raw);
    setHtml(clean);
  }, [markdown]);

  function copyHtml() {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadHtml() {
    const full = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exported Markdown</title>
  <style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6}code{background:#f3f4f6;padding:2px 6px;border-radius:4px}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d1d5db;padding:8px 12px}blockquote{border-left:4px solid #7c3aed;margin:0;padding:0 16px;color:#6b7280}</style>
</head>
<body>
${html}
</body>
</html>`;
    const blob = new Blob([full], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  const taClass = "w-full h-full min-h-[500px] p-5 font-mono text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-0 outline-none resize-none leading-relaxed";
  const previewClass = "max-w-none p-5 min-h-[500px] overflow-auto " +
    // Headings
    "[&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-gray-900 [&_h1]:dark:text-white [&_h1]:mt-6 [&_h1]:mb-4 " +
    "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_h2]:dark:text-white [&_h2]:mt-6 [&_h2]:mb-3 " +
    "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:dark:text-white [&_h3]:mt-4 [&_h3]:mb-2 " +
    // Basic elements
    "[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-700 [&_p]:dark:text-gray-300 " +
    "[&_strong]:font-bold [&_strong]:text-gray-900 [&_strong]:dark:text-white " +
    "[&_a]:text-violet-600 [&_a]:dark:text-violet-400 [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-violet-700 hover:[&_a]:dark:hover:text-violet-300 " +
    "[&_hr]:my-6 [&_hr]:border-gray-200 [&_hr]:dark:border-gray-700 " +
    // Lists
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-gray-700 [&_ul]:dark:text-gray-300 " +
    "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-gray-700 [&_ol]:dark:text-gray-300 " +
    "[&_li]:leading-normal " +
    // Code blocks & inline code
    "[&_pre]:bg-gray-900 [&_pre]:dark:bg-gray-950 [&_pre]:text-green-400 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-gray-800 " +
    "[&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:text-violet-600 [&_code]:dark:text-violet-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-green-400 [&_pre_code]:text-sm " +
    // Tables
    "[&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:text-sm " +
    "[&_td]:border [&_td]:border-gray-200 [&_td]:dark:border-gray-700 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-gray-700 [&_td]:dark:text-gray-300 " +
    "[&_th]:border [&_th]:border-gray-200 [&_th]:dark:border-gray-700 [&_th]:px-4 [&_th]:py-2.5 [&_th]:bg-gray-50 [&_th]:dark:bg-gray-800 [&_th]:font-bold [&_th]:text-gray-900 [&_th]:dark:text-white [&_th]:text-left " +
    // Blockquotes
    "[&_blockquote]:border-l-4 [&_blockquote]:border-violet-500 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:dark:text-gray-400";

  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;
  const lineCount = markdown.split('\n').length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span><span className="font-bold text-gray-600 dark:text-gray-300">{wordCount}</span> words</span>
          <span><span className="font-bold text-gray-600 dark:text-gray-300">{lineCount}</span> lines</span>
          <span><span className="font-bold text-gray-600 dark:text-gray-300">{markdown.length}</span> chars</span>
        </div>
        <div className="flex gap-2">
          <button onClick={copyHtml} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition">
            {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
          <button onClick={downloadHtml} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 transition">
            <Download size={13} /> Export .html
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Editor */}
        {fullscreen !== 'preview' && (
          <div className="flex flex-col border-r-0 md:border-r border-b border-b-gray-200 md:border-b-0 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">✏️ Markdown</span>
              <button onClick={() => setFullscreen(f => f === 'editor' ? null : 'editor')} className="text-gray-400 hover:text-gray-600 transition">
                {fullscreen === 'editor' ? <Shrink size={14} /> : <Expand size={14} />}
              </button>
            </div>
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              className={taClass}
              spellCheck={false}
              placeholder="Write your Markdown here..."
            />
          </div>
        )}

        {/* Preview */}
        {fullscreen !== 'editor' && (
          <div className="flex flex-col bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">👁️ Preview</span>
              <button onClick={() => setFullscreen(f => f === 'preview' ? null : 'preview')} className="text-gray-400 hover:text-gray-600 transition">
                {fullscreen === 'preview' ? <Shrink size={14} /> : <Expand size={14} />}
              </button>
            </div>
            <div className={previewClass} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}
      </div>

      {/* Markdown Cheatsheet */}
      <details className="group rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="flex items-center gap-2 cursor-pointer px-5 py-3 bg-gray-50 dark:bg-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300 select-none list-none hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          📋 Markdown Quick Reference
        </summary>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-700 text-xs font-mono">
          {[
            ['# Heading 1', '## Heading 2'],
            ['**bold**', '*italic*'],
            ['~~strike~~', '`inline code`'],
            ['[link](url)', '![img](url)'],
            ['> blockquote', '---'],
            ['- list item', '1. ordered'],
            ['- [x] task', '```code block```'],
            ['| col | col |', '| --- | --- |'],
          ].map(([a, b], i) => (
            <div key={i} className="grid grid-cols-2 gap-px">
              <div className="bg-white dark:bg-gray-900 px-3 py-2 text-gray-700 dark:text-gray-300">{a}</div>
              <div className="bg-white dark:bg-gray-900 px-3 py-2 text-gray-700 dark:text-gray-300">{b}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
