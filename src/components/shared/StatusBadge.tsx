import { type DecisionStatus } from '../../data/syntheticPatients';

interface StatusBadgeProps {
  status: DecisionStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<DecisionStatus, { label: string; classes: string }> = {
  'action-required': {
    label: 'Action Required',
    classes: 'bg-[hsl(4,70%,95%)] text-[hsl(4,70%,36%)] border border-[hsl(4,70%,80%)]',
  },
  caution: {
    label: 'Caution',
    classes: 'bg-[hsl(36,82%,94%)] text-[hsl(36,82%,30%)] border border-[hsl(36,82%,76%)]',
  },
  proceed: {
    label: 'Proceed',
    classes: 'bg-[hsl(155,48%,92%)] text-[hsl(155,48%,26%)] border border-[hsl(155,48%,72%)]',
  },
  monitor: {
    label: 'Monitor',
    classes: 'bg-[hsl(220,20%,93%)] text-[hsl(220,20%,40%)] border border-[hsl(220,20%,78%)]',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm'
    ? 'text-[11px] px-1.5 py-0.5'
    : 'text-[12px] px-2 py-0.5';

  return (
    <span className={`inline-flex items-center font-sans font-semibold rounded-sm tracking-wide ${sizeClasses} ${config.classes}`}>
      {config.label}
    </span>
  );
}

interface StatusDotProps {
  status: DecisionStatus;
  label?: string;
}

const dotColors: Record<DecisionStatus, string> = {
  'action-required': 'bg-[hsl(4,70%,44%)]',
  caution: 'bg-[hsl(36,82%,44%)]',
  proceed: 'bg-[hsl(155,48%,34%)]',
  monitor: 'bg-[hsl(220,20%,52%)]',
};

export function StatusDot({ status, label }: StatusDotProps) {
  const tooltipText = label
    ? `${label}: ${statusConfig[status].label}`
    : statusConfig[status].label;
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full cursor-default ${dotColors[status]}`}
      title={tooltipText}
    />
  );
}
