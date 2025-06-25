import React, { Suspense } from 'react';

// Lazy load the geography game component to avoid bundling issues
const GeographyGameWrapper = React.lazy(() => import('../../../world-click-explorer/src/components/GeographyGame/GeographyGameWrapper'));

const GeographyGameEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-blue-600 font-semibold">Loading World Explorer...</p>
        </div>
      </div>
    }>
      <GeographyGameWrapper />
    </Suspense>
  );
};

export default GeographyGameEmbed; 