interface ScoreRingProps {
  score: number;
  max: number;
  label: string;
  size?: number;
  color?: string;
}

export function ScoreRing({
  score,
  max,
  label,
  size = 64,
  color = 'hsl(220, 48%, 20%)',
}: ScoreRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(score / max, 1);
  const strokeDashoffset = circumference * (1 - pct);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="hsl(38, 20%, 88%)"
            strokeWidth={4}
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-foreground leading-none" style={{ fontSize: size * 0.28 }}>
            {score}
          </span>
        </div>
      </div>
      <span className="section-label text-center" style={{ fontSize: 9 }}>{label}</span>
    </div>
  );
}
