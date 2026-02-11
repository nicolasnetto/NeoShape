"use client";

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] shrink-0">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-[3px] border-[hsl(0_0%_25%)] bg-[hsl(0_0%_10%)] p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-[hsl(0_0%_7%)]" />
        {/* Screen */}
        <div className="overflow-hidden rounded-[2rem] bg-background">
          {/* Status bar */}
          <div className="flex items-center justify-between bg-background px-6 pb-1 pt-8">
            <span className="text-[10px] font-medium text-muted-foreground">9:41</span>
            <div className="flex gap-1">
              <div className="h-1.5 w-3 rounded-sm bg-muted-foreground" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            </div>
          </div>

          {/* Dashboard preview content */}
          <div className="space-y-3 px-4 pb-6 pt-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] text-muted-foreground">Bem-vindo,</p>
                <p className="text-xs font-bold text-foreground">Lucas</p>
              </div>
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary">L</span>
              </div>
            </div>

            {/* Discipline card */}
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-muted-foreground">Disciplina hoje</p>
                  <p className="text-lg font-bold text-primary">85%</p>
                </div>
                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--primary))" strokeWidth="5" strokeDasharray="138.8 163.4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Mini cards grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Water */}
              <div className="rounded-lg border border-border bg-card p-2.5">
                <div className="mb-1 flex items-center gap-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-primary/10">
                    <svg className="h-2.5 w-2.5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c0 0-8 9.5-8 14a8 8 0 1016 0C20 11.5 12 2 12 2z" /></svg>
                  </div>
                  <span className="text-[8px] font-medium text-foreground">Agua</span>
                </div>
                <p className="text-[10px] font-bold text-foreground">2.1L</p>
                <div className="mt-1 h-1 rounded-full bg-secondary">
                  <div className="h-1 w-3/4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Sleep */}
              <div className="rounded-lg border border-border bg-card p-2.5">
                <div className="mb-1 flex items-center gap-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-primary/10">
                    <svg className="h-2.5 w-2.5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                  </div>
                  <span className="text-[8px] font-medium text-foreground">Sono</span>
                </div>
                <p className="text-[10px] font-bold text-primary">Bom</p>
              </div>

              {/* Training */}
              <div className="rounded-lg border border-border bg-card p-2.5">
                <div className="mb-1 flex items-center gap-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-primary/10">
                    <svg className="h-2.5 w-2.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 4v16M18 4v16M3 8h4M17 8h4M3 16h4M17 16h4M7 8h10M7 16h10" /></svg>
                  </div>
                  <span className="text-[8px] font-medium text-foreground">Treino</span>
                </div>
                <p className="text-[10px] font-bold text-primary">Feito</p>
              </div>

              {/* Diet */}
              <div className="rounded-lg border border-border bg-card p-2.5">
                <div className="mb-1 flex items-center gap-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-primary/10">
                    <svg className="h-2.5 w-2.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20V10M6 20V4M18 20v-6" /></svg>
                  </div>
                  <span className="text-[8px] font-medium text-foreground">Dieta</span>
                </div>
                <p className="text-[10px] font-bold text-primary">OK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesktopMockup() {
  return (
    <div className="w-full max-w-[640px]">
      {/* Browser chrome */}
      <div className="rounded-t-xl border border-b-0 border-[hsl(0_0%_25%)] bg-[hsl(0_0%_12%)] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(0_84%_60%)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(45_93%_58%)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <div className="flex-1 rounded-md bg-[hsl(0_0%_7%)] px-3 py-1">
            <span className="text-[10px] text-muted-foreground">neoshape.app/dashboard</span>
          </div>
        </div>
      </div>
      {/* Screen */}
      <div className="overflow-hidden rounded-b-xl border border-[hsl(0_0%_25%)] bg-background">
        <div className="p-6">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              <span className="text-sm font-bold text-foreground">
                {"Neo"}<span className="text-primary">{"Shape"}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">Lucas Silva</span>
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary">LS</span>
              </div>
            </div>
          </div>

          {/* Discipline bar */}
          <div className="mb-5 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground">Disciplina de hoje</p>
                  <p className="text-xl font-bold text-primary">85%</p>
                </div>
              </div>
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeDasharray="138.8 163.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Water */}
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                  <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c0 0-8 9.5-8 14a8 8 0 1016 0C20 11.5 12 2 12 2z" /></svg>
                </div>
                <span className="text-[10px] font-semibold text-foreground">Agua</span>
              </div>
              <p className="text-sm font-bold text-foreground">2.1L <span className="text-[9px] font-normal text-muted-foreground">/ 2.8L</span></p>
              <div className="mt-2 h-1.5 rounded-full bg-secondary">
                <div className="h-1.5 w-3/4 rounded-full bg-primary" />
              </div>
              <div className="mt-2 flex gap-1">
                <div className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[7px] text-foreground">+200ml</div>
                <div className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[7px] text-foreground">+500ml</div>
                <div className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[7px] text-foreground">+1L</div>
              </div>
            </div>

            {/* Sleep */}
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                  <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                </div>
                <span className="text-[10px] font-semibold text-foreground">Sono</span>
              </div>
              <p className="text-sm font-bold text-primary">Bom</p>
              <div className="mt-2 flex gap-1">
                <div className="rounded bg-primary/20 px-1.5 py-0.5 text-[7px] font-medium text-primary">Bom</div>
                <div className="rounded border border-border px-1.5 py-0.5 text-[7px] text-muted-foreground">Medio</div>
                <div className="rounded border border-border px-1.5 py-0.5 text-[7px] text-muted-foreground">Ruim</div>
              </div>
            </div>

            {/* Training */}
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 4v16M18 4v16M3 8h4M17 8h4M3 16h4M17 16h4M7 8h10M7 16h10" /></svg>
                </div>
                <span className="text-[10px] font-semibold text-foreground">Treino</span>
              </div>
              <p className="text-sm font-bold text-primary">Feito</p>
              <div className="mt-3 flex items-center gap-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                <span className="text-[8px] text-muted-foreground">Registrado as 07:30</span>
              </div>
            </div>
          </div>

          {/* Weight chart row */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>
                </div>
                <span className="text-[10px] font-semibold text-foreground">Evolucao do Peso</span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[82, 81.5, 81, 80.8, 80.2, 79.5, 79].map((w, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/30" style={{ height: `${((w - 78) / 5) * 100}%` }}>
                    <div className="h-full w-full rounded-t bg-primary" style={{ opacity: 0.3 + (i / 7) * 0.7 }} />
                  </div>
                ))}
              </div>
              <p className="mt-1 text-center text-[8px] text-muted-foreground">Ultimos 7 registros</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 12h10M12 7v10" /></svg>
                </div>
                <span className="text-[10px] font-semibold text-foreground">IMC</span>
              </div>
              <p className="text-2xl font-bold text-primary">24.2</p>
              <p className="text-[8px] text-muted-foreground">Peso normal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
