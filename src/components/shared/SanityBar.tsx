interface Props {
  sanity: number;
}

export default function SanityBar({ sanity }: Props) {
  const isCyberpsychotic = sanity === 0;

  return (
    <div className="relative h-4 w-70 bg-red-400 rounded-md flex items-center justify-center">
      {isCyberpsychotic ? (
        <span className="text-red-950 text-xs font-bold">CYBERPSICÓTICO</span>
      ) : (
        <div
          className="absolute left-0 top-0 h-4 bg-red-500 rounded-md flex justify-center items-center"
          style={{ width: `${sanity}%` }}
        >
          <span className="text-white text-[10px] font-bold">{sanity}%</span>
        </div>
      )}
    </div>
  );
}
