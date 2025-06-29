import React, { Suspense } from 'react';

// Lazy load the main LFC Bible Kids Quest game page
const LfcBibleKidsQuestIndex = React.lazy(() => import('../../../lfc-bible-kids-quest-main/src/pages/Index'));

const LfcBibleKidsQuestEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-700 mx-auto mb-4"></div>
          <p className="text-xl text-yellow-700 font-semibold">Loading LFC Bible Kids Quest...</p>
        </div>
      </div>
    }>
      <LfcBibleKidsQuestIndex />
    </Suspense>
  );
};

export default LfcBibleKidsQuestEmbed; 