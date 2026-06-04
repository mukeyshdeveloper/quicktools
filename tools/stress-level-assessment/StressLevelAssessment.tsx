'use client';

import { useState } from 'react';
import { QUESTIONS, calculateStressScore, getStressLevel, type Answer } from './utils';

export default function StressLevelAssessment() {
  const [answers, setAnswers] = useState<Answer[]>(Array(QUESTIONS.length).fill(2));
  const [submitted, setSubmitted] = useState(false);

  const score = calculateStressScore(answers);
  const result = getStressLevel(score);

  function setAnswer(index: number, value: Answer) {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function reset() {
    setAnswers(Array(QUESTIONS.length).fill(2));
    setSubmitted(false);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="text-sm font-bold mb-4">Over the last month, how often have you felt the following?</div>
        <div className="space-y-5">
          {QUESTIONS.map((q, i) => (
            <div key={i}>
              <p className="text-sm mb-2">{i + 1}. {q.text}</p>
              <div className="flex gap-2 text-xs">
                {['Never', 'Almost Never', 'Sometimes', 'Fairly Often', 'Very Often'].map((label, val) => (
                  <button
                    key={val}
                    onClick={() => setAnswer(i, val as Answer)}
                    className={`flex-1 py-2 rounded-2xl border text-center transition ${answers[i] === val ? 'bg-orange-500 text-white border-orange-500' : 'border-border hover:bg-background'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={reset} className="btn-secondary flex-1">Reset</button>
          <button onClick={handleSubmit} className="btn-primary flex-1">Get My Results</button>
        </div>
      </div>

      {submitted && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="text-center mb-6">
            <div className="text-xs text-muted">Your Score: {score}/40</div>
            <div className={`text-4xl font-bold text-${result.color}-600 mt-1`}>{result.level}</div>
            <p className="mt-3 text-sm">{result.description}</p>
          </div>

          <div>
            <div className="font-semibold mb-2 text-orange-600">Recommended Actions</div>
            <ul className="space-y-2 text-sm list-disc pl-5">
              {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
