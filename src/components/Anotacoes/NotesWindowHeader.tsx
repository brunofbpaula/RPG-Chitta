import { Note } from "@/types";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  note: Note;
  onBack: () => void;
  onSave: (data: Note) => void;
}

export function NotesWindowHeader({ note, onBack, onSave }: Props) {
  const [title, setTitle] = useState(note.title);

  useEffect(() => {
      setTitle(note.title);
    }, [note.$id, note.title]);
  
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title !== note.title) {
        onSave({
          ...note,
          title,
        });
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [title, note]);


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
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          width: "100%",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <InputBase
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            color: "#000000",
            fontWeight: 600,
            fontFamily: "Rajdhani",
            fontSize: "1.45rem",
          }}
        />
        <Typography
          variant="overline"
          gutterBottom
          sx={{
            color: "#000000",
            fontWeight: 600,
            fontFamily: "Rajdhani",
            margin: 0,
          }}
        >
          Última modificação:{" "}
          {new Date(note.createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
