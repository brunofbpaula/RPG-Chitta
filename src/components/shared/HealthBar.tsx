interface Props {
  maxHealth: number;
  currentHealth: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseMax: () => void;
  onDecreaseMax: () => void;
}

export default function HealthBar({
  currentHealth,
  maxHealth,
  onIncrease,
  onDecrease,
  onIncreaseMax,
  onDecreaseMax
}: Props) {
  const percentage = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));
  const isDown = currentHealth <= 0;

  return (
    <div className="flex flex-col items-center gap-1 mb-2">

      <div className="flex gap-10">

        {/* HP buttons */}
        <div className="flex items-center gap-1">
          <button className="px-2 py-0.15 bg-red-800 text-white text-xs rounded" onClick={onDecrease}>-</button>
          <span className="text-white text-xs">ATUAL</span>
          <button className="px-2 py-0.15 bg-red-800 text-white text-xs rounded" onClick={onIncrease}>+</button>
        </div>

        {/* MAX buttons */}
        <div className="flex items-center gap-1">
          <button className="px-2 py-0.15 bg-red-800 text-white text-xs rounded" onClick={onDecreaseMax}>-</button>
          <span className="text-white text-xs">MÁX</span>
          <button className="px-2 py-0.15 bg-red-800 text-white text-xs rounded" onClick={onIncreaseMax}>+</button>
        </div>

      </div>

      {/* Health Bar */}
      <div className="relative h-4 w-60 bg-white rounded-md text-center text-black text-sm">
        <div 
          className="h-4 bg-red-500 rounded-md transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center z-10 font-medium">
          {isDown ? "CAÍDO" : `VIDA ${currentHealth}/${maxHealth}`}
        </div>
      </div>

    </div>
  );
}
