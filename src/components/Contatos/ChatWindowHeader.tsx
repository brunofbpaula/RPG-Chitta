import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { Contato } from "../../types";

interface ChatWindowHeaderProps {
  contato: Contato;
  onBack: () => void;
}

export function ChatWindowHeader({
  contato,
  onBack,
}: ChatWindowHeaderProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1,
        py: 0.5,
        background: "#ff003c",
        borderRadius: 0,
      }}
    >
      <IconButton onClick={onBack} sx={{ color: "#ffffff", fontWeight: 600 }}>
        <ArrowLeft />
      </IconButton>

      <Avatar src={contato.avatar} className="avatar-chat">
        {contato.nome[0]}
      </Avatar>

      <Typography
        variant="subtitle1"
        sx={{ color: "#ffffff", fontWeight: 600 }}
      >
        {contato.nome}
      </Typography>
    </Paper>
  );
}
