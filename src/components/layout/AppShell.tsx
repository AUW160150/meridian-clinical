import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { PatientList } from '../patients/PatientList';
import { PatientDetail } from '../patients/PatientDetail';
import { AnalyticsDashboard } from '../analytics/AnalyticsDashboard';
import { syntheticPatients, type PatientRecord } from '../../data/syntheticPatients';

type ActiveView = 'patients' | 'analytics' | 'settings';

interface AppShellProps {
  defaultView?: 'analytics' | 'patients';
}

export function AppShell({ defaultView = 'patients' }: AppShellProps) {
  const [activeView, setActiveView] = useState<ActiveView>(defaultView);
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(
    syntheticPatients[0] ?? null
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {activeView === 'patients' && (
          <>
            <PatientList
              patients={syntheticPatients}
              selectedId={selectedPatient?.id ?? null}
              onSelect={setSelectedPatient}
            />
            <main className="flex-1 overflow-hidden bg-background">
              {selectedPatient ? (
                <PatientDetail patient={selectedPatient} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="font-sans text-sm text-muted-foreground">
                    Select a patient to view details
                  </p>
                </div>
              )}
            </main>
          </>
        )}

        {activeView === 'analytics' && (
          <main className="flex-1 overflow-auto bg-background">
            <AnalyticsDashboard patients={syntheticPatients} />
          </main>
        )}

        {activeView === 'settings' && (
          <main className="flex-1 overflow-auto bg-background flex items-center justify-center">
            <div className="text-center">
              <h2 className="font-display text-xl text-foreground mb-2">Settings</h2>
              <p className="font-sans text-sm text-muted-foreground">
                Configuration options available in the full deployment.
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
