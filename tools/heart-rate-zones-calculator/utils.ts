export interface HrInputs {
  age: number;
  restingHr?: number | undefined; // optional for Karvonen
  maxHrOverride?: number | undefined; // advanced
}

export interface Zone {
  name: string;
  pctLow: number;
  pctHigh: number;
  bpmLow: number;
  bpmHigh: number;
  purpose: string;
  feel: string;
  color: string;
}

export interface HrResult {
  maxHr: number;
  restingHr: number | null;
  method: 'max' | 'karvonen';
  zones: Zone[];
}

export function calculateHeartRateZones(inputs: HrInputs): HrResult | null {
  const { age, restingHr, maxHrOverride } = inputs;
  if (!age || age < 15 || age > 100) return null;

  const maxHr = maxHrOverride && maxHrOverride > 100 ? maxHrOverride : Math.round(220 - age);

  const useKarvonen = typeof restingHr === 'number' && restingHr > 30 && restingHr < 100;

  const zones: Zone[] = [];

  if (useKarvonen && restingHr) {
    // Karvonen / HRR method
    const hrr = maxHr - restingHr;
    const defs = [
      { name: 'Zone 1 – Recovery', pctLow: 0.50, pctHigh: 0.60, purpose: 'Active recovery, warm-up', feel: 'Very easy, conversational', color: 'bg-emerald-500' },
      { name: 'Zone 2 – Aerobic / Fat Burn', pctLow: 0.60, pctHigh: 0.70, purpose: 'Build endurance, improve fat oxidation', feel: 'Comfortable, can talk easily', color: 'bg-teal-500' },
      { name: 'Zone 3 – Tempo / Aerobic', pctLow: 0.70, pctHigh: 0.80, purpose: 'Improve lactate threshold', feel: 'Challenging but sustainable', color: 'bg-amber-500' },
      { name: 'Zone 4 – Threshold', pctLow: 0.80, pctHigh: 0.90, purpose: 'Raise anaerobic threshold', feel: 'Hard, short sentences only', color: 'bg-orange-500' },
      { name: 'Zone 5 – VO2max / Neuromuscular', pctLow: 0.90, pctHigh: 1.00, purpose: 'Max oxygen uptake & speed', feel: 'Very hard, unsustainable > few min', color: 'bg-rose-500' },
    ];
    defs.forEach((d) => {
      const low = Math.round(restingHr + hrr * d.pctLow);
      const high = Math.round(restingHr + hrr * d.pctHigh);
      zones.push({ ...d, bpmLow: low, bpmHigh: high });
    });
    return { maxHr, restingHr, method: 'karvonen', zones };
  }

  // Simple % of max HR
  const defs = [
    { name: 'Zone 1 – Recovery', pctLow: 0.50, pctHigh: 0.60, purpose: 'Warm-up, cool-down, recovery', feel: 'Very easy', color: 'bg-emerald-500' },
    { name: 'Zone 2 – Fat Burn / Endurance', pctLow: 0.60, pctHigh: 0.70, purpose: 'Aerobic base, fat burning', feel: 'Comfortable pace', color: 'bg-teal-500' },
    { name: 'Zone 3 – Aerobic / Tempo', pctLow: 0.70, pctHigh: 0.80, purpose: 'Improve cardio fitness', feel: 'Moderately challenging', color: 'bg-amber-500' },
    { name: 'Zone 4 – Anaerobic', pctLow: 0.80, pctHigh: 0.90, purpose: 'Increase lactate tolerance', feel: 'Hard effort', color: 'bg-orange-500' },
    { name: 'Zone 5 – Maximum', pctLow: 0.90, pctHigh: 1.00, purpose: 'Peak power & VO2max', feel: 'All-out sprint', color: 'bg-rose-500' },
  ];
  defs.forEach((d) => {
    const low = Math.round(maxHr * d.pctLow);
    const high = Math.round(maxHr * d.pctHigh);
    zones.push({ ...d, bpmLow: low, bpmHigh: high });
  });
  return { maxHr, restingHr: null, method: 'max', zones };
}

export function getZoneForBpm(bpm: number, zones: Zone[]): number | null {
  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    if (z && bpm >= z.bpmLow && bpm <= z.bpmHigh) return i + 1;
  }
  return null;
}
