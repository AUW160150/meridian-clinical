export function Header() {
  return (
    <header className="h-14 bg-white border-b border-border flex items-center px-6 shrink-0 relative">
      <div className="flex items-center gap-3">
        <h1 className="font-display font-bold text-xl text-foreground tracking-tight leading-none">
          AI-Driven Clinical Decision Making
        </h1>
      </div>

      <div className="ml-auto flex items-center">
        <span className="font-sans text-[11px] text-muted-foreground tracking-[0.08em] uppercase">
          Demo Instance &mdash; Institutional Use Only
        </span>
      </div>

      {/* Amber rule line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'hsl(36, 62%, 56%)' }}
      />
    </header>
  );
}
