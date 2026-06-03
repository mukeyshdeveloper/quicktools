export interface Participant {
  id: string;
  name: string;
}

export type SplitMode = 'equal' | 'shares' | 'custom' | 'percentage';

export interface SubItem {
  id: string;
  description: string;
  amount: number;
  participants: string[]; // ids who participate in this sub-item
}

export interface Expense {
  id: string;
  description: string;
  totalAmount: number;
  paidBy: string; // participant id who fronted the money (or primary)
  date: string;
  tip?: number;
  tax?: number;
  splitMode: SplitMode;
  shares?: Record<string, number>; // for shares or custom or percentage
  subItems?: SubItem[]; // for itemized bills
  note?: string;
}

export interface Balance {
  participantId: string;
  name: string;
  paid: number;
  owes: number;
  net: number; // positive = should receive, negative = should pay
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export interface BillSplitResult {
  balances: Balance[];
  settlements: Settlement[];
  totalSpent: number;
  perPersonAverage: number;
}

// Pure: calculate who paid what and who owes based on complex rules
export function calculateBalances(
  participants: Participant[],
  expenses: Expense[]
): BillSplitResult {
  if (participants.length === 0) {
    return { balances: [], settlements: [], totalSpent: 0, perPersonAverage: 0 };
  }

  const paid: Record<string, number> = {};
  const owed: Record<string, number> = {};

  participants.forEach(p => {
    paid[p.id] = 0;
    owed[p.id] = 0;
  });

  let grandTotal = 0;

  expenses.forEach(exp => {
    const tip = exp.tip || 0;
    const tax = exp.tax || 0;
    const effectiveTotal = exp.totalAmount + tip + tax;
    grandTotal += effectiveTotal;

    // Record what was paid by the payer
    if (paid[exp.paidBy] !== undefined) {
      paid[exp.paidBy]! += effectiveTotal;
    }

    // Now figure out how much each person owes for this expense
    const owing = calculateOwingForExpense(exp, participants);

    Object.entries(owing).forEach(([pid, amount]) => {
      if (owed[pid] !== undefined) owed[pid] += amount;
    });
  });

  const balances: Balance[] = participants.map(p => {
    const pPaid = paid[p.id] || 0;
    const pOwes = owed[p.id] || 0;
    return {
      participantId: p.id,
      name: p.name,
      paid: pPaid,
      owes: pOwes,
      net: Math.round((pPaid - pOwes) * 100) / 100,
    };
  });

  const settlements = suggestOptimalSettlements(balances);

  const totalSpent = Math.round(grandTotal * 100) / 100;
  const perPersonAverage = participants.length > 0 
    ? Math.round((totalSpent / participants.length) * 100) / 100 
    : 0;

  return { balances, settlements, totalSpent, perPersonAverage };
}

// Core logic for one expense: returns map of participantId -> amount they owe for this expense
function calculateOwingForExpense(exp: Expense, participants: Participant[]): Record<string, number> {
  const owing: Record<string, number> = {};
  participants.forEach(p => { owing[p.id] = 0; });

  const tip = exp.tip || 0;
  const tax = exp.tax || 0;
  const effectiveTotal = exp.totalAmount + tip + tax;

  if (effectiveTotal <= 0) return owing;

  // If itemized with subItems, calculate per sub-item
  if (exp.subItems && exp.subItems.length > 0) {
    let subTotal = 0;
    exp.subItems.forEach(sub => {
      subTotal += sub.amount;
      const num = sub.participants.length;
      if (num > 0) {
        const per = Math.round((sub.amount / num) * 100) / 100;
        (sub.participants || []).forEach(pid => {
          if (owing[pid] !== undefined) owing[pid] += per;
        });
      }
    });

    // Allocate tip/tax proportionally to sub total if any
    if ((tip + tax) > 0 && subTotal > 0) {
      const extraPerSub = (tip + tax) / subTotal;
      exp.subItems.forEach(sub => {
        const extra = sub.amount * extraPerSub;
        const per = Math.round((extra / sub.participants.length) * 100) / 100;
        (sub.participants || []).forEach(pid => {
          if (owing[pid] !== undefined) owing[pid] += per;
        });
      });
    }
    return owing;
  }

  // Non-itemized: use splitMode
  const activeParticipants = participants.map(p => p.id); // all by default

  switch (exp.splitMode) {
    case 'equal': {
      const per = Math.round((effectiveTotal / activeParticipants.length) * 100) / 100;
      activeParticipants.forEach(pid => { owing[pid] = per; });
      break;
    }
    case 'shares': {
      if (!exp.shares) {
        const per = Math.round((effectiveTotal / activeParticipants.length) * 100) / 100;
        activeParticipants.forEach(pid => { owing[pid] = per; });
        break;
      }
      let totalShares = 0;
      activeParticipants.forEach(pid => { totalShares += exp.shares![pid] || 1; });
      if (totalShares <= 0) totalShares = activeParticipants.length;
      activeParticipants.forEach(pid => {
        const share = exp.shares![pid] || 1;
        owing[pid] = Math.round((effectiveTotal * share / totalShares) * 100) / 100;
      });
      break;
    }
    case 'custom': {
      if (!exp.shares) {
        const per = Math.round((effectiveTotal / activeParticipants.length) * 100) / 100;
        activeParticipants.forEach(pid => { owing[pid] = per; });
        break;
      }
      let assigned = 0;
      activeParticipants.forEach(pid => {
        const amt = exp.shares![pid] || 0;
        owing[pid] = amt;
        assigned += amt;
      });
      // Distribute remainder equally if any
      const remainder = effectiveTotal - assigned;
      if (Math.abs(remainder) > 0.01) {
        const per = Math.round((remainder / activeParticipants.length) * 100) / 100;
        activeParticipants.forEach(pid => { owing[pid] = (owing[pid] || 0) + per; });
      }
      break;
    }
    case 'percentage': {
      if (!exp.shares) {
        const per = Math.round((effectiveTotal / activeParticipants.length) * 100) / 100;
        activeParticipants.forEach(pid => { owing[pid] = per; });
        break;
      }
      let totalPct = 0;
      activeParticipants.forEach(pid => { totalPct += exp.shares![pid] || 0; });
      if (totalPct <= 0) totalPct = 100;
      activeParticipants.forEach(pid => {
        const pct = (exp.shares![pid] || 0) / totalPct;
        owing[pid] = Math.round((effectiveTotal * pct) * 100) / 100;
      });
      break;
    }
  }

  // Ensure sum is exactly effectiveTotal (fix floating point)
  let sum = 0;
  activeParticipants.forEach(pid => { sum += owing[pid] || 0; });
  const diff = effectiveTotal - sum;
  if (Math.abs(diff) > 0.001 && activeParticipants.length > 0) {
    owing[activeParticipants[0]!] = (owing[activeParticipants[0]!] || 0) + diff;
  }

  return owing;
}

// Greedy optimal settlement: minimize number of transactions
export function suggestOptimalSettlements(balances: Balance[]): Settlement[] {
  const debtors = balances
    .filter(b => b.net < -0.01)
    .map(b => ({ id: b.participantId, name: b.name, amount: -b.net }))
    .sort((a, b) => b.amount - a.amount);

  const creditors = balances
    .filter(b => b.net > 0.01)
    .map(b => ({ id: b.participantId, name: b.name, amount: b.net }))
    .sort((a, b) => b.amount - a.amount);

  const settlements: Settlement[] = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i]!;
    const creditor = creditors[j]!;
    const amount = Math.min(debtor.amount, creditor.amount);

    if (amount > 0.01) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(amount * 100) / 100,
      });
    }

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return settlements;
}

// Serialize current state for sharing via URL (base64)
export function encodeStateForShare(participants: Participant[], expenses: Expense[]): string {
  const data = { p: participants, e: expenses };
  try {
    const json = JSON.stringify(data);
    // Use btoa for simple base64 (client only)
    return btoa(unescape(encodeURIComponent(json)));
  } catch {
    return '';
  }
}

export function decodeStateFromShare(encoded: string): { participants: Participant[]; expenses: Expense[] } | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const data = JSON.parse(json);
    if (data.p && data.e) {
      return { participants: data.p, expenses: data.e };
    }
  } catch {}
  return null;
}

// Helper to create a nice text summary for copy-paste sharing
export function generateShareableText(
  participants: Participant[],
  expenses: Expense[],
  result: BillSplitResult
): string {
  let text = `💰 Group Expense Summary\n\n`;
  text += `Total spent: ₹${result.totalSpent.toFixed(2)}\n`;
  text += `Average per person: ₹${result.perPersonAverage.toFixed(2)}\n\n`;

  text += `Balances:\n`;
  result.balances.forEach(b => {
    const sign = b.net >= 0 ? 'gets back' : 'owes';
    text += `• ${b.name}: ${sign} ₹${Math.abs(b.net).toFixed(2)}\n`;
  });

  if (result.settlements.length > 0) {
    text += `\nRecommended settlements (minimal transfers):\n`;
    result.settlements.forEach(s => {
      text += `• ${s.from} → ${s.to}: ₹${s.amount.toFixed(2)}\n`;
    });
  }

  text += `\n--- Expenses ---\n`;
  expenses.forEach((e, idx) => {
    text += `${idx + 1}. ${e.description} - ₹${e.totalAmount.toFixed(2)} (paid by ${participants.find(p => p.id === e.paidBy)?.name || 'someone'})\n`;
  });

  text += `\nGenerated with QuickUtils Bill Splitter (free & private)`;
  return text;
}
