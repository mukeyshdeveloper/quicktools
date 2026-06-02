export interface DeficitInputs {
  currentWeightKg: number;
  goalWeightKg: number;
  maintenanceCals: number; // TDEE estimate
  weeklyKgLoss: number; // e.g. 0.5 or 0.75
  startDate?: Date | null;
}

export interface DeficitResult {
  weightToLose: number;
  totalDeficitKcal: number;
  weeklyDeficitKcal: number;
  dailyDeficit: number;
  targetDailyIntake: number;
  weeks: number;
  days: number;
  projectedDate: string;
  safe: boolean;
  warning: string | null;
  weeklyPlan: Array<{ week: number; weight: number; intake: number }>;
}

const KCAL_PER_KG = 7700; // approximate

export function calculateDeficitPlan(inputs: DeficitInputs): DeficitResult | null {
  const { currentWeightKg, goalWeightKg, maintenanceCals, weeklyKgLoss, startDate } = inputs;

  if (currentWeightKg <= goalWeightKg || currentWeightKg <= 0 || goalWeightKg <= 0 || maintenanceCals < 1200) return null;
  if (weeklyKgLoss <= 0 || weeklyKgLoss > 1.5) return null;

  const weightToLose = Math.round((currentWeightKg - goalWeightKg) * 10) / 10;
  const totalDeficitKcal = Math.round(weightToLose * KCAL_PER_KG);
  const weeklyDeficitKcal = Math.round(weeklyKgLoss * KCAL_PER_KG);
  const dailyDeficit = Math.round(weeklyDeficitKcal / 7);

  let targetDailyIntake = maintenanceCals - dailyDeficit;

  // Safety floor
  const minIntake = 1500; // women ~1200-1500, men 1500-1800; conservative
  if (targetDailyIntake < minIntake) {
    targetDailyIntake = minIntake;
  }

  const weeksFloat = totalDeficitKcal / weeklyDeficitKcal;
  const weeks = Math.ceil(weeksFloat);
  const days = Math.round(weeksFloat * 7);

  let projectedDate = '';
  if (startDate) {
    const end = new Date(startDate);
    end.setDate(startDate.getDate() + days);
    projectedDate = end.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  }

  const safe = weeklyKgLoss <= 0.75 || (weeklyKgLoss <= 1 && currentWeightKg > 80);
  let warning: string | null = null;
  if (weeklyKgLoss > 1) warning = 'Losing more than 1 kg per week significantly increases risk of muscle loss and rebound.';
  else if (targetDailyIntake < 1600) warning = 'Your target intake is quite low. Prioritize protein (1.6–2.2 g/kg) and consider a slower rate.';

  // Build simple 4–8 point weekly plan for chart
  const weeklyPlan: Array<{ week: number; weight: number; intake: number }> = [];
  let w = currentWeightKg;
  for (let i = 1; i <= Math.min(weeks, 12); i++) {
    w = Math.max(goalWeightKg, Math.round((w - weeklyKgLoss) * 10) / 10);
    weeklyPlan.push({
      week: i,
      weight: w,
      intake: Math.round(targetDailyIntake),
    });
  }

  return {
    weightToLose,
    totalDeficitKcal,
    weeklyDeficitKcal,
    dailyDeficit,
    targetDailyIntake,
    weeks,
    days,
    projectedDate,
    safe,
    warning,
    weeklyPlan,
  };
}
