import React, { Suspense } from 'react';

// Lazy load the geography game component to avoid bundling issues
const GeographyGameWrapper = React.lazy(() => import('../../../world-click-explorer/src/components/GeographyGame/GeographyGameWrapper'));

const GeographyGameEmbed: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            🌍 World Click Explorer 🌍
          </h1>
          <p className="text-xl text-blue-600">
            Click on countries to learn about their capitals and geography!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl border-4 border-blue-300 overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default GeographyGameEmbed; 