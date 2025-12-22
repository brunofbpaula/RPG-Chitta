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
    // Simulação de histórico da conversa
    setMensagens([
      { id: "1", texto: "Oi!", autor: "outro" },
      { id: "2", texto: "Tudo bem?", autor: "outro" },
      { id: "3", texto: "Tudo sim 😄", autor: "eu" },
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
      },
    ]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: '100%',
        background: "rgb(0 0 0 / 40%)",
      }}
    >
      <ChatMessageList mensagens={mensagens} />

      <ChatMessageInput onSend={enviarMensagem} />
    </Box>
  );
}
