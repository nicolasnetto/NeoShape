"use client";

import React from "react"

import { createClient } from "@/lib/supabase/client";
import { signUpUser } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Activity } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("emagrecer");
  const [trainingLevel, setTrainingLevel] = useState("nao_treino");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Create user via server action (auto-confirms email)
      const result = await signUpUser({
        email,
        password,
        name,
        height: parseFloat(height),
        current_weight: parseFloat(weight),
        goal,
        training_level: trainingLevel,
      });

      if (result.error) throw new Error(result.error);

      // 2. Sign in immediately on the client
      const supabase = createClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      // Force middleware to pick up the new session cookie
      router.refresh();
      // Small delay to ensure cookies are set before navigation
      await new Promise((resolve) => setTimeout(resolve, 300));
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erro ao criar conta"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goals = [
    { value: "emagrecer", label: "Emagrecer" },
    { value: "ganhar_massa", label: "Ganhar massa" },
    { value: "manter_peso", label: "Manter peso" },
    { value: "definir", label: "Definir" },
  ];

  const trainingLevels = [
    { value: "nao_treino", label: "Nao treino" },
    { value: "treino_leve", label: "Treino leve" },
    { value: "treino_pesado", label: "Treino pesado" },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Neo<span className="text-primary">Shape</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Crie sua conta e comece sua evolucao
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-foreground">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="height" className="text-foreground">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.01"
                  placeholder="175"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="weight" className="text-foreground">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="75"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-foreground">Objetivo</Label>
              <RadioGroup
                value={goal}
                onValueChange={setGoal}
                className="grid grid-cols-2 gap-2"
              >
                {goals.map((g) => (
                  <Label
                    key={g.value}
                    htmlFor={`goal-${g.value}`}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                      goal === g.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value={g.value}
                      id={`goal-${g.value}`}
                      className="sr-only"
                    />
                    {g.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-foreground">Voce treina?</Label>
              <RadioGroup
                value={trainingLevel}
                onValueChange={setTrainingLevel}
                className="flex flex-col gap-2"
              >
                {trainingLevels.map((t) => (
                  <Label
                    key={t.value}
                    htmlFor={`training-${t.value}`}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                      trainingLevel === t.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value={t.value}
                      id={`training-${t.value}`}
                      className="sr-only"
                    />
                    {t.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            Ja tem conta?{" "}
            <Link
              href="/auth/login"
              className="text-primary underline underline-offset-4"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
