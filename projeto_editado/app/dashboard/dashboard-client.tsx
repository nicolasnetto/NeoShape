"use client";

import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DisciplineScore } from "@/components/dashboard/discipline-score";
import { WaterCard } from "@/components/dashboard/water-card";
import { SleepCard } from "@/components/dashboard/sleep-card";
import { TrainingCard } from "@/components/dashboard/training-card";
import { DietCard } from "@/components/dashboard/diet-card";
import { WeightCard } from "@/components/dashboard/weight-card";
import { ImcCard } from "@/components/dashboard/imc-card";

interface Profile {
  id: string;
  name: string;
  email: string;
  height: number;
  current_weight: number;
  goal: string;
  training_level: string;
}

interface WeightLog {
  weight: number;
  logged_at: string;
}

interface DashboardClientProps {
  userId: string;
  profile: Profile;
  todayWater: number;
  todaySleep: string | null;
  todayTraining: boolean | null;
  todayDiet: string | null;
  weightLogs: WeightLog[];
}

export function DashboardClient({
  userId,
  profile,
  todayWater,
  todaySleep,
  todayTraining,
  todayDiet,
  weightLogs,
}: DashboardClientProps) {
  const [currentWeight, setCurrentWeight] = useState(profile.current_weight);

  const waterGoal = useMemo(() => {
    const multiplier =
      profile.training_level === "treino_pesado"
        ? 45
        : profile.training_level === "treino_leve"
          ? 40
          : 35;
    return Math.round(currentWeight * multiplier);
  }, [currentWeight, profile.training_level]);

  const hasLoggedToday =
    todayWater > 0 ||
    todaySleep !== null ||
    todayTraining !== null ||
    todayDiet !== null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader name={profile.name} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {/* Discipline Score - Hero */}
          <DisciplineScore
            waterAmount={todayWater}
            waterGoal={waterGoal}
            sleepQuality={todaySleep}
            trained={todayTraining}
            dietRating={todayDiet}
            hasLoggedToday={hasLoggedToday}
          />

          {/* Responsive grid for cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <WaterCard
              userId={userId}
              currentWeight={currentWeight}
              trainingLevel={profile.training_level}
              initialAmount={todayWater}
            />
            <SleepCard userId={userId} initialQuality={todaySleep} />
            <TrainingCard userId={userId} initialTrained={todayTraining} />
            <DietCard userId={userId} initialRating={todayDiet} />
            <WeightCard
              userId={userId}
              currentWeight={currentWeight}
              weightLogs={weightLogs}
              onWeightUpdate={setCurrentWeight}
            />
            <ImcCard weight={currentWeight} height={profile.height} />
          </div>
        </div>
      </main>
    </div>
  );
}
