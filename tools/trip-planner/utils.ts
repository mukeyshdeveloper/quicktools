// Self-contained types for isolation (no cross-tool import during build)

// Redefine core for isolation (pure, no import side effects)
export interface Participant {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  totalAmount: number;
  paidBy: string;
  date: string;
  tip?: number;
  tax?: number;
  splitMode: 'equal' | 'shares' | 'custom' | 'percentage';
  shares?: Record<string, number>;
  subItems?: { id: string; description: string; amount: number; participants: string[] }[];
  note?: string;
  category?: string; // travel, stay, food, activity, transport, misc
}

export interface ItineraryItem {
  id: string;
  day: number; // 1-based or date string better, but number for simplicity
  title: string;
  location?: string;
  estimatedCost: number;
  actualCost?: number;
  participants: string[]; // who joins this activity
  paidBy?: string;
  note?: string;
}

export interface Trip {
  name: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  participants: Participant[];
  expenses: Expense[];
  itinerary: ItineraryItem[];
}

export interface TripSummary {
  totalEstimated: number;
  totalActual: number;
  totalExpenses: number;
  perPerson: Record<string, { paid: number; share: number; net: number }>;
  settlements: Array<{ from: string; to: string; amount: number }>;
}

// Advanced bill split calculation (re-implemented cleanly for trip)
export function calculateTripSplit(trip: Trip): TripSummary {
  const { participants, expenses, itinerary } = trip;
  if (participants.length === 0) {
    return { totalEstimated: 0, totalActual: 0, totalExpenses: 0, perPerson: {}, settlements: [] };
  }

  let totalExpenses = 0;
  let totalEstimated = 0;

  const paid: Record<string, number> = {};
  const share: Record<string, number> = {};

  participants.forEach(p => { paid[p.id] = 0; share[p.id] = 0; });

  // Expenses
  expenses.forEach(exp => {
    const tip = exp.tip || 0;
    const tax = exp.tax || 0;
    const eff = exp.totalAmount + tip + tax;
    totalExpenses += eff;

    if (paid[exp.paidBy] !== undefined) paid[exp.paidBy] = (paid[exp.paidBy] || 0) + eff;

    // reuse simplified owing calc
    const owing = calculateOwing(exp, participants);
    Object.entries(owing).forEach(([pid, amt]) => {
      if (share[pid] !== undefined) share[pid] += amt;
    });
  });

  // Itinerary (treated as additional expenses)
  itinerary.forEach(item => {
    const cost = item.actualCost ?? item.estimatedCost ?? 0;
    totalEstimated += item.estimatedCost || 0;
    totalExpenses += cost;

    if (item.paidBy && paid[item.paidBy] !== undefined) {
      paid[item.paidBy] = (paid[item.paidBy] || 0) + cost;
    }

    const part = item.participants.length > 0 ? item.participants : participants.map(p => p.id);
    if (part.length > 0) {
      const per = Math.round((cost / part.length) * 100) / 100;
      part.forEach(pid => {
        if (share[pid] !== undefined) share[pid] += per;
      });
    }
  });

  const perPerson: Record<string, { paid: number; share: number; net: number }> = {};
  participants.forEach(p => {
    const pPaid = paid[p.id] || 0;
    const pShare = share[p.id] || 0;
    perPerson[p.id] = {
      paid: Math.round(pPaid * 100) / 100,
      share: Math.round(pShare * 100) / 100,
      net: Math.round((pPaid - pShare) * 100) / 100,
    };
  });

  const settlements = suggestSettlements(
    Object.entries(perPerson).map(([id, v]) => ({
      participantId: id,
      name: participants.find(pp => pp.id === id)!.name,
      net: v.net,
    }))
  );

  return {
    totalEstimated: Math.round(totalEstimated * 100) / 100,
    totalActual: Math.round(totalExpenses * 100) / 100,
    totalExpenses: Math.round(totalExpenses * 100) / 100,
    perPerson,
    settlements,
  };
}

function calculateOwing(exp: Expense, participants: Participant[]): Record<string, number> {
  // Simplified version of the advanced logic from bill-splitter
  const owing: Record<string, number> = {};
  participants.forEach(p => owing[p.id] = 0);

  const tip = exp.tip || 0;
  const tax = exp.tax || 0;
  const eff = exp.totalAmount + tip + tax;

  if (eff <= 0) return owing;

  if (exp.subItems && exp.subItems.length) {
    let subSum = 0;
    exp.subItems.forEach(s => { subSum += s.amount; });
    exp.subItems.forEach(s => {
      const n = s.participants.length || 1;
      const per = s.amount / n;
      s.participants.forEach(pid => { owing[pid] = (owing[pid] || 0) + per; });
    });
    return owing;
  }

  const ids = participants.map(p => p.id);
  const mode = exp.splitMode || 'equal';

  if (mode === 'equal') {
    const per = eff / ids.length;
    ids.forEach(id => owing[id] = per);
  } else if (mode === 'shares' || mode === 'custom' || mode === 'percentage') {
    let total = 0;
    ids.forEach(id => total += (exp.shares?.[id] || 1));
    if (total <= 0) total = ids.length;
    ids.forEach(id => {
      const w = exp.shares?.[id] || 1;
      owing[id] = (eff * w) / total;
    });
  }

  return owing;
}

function suggestSettlements(bals: Array<{ participantId: string; name: string; net: number }>): Array<{ from: string; to: string; amount: number }> {
  const debtors = bals.filter(b => b.net < -0.01).sort((a,b) => b.net - a.net);
  const creditors = bals.filter(b => b.net > 0.01).sort((a,b) => b.net - a.net);

  const res: Array<{ from: string; to: string; amount: number }> = [];
  let di = 0, ci = 0;

  while (di < debtors.length && ci < creditors.length) {
    const d = debtors[di]!;
    const c = creditors[ci]!;
    const amt = Math.min(-d.net, c.net);
    if (amt > 0.01) {
      res.push({ from: d.name, to: c.name, amount: Math.round(amt * 100)/100 });
    }
    d.net += amt;
    c.net -= amt;
    if (d.net > -0.01) di++;
    if (c.net < 0.01) ci++;
  }
  return res;
}

// URL share encoding for trip state
export function encodeTripForShare(trip: any): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(trip))));
  } catch { return ''; }
}

export function decodeTripFromShare(encoded: string): any | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch { return null; }
}

// Generate nice text for sharing
export function generateTripShareText(trip: any, summary: TripSummary): string {
  let t = `✈️ ${trip.name || 'Our Trip'}\n`;
  t += `${trip.startDate} → ${trip.endDate}\n\n`;
  t += `Total spent: ₹${summary.totalActual}\n\n`;
  t += `Who owes / gets back:\n`;
  Object.entries(summary.perPerson).forEach(([id, v]) => {
    const name = trip.participants?.find((p: any) => p.id === id)?.name || id;
    const verb = v.net >= 0 ? 'gets back' : 'owes';
    t += `• ${name}: ${verb} ₹${Math.abs(v.net).toFixed(2)}\n`;
  });
  if (summary.settlements.length) {
    t += `\nSettle up:\n`;
    summary.settlements.forEach(s => t += `• ${s.from} pays ${s.to} ₹${s.amount}\n`);
  }
  t += `\n(Shared via QuickUtils Trip Planner - free & private)`;
  return t;
}
