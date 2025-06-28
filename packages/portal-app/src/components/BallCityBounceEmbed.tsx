import React, { Suspense } from 'react';

// Lazy load the main Ball City Bounce game page
const BallCityBounceIndex = React.lazy(() => import('../../../ball-city-bounce-main/src/pages/Index'));

const BallCityBounceEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-indigo-600 font-semibold">Loading Ball City Bounce...</p>
        </div>
      </div>
    }>
      <BallCityBounceIndex />
    </Suspense>
  );
};

export default BallCityBounceEmbed; 