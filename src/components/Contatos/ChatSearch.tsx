interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ChatSearch({ value, onChange }: Props) {
  return (
    <input
      className="chat-search"
      placeholder="Buscar contato"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
