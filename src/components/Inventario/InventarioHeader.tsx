import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { Plus, Search } from "lucide-react";

interface InventarioHeaderProps {
  value: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
}

export function InventarioHeader({
  value,
  onSearch,
  onAdd,
}: InventarioHeaderProps) {
  return (
    <Paper
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        background: "rgb(255 235 59 / 25%)",
        borderRadius: 0,
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder="Buscar item..."
      />

      <IconButton>
        <Search />
      </IconButton>

      <Divider
        sx={{ height: 28, m: 0.5, borderColor: "rgb(255 255 255 / 25%)" }}
        orientation="vertical"
      />

      <IconButton color="primary" onClick={onAdd}>
        <Plus />
      </IconButton>
    </Paper>
  );
}
