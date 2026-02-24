import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { type ClinicalDecision } from '../../data/syntheticPatients';
import { type DecisionDefinition } from '../../data/decisionDefinitions';
import { StatusBadge } from '../shared/StatusBadge';
import { ScoreRing } from '../shared/ScoreRing';
import { AIExplanationModal } from './AIExplanationModal';

interface DecisionCardProps {
  decision: ClinicalDecision;
  definition: DecisionDefinition;
  fullWidth?: boolean;
  onTRL7Click: (type: string) => void;
}

const statusBorderColor: Record<string, string> = {
  'action-required': 'hsl(4, 70%, 44%)',
  caution: 'hsl(36, 82%, 44%)',
  proceed: 'hsl(155, 48%, 34%)',
  monitor: 'hsl(220, 20%, 52%)',
};

const scoreRingColor: Record<string, string> = {
  'action-required': 'hsl(4, 70%, 44%)',
  caution: 'hsl(36, 82%, 44%)',
  proceed: 'hsl(155, 48%, 34%)',
  monitor: 'hsl(220, 20%, 52%)',
};

const CARD_SHADOW = '0 1px 0 0 hsl(38 30% 80%), 0 2px 8px -2px hsl(220 25% 12% / 0.06)';
const CARD_SHADOW_HOVER = '0 1px 0 0 hsl(38 30% 80%), 0 6px 16px -2px hsl(220 25% 12% / 0.12)';

export function DecisionCard({ decision, definition, fullWidth = false, onTRL7Click }: DecisionCardProps) {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const borderColor = statusBorderColor[decision.status];
  const ringColor = scoreRingColor[decision.status];

  return (
    <>
      <div
        className="bg-white rounded flex flex-col border border-border transition-all duration-150"
        style={{ borderLeft: `3px solid ${borderColor}`, boxShadow: CARD_SHADOW }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = CARD_SHADOW_HOVER;
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = CARD_SHADOW;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Card header */}
        <div className="px-4 pt-3.5 pb-3 border-b border-border flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="section-label">{definition.shortLabel}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <h3 className="font-sans font-medium text-[14px] text-foreground leading-snug">
                {definition.framework}
              </h3>
              <StatusBadge status={decision.status} size="sm" />
            </div>
          </div>
          {decision.score !== undefined && decision.scoreMax !== undefined && (
            <div className="shrink-0">
              <ScoreRing
                score={decision.score}
                max={decision.scoreMax}
                label={decision.scoreLabel ?? 'Score'}
                size={58}
                color={ringColor}
              />
            </div>
          )}
        </div>

        {/* Recommendation */}
        <div className="px-4 py-3 border-b border-border">
          <p
            className="font-display font-normal italic leading-snug"
            style={{ fontSize: 13, color: 'hsl(220, 28%, 18%)' }}
          >
            {decision.recommendation}
          </p>
        </div>

        {/* Confidence */}
        <div className="px-4 py-2.5 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <p className="section-label">Confidence</p>
            <span className="font-sans text-[12px] font-medium text-foreground">
              {decision.confidence}%
            </span>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${decision.confidence}%`,
                backgroundColor: borderColor,
              }}
            />
          </div>
        </div>

        {/* Criteria */}
        <div className={`px-4 py-3 flex-1 ${fullWidth ? 'grid grid-cols-2 gap-x-4' : ''}`}>
          <p className={`section-label mb-2 ${fullWidth ? 'col-span-2' : ''}`}>
            Decision Criteria
          </p>
          {decision.criteria.map((criterion, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              {criterion.met ? (
                <CheckCircle2
                  size={13}
                  className="shrink-0 mt-0.5"
                  style={{ color: 'hsl(155, 48%, 34%)' }}
                />
              ) : (
                <XCircle
                  size={13}
                  className="shrink-0 mt-0.5"
                  style={{ color: 'hsl(4, 70%, 44%)' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-sans font-medium text-[12px] text-foreground leading-tight">
                    {criterion.name}
                  </span>
                  {criterion.value && (
                    <span
                      className="font-sans text-[11px]"
                      style={{ color: 'hsl(220, 12%, 50%)' }}
                    >
                      {criterion.value}
                    </span>
                  )}
                </div>
                <p className="font-sans text-[11px] leading-snug mt-0.5" style={{ color: 'hsl(220, 12%, 50%)' }}>
                  {criterion.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer — always visible */}
        <div
          className="px-4 py-2.5 border-t border-border flex items-center gap-2"
          style={{ backgroundColor: 'hsl(38, 18%, 98%)' }}
        >
          <button
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 font-sans font-medium text-foreground border border-border rounded bg-white hover:bg-background hover:border-primary transition-all duration-150"
            style={{ fontSize: '12px', padding: '5px 10px' }}
          >
            <HelpCircle size={12} />
            Why this recommendation
          </button>

          <button
            onClick={() => onTRL7Click(decision.type)}
            style={{
              background: 'hsl(220, 48%, 20%)',
              color: 'hsl(36, 62%, 70%)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'hsl(220, 48%, 26%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'hsl(220, 48%, 20%)';
            }}
          >
            TRL 7
          </button>
        </div>
      </div>

      {/* AI Explanation Modal */}
      <AIExplanationModal
        decision={decision}
        definition={definition}
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </>
  );
}
