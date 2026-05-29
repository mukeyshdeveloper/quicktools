export interface CyclePrediction {
  periodStartDate: Date;
  periodEndDate: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
}

export function calculatePeriods(
  lastPeriodDate: Date,
  cycleLength: number = 28,
  periodLength: number = 5
): CyclePrediction[] {
  if (isNaN(lastPeriodDate.getTime())) return [];
  if (cycleLength < 20 || cycleLength > 45) return [];

  const predictions: CyclePrediction[] = [];
  let currentDate = new Date(lastPeriodDate);

  for (let i = 0; i < 3; i++) {
    // Next period start is cycleLength days after previous period start
    currentDate.setDate(currentDate.getDate() + cycleLength);
    const periodStart = new Date(currentDate);
    
    const periodEnd = new Date(periodStart);
    periodEnd.setDate(periodEnd.getDate() + periodLength - 1);

    // Ovulation is generally 14 days BEFORE the NEXT period starts.
    // So for the cycle starting at `periodStart`, ovulation happens
    // around (cycleLength - 14) days after `periodStart`.
    const ovulationDate = new Date(periodStart);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));

    // Fertile window is the 5 days before ovulation + the day of ovulation
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

    predictions.push({
      periodStartDate: periodStart,
      periodEndDate: periodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd
    });
  }

  return predictions;
}
