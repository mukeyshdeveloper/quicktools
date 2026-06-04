export interface Question {
  id: number;
  text: string;
}

export const QUESTIONS: Question[] = [
  { id: 1, text: 'In the last month, how often have you been upset because of something that happened unexpectedly?' },
  { id: 2, text: 'In the last month, how often have you felt that you were unable to control the important things in your life?' },
  { id: 3, text: 'In the last month, how often have you felt nervous and stressed?' },
  { id: 4, text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?' },
  { id: 5, text: 'In the last month, how often have you felt that things were going your way?' },
  { id: 6, text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?' },
  { id: 7, text: 'In the last month, how often have you been able to control irritations in your life?' },
  { id: 8, text: 'In the last month, how often have you felt that you were on top of things?' },
  { id: 9, text: 'In the last month, how often have you been angered because of things that were outside of your control?' },
  { id: 10, text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?' },
];

export type Answer = 0 | 1 | 2 | 3 | 4; // Never to Very Often

export function calculateStressScore(answers: Answer[]): number {
  if (answers.length !== 10) return 0;
  // Reverse score for questions 4,5,7,8
  const reverse = [4, 5, 7, 8];
  let total = 0;
  answers.forEach((ans, i) => {
    const qNum = i + 1;
    if (reverse.includes(qNum)) {
      total += 4 - ans;
    } else {
      total += ans;
    }
  });
  return total;
}

export function getStressLevel(score: number): { level: string; color: string; description: string; tips: string[] } {
  if (score <= 13) {
    return {
      level: 'Low Stress',
      color: 'emerald',
      description: 'You are handling life well with low perceived stress.',
      tips: ['Maintain your current routines', 'Continue regular exercise and social connection', 'Practice gratitude to keep resilience high'],
    };
  } else if (score <= 26) {
    return {
      level: 'Moderate Stress',
      color: 'amber',
      description: 'You are experiencing noticeable stress. Small consistent changes can help significantly.',
      tips: ['Prioritize 7–8 hours of sleep', 'Try 5-minute daily breathing or meditation', 'Set boundaries on work after hours', 'Talk to a friend or professional'],
    };
  } else {
    return {
      level: 'High Stress',
      color: 'rose',
      description: 'Your stress levels are elevated and may be affecting health and happiness.',
      tips: ['Consider speaking with a counselor or doctor', 'Reduce commitments where possible', 'Incorporate daily movement and nature time', 'Practice progressive muscle relaxation', 'Limit caffeine and screens before bed'],
    };
  }
}
