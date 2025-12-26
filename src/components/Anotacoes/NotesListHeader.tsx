import { Box, Button, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
}

export function NotesListHeader({ value, onSearch, onAdd }: Props) {
  return (
    <div className="mb-4">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box
          className="titulo-modulo"
          sx={{
            px: 3,
            paddingRight: "38px",
            py: 1,
            border: "1px solid #FFD600",
            color: "#fff",
            letterSpacing: 4,
            clipPath: "polygon(0 0, 95% 0, 85% 100%, 0 100%)",
            position: "relative"
          }}
        >
          <Typography fontWeight={700} className="font-cyberpunk">ANOTAÇÕES</Typography>
        </Box>

        <Button
          sx={{
            px: 4,
            py: 1,
            color: "#ff003c",
            borderRadius: 0,
            border: "1px solid #ff003c",
            clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
          }}
          className="font-cyberpunk btn-modulo"
          onClick={onAdd}
        >
          ADICIONAR
        </Button>
      </Box>
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          background: "rgb(0 255 255 / 15%)",
          borderRadius: 0,
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          sx={{ ml: 1, flex: 1, color: "#ffffff" }}
          placeholder="Buscar Anotação..."
        />

        <Divider
          sx={{ height: 28, m: 0.5, borderColor: "rgb(255 255 255 / 25%)" }}
          orientation="vertical"
        />

        <IconButton sx={{ color: "rgb(94 246 255)" }} aria-label="buscar">
          <Search />
        </IconButton>
      </Paper>
    </div>
    
    
  );
}
