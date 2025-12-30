// NotesWindow.tsx
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { NotesEditor } from "./NotesEditor";
import { Note } from "@/types";

interface Props {
  note: Note;
  onSave: (data: Note) => void;
}


export function NotesWindow({ note, onSave }: Props) {
  const [text, setText] = useState(note.text);

  useEffect(() => {
    setText(note.text);
  }, [note.$id, note.text]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (text !== note.text) {
        onSave({
          ...note,
          text,
        });
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [text, note]);


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <NotesEditor value={text} onChange={setText} />
    </Box>
  );
}
