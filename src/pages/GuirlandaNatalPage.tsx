import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const GuirlandaNatalPage = () => {
  useEffect(() => {
    // Redirecionamento imediato
    window.location.href = 'https://pay.hotmart.com/Q102551881P?checkoutMode=10&bid=1761516386914';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Helmet>
        <title>Guirlanda de Natal - Duda Berger</title>
        <meta name="description" content="Aprenda a criar lindas guirlandas de Natal com Duda Berger" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="text-center">
        {/* Spinner minimalista */}
        <div className="w-8 h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    </div>
  );
};

export default GuirlandaNatalPage;