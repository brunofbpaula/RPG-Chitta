import { Box, IconButton, Typography } from "@mui/material";
import { Nota } from "../../types";
import { Trash2 } from "lucide-react";

interface Props {
  nota: Nota;
  onSelect: (nota: Nota) => void;
  onDelete: (id: string) => void;
}

export function NotesItem({ nota, onSelect, onDelete }: Props) {
  return (
    <Box
      onClick={() => onSelect(nota)}
      sx={{
        px: 2,
        py: 1.5,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid rgb(255 235 0 / 25%)",
        "&:hover": {
          background: "rgb(255 235 0 / 40%)",
        },
      }}
    >
      <Box>
        <Typography sx={{ color: "#fff", fontWeight: 600 }}>
          {nota.titulo}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "rgb(255 255 255 / 60%)",
          }}
        >
          Última modificação:{" "}
          {new Date(nota.updatedAt).toLocaleDateString()}
        </Typography>
      </Box>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete(nota.id);
        }}
        sx={{ color: "rgb(255 255 255 / 70%)" }}
      >
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
}
