"use client";

import { useState } from "react";
import { Apple, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface DietCardProps {
  userId: string;
  initialRating: string | null;
}

const options = [
  { value: "ok", label: "OK", color: "text-primary border-primary bg-primary/10" },
  {
    value: "mais_ou_menos",
    label: "Mais ou menos",
    color: "text-chart-4 border-chart-4 bg-chart-4/10",
  },
  { value: "ruim", label: "Ruim", color: "text-destructive border-destructive bg-destructive/10" },
];

export function DietCard({ userId, initialRating }: DietCardProps) {
  const [rating, setRating] = useState<string | null>(initialRating);
  const [isLoading, setIsLoading] = useState(false);

  const logDiet = async (value: string) => {
    setIsLoading(true);
    const prev = rating;
    setRating(value);
    const supabase = createClient();

    const today = new Date().toISOString().split("T")[0];

    await supabase
      .from("diet_logs")
      .delete()
      .eq("user_id", userId)
      .eq("logged_at", today);

    const { error } = await supabase.from("diet_logs").insert({
      user_id: userId,
      rating: value,
      logged_at: today,
    });

    if (error) {
      setRating(prev);
      toast.error("Erro ao registrar dieta");
    }
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Apple className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Dieta</h3>
          <p className="text-xs text-muted-foreground">Como foi a dieta hoje?</p>
        </div>
      </div>

      <div className="flex gap-2">
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => logDiet(opt.value)}
            className={`flex-1 transition-colors ${
              rating === opt.value
                ? opt.color
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {rating === opt.value && <Check className="mr-1 h-3 w-3" />}
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
