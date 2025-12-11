'use client';

import { useEffect } from 'react';

export default function GuirlandaNatalPage() {
  useEffect(() => {
    // Delay de 100ms para dar tempo do Pixel da Meta ser acionado
    const timer = setTimeout(() => {
      window.location.href = 'https://pay.hotmart.com/Q102551881P?checkoutMode=10&bid=1761516386914';
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Spinner minimalista */}
        <div className="w-8 h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    </div>
  );
}
