import { Box } from "@mui/material";
import { Nota } from "../../types";
import { NotesEditor } from "./NotesEditor";

interface Props {
  nota: Nota;
  onChange: (conteudo: string) => void;
}

export function NotesWindow({ nota, onChange }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <NotesEditor
        value={nota.conteudo}
        onChange={onChange}
      />
    </Box>
  );
}
