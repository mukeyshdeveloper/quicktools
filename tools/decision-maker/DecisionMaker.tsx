'use client';

import { useState } from 'react';
import {
  pickRandom,
  pickWeighted,
  normalizeWeights,
  saveHistory,
  loadHistory,
  clearHistory,
  type Option,
  type DecisionHistoryItem,
} from './utils';
import { Dices, Plus, X, History, Trash2 } from 'lucide-react';

type Mode = 'random' | 'weighted';

export default function DecisionMaker() {
  const [mode, setMode] = useState<Mode>('random');
  const [options, setOptions] = useState<Option[]>([
    { id: '1', name: 'Option A', weight: 1 },
    { id: '2', name: 'Option B', weight: 1 },
  ]);
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<DecisionHistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadHistory();
  });
  const [isPicking, setIsPicking] = useState(false);

  function addOption() {
    const newOpt: Option = {
      id: Date.now().toString(36),
      name: `Option ${String.fromCharCode(65 + options.length)}`,
      weight: 1,
    };
    setOptions([...options, newOpt]);
  }

  function removeOption(id: string) {
    if (options.length <= 2) return;
    setOptions(options.filter((o) => o.id !== id));
  }

  function updateOption(id: string, field: 'name' | 'weight', value: string | number) {
    setOptions(
      options.map((o) =>
        o.id === id
          ? {
              ...o,
              [field]: field === 'weight' ? Math.max(1, Math.min(100, Number(value))) : value,
            }
          : o
      )
    );
  }

  async function makeDecision() {
    if (options.length < 2) return;

    setIsPicking(true);
    setWinner(null);

    // Fun animation: quick shuffle of names
    const names = options.map((o) => o.name);
    for (let i = 0; i < 8; i++) {
      setWinner(names[Math.floor(Math.random() * names.length)] ?? null);
      await new Promise((r) => setTimeout(r, 70 + i * 12));
    }

    let chosen: string;

    if (mode === 'random') {
      chosen = pickRandom(names)!;
    } else {
      const weighted = normalizeWeights(options);
      const picked = pickWeighted(weighted)!;
      chosen = picked.name;
    }

    setWinner(chosen);
    setIsPicking(false);

    // Save to history
    const item: DecisionHistoryItem = {
      timestamp: Date.now(),
      mode,
      choice: chosen,
      options: names,
    };
    const newHistory = saveHistory(item);
    setHistory(newHistory);
  }

  function clearAllHistory() {
    clearHistory();
    setHistory([]);
  }


  return (
    <div className="space-y-6">
      {/* Mode switch */}
      <div className="flex rounded-2xl border border-border overflow-hidden w-fit mx-auto">
        <button
          onClick={() => setMode('random')}
          className={`px-6 py-2 text-sm font-semibold transition ${mode === 'random' ? 'bg-violet-600 text-white' : 'hover:bg-card'}`}
        >
          Pure Random
        </button>
        <button
          onClick={() => setMode('weighted')}
          className={`px-6 py-2 text-sm font-semibold transition ${mode === 'weighted' ? 'bg-violet-600 text-white' : 'hover:bg-card'}`}
        >
          Weighted
        </button>
      </div>

      {/* Options Editor */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-sm uppercase tracking-widest text-muted">Your Options</div>
          <button onClick={addOption} className="btn-secondary text-xs flex items-center gap-1 px-3 py-1">
            <Plus className="w-3.5 h-3.5" /> Add option
          </button>
        </div>

        <div className="space-y-3">
          {options.map((opt, index) => (
            <div key={opt.id} className="flex items-center gap-3 group">
              <div className="w-6 text-right text-xs text-muted font-mono">{index + 1}</div>

              <input
                value={opt.name}
                onChange={(e) => updateOption(opt.id, 'name', e.target.value)}
                className="tool-input flex-1"
              />

              {mode === 'weighted' && (
                <div className="flex items-center gap-2 w-40">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={opt.weight}
                    onChange={(e) => updateOption(opt.id, 'weight', e.target.value)}
                    className="flex-1 accent-violet-600"
                  />
                  <div className="w-9 text-right font-mono text-sm tabular-nums">{opt.weight}</div>
                </div>
              )}

              <button
                onClick={() => removeOption(opt.id)}
                disabled={options.length <= 2}
                className="text-muted hover:text-rose-600 disabled:opacity-30 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {mode === 'weighted' && (
          <p className="text-xs text-muted mt-3">Higher numbers = higher chance. Total weight is automatically used for probability.</p>
        )}
      </div>

      {/* Decide button + Winner */}
      <div className="text-center">
        <button
          onClick={makeDecision}
          disabled={isPicking || options.length < 2}
          className="inline-flex items-center gap-3 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-400 text-white text-xl font-semibold px-10 py-4 rounded-3xl shadow transition active:scale-[0.985]"
        >
          <Dices className="w-6 h-6" />
          {isPicking ? 'Deciding…' : 'Decide for me'}
        </button>
      </div>

      {winner && (
        <div className="max-w-md mx-auto mt-4">
          <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 p-8 text-white text-center shadow-lg">
            <div className="uppercase tracking-[3px] text-violet-200 text-xs mb-1">The winner is</div>
            <div className="font-display text-5xl font-black tracking-tight break-words">{winner}</div>
            <button onClick={makeDecision} className="mt-5 text-sm underline text-violet-100 hover:text-white">
              Pick again
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted" />
              <span className="font-bold text-sm">Recent Decisions</span>
            </div>
            <button onClick={clearAllHistory} className="text-xs text-muted hover:text-rose-600 flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="space-y-2 text-sm max-h-64 overflow-auto pr-1">
            {history.slice(0, 12).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-border pb-2 last:border-none">
                <div>
                  <span className="font-medium">{item.choice}</span>
                  <span className="text-muted text-xs ml-2">({item.mode})</span>
                </div>
                <div className="text-xs text-muted tabular-nums">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
