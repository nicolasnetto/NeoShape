"use client";

import { Activity, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  name: string;
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const firstName = name?.split(" ")[0] || "Usuario";

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-foreground">
          Neo<span className="text-primary">Shape</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Ola, <span className="text-foreground">{firstName}</span>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="border-border text-muted-foreground hover:text-foreground bg-transparent"
        >
          <LogOut className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
}
