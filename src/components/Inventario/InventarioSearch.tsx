import { Box, InputBase, IconButton } from "@mui/material";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function InventarioSearch({ value, onChange }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ background: "#3a4048", px: 2, py: 1, mb: 3 }}
    >
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar item..."
        sx={{ flex: 1, color: "#fff" }}
      />
      <IconButton>
        <Search color="#5eead4" />
      </IconButton>
    </Box>
  );
}
