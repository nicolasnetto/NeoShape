"use client";

import { useState, useCallback } from "react";
import { Droplets, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface WaterCardProps {
  userId: string;
  currentWeight: number;
  trainingLevel: string;
  initialAmount: number;
}

function getWaterGoal(weight: number, trainingLevel: string): number {
  const multiplier =
    trainingLevel === "treino_pesado"
      ? 45
      : trainingLevel === "treino_leve"
        ? 40
        : 35;
  return Math.round(weight * multiplier);
}

export function WaterCard({
  userId,
  currentWeight,
  trainingLevel,
  initialAmount,
}: WaterCardProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [isLoading, setIsLoading] = useState(false);
  const goal = getWaterGoal(currentWeight, trainingLevel);
  const percentage = Math.min(Math.round((amount / goal) * 100), 100);
  const remaining = Math.max(goal - amount, 0);

  const addWater = useCallback(
    async (ml: number) => {
      setIsLoading(true);
      const supabase = createClient();
      const newAmount = amount + ml;
      setAmount(newAmount);

      const { error } = await supabase.from("water_logs").insert({
        user_id: userId,
        amount_ml: ml,
        logged_at: new Date().toISOString().split("T")[0],
      });

      if (error) {
        setAmount(amount);
        toast.error("Erro ao registrar agua");
      }
      setIsLoading(false);
    },
    [amount, userId]
  );

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Droplets className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Agua</h3>
          <p className="text-xs text-muted-foreground">
            Meta: {(goal / 1000).toFixed(1)}L
          </p>
        </div>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">
          {amount >= 1000
            ? `${(amount / 1000).toFixed(1)}L`
            : `${amount}ml`}
        </span>
        <span className="text-sm text-muted-foreground">
          {remaining > 0
            ? `Falta ${remaining >= 1000 ? `${(remaining / 1000).toFixed(1)}L` : `${remaining}ml`}`
            : "Meta atingida!"}
        </span>
      </div>

      <Progress value={percentage} className="mb-4 h-2" />

      <div className="flex gap-2">
        {[200, 500, 1000].map((ml) => (
          <Button
            key={ml}
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => addWater(ml)}
            className="flex-1 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/50"
          >
            <Plus className="mr-1 h-3 w-3" />
            {ml >= 1000 ? `${ml / 1000}L` : `${ml}ml`}
          </Button>
        ))}
      </div>
    </div>
  );
}
