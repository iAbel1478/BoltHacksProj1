import React from 'react';
import GeographyGame from './GeographyGame';

// This wrapper component makes it easy to embed the geography game
// in other React applications without routing conflicts
const GeographyGameWrapper: React.FC = () => {
  return (
    <div className="w-full h-full">
      <GeographyGame />
    </div>
  );
};

export default GeographyGameWrapper; 