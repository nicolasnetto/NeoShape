import { Activity, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Algo deu errado
          </h2>
          <p className="text-sm text-muted-foreground">
            {params?.error
              ? `Erro: ${params.error}`
              : "Ocorreu um erro desconhecido."}
          </p>
          <div className="mt-6">
            <Link
              href="/auth/login"
              className="text-sm text-primary underline underline-offset-4"
            >
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
