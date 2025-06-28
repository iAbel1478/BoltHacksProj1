
interface InventoryProps {
  gear: any[];
  sidekicks: any[];
  equippedGear: any[];
  equippedSidekicks: any[];
  onEquipGear?: (item: any) => void;
  onUnequipGear?: (item: any) => void;
  onEquipSidekick?: (item: any) => void;
  onUnequipSidekick?: (item: any) => void;
}

export const Inventory = ({ 
  gear, 
  sidekicks, 
  equippedGear = [], 
  equippedSidekicks = [],
  onEquipGear,
  onUnequipGear,
  onEquipSidekick,
  onUnequipSidekick
}: InventoryProps) => {
  const isGearEquipped = (item: any) => equippedGear.some(g => g.name === item.name);
  const isSidekickEquipped = (item: any) => equippedSidekicks.some(s => s.name === item.name);

  const handleGearClick = (item: any) => {
    if (isGearEquipped(item)) {
      onUnequipGear?.(item);
    } else {
      onEquipGear?.(item);
    }
  };

  const handleSidekickClick = (item: any) => {
    if (isSidekickEquipped(item)) {
      onUnequipSidekick?.(item);
    } else {
      onEquipSidekick?.(item);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-2xl p-4 border-2 border-green-400/30 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
        🎒 Inventory
      </h3>
      
      {/* Gear Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-green-300 mb-2">⚔️ Gear</h4>
        <div className="space-y-1">
          {gear.length === 0 ? (
            <div className="text-gray-400 text-xs text-center py-2">
              No gear yet
            </div>
          ) : (
            gear.map((item, index) => (
              <button
                key={index}
                onClick={() => handleGearClick(item)}
                className={`w-full px-2 py-1 text-left rounded text-xs border transition-all ${
                  isGearEquipped(item)
                    ? 'bg-green-500/30 border-green-400 text-green-100'
                    : 'bg-black/20 border-gray-600 text-white hover:bg-black/40'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{item.emoji}</span>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                    {item.name}
                  </span>
                  {isGearEquipped(item) && <span className="text-green-400">✓</span>}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Sidekicks Section */}
      <div>
        <h4 className="text-sm font-semibold text-blue-300 mb-2">👥 Sidekicks</h4>
        <div className="space-y-1">
          {sidekicks.length === 0 ? (
            <div className="text-gray-400 text-xs text-center py-2">
              No sidekicks yet
            </div>
          ) : (
            sidekicks.map((sidekick, index) => (
              <button
                key={index}
                onClick={() => handleSidekickClick(sidekick)}
                className={`w-full px-2 py-1 text-left rounded text-xs border transition-all ${
                  isSidekickEquipped(sidekick)
                    ? 'bg-blue-500/30 border-blue-400 text-blue-100'
                    : 'bg-black/20 border-gray-600 text-white hover:bg-black/40'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{sidekick.emoji}</span>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                    {sidekick.name}
                  </span>
                  {isSidekickEquipped(sidekick) && <span className="text-blue-400">✓</span>}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
