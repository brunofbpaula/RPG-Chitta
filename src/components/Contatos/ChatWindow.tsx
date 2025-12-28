import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Contato, Mensagem } from "../../types";
import { ChatMessageList } from "./ChatMessageList";
import { ChatMessageInput } from "./ChatMessageInput";

interface Props {
  contato: Contato;
}
export function ChatWindow({ contato }: Props) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMensagens([
      {
        id: "1",
        texto: "Zenith, Setor Empresarial, Ambrael, 85º andar, 09:30am 03/01/2068.",
        autor: "outro",
      },
    ]);
  }, [contato.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  function enviarMensagem(texto: string) {
    setMensagens((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        texto,
        autor: "eu",
        error: true,
      },
    ]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "75dvh",
        background: "rgb(0 0 0 / 40%)",
      }}
    >
      <ChatMessageList mensagens={mensagens} />
      <ChatMessageInput onSend={enviarMensagem} />
    </Box>
  );
}

