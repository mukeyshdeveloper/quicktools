export interface PregnancyResult {
  dueDate: Date;
  weeksPregnant: number;
  daysPregnant: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
  progressPercentage: number;
}

export function calculateDueDate(
  inputDate: Date,
  method: 'lmp' | 'conception',
  cycleLength: number = 28
): PregnancyResult | null {
  if (isNaN(inputDate.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dueDate = new Date(inputDate);

  if (method === 'lmp') {
    // Naegele's rule: add 280 days (40 weeks) + adjust for cycle length diff from 28
    const daysToAdd = 280 + (cycleLength - 28);
    dueDate.setDate(dueDate.getDate() + daysToAdd);
  } else {
    // Conception is typically 38 weeks (266 days) before due date
    dueDate.setDate(dueDate.getDate() + 266);
  }

  // Calculate current progress
  const startOfPregnancy = new Date(dueDate);
  startOfPregnancy.setDate(startOfPregnancy.getDate() - 280);

  const totalDaysPregnant = Math.max(0, Math.floor((today.getTime() - startOfPregnancy.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  if (totalDaysPregnant < 0 || totalDaysPregnant > 300) return null; // Unrealistic

  const weeksPregnant = Math.floor(totalDaysPregnant / 7);
  const daysPregnant = totalDaysPregnant % 7;

  let trimester: 1 | 2 | 3 = 1;
  if (weeksPregnant >= 13 && weeksPregnant < 27) trimester = 2;
  else if (weeksPregnant >= 27) trimester = 3;

  const progressPercentage = Math.min(100, Math.round((totalDaysPregnant / 280) * 100));

  return {
    dueDate,
    weeksPregnant,
    daysPregnant,
    trimester,
    daysRemaining,
    progressPercentage
  };
}
