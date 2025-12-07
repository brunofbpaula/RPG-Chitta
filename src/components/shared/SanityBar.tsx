import { Plus, Minus } from "lucide-react";

interface Props {
  cyberpsychosis: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function SanityBar({ cyberpsychosis, onIncrease, onDecrease }: Props) {
  const isCyberpsychotic = cyberpsychosis === 100;

  return (
    <div className="flex items-center gap-2">

      {/* Botão diminuir */}
      <button
        onClick={onDecrease}
        className="p-1 rounded-md bg-red-700 hover:bg-red-800 text-white"
      >
        <Minus size={14} />
      </button>

      {/* Barra */}
      <div className="relative h-4 w-64 bg-red-400 rounded-md flex items-center justify-center overflow-hidden">
        {isCyberpsychotic ? (
          <span className="text-red-950 text-xs font-bold">CYBERPSICÓTICO</span>
        ) : (
          <>
            <div
              className="absolute left-0 top-0 h-4 bg-red-500 rounded-md"
              style={{ width: `${cyberpsychosis}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
              CYBERPSICOSE {cyberpsychosis}%
            </span>
          </>
        )}
      </div>

      {/* Botão aumentar */}
      <button
        onClick={onIncrease}
        className="p-1 rounded-md bg-red-700 hover:bg-red-800 text-white"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
