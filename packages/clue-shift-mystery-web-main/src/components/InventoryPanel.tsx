
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clue } from '../types/GameTypes';

interface InventoryPanelProps {
  inventory: Clue[];
}

const InventoryPanel: React.FC<InventoryPanelProps> = ({ inventory }) => {
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);

  return (
    <Card className="bg-white border-4 border-blue-300 shadow-xl">
      <div className="p-4">
        <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
          🕵️ Detective Notebook
        </h3>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            Evidence Collected: {inventory.length}/4
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(inventory.length / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          {inventory.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">🔍</div>
              <p>No clues found yet!</p>
              <p className="text-sm">Click on glowing objects to collect evidence.</p>
            </div>
          ) : (
            inventory.map((clue) => (
              <div
                key={clue.id}
                className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 cursor-pointer hover:bg-yellow-100 transition-colors duration-200"
                onClick={() => setSelectedClue(clue)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{clue.icon}</span>
                  <div>
                    <div className="font-bold text-gray-800">{clue.name}</div>
                    <div className="text-xs text-gray-600">
                      Found at location {clue.slideFound + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedClue && (
          <div className="mt-4 bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-blue-800">{selectedClue.name}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedClue(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✕
              </Button>
            </div>
            <p className="text-sm text-gray-700">{selectedClue.description}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InventoryPanel;
