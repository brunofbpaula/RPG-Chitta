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
        gap: 1,
        boxShadow: "inset 0px 0px 20px 0px rgb(117 255 255 / 32%)"
      }}
    >
      {mensagens.map((msg) => {
        const isMe = msg.autor === "eu";

        return (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMe ? "flex-end" : "flex-start"
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                background: msg.error ? "#2a0000" : "rgb(117 255 255 / 40%)",
                border: msg.error ? "1px solid #d32f2f" : "none",
                color: msg.error ? "#ff6b6b" : "#fff",
                px: 1.4,
                py: 1,
                borderRadius: 1.2,
                wordBreak: "break-word",
              }}
            >
              <Typography sx={{ fontSize: "0.95rem" }}>
                {msg.texto}
              </Typography>
            </Box>

            {msg.error && (
              <Typography
                sx={{
                  color: "#d32f2f",
                  fontSize: "0.90rem",
                  mt: 0.3,
                  maxWidth: "75%",
                  textAlign: isMe ? "right" : "left",
                }}
              >
                NÃO FOI POSSÍVEL ENVIAR A MENSAGEM.
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
