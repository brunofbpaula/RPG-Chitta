import { useState } from "react";
import { Contato } from "../../types";
import { ChatWindow } from "./ChatWindow";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { ChatContactList } from "./ChatContactList";
import { ChatListHeader } from "./ChatListHeader";

export function ContatosContent() {
  const [contatos] = useState<Contato[]>([
    {
      id: "1",
      nome: "Número desconhecido",
      avatar: "/avatars/joao.png",
      ultimaMensagem: "Zenith, Setor Empresarial, Ambrael, 85º andar, 09:30am 03/01/2068.",
    },
  ]);

  const [contatoAtivo, setContatoAtivo] =
    useState<Contato | null>(null);

  return (
    <>
      {!contatoAtivo ? (
        <ChatListHeader value="" onSearch={() => {}} />
      ) : (
        <ChatWindowHeader
          contato={contatoAtivo}
          onBack={() => setContatoAtivo(null)}
        />
      )}

      <div className="chat-body">
        {!contatoAtivo ? (
          <ChatContactList
            contatos={contatos}
            contatoAtivo={contatoAtivo}
            onSelect={setContatoAtivo}
          />
        ) : (
          <ChatWindow contato={contatoAtivo} />
        )}
      </div>
    </>
  );
}
