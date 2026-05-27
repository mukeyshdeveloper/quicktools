'use client';

import { useMemo, useState } from 'react';
import ResetButton from '@/components/ui/ResetButton';
import { countWords, type WordCountResult } from './utils';

function formatCount(value: number): string {
  return value.toLocaleString('en-IN');
}

export default function WordCounter(): React.ReactElement {
  const [text, setText] = useState<string>('');

  const result: WordCountResult = useMemo(
    () => countWords(text),
    [text],
  );
  const hasText: boolean = text.trim().length > 0;

  function handleReset(): void {
    setText('');
  }

  return (
    <div className="tool-panel">
      <div className="mb-5">
        <span className="tool-pill">Live word and character count</span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-text">
          Count Your Text
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Paste or type text below. Counts update instantly in your browser.
        </p>
      </div>

      <label className="tool-label" htmlFor="word-counter-text">
        Your Text
      </label>
      <textarea
        id="word-counter-text"
        className="tool-textarea"
        value={text}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(event.target.value)
        }
        placeholder="Paste your text here..."
        rows={8}
      />

      <div className="mt-5 flex flex-wrap gap-3">
        {hasText ? <ResetButton onClick={handleReset} /> : null}
      </div>

      {hasText ? (
        <section className="result-panel" aria-live="polite">
          <p className="result-label">Text Summary</p>
          <p className="result-main">
            {formatCount(result.words)} <span>words</span>
          </p>

          <div className="word-stats-grid">
            <div className="result-mini">
              <p className="result-mini-val">{formatCount(result.characters)}</p>
              <p className="result-mini-lbl">Characters</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">
                {formatCount(result.charactersNoSpaces)}
              </p>
              <p className="result-mini-lbl">Chars no spaces</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">{formatCount(result.sentences)}</p>
              <p className="result-mini-lbl">Sentences</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">{formatCount(result.paragraphs)}</p>
              <p className="result-mini-lbl">Paragraphs</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">
                {formatCount(result.readingTimeMinutes)}
              </p>
              <p className="result-mini-lbl">Reading minutes</p>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-border bg-background p-5 text-sm leading-6 text-muted">
          Start typing to see word count, character count, sentence count, and
          estimated reading time.
        </div>
      )}
    </div>
  );
}
