import { InputBase } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function NotesEditor({ value, onChange }: Props) {
  return (
    <InputBase
      multiline
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        flex: 1,
        p: 2,
        color: "#fff",
        overflow: "auto",
        alignItems: "start",
        maxHeight: "calc(100dvh - 190px)",
        height: "100%",
        background: "rgb(255 235 0 / 14%)"
      }}
    />
  );
}
