import { useState } from 'react';
import { Search } from 'lucide-react';
import { type PatientRecord } from '../../data/syntheticPatients';
import { StatusDot } from '../shared/StatusBadge';

interface PatientListProps {
  patients: PatientRecord[];
  selectedId: string | null;
  onSelect: (patient: PatientRecord) => void;
}

// Reference date matches clinical note dates in synthetic data
const REFERENCE_DATE = new Date('2024-11-29');

function daysInHospital(admissionDate: string): number {
  const admission = new Date(admissionDate);
  return Math.max(1, Math.ceil(
    (REFERENCE_DATE.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24)
  ));
}

function stabilityColor(score: number): string {
  if (score >= 80) return 'hsl(155, 48%, 34%)';
  if (score >= 60) return 'hsl(36, 82%, 44%)';
  return 'hsl(4, 70%, 44%)';
}

const decisionTypeLabels: Record<string, string> = {
  acah: 'ACAH',
  readmission: 'Readmission',
  'icu-floor': 'ICU/Floor',
  sepsis: 'Sepsis',
  surgical: 'Surgical',
};

export function PatientList({ patients, selectedId, onSelect }: PatientListProps) {
  const [query, setQuery] = useState('');

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.mrn.toLowerCase().includes(query.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="flex flex-col shrink-0 border-r border-border bg-white overflow-hidden"
      style={{ width: 290 }}
    >
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search patients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-[13px] font-sans bg-background border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-150"
          />
        </div>
        <p className="section-label mt-2">
          {filtered.length} patient{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((patient) => {
          const isSelected = patient.id === selectedId;
          const days = daysInHospital(patient.admissionDate);
          const stabColor = stabilityColor(patient.stabilityScore);

          return (
            <button
              key={patient.id}
              onClick={() => onSelect(patient)}
              className="w-full text-left border-b border-border transition-all duration-150 relative overflow-hidden"
              style={{
                backgroundColor: isSelected ? 'hsl(36, 62%, 97%)' : 'transparent',
                borderLeftWidth: isSelected ? 3 : 0,
                borderLeftStyle: 'solid',
                borderLeftColor: isSelected ? 'hsl(36, 62%, 46%)' : 'transparent',
                paddingLeft: isSelected ? 9 : 12,
                paddingRight: 12,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'hsl(220, 18%, 97%)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Name row + Day pill */}
              <div className="flex items-center justify-between gap-2">
                <p
                  className="font-display font-normal leading-snug truncate"
                  style={{ fontSize: 14, color: 'hsl(220, 28%, 11%)' }}
                >
                  {patient.name}
                </p>
                <span
                  className="shrink-0 font-sans font-semibold rounded-sm"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    padding: '2px 6px',
                    backgroundColor: isSelected ? 'hsl(220, 48%, 20%)' : 'hsl(220, 18%, 93%)',
                    color: isSelected ? 'hsl(36, 62%, 66%)' : 'hsl(220, 20%, 44%)',
                  }}
                >
                  Day {days}
                </span>
              </div>

              {/* MRN + Age */}
              <p className="font-sans text-[12px] text-muted-foreground mt-0.5 truncate">
                {patient.mrn} &middot; {patient.age}y {patient.sex}
              </p>

              {/* Diagnosis */}
              <p
                className="font-sans text-[12px] mt-0.5 leading-snug"
                style={{ color: 'hsl(220, 14%, 46%)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}
              >
                {patient.primaryDiagnosis}
              </p>

              {/* Decision dots + stability */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  {patient.decisions.map((d) => (
                    <StatusDot
                      key={d.type}
                      status={d.status}
                      label={decisionTypeLabels[d.type] ?? d.type}
                    />
                  ))}
                </div>
                <span
                  className="font-sans font-semibold"
                  style={{ fontSize: 11, color: stabColor }}
                >
                  {patient.stabilityScore}
                </span>
              </div>

              {/* Stability bar */}
              <div
                className="mt-1.5 rounded-full overflow-hidden"
                style={{ height: 2, backgroundColor: 'hsl(38, 20%, 88%)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${patient.stabilityScore}%`,
                    backgroundColor: stabColor,
                  }}
                />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="px-3 py-8 text-center">
            <p className="font-sans text-[13px] text-muted-foreground">No patients match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
