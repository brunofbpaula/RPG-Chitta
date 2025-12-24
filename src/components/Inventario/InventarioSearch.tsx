import { InputBase, IconButton, Divider, Paper } from "@mui/material";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function InventarioSearch({ value, onChange }: Props) {
  return (
    <Paper
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        background: "rgb(0 255 255 / 15%)",
        borderRadius: 0,
        marginBottom: 3
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder="Buscar Item..."
      />

      <Divider
        sx={{ height: 28, m: 0.5, borderColor: "rgb(255 255 255 / 25%)" }}
        orientation="vertical"
      />

      <IconButton sx={{ color: "rgb(0 255 255)" }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}
