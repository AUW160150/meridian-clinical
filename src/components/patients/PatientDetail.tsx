import * as Tabs from '@radix-ui/react-tabs';
import { type PatientRecord } from '../../data/syntheticPatients';
import { ClinicalNote } from './ClinicalNote';
import { DecisionPanel } from '../decisions/DecisionPanel';

interface PatientDetailProps {
  patient: PatientRecord;
}

const REFERENCE_DATE = new Date('2024-11-29');

function daysInHospital(admissionDate: string): number {
  const admission = new Date(admissionDate);
  return Math.max(1, Math.ceil(
    (REFERENCE_DATE.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24)
  ));
}

const vitalsConfig = [
  {
    key: 'bloodPressure' as const,
    label: 'Blood Pressure',
    unit: 'mmHg',
    isOutOfRange: (v: string) => {
      const sys = parseInt(v.split('/')[0] ?? '0');
      return sys < 90 || sys > 160;
    },
  },
  {
    key: 'heartRate' as const,
    label: 'Heart Rate',
    unit: 'bpm',
    isOutOfRange: (v: number) => v < 50 || v > 100,
  },
  {
    key: 'respiratoryRate' as const,
    label: 'Resp. Rate',
    unit: '/min',
    isOutOfRange: (v: number) => v < 12 || v > 20,
  },
  {
    key: 'temperature' as const,
    label: 'Temperature',
    unit: '°C',
    isOutOfRange: (v: number) => v < 36.1 || v > 38.0,
  },
  {
    key: 'oxygenSaturation' as const,
    label: 'SpO2',
    unit: '%',
    isOutOfRange: (v: number) => v < 95,
  },
  {
    key: 'painLevel' as const,
    label: 'Pain',
    unit: '/10',
    isOutOfRange: (v: number) => v >= 7,
  },
];

const severityBadge: Record<string, string> = {
  mild: 'bg-[hsl(155,30%,93%)] text-[hsl(155,48%,28%)] border border-[hsl(155,30%,80%)]',
  moderate: 'bg-[hsl(36,82%,94%)] text-[hsl(36,82%,28%)] border border-[hsl(36,82%,76%)]',
  severe: 'bg-[hsl(4,70%,95%)] text-[hsl(4,70%,36%)] border border-[hsl(4,70%,80%)]',
  resolved: 'bg-[hsl(220,12%,93%)] text-[hsl(220,12%,44%)] border border-[hsl(220,12%,80%)]',
};

const medicationStatusBadge: Record<string, string> = {
  active: 'bg-[hsl(155,30%,93%)] text-[hsl(155,48%,28%)] border border-[hsl(155,30%,80%)]',
  discontinued: 'bg-[hsl(220,12%,93%)] text-[hsl(220,12%,44%)] border border-[hsl(220,12%,80%)]',
  prn: 'bg-[hsl(36,82%,94%)] text-[hsl(36,82%,28%)] border border-[hsl(36,82%,76%)]',
};

export function PatientDetail({ patient }: PatientDetailProps) {
  const days = daysInHospital(patient.admissionDate);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Demographics bar */}
      <div className="shrink-0 bg-white border-b border-border px-5 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-bold text-foreground leading-tight">
                {patient.name}
              </h2>
              <span
                className="font-sans font-semibold rounded-sm shrink-0"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  padding: '2px 8px',
                  backgroundColor: 'hsl(220, 48%, 20%)',
                  color: 'hsl(36, 62%, 66%)',
                }}
              >
                Day {days}
              </span>
            </div>
            <p className="font-sans text-[13px] text-muted-foreground mt-0.5">
              {patient.mrn} &middot; {patient.age} years &middot; {patient.sex}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="section-label">Attending</p>
            <p className="font-sans text-[13px] text-foreground">{patient.attendingPhysician}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 mt-2.5">
          <div>
            <p className="section-label">Room</p>
            <p className="font-sans text-[13px] text-foreground">{patient.room}</p>
          </div>
          <div>
            <p className="section-label">Admitted</p>
            <p className="font-sans text-[13px] text-foreground">
              {new Date(patient.admissionDate).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="section-label">Primary Diagnosis</p>
            <p className="font-sans text-[13px] text-foreground">{patient.primaryDiagnosis}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultValue="overview" className="flex flex-col flex-1 overflow-hidden">
        <Tabs.List className="flex shrink-0 bg-white border-b border-border px-5 gap-0">
          {(['overview', 'decisions'] as const).map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className="relative px-4 py-2.5 font-sans text-[13px] font-medium text-muted-foreground capitalize
                transition-all duration-150 border-b-2 border-transparent -mb-px
                data-[state=active]:text-primary data-[state=active]:border-primary
                hover:text-foreground"
            >
              {tab === 'overview' ? 'Clinical Overview' : 'Clinical Decisions'}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="overview" className="flex-1 overflow-auto p-5">
          <div className="max-w-4xl space-y-6">

            {/* Vitals */}
            <section>
              <p className="section-label mb-2">Vital Signs</p>
              <div className="grid grid-cols-6 gap-2">
                {vitalsConfig.map(({ key, label, unit, isOutOfRange }) => {
                  const value = patient.vitals[key];
                  if (value === undefined || value === null) return null;
                  const outOfRange = isOutOfRange(value as never);
                  return (
                    <div
                      key={key}
                      className="bg-white border border-border rounded p-3 transition-all duration-150 cursor-default"
                      style={{
                        borderColor: outOfRange ? 'hsl(36, 82%, 70%)' : undefined,
                        boxShadow: '0 1px 0 0 hsl(38 30% 80%), 0 2px 8px -2px hsl(220 25% 12% / 0.06)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 0 0 hsl(38 30% 80%), 0 8px 20px -4px hsl(220 25% 12% / 0.16)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.backgroundColor = 'hsl(38, 30%, 99%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 0 0 hsl(38 30% 80%), 0 2px 8px -2px hsl(220 25% 12% / 0.06)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <p className="section-label mb-1">{label}</p>
                      <p
                        className="font-display font-bold leading-none"
                        style={{
                          fontSize: 15,
                          color: outOfRange ? 'hsl(36, 82%, 38%)' : 'hsl(220, 28%, 11%)',
                        }}
                      >
                        {value}
                        <span className="font-sans font-normal text-[11px] text-muted-foreground ml-0.5">
                          {unit}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Medications */}
            <section>
              <p className="section-label mb-2">Current Medications ({patient.medications.length})</p>
              <div
                className="bg-white border border-border rounded divide-y divide-border"
                style={{ boxShadow: '0 1px 0 0 hsl(38 30% 80%), 0 2px 8px -2px hsl(220 25% 12% / 0.06)' }}
              >
                {patient.medications.map((med, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 transition-colors duration-100"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(220, 25%, 95%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-sans font-semibold text-[13px] text-foreground">{med.name}</span>
                      <span className="font-sans text-[13px] text-muted-foreground ml-2">
                        {med.dose} {med.route} — {med.frequency}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm font-sans uppercase tracking-wide ${medicationStatusBadge[med.status]}`}
                    >
                      {med.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Findings */}
            <section>
              <p className="section-label mb-2">Clinical Findings</p>
              <div
                className="bg-white border border-border rounded divide-y divide-border"
                style={{ boxShadow: '0 1px 0 0 hsl(38 30% 80%), 0 2px 8px -2px hsl(220 25% 12% / 0.06)' }}
              >
                {patient.clinicalFindings.map((finding, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between px-4 py-3 gap-4 transition-colors duration-100"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(220, 25%, 95%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="section-label mb-0.5">{finding.category}</p>
                      <p className="font-sans text-[13px] text-foreground leading-snug">{finding.finding}</p>
                      <p className="font-sans text-[12px] text-muted-foreground mt-0.5">{finding.date}</p>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm font-sans uppercase tracking-wide shrink-0 ${severityBadge[finding.severity]}`}
                    >
                      {finding.severity}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Note */}
            <section>
              <ClinicalNote note={patient.rawNote} />
            </section>
          </div>
        </Tabs.Content>

        <Tabs.Content value="decisions" className="flex-1 overflow-auto p-5">
          <DecisionPanel patient={patient} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
