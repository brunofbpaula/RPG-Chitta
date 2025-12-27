import { Box } from "@mui/material";
import { Note } from "@/_root/RootLayout";
import { NotesEditor } from "./NotesEditor";

interface Props {
  note: Note;
  onChange: (text: string) => void;
}

export function NotesWindow({ note, onChange }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <NotesEditor
        value={note.text}
        onChange={onChange}
      />
    </Box>
  );
}
