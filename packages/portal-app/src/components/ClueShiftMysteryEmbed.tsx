import React, { Suspense } from 'react';

// Lazy load the main Clue Shift Mystery Web game page
const ClueShiftMysteryIndex = React.lazy(() => import('../../../clue-shift-mystery-web-main/src/pages/Index'));

const ClueShiftMysteryEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-xl text-yellow-600 font-semibold">Loading Clue Shift Mystery...</p>
        </div>
      </div>
    }>
      <ClueShiftMysteryIndex />
    </Suspense>
  );
};

export default ClueShiftMysteryEmbed; 