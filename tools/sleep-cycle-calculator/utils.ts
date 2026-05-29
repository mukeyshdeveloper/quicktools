export interface SleepResult {
  times: string[];
}

// 90 minute cycles, taking 15 mins to fall asleep
const CYCLE_MS = 90 * 60 * 1000;
const FALL_ASLEEP_MS = 15 * 60 * 1000;

export function calculateWakeUpTimes(bedtime: Date): SleepResult | null {
  if (isNaN(bedtime.getTime())) return null;
  const times: string[] = [];
  const actualSleepStart = new Date(bedtime.getTime() + FALL_ASLEEP_MS);
  
  // Calculate 6, 5, 4, and 3 cycles
  for (let i = 6; i >= 3; i--) {
    const wakeTime = new Date(actualSleepStart.getTime() + (i * CYCLE_MS));
    times.push(wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  return { times };
}

export function calculateBedtimes(wakeTime: Date): SleepResult | null {
  if (isNaN(wakeTime.getTime())) return null;
  const times: string[] = [];
  
  // Need to be asleep by wakeTime - cycles, so go to bed 15 mins before that
  for (let i = 6; i >= 3; i--) {
    const sleepTime = new Date(wakeTime.getTime() - (i * CYCLE_MS) - FALL_ASLEEP_MS);
    times.push(sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  return { times };
}
