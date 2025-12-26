import { Box, IconButton, Paper, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { Nota } from "../../types";

interface Props {
  nota: Nota;
  onBack: () => void;
}

export function NotesWindowHeader({ nota, onBack }: Props) {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1,
        py: 0.5,
        borderRadius: 0,
        background: "#ffeb00",
      }}
    >
      <IconButton onClick={onBack} sx={{ color: "#000000" }}>
        <ArrowLeft />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Typography sx={{ color: "#000000", fontWeight: 600, fontFamily: "Rajdhani", fontSize: "1.45rem" }}>
          {nota.titulo}
        </Typography>
        <Typography variant="overline" gutterBottom sx={{ color: "#000000", fontWeight: 600, fontFamily: "Rajdhani", margin: 0  }}>
          Última modificação:{" "}
          {new Date(nota.updatedAt).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
