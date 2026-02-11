"use client";

import { useState } from "react";
import { Dumbbell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface TrainingCardProps {
  userId: string;
  initialTrained: boolean | null;
}

export function TrainingCard({ userId, initialTrained }: TrainingCardProps) {
  const [trained, setTrained] = useState<boolean | null>(initialTrained);
  const [isLoading, setIsLoading] = useState(false);

  const logTraining = async (value: boolean) => {
    setIsLoading(true);
    const prev = trained;
    setTrained(value);
    const supabase = createClient();

    const today = new Date().toISOString().split("T")[0];

    await supabase
      .from("training_logs")
      .delete()
      .eq("user_id", userId)
      .eq("logged_at", today);

    const { error } = await supabase.from("training_logs").insert({
      user_id: userId,
      trained: value,
      logged_at: today,
    });

    if (error) {
      setTrained(prev);
      toast.error("Erro ao registrar treino");
    }
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Dumbbell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Treino</h3>
          <p className="text-xs text-muted-foreground">Treinou hoje?</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() => logTraining(true)}
          className={`flex-1 transition-colors ${
            trained === true
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          <Check className="mr-1 h-4 w-4" />
          Treinei
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() => logTraining(false)}
          className={`flex-1 transition-colors ${
            trained === false
              ? "border-destructive bg-destructive/10 text-destructive"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          <X className="mr-1 h-4 w-4" />
          Nao treinei
        </Button>
      </div>
    </div>
  );
}
