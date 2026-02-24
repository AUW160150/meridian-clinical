import { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { type ClinicalDecision } from '../../data/syntheticPatients';
import { type DecisionDefinition } from '../../data/decisionDefinitions';
import { StatusBadge } from '../shared/StatusBadge';

interface AIExplanationModalProps {
  decision: ClinicalDecision;
  definition: DecisionDefinition;
  open: boolean;
  onClose: () => void;
}

export function AIExplanationModal({
  decision,
  definition,
  open,
  onClose,
}: AIExplanationModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const paragraphs = definition.aiExplanationTemplate.split('\n\n').filter(Boolean);

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-xl overflow-hidden flex flex-col"
          style={{
            width: '100%',
            maxWidth: 600,
            maxHeight: '85vh',
            boxShadow: '0 8px 40px hsl(220 25% 8% / 0.3)',
          }}
        >
          {/* Header */}
          <div className="shrink-0 px-6 pt-5 pb-4 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="section-label">Clinical Validation Rationale</p>
                <Dialog.Title asChild>
                  <h2
                    className="font-display font-bold leading-tight mt-1"
                    style={{ fontSize: 17 }}
                  >
                    {definition.label}
                  </h2>
                </Dialog.Title>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={decision.status} />
                  <span className="font-sans text-[11px] text-muted-foreground">
                    {definition.framework}
                  </span>
                </div>
              </div>
              <Dialog.Close asChild>
                <button
                  onClick={onClose}
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors duration-150 shrink-0"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

            {/* Recommendation highlight */}
            <div
              className="rounded p-3 border-l-[3px]"
              style={{
                backgroundColor: 'hsl(38, 18%, 97%)',
                borderLeftColor: 'hsl(220, 48%, 20%)',
              }}
            >
              <p className="section-label mb-1">Active Recommendation</p>
              <p className="font-display font-normal italic text-foreground leading-snug" style={{ fontSize: 13 }}>
                {decision.recommendation}
              </p>
            </div>

            {/* AI reasoning */}
            <div>
              <p className="section-label mb-2">Clinical Reasoning</p>
              <p
                className="font-sans text-[12px] leading-relaxed text-foreground"
                style={{ color: 'hsl(220, 20%, 25%)' }}
              >
                {decision.reasoning}
              </p>
            </div>

            {/* Framework explanation */}
            <div>
              <p className="section-label mb-2">Framework & Evidence</p>
              <div className="space-y-3">
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-[12px] leading-relaxed"
                    style={{ color: 'hsl(220, 14%, 28%)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Criteria that drove the decision */}
            <div>
              <p className="section-label mb-2">Criteria Assessment</p>
              <div className="bg-background border border-border rounded divide-y divide-border">
                {decision.criteria.map((criterion, i) => (
                  <div key={i} className="flex items-start gap-2.5 px-3 py-2">
                    <div
                      className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: criterion.met
                          ? 'hsl(155, 48%, 34%)'
                          : 'hsl(4, 70%, 44%)',
                      }}
                    >
                      <span className="text-white font-bold" style={{ fontSize: 9 }}>
                        {criterion.met ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans font-medium text-[12px] text-foreground">
                          {criterion.name}
                        </span>
                        {criterion.value && (
                          <span className="font-sans text-[11px] text-muted-foreground">
                            {criterion.value}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        {criterion.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence base */}
            <div>
              <p className="section-label mb-2">Evidence Base</p>
              <div className="space-y-2">
                {definition.trl7.references.map((ref, i) => (
                  <div
                    key={i}
                    className="rounded p-2.5"
                    style={{ backgroundColor: 'hsl(220, 18%, 97%)', border: '1px solid hsl(38, 20%, 88%)' }}
                  >
                    <p className="font-sans font-medium text-[11px] text-foreground leading-snug">
                      {ref.citation}
                    </p>
                    <p className="font-sans text-[11px] text-muted-foreground mt-1 leading-snug">
                      {ref.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="shrink-0 px-6 py-3 border-t border-border"
            style={{ backgroundColor: 'hsl(38, 18%, 97%)' }}
          >
            <p className="font-sans text-[10px] leading-relaxed" style={{ color: 'hsl(220, 12%, 50%)' }}>
              This recommendation is generated by structured rule-based extraction validated against published clinical criteria. It is intended to support, not replace, clinical judgement. The responsible clinician retains full authority over all clinical decisions.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
