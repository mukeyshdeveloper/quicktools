export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export interface Lead {
  id: number;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  value: number;
  stage: LeadStage;
  notes: string;
  nextAction?: string;
  updatedAt: string;
}

export const STAGES: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export const STAGE_COLORS: Record<LeadStage, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-sky-100 text-sky-700',
  Qualified: 'bg-emerald-100 text-emerald-700',
  Proposal: 'bg-amber-100 text-amber-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  Won: 'bg-green-100 text-green-700',
  Lost: 'bg-rose-100 text-rose-700',
};

export function loadLeads(): Lead[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('quickutils-leads');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveLeads(leads: Lead[]) {
  try {
    localStorage.setItem('quickutils-leads', JSON.stringify(leads));
  } catch {}
}

export function getPipelineValue(leads: Lead[]): number {
  return leads
    .filter(l => !['Won', 'Lost'].includes(l.stage))
    .reduce((sum, l) => sum + l.value, 0);
}

export function getWonValue(leads: Lead[]): number {
  return leads.filter(l => l.stage === 'Won').reduce((sum, l) => sum + l.value, 0);
}

export function getConversionRate(leads: Lead[]): number {
  const closed = leads.filter(l => ['Won', 'Lost'].includes(l.stage)).length;
  if (closed === 0) return 0;
  const won = leads.filter(l => l.stage === 'Won').length;
  return Math.round((won / closed) * 100);
}
