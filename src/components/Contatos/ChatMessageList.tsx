import { Box, Typography } from "@mui/material";
import { Mensagem } from "../../types";

interface Props {
  mensagens: Mensagem[];
}

export function ChatMessageList({ mensagens }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 1,
      }}
    >
      {mensagens.map((msg) => (
        <Box
          key={msg.id}
          sx={{
            alignSelf:
              msg.autor === "eu"
                ? "flex-end"
                : "flex-start",
            maxWidth: "70%",
            
            px: 1.5,
            py: 1,
            borderRadius: 2,
            background:
              msg.autor === "eu"
                ? "rgb(255 0 80 / 35%)"
                : "rgb(255 255 255 / 15%)",
          }}
        >
          <Typography sx={{ color: "#fff" }}>
            {msg.texto}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
