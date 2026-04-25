'use client';

import { useState } from 'react';
import { StartSection } from '@/components/pages/casamento';
import CasamentoSection from '@/components/pages/casamento/CasamentoSection';

export default function CasamentoPage() {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div className="w-full min-h-screen">
      {!hasStarted ? (
        <StartSection onStart={handleStart} />
      ) : (
        <CasamentoSection />
      )}
    </div>
  );
}
