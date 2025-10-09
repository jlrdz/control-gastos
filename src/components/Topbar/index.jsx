export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 h-14 bg-[var(--surface)]/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-3 md:px-4">
      <div className="font-medium tracking-tight text-[var(--text)]/90">
        <h1 className="text-3xl font-semibold text-muted-foreground">
          Financial Overview
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* Aquí irán: selector de mes, tema, idioma, usuario y botón de acción */}
        <button className="h-9 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
          Action
        </button>
      </div>
    </header>
  );
}
