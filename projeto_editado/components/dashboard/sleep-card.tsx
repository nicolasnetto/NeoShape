"use client";

import { useState } from "react";
import { Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface SleepCardProps {
  userId: string;
  initialQuality: string | null;
}

const options = [
  { value: "bom", label: "Bom", color: "text-primary border-primary bg-primary/10" },
  { value: "medio", label: "Medio", color: "text-chart-4 border-chart-4 bg-chart-4/10" },
  { value: "ruim", label: "Ruim", color: "text-destructive border-destructive bg-destructive/10" },
];

export function SleepCard({ userId, initialQuality }: SleepCardProps) {
  const [quality, setQuality] = useState<string | null>(initialQuality);
  const [isLoading, setIsLoading] = useState(false);

  const logSleep = async (value: string) => {
    setIsLoading(true);
    const prev = quality;
    setQuality(value);
    const supabase = createClient();

    const today = new Date().toISOString().split("T")[0];

    // Upsert: delete existing for today, insert new
    await supabase
      .from("sleep_logs")
      .delete()
      .eq("user_id", userId)
      .eq("logged_at", today);

    const { error } = await supabase.from("sleep_logs").insert({
      user_id: userId,
      quality: value,
      logged_at: today,
    });

    if (error) {
      setQuality(prev);
      toast.error("Erro ao registrar sono");
    }
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Moon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Sono</h3>
          <p className="text-xs text-muted-foreground">Dormiu bem?</p>
        </div>
      </div>

      <div className="flex gap-2">
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => logSleep(opt.value)}
            className={`flex-1 transition-colors ${
              quality === opt.value
                ? opt.color
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {quality === opt.value && <Check className="mr-1 h-3 w-3" />}
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
