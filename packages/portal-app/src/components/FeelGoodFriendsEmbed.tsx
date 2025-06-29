import React, { Suspense } from 'react';

// Lazy load the main Feel Good Friends game page
const FeelGoodFriendsIndex = React.lazy(() => import('../../../feel-good-friends-match-main/src/pages/Index'));

const FeelGoodFriendsEmbed: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-xl text-pink-400 font-semibold">Loading Feel Good Friends...</p>
        </div>
      </div>
    }>
      <FeelGoodFriendsIndex />
    </Suspense>
  );
};

export default FeelGoodFriendsEmbed; 