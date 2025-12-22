import {
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { Send } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend: (texto: string) => void;
}

export function ChatMessageInput({ onSend }: Props) {
  const [texto, setTexto] = useState("");

  function handleSend() {
    if (!texto.trim()) return;
    onSend(texto);
    setTexto("");
  }

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        p: "4px 8px",
        background: "rgb(0 0 0 / 60%)",
        borderRadius: 0,
      }}
    >
      <InputBase
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite uma mensagem..."
        sx={{ ml: 1, flex: 1, color: "#fff" }}
      />

      <IconButton onClick={handleSend}>
        <Send />
      </IconButton>
    </Paper>
  );
}
