import { Box, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { CONDITIONS } from "@/lib/conditions";
import { CondicoesHeader } from "./CondicoesHeader";
import { CondicoesList } from "./CondicoesList";

export function ConditionsContent() {
  const allIds = Object.keys(CONDITIONS).map(Number);

  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const filteredIds = useMemo(
    () =>
      allIds.filter((id) =>
        CONDITIONS[id].name
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [allIds, search]
  );

  const available = filteredIds.filter(
    (id) => !selected.includes(id)
  );

  const active = filteredIds.filter(
    (id) => selected.includes(id)
  );

  function addCondition(id: number) {
    setSelected((prev) => [...prev, id]);
  }

  function removeCondition(id: number) {
    setSelected((prev) => prev.filter((c) => c !== id));
  }

  return (
    <Box>
      {/* ===== HEADER GLOBAL ===== */}
      <CondicoesHeader
        search={search}
        onSearchChange={setSearch}
      />

      {/* ===== CONTENT ===== */}
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
        {/* DISPONÍVEIS */}
        <Paper sx={{ p: 1, backgroundColor: "transparent" }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', fontFamily: "Rajdhani", color: "#FFEB3B", paddingBottom: 1 }}>
            Condições disponíveis
          </Typography>

          <CondicoesList
            ids={available}
            onItemClick={addCondition}
            emptyText="Nenhuma condição disponível"
          />
        </Paper>

        {/* ATIVOS */}
        <Paper sx={{ p: 1, backgroundColor: "transparent" }}>
          <Typography
            sx={{ fontWeight: 700, color: "rgb(0 255 255)", paddingBottom: 1, fontFamily: "Rajdhani", fontSize: '1.25rem'  }}
          >
            Condições ativas ({selected.length})
          </Typography>

          <CondicoesList
            ids={active}
            onItemClick={removeCondition}
            emptyText="Nenhuma condição ativa"
            active
          />
        </Paper>
      </Box>
    </Box>
  );
}
