import { Users, BarChart3, Settings } from 'lucide-react';

type ActiveView = 'patients' | 'analytics' | 'settings';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const navItems: { id: ActiveView; label: string; Icon: typeof Users }[] = [
  { id: 'patients', label: 'Patients', Icon: Users },
  { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <nav
      className="flex flex-col shrink-0 border-r"
      style={{
        width: 140,
        backgroundColor: 'hsl(220, 40%, 14%)',
        borderColor: 'hsl(220, 35%, 20%)',
      }}
    >
      <div className="flex-1 py-4">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className="w-full flex flex-col items-center gap-1.5 px-3 py-3 transition-all duration-150 group relative"
              style={{
                color: isActive ? 'hsl(36, 62%, 56%)' : 'hsl(38, 28%, 86%)',
                backgroundColor: isActive ? 'hsl(220, 40%, 20%)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'hsl(220, 40%, 18%)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: 'hsl(36, 62%, 56%)' }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className="font-sans text-[11px] font-medium tracking-[0.04em]"
                style={{
                  color: isActive ? 'hsl(36, 62%, 56%)' : 'hsl(38, 28%, 72%)',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="px-3 py-3 border-t"
        style={{ borderColor: 'hsl(220, 35%, 20%)' }}
      >
        <p
          className="font-sans text-[9px] text-center leading-relaxed tracking-wide"
          style={{ color: 'hsl(38, 28%, 50%)' }}
        >
          MedExAI
          <br />
          v1.0.0
        </p>
      </div>
    </nav>
  );
}
