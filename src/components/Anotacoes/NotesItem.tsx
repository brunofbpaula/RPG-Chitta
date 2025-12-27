import { Box, IconButton, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";
import { Note } from "@/_root/RootLayout";

interface Props {
  note: Note;
  onSelect: (note: Note) => void;
  onDelete: () => void;
}

export function NotesItem({ note, onSelect, onDelete }: Props) {
  return (
    <Box
      onClick={() => onSelect(note)}
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
          {note.title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "rgb(255 255 255 / 60%)",
          }}
        >
          Última modificação:{" "}
          {new Date(note.createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        sx={{ color: "rgb(255 255 255 / 70%)" }}
      >
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
}
