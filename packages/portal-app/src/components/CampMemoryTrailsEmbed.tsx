import React, { Suspense } from 'react';

// Lazy load the main Camp Memory Trails game page
const CampMemoryTrailsIndex = React.lazy(() => import('../../../camp-memory-trails-main (1)/src/pages/Index'));

const CampMemoryTrailsEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-xl text-green-600 font-semibold">Loading Camp Memory Trails...</p>
        </div>
      </div>
    }>
      <CampMemoryTrailsIndex />
    </Suspense>
  );
};

export default CampMemoryTrailsEmbed; 