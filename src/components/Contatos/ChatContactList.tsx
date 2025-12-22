import { Contato } from "../../types";
import { ChatContactItem } from "./ChatContactItem";

interface Props {
  contatos: Contato[];
  contatoAtivo: Contato | null;
  onSelect: (contato: Contato) => void;
}

export function ChatContactList({
  contatos,
  contatoAtivo,
  onSelect,
}: Props) {
  return (
    <>
      {contatos.map((contato) => (
        <ChatContactItem
          key={contato.id}
          contato={contato}
          active={contatoAtivo?.id === contato.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
