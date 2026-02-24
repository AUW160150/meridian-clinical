import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Users, AlertCircle, TrendingUp, Activity, Stethoscope } from 'lucide-react';
import { type PatientRecord, type DecisionStatus } from '../../data/syntheticPatients';
import { decisionDefinitions } from '../../data/decisionDefinitions';
import { StatusBadge } from '../shared/StatusBadge';

interface AnalyticsDashboardProps {
  patients: PatientRecord[];
}

const statusColors: Record<DecisionStatus, string> = {
  'action-required': 'hsl(4, 70%, 44%)',
  caution: 'hsl(36, 82%, 44%)',
  proceed: 'hsl(155, 48%, 34%)',
  monitor: 'hsl(220, 20%, 52%)',
};

const decisionTypes = ['acah', 'readmission', 'icu-floor', 'sepsis', 'surgical'] as const;

export function AnalyticsDashboard({ patients }: AnalyticsDashboardProps) {
  // Summary stats
  const acahEligible = patients.filter(
    (p) => p.decisions.find((d) => d.type === 'acah')?.status === 'proceed' ||
            p.decisions.find((d) => d.type === 'acah')?.status === 'caution'
  ).length;

  const highReadmission = patients.filter(
    (p) => p.decisions.find((d) => d.type === 'readmission')?.status === 'action-required'
  ).length;

  const sepsisAlert = patients.filter(
    (p) => {
      const s = p.decisions.find((d) => d.type === 'sepsis');
      return s?.status === 'action-required' || s?.status === 'caution';
    }
  ).length;

  const surgicalHighRisk = patients.filter(
    (p) => p.decisions.find((d) => d.type === 'surgical')?.status === 'action-required'
  ).length;

  const summaryStats = [
    {
      label: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'hsl(220, 48%, 20%)',
      bg: 'hsl(220, 30%, 96%)',
    },
    {
      label: 'ACAH Eligible / Borderline',
      value: acahEligible,
      icon: Activity,
      color: 'hsl(155, 48%, 34%)',
      bg: 'hsl(155, 30%, 96%)',
    },
    {
      label: 'High Readmission Risk',
      value: highReadmission,
      icon: TrendingUp,
      color: 'hsl(4, 70%, 44%)',
      bg: 'hsl(4, 50%, 96%)',
    },
    {
      label: 'Sepsis Caution / Alert',
      value: sepsisAlert,
      icon: AlertCircle,
      color: 'hsl(36, 82%, 44%)',
      bg: 'hsl(36, 60%, 96%)',
    },
    {
      label: 'Surgical High Risk',
      value: surgicalHighRisk,
      icon: Stethoscope,
      color: 'hsl(4, 70%, 44%)',
      bg: 'hsl(4, 50%, 96%)',
    },
  ];

  // Bar chart data — status distribution per module
  const chartData = decisionTypes.map((type) => {
    const def = decisionDefinitions.find((d) => d.type === type);
    const statusCounts: Record<DecisionStatus, number> = {
      'action-required': 0,
      caution: 0,
      proceed: 0,
      monitor: 0,
    };
    patients.forEach((p) => {
      const d = p.decisions.find((dec) => dec.type === type);
      if (d) statusCounts[d.status]++;
    });
    return {
      name: def?.shortLabel ?? type,
      'Action Required': statusCounts['action-required'],
      Caution: statusCounts['caution'],
      Proceed: statusCounts['proceed'],
      Monitor: statusCounts['monitor'],
    };
  });

  return (
    <div className="p-6 max-w-5xl">
      {/* Page header */}
      <div className="mb-6">
        <p className="section-label">Population Overview</p>
        <h1 className="font-display text-xl font-bold text-foreground mt-1">
          Decision Module Analytics
        </h1>
        <p className="font-sans text-[12px] text-muted-foreground mt-1">
          Aggregated clinical decision summary across {patients.length} active patients
        </p>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-border rounded p-3 card-shadow"
          >
            <div
              className="w-7 h-7 rounded flex items-center justify-center mb-2"
              style={{ backgroundColor: stat.bg }}
            >
              <stat.icon size={14} style={{ color: stat.color }} />
            </div>
            <p
              className="font-display font-bold leading-none"
              style={{ fontSize: 22, color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="section-label mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white border border-border rounded card-shadow p-5 mb-6">
        <p className="section-label mb-3">Decision Status Distribution by Module</p>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={14} barGap={2}>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(38, 20%, 90%)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontFamily: 'DM Sans', fontSize: 11, fill: 'hsl(220, 12%, 46%)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: 'DM Sans', fontSize: 11, fill: 'hsl(220, 12%, 46%)' }}
                axisLine={false}
                tickLine={false}
                width={20}
                domain={[0, patients.length]}
                ticks={Array.from({ length: patients.length + 1 }, (_, i) => i)}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: 'DM Sans',
                  fontSize: 11,
                  border: '1px solid hsl(38, 20%, 85%)',
                  borderRadius: 4,
                  boxShadow: '0 2px 8px hsl(220 25% 12% / 0.08)',
                }}
                cursor={{ fill: 'hsl(38, 18%, 95%)' }}
              />
              <Bar dataKey="Action Required" fill={statusColors['action-required']} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Caution" fill={statusColors['caution']} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Proceed" fill={statusColors['proceed']} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Monitor" fill={statusColors['monitor']} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3">
          {([
            ['Action Required', 'action-required'],
            ['Caution', 'caution'],
            ['Proceed', 'proceed'],
            ['Monitor', 'monitor'],
          ] as [string, DecisionStatus][]).map(([label, status]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: statusColors[status] }} />
              <span className="font-sans text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Patient breakdown table */}
      <div className="bg-white border border-border rounded card-shadow overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <p className="section-label">Patient Decision Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border" style={{ backgroundColor: 'hsl(38, 18%, 98%)' }}>
                <th className="text-left px-4 py-2.5">
                  <p className="section-label">Patient</p>
                </th>
                {decisionDefinitions.map((def) => (
                  <th key={def.type} className="text-left px-3 py-2.5">
                    <p className="section-label">{def.shortLabel}</p>
                  </th>
                ))}
                <th className="text-left px-3 py-2.5">
                  <p className="section-label">Stability</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-border last:border-0 hover:bg-[hsl(38,18%,98%)] transition-colors duration-100"
                >
                  <td className="px-4 py-2.5">
                    <p className="font-display text-[12px] font-normal text-foreground">
                      {patient.name}
                    </p>
                    <p className="font-sans text-[10px] text-muted-foreground">
                      {patient.age}y &middot; {patient.primaryDiagnosis.split(' ').slice(0, 4).join(' ')}...
                    </p>
                  </td>
                  {decisionDefinitions.map((def) => {
                    const decision = patient.decisions.find((d) => d.type === def.type);
                    return (
                      <td key={def.type} className="px-3 py-2.5">
                        {decision ? (
                          <StatusBadge status={decision.status} size="sm" />
                        ) : (
                          <span className="font-sans text-[10px] text-muted-foreground">—</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-3 py-2.5">
                    <span
                      className="font-display font-bold text-[13px]"
                      style={{
                        color: patient.stabilityScore >= 80
                          ? 'hsl(155, 48%, 34%)'
                          : patient.stabilityScore >= 60
                          ? 'hsl(36, 82%, 38%)'
                          : 'hsl(4, 70%, 44%)',
                      }}
                    >
                      {patient.stabilityScore}
                    </span>
                    <span className="font-sans text-[10px] text-muted-foreground">/100</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
