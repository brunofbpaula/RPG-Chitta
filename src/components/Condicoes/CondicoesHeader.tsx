import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Search } from "lucide-react";

interface CondicoesHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function CondicoesHeader({
  search,
  onSearchChange,
}: CondicoesHeaderProps) {
  return (
    <div className="mb-4">
      {/* ===== TÍTULO ===== */}
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
            position: "relative",
          }}
        >
          <Typography
            fontWeight={700}
            className="font-cyberpunk"
          >
            CONDIÇÕES
          </Typography>
        </Box>
      </Box>

      {/* ===== SEARCH ===== */}
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
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ ml: 1, flex: 1, color: "#fff" }}
          placeholder="Buscar condição..."
        />

        <Divider
          sx={{
            height: 28,
            m: 0.5,
            borderColor: "rgb(255 255 255 / 25%)",
          }}
          orientation="vertical"
        />

        <IconButton
          sx={{ color: "rgb(94 246 255)" }}
          aria-label="buscar"
        >
          <Search />
        </IconButton>
      </Paper>
    </div>
  );
}
