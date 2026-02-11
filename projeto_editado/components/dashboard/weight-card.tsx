"use client";

import { useState } from "react";
import { Scale, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface WeightLog {
  weight: number;
  logged_at: string;
}

interface WeightCardProps {
  userId: string;
  currentWeight: number;
  weightLogs: WeightLog[];
  onWeightUpdate: (newWeight: number) => void;
}

export function WeightCard({
  userId,
  currentWeight,
  weightLogs,
  onWeightUpdate,
}: WeightCardProps) {
  const [showInput, setShowInput] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const firstWeight = weightLogs.length > 0 ? weightLogs[0].weight : currentWeight;
  const diff = currentWeight - firstWeight;

  const handleUpdate = async () => {
    const weight = parseFloat(newWeight);
    if (isNaN(weight) || weight < 20 || weight > 300) {
      toast.error("Peso invalido");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    const { error: logError } = await supabase.from("weight_logs").insert({
      user_id: userId,
      weight,
      logged_at: new Date().toISOString().split("T")[0],
    });

    if (logError) {
      toast.error("Erro ao registrar peso");
      setIsLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ current_weight: weight, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (profileError) {
      toast.error("Erro ao atualizar perfil");
    } else {
      onWeightUpdate(weight);
      toast.success("Peso atualizado!");
    }

    setShowInput(false);
    setNewWeight("");
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Scale className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Peso</h3>
          <p className="text-xs text-muted-foreground">Evolucao corporal</p>
        </div>
      </div>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-foreground">
            {currentWeight}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">kg</span>
        </div>
        {weightLogs.length > 0 && (
          <div className="flex items-center gap-1 text-sm">
            {diff < 0 ? (
              <TrendingDown className="h-4 w-4 text-primary" />
            ) : diff > 0 ? (
              <TrendingUp className="h-4 w-4 text-chart-4" />
            ) : (
              <Minus className="h-4 w-4 text-muted-foreground" />
            )}
            <span
              className={
                diff < 0
                  ? "text-primary"
                  : diff > 0
                    ? "text-chart-4"
                    : "text-muted-foreground"
              }
            >
              {diff > 0 ? "+" : ""}
              {diff.toFixed(1)}kg
            </span>
          </div>
        )}
      </div>

      {showInput ? (
        <div className="flex gap-2">
          <Input
            type="number"
            step="0.1"
            placeholder="Novo peso"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="border-border bg-secondary text-foreground"
            autoFocus
          />
          <Button
            size="sm"
            disabled={isLoading}
            onClick={handleUpdate}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowInput(false)}
            className="border-border text-muted-foreground"
          >
            X
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInput(true)}
          className="w-full border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/50"
        >
          Atualizar peso
        </Button>
      )}
    </div>
  );
}
