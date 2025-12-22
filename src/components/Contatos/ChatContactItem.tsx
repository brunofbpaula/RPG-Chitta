import { Avatar, Box, Typography } from "@mui/material";
import { Contato } from "../../types";

interface Props {
  contato: Contato;
  active: boolean;
  onSelect: (contato: Contato) => void;
}

export function ChatContactItem({
  contato,
  active,
  onSelect,
}: Props) {
  return (
    <Box
      onClick={() => onSelect(contato)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.5,
        cursor: "pointer",
        height: "fit-content",
        background: active
          ? "rgb(255 0 80 / 35%)"
          : "transparent",
        borderBottom: "1px solid rgb(255 255 255 / 10%)",
        "&:hover": {
          background: "rgb(255 0 80 / 25%)",
        },
      }}
    >
      <Avatar src={contato.avatar}>
        {contato.nome[0]}
      </Avatar>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{ color: "#fff", fontWeight: 600 }}
          noWrap
        >
          {contato.nome}
        </Typography>

        <Typography
          sx={{
            color: "rgb(255 255 255 / 60%)",
            fontSize: 13,
          }}
          noWrap
        >
          {contato.ultimaMensagem}
        </Typography>
      </Box>
    </Box>
  );
}
