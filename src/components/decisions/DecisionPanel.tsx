import { useState } from 'react';
import { type PatientRecord } from '../../data/syntheticPatients';
import { decisionDefinitions } from '../../data/decisionDefinitions';
import { DecisionCard } from './DecisionCard';
import TRL7Panel from './TRL7Panel';

interface DecisionPanelProps {
  patient: PatientRecord;
}

export function DecisionPanel({ patient }: DecisionPanelProps) {
  const [trl7Open, setTrl7Open] = useState<string | null>(null);

  const getDefinition = (type: string) =>
    decisionDefinitions.find((d) => d.type === type);

  const acah = patient.decisions.find((d) => d.type === 'acah');
  const readmission = patient.decisions.find((d) => d.type === 'readmission');
  const icuFloor = patient.decisions.find((d) => d.type === 'icu-floor');
  const sepsis = patient.decisions.find((d) => d.type === 'sepsis');
  const surgical = patient.decisions.find((d) => d.type === 'surgical');

  return (
    <>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="section-label">Clinical Decision Support</p>
            <h2 className="font-display text-base font-bold text-foreground mt-0.5">
              Decision Modules — {patient.name}
            </h2>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded border"
            style={{ backgroundColor: 'hsl(38, 18%, 97%)', borderColor: 'hsl(38, 20%, 85%)' }}
          >
            <span className="section-label">Stability Score</span>
            <span
              className="font-display font-bold text-sm"
              style={{
                color: patient.stabilityScore >= 80
                  ? 'hsl(155, 48%, 34%)'
                  : patient.stabilityScore >= 60
                  ? 'hsl(36, 82%, 38%)'
                  : 'hsl(4, 70%, 44%)',
              }}
            >
              {patient.stabilityScore}/100
            </span>
          </div>
        </div>

        {/* Top row: ACAH + Readmission */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {acah && getDefinition('acah') && (
            <DecisionCard
              decision={acah}
              definition={getDefinition('acah')!}
              onTRL7Click={(type) => setTrl7Open(type)}
            />
          )}
          {readmission && getDefinition('readmission') && (
            <DecisionCard
              decision={readmission}
              definition={getDefinition('readmission')!}
              onTRL7Click={(type) => setTrl7Open(type)}
            />
          )}
        </div>

        {/* Second row: ICU/Floor + Sepsis */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {icuFloor && getDefinition('icu-floor') && (
            <DecisionCard
              decision={icuFloor}
              definition={getDefinition('icu-floor')!}
              onTRL7Click={(type) => setTrl7Open(type)}
            />
          )}
          {sepsis && getDefinition('sepsis') && (
            <DecisionCard
              decision={sepsis}
              definition={getDefinition('sepsis')!}
              onTRL7Click={(type) => setTrl7Open(type)}
            />
          )}
        </div>

        {/* Full width: Surgical */}
        {surgical && getDefinition('surgical') && (
          <DecisionCard
            decision={surgical}
            definition={getDefinition('surgical')!}
            fullWidth
            onTRL7Click={(type) => setTrl7Open(type)}
          />
        )}
      </div>

      {/* TRL7 Panel — rendered outside the card grid so it overlays the full viewport */}
      <TRL7Panel
        decisionType={trl7Open}
        onClose={() => setTrl7Open(null)}
      />
    </>
  );
}
