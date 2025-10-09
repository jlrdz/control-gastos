export default function Sidebar() {
  // colapsable lo implementamos en un paso siguiente
  return (
    <aside className="hidden md:flex w-64 shrink-0 bg-[var(--surface)] border-r border-white/5">
      <nav className="p-3 w-full">
        {/* Aquí irán los items con estados activos/hover e iconos */}
        <div className="text-sm/6 text-[var(--text)]/70">Sidebar</div>
      </nav>
    </aside>
  );
}
