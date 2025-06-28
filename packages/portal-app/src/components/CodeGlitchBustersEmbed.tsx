import React, { Suspense } from 'react';

// Lazy load the main Code Glitch Busters game page
const CodeGlitchBustersIndex = React.lazy(() => import('../../../code-glitch-busters-main (1)/src/pages/Index'));

const CodeGlitchBustersEmbed: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl text-indigo-600 font-semibold">Loading Code Glitch Busters...</p>
          </div>
        </div>
      }>
        <div className="w-full h-full overflow-hidden">
          <CodeGlitchBustersIndex />
        </div>
      </Suspense>
    </div>
  );
};

export default CodeGlitchBustersEmbed; 