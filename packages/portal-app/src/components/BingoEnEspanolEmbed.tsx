import React, { Suspense } from 'react';

// Lazy load the main Bingo en Español Amigos game page
const BingoEnEspanolIndex = React.lazy(() => import('../../../bingo-en-espanol-amigos-main (1)/src/pages/Index'));

const BingoEnEspanolEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-red-600 font-semibold">Loading Bingo en Español...</p>
        </div>
      </div>
    }>
      <BingoEnEspanolIndex />
    </Suspense>
  );
};

export default BingoEnEspanolEmbed; 