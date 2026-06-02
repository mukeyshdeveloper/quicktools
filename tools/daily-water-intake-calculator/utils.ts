export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very';
export type Climate = 'cool' | 'moderate' | 'warm' | 'hot' | 'very-hot';

export interface WaterInputs {
  weightKg: number;
  activity: ActivityLevel;
  climate: Climate;
  exerciseMinutes: number; // additional planned exercise
  age?: number;
}

export interface WaterResult {
  baseLiters: number;
  activityBonus: number;
  climateBonus: number;
  exerciseBonus: number;
  totalLiters: number;
  totalMl: number;
  glasses8oz: number; // approx 237ml glasses
  note: string;
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 0.03, // ~30 ml/kg
  light: 0.033,
  moderate: 0.035,
  active: 0.038,
  very: 0.04,
};

const CLIMATE_ADJUST: Record<Climate, number> = {
  cool: -0.2,
  moderate: 0,
  warm: 0.3,
  hot: 0.6,
  'very-hot': 1.0,
};

export function calculateWaterIntake(inputs: WaterInputs): WaterResult | null {
  const { weightKg, activity, climate, exerciseMinutes } = inputs;
  if (!weightKg || weightKg <= 0) return null;

  // Base using weight + activity (ml/kg)
  const baseMl = weightKg * (ACTIVITY_MULTIPLIERS[activity] * 1000);
  const baseLiters = baseMl / 1000;

  // Climate adjustment (liters)
  const climateBonus = CLIMATE_ADJUST[climate];

  // Exercise: ~0.5–0.7 L per hour of moderate-intense exercise (conservative)
  const hours = Math.max(0, exerciseMinutes) / 60;
  const exerciseBonus = hours * 0.55;

  let totalLiters = baseLiters + climateBonus + exerciseBonus;

  // Safety bounds
  totalLiters = Math.max(1.2, Math.min(totalLiters, 8.5));
  const totalMl = Math.round(totalLiters * 1000);

  const glasses8oz = Math.round(totalMl / 237);

  let note = 'This is a personalized estimate. Increase intake if you feel thirsty, your urine is dark, or you sweat heavily.';
  if (climate === 'very-hot' || exerciseMinutes > 90) {
    note = 'In extreme heat or long workouts, add 250–500 ml per hour and monitor for signs of dehydration.';
  }

  return {
    baseLiters: Math.round(baseLiters * 10) / 10,
    activityBonus: 0, // incorporated in base for simplicity
    climateBonus: Math.round(climateBonus * 10) / 10,
    exerciseBonus: Math.round(exerciseBonus * 10) / 10,
    totalLiters: Math.round(totalLiters * 10) / 10,
    totalMl,
    glasses8oz,
    note,
  };
}

export const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (desk job, little exercise)',
  light: 'Lightly Active (light exercise 1–3× week)',
  moderate: 'Moderately Active (exercise 3–5× week)',
  active: 'Active (daily hard exercise / physical job)',
  very: 'Very Active (intense training 2× day or heavy labor)',
};

export const climateLabels: Record<Climate, string> = {
  cool: 'Cool / Air-conditioned',
  moderate: 'Moderate (comfortable 18–24°C)',
  warm: 'Warm (25–30°C or mild humidity)',
  hot: 'Hot (31–35°C or high humidity)',
  'very-hot': 'Very Hot / Humid (>35°C or extreme)',
};

// ===== Daily Intake Tracker (client-side only, persisted in localStorage) =====

export interface IntakeLog {
  ts: number; // timestamp
  ml: number; // amount added in ml
}

const LS_KEY_PREFIX = 'quickutils_water_';

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getStorageKey(dateKey: string): string {
  return `${LS_KEY_PREFIX}${dateKey}`;
}

export function loadDailyLogs(dateKey?: string): IntakeLog[] {
  const key = getStorageKey(dateKey ?? getTodayKey());
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((l): l is IntakeLog => typeof l.ts === 'number' && typeof l.ml === 'number' && l.ml > 0);
    }
  } catch {}
  return [];
}

export function saveDailyLogs(logs: IntakeLog[], dateKey?: string): void {
  const key = getStorageKey(dateKey ?? getTodayKey());
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(logs));
    }
  } catch {}
}

export function addIntake(logs: IntakeLog[], ml: number): IntakeLog[] {
  if (ml <= 0) return logs;
  const newLog: IntakeLog = { ts: Date.now(), ml: Math.round(ml) };
  return [...logs, newLog];
}

export function removeLastIntake(logs: IntakeLog[]): IntakeLog[] {
  if (logs.length === 0) return logs;
  return logs.slice(0, -1);
}

export function getTotalMl(logs: IntakeLog[]): number {
  return logs.reduce((sum, l) => sum + l.ml, 0);
}

export function getProgress(goalMl: number, currentMl: number): number {
  if (goalMl <= 0) return 0;
  return Math.min(Math.max(Math.round((currentMl / goalMl) * 100), 0), 150); // cap at 150% for UI
}

export function formatMl(ml: number): string {
  if (ml >= 1000) return `${(ml / 1000).toFixed(1)} L`;
  return `${ml} ml`;
}

export const REMINDER_INTERVALS = [0, 30, 45, 60, 90] as const; // minutes, 0 = off
export type ReminderInterval = (typeof REMINDER_INTERVALS)[number];
