import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { CONDITIONS } from "@/lib/conditions";

export function ConditionsTransferList() {
  const allIds = Object.keys(CONDITIONS).map(Number);

  const [selected, setSelected] = useState<number[]>([]);

  const available = allIds.filter((id) => !selected.includes(id));

  function addCondition(id: number) {
    if (selected.length >= 3) return;
    setSelected((prev) => [...prev, id]);
  }

  function removeCondition(id: number) {
    setSelected((prev) => prev.filter((c) => c !== id));
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },
        gap: 2,
      }}
    >
      {/* ===== DISPONÍVEIS ===== */}
      <Paper sx={{ p: 1 }}>
        <Typography
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Efeitos disponíveis
        </Typography>

        <List dense>
          {available.map((id) => (
            <ListItemButton
              key={id}
              onClick={() => addCondition(id)}
            >
              <ListItemText
                primary={CONDITIONS[id].name}
              />
            </ListItemButton>
          ))}

          {available.length === 0 && (
            <Typography
              sx={{ opacity: 0.6, p: 1 }}
            >
              Nenhum efeito disponível
            </Typography>
          )}
        </List>
      </Paper>

      {/* ===== ATIVOS ===== */}
      <Paper sx={{ p: 1 }}>
        <Typography
          sx={{ fontWeight: 700, mb: 1, color: "#ff1744" }}
        >
          Efeitos ativos ({selected.length}/3)
        </Typography>

        <List dense>
          {selected.map((id) => (
            <ListItemButton
              key={id}
              onClick={() => removeCondition(id)}
              sx={{
                background: "rgba(255,23,68,0.08)",
                mb: 0.5,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={CONDITIONS[id].name}
                secondary={CONDITIONS[id].description}
              />
            </ListItemButton>
          ))}

          {selected.length === 0 && (
            <Typography
              sx={{ opacity: 0.6, p: 1 }}
            >
              Nenhum efeito ativo
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}
