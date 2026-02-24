interface ClinicalNoteProps {
  note: string;
}

export function ClinicalNote({ note }: ClinicalNoteProps) {
  return (
    <div>
      <p className="section-label mb-2">Raw Clinical Note</p>
      <div
        className="bg-[hsl(220,18%,8%)] rounded border border-[hsl(220,18%,20%)] overflow-auto"
        style={{ maxHeight: 320 }}
      >
        <pre
          className="font-mono text-[12px] leading-relaxed p-4 whitespace-pre-wrap"
          style={{ color: 'hsl(38, 28%, 78%)' }}
        >
          {note}
        </pre>
      </div>
    </div>
  );
}
