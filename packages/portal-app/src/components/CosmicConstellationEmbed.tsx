import React, { Suspense } from 'react';

// Lazy load the main Cosmic Constellation Cruiser game page
const CosmicConstellationIndex = React.lazy(() => import('../../../cosmic-constellation-cruiser-main/cosmic-constellation-cruiser-main/src/pages/Index'));

const CosmicConstellationEmbed: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl text-indigo-600 font-semibold">Loading Cosmic Constellation Cruiser...</p>
          </div>
        </div>
      }>
        <div className="w-full h-full overflow-hidden">
          <CosmicConstellationIndex />
        </div>
      </Suspense>
    </div>
  );
};

export default CosmicConstellationEmbed; 