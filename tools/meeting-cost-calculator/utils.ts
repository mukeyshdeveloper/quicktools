export interface Attendee {
  id: string;
  role: string;
  hourlyRate: number; // INR per hour
}

export interface MeetingInputs {
  attendees: Attendee[];
  durationMinutes: number;
  overheadMultiplier: number; // 1.0 = none, 1.5 = 50% extra etc.
  meetingsPerYear?: number;
}

export interface MeetingResult {
  totalCost: number;
  costPerMinute: number;
  costPerPerson: number;
  annualProjection: number | null;
  breakdown: Array<{ role: string; cost: number }>;
}

export function calculateMeetingCost(inputs: MeetingInputs): MeetingResult | null {
  const { attendees, durationMinutes, overheadMultiplier, meetingsPerYear } = inputs;

  if (attendees.length === 0 || durationMinutes <= 0) return null;

  const hours = durationMinutes / 60;

  let baseCost = 0;
  const breakdown: Array<{ role: string; cost: number }> = [];

  attendees.forEach((a) => {
    const personCost = a.hourlyRate * hours * overheadMultiplier;
    baseCost += personCost;
    breakdown.push({ role: a.role, cost: Math.round(personCost) });
  });

  const totalCost = Math.round(baseCost);
  const costPerMinute = Math.round(totalCost / Math.max(1, durationMinutes));
  const costPerPerson = Math.round(totalCost / attendees.length);

  let annualProjection: number | null = null;
  if (meetingsPerYear && meetingsPerYear > 0) {
    annualProjection = Math.round(totalCost * meetingsPerYear);
  }

  return {
    totalCost,
    costPerMinute,
    costPerPerson,
    annualProjection,
    breakdown,
  };
}

export const DEFAULT_ATTENDEES: Attendee[] = [
  { id: '1', role: 'Engineer', hourlyRate: 850 },
  { id: '2', role: 'Designer', hourlyRate: 800 },
  { id: '3', role: 'Product Manager', hourlyRate: 950 },
  { id: '4', role: 'Manager', hourlyRate: 1200 },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
