import { useEffect } from 'react';
import { X } from 'lucide-react';
import { decisionDefinitions } from '../../data/decisionDefinitions';

interface TRL7PanelProps {
  decisionType: string | null;
  onClose: () => void;
}

export default function TRL7Panel({ decisionType, onClose }: TRL7PanelProps) {
  const def = decisionDefinitions.find(d => d.type === decisionType);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!decisionType || !def) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'hsl(220 28% 11% / 0.4)',
          zIndex: 40,
          animation: 'fadeIn 0.2s ease-out',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '400px',
          background: 'hsl(220, 40%, 14%)',
          color: 'hsl(38, 28%, 86%)',
          zIndex: 50,
          overflowY: 'auto',
          padding: '32px 28px',
          animation: 'panelIn 0.25s ease-out',
          boxShadow: '4px 0 24px hsl(220 40% 6% / 0.4)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'hsl(38, 28%, 70%)',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={18} />
        </button>

        {/* TRL badge */}
        <div style={{
          display: 'inline-block',
          background: 'hsl(36, 62%, 56%)',
          color: 'hsl(220, 40%, 12%)',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '3px 8px',
          borderRadius: '2px',
          marginBottom: '12px',
        }}>
          Technology Readiness Level 7
        </div>

        {/* Module name */}
        <h2 style={{
          fontFamily: 'Libre Baskerville, Georgia, serif',
          fontSize: '20px',
          fontWeight: 700,
          color: 'hsl(38, 60%, 90%)',
          marginBottom: '6px',
          lineHeight: 1.25,
        }}>
          {def.label}
        </h2>

        <Divider />

        {/* Framework */}
        <Section label="Validation Framework">
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'hsl(38, 20%, 76%)' }}>
            {def.frameworkDetail}
          </p>
        </Section>

        <Divider />

        {/* Operational environment */}
        <Section label="Operational Environment">
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'hsl(38, 20%, 76%)' }}>
            {def.trl7.operationalEnvironment}
          </p>
        </Section>

        <Divider />

        {/* Validation steps */}
        <Section label="Validation Evidence">
          <ol style={{ paddingLeft: '16px', margin: 0 }}>
            {def.trl7.validationSteps.map((step, i) => (
              <li key={i} style={{
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'hsl(38, 20%, 76%)',
                marginBottom: '6px',
              }}>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        <Divider />

        {/* Data requirements */}
        <Section label="Data Requirements and Integration Standards">
          <ul style={{ paddingLeft: '16px', margin: 0 }}>
            {def.trl7.dataRequirements.map((req, i) => (
              <li key={i} style={{
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'hsl(38, 20%, 76%)',
                marginBottom: '4px',
              }}>
                {req}
              </li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* References */}
        <Section label="Published References">
          {def.trl7.references.map((ref, i) => (
            <div key={i} style={{
              marginBottom: '12px',
              paddingLeft: '10px',
              borderLeft: '1px solid hsl(220, 30%, 30%)',
            }}>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'hsl(38, 40%, 78%)',
                marginBottom: '2px',
              }}>
                {ref.citation}
              </p>
              <p style={{
                fontSize: '12px',
                color: 'hsl(38, 15%, 62%)',
                lineHeight: 1.6,
              }}>
                {ref.detail}
              </p>
            </div>
          ))}
        </Section>
      </div>
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'hsl(36, 62%, 56%)',
        marginBottom: '8px',
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <hr style={{
      border: 'none',
      borderTop: '1px solid hsl(220, 30%, 22%)',
      margin: '20px 0',
    }} />
  );
}
