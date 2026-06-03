export interface Option {
  id: string;
  name: string;
  weight: number; // >= 1
}

export function pickRandom(options: string[]): string | null {
  if (!options || options.length === 0) return null;
  const idx = Math.floor(Math.random() * options.length);
  return options[idx] ?? null;
}

export function pickWeighted(options: Option[]): Option | null {
  if (!options || options.length === 0) return null;

  const totalWeight = options.reduce((sum, o) => sum + Math.max(1, o.weight), 0);
  if (totalWeight <= 0) return null;

  let random = Math.random() * totalWeight;

  for (const opt of options) {
    random -= Math.max(1, opt.weight);
    if (random <= 0) return opt;
  }
  return options[options.length - 1] ?? null;
}

export function normalizeWeights(options: Option[]): Option[] {
  return options.map((o) => ({ ...o, weight: Math.max(1, Math.round(o.weight)) }));
}

export interface DecisionHistoryItem {
  timestamp: number;
  mode: 'random' | 'weighted';
  choice: string;
  options: string[];
}

export function loadHistory(): DecisionHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('decision_history') || '[]');
  } catch {
    return [];
  }
}

export function saveHistory(item: DecisionHistoryItem): DecisionHistoryItem[] {
  if (typeof window === 'undefined') return [];
  const existing = loadHistory();
  const updated = [item, ...existing].slice(0, 50); // keep last 50
  localStorage.setItem('decision_history', JSON.stringify(updated));
  return updated;
}

export function clearHistory(): void {
  if (typeof window !== 'undefined') localStorage.removeItem('decision_history');
}
