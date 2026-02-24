import { AppShell } from '../components/layout/AppShell';

interface IndexProps {
  defaultView?: 'analytics' | 'patients';
}

export default function Index({ defaultView }: IndexProps) {
  return <AppShell defaultView={defaultView} />;
}
