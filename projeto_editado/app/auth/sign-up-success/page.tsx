import { Activity, Mail } from "lucide-react";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Neo<span className="text-primary">Shape</span>
            </span>
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Conta criada!
          </h2>
          <p className="text-sm text-muted-foreground">
            Verifique seu email para confirmar sua conta. Apos a confirmacao, voce podera acessar o dashboard.
          </p>
          <div className="mt-6">
            <Link
              href="/auth/login"
              className="text-sm text-primary underline underline-offset-4"
            >
              Ir para login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
