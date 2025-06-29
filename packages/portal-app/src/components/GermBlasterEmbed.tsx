import React, { Suspense } from 'react';

// Lazy load the main Germ Blaster Quiz Wars game page
const GermBlasterIndex = React.lazy(() => import('../../../germ-blaster-quiz-wars-main/src/pages/Index'));

const GermBlasterEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-xl text-green-600 font-semibold">Loading Germ Blaster Quiz Wars...</p>
        </div>
      </div>
    }>
      <GermBlasterIndex />
    </Suspense>
  );
};

export default GermBlasterEmbed; 