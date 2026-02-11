"use client";

import { Flame } from "lucide-react";

interface DisciplineScoreProps {
  waterAmount: number;
  waterGoal: number;
  sleepQuality: string | null;
  trained: boolean | null;
  dietRating: string | null;
  hasLoggedToday: boolean;
}

export function DisciplineScore({
  waterAmount,
  waterGoal,
  sleepQuality,
  trained,
  dietRating,
  hasLoggedToday,
}: DisciplineScoreProps) {
  // Calculate discipline percentage (each metric = 20%)
  let score = 0;
  let total = 0;

  // Water (20%)
  total += 20;
  const waterPercent = Math.min(waterAmount / waterGoal, 1);
  score += waterPercent * 20;

  // Sleep (20%)
  total += 20;
  if (sleepQuality === "bom") score += 20;
  else if (sleepQuality === "medio") score += 10;
  else if (sleepQuality === "ruim") score += 5;

  // Training (20%)
  total += 20;
  if (trained === true) score += 20;

  // Diet (20%)
  total += 20;
  if (dietRating === "ok") score += 20;
  else if (dietRating === "mais_ou_menos") score += 10;
  else if (dietRating === "ruim") score += 5;

  // Consistency - did the user log anything today? (20%)
  total += 20;
  if (hasLoggedToday) score += 20;

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getColor = () => {
    if (percentage >= 70) return "text-primary";
    if (percentage >= 40) return "text-chart-4";
    return "text-destructive";
  };

  const getBgColor = () => {
    if (percentage >= 70) return "bg-primary";
    if (percentage >= 40) return "bg-chart-4";
    return "bg-destructive";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${getBgColor()}/10`}>
            <Flame className={`h-6 w-6 ${getColor()}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Disciplina hoje</p>
            <p className={`text-4xl font-bold ${getColor()}`}>
              {percentage}%
            </p>
          </div>
        </div>

        {/* Circular indicator */}
        <div className="relative h-16 w-16">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${(percentage / 100) * 175.93} 175.93`}
              strokeLinecap="round"
              className={getColor()}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
