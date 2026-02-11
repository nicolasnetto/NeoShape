"use client";

import { Activity } from "lucide-react";

interface ImcCardProps {
  weight: number;
  height: number; // in cm
}

function getImcClassification(imc: number): {
  label: string;
  color: string;
} {
  if (imc < 18.5) return { label: "Abaixo do peso", color: "text-chart-4" };
  if (imc < 25) return { label: "Peso normal", color: "text-primary" };
  if (imc < 30) return { label: "Sobrepeso", color: "text-chart-4" };
  if (imc < 35) return { label: "Obesidade I", color: "text-destructive" };
  if (imc < 40) return { label: "Obesidade II", color: "text-destructive" };
  return { label: "Obesidade III", color: "text-destructive" };
}

export function ImcCard({ weight, height }: ImcCardProps) {
  const heightM = height / 100;
  const imc = weight / (heightM * heightM);
  const { label, color } = getImcClassification(imc);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">IMC</h3>
          <p className="text-xs text-muted-foreground">Indice de Massa Corporal</p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-foreground">
            {imc.toFixed(1)}
          </span>
        </div>
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>
    </div>
  );
}
