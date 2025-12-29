import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { CONDITIONS } from "@/lib/conditions";
import { CondicoesHeader } from "./CondicoesHeader";
import { CondicoesList } from "./CondicoesList";
import { ConditionsFeature } from "@/types";

type Props = {
  feature: ConditionsFeature;
};

export function ConditionsContent({ feature }: Props) {
  const { conditions, actions } = feature;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const allIds = Object.keys(CONDITIONS).map(Number);
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
    (id) => !conditions.includes(id)
  );

  const active = filteredIds.filter(
    (id) => conditions.includes(id)
  );

  function addCondition(id: number) {
    if (conditions.includes(id)) return;
    actions.update([...conditions, id]);
  }

  function removeCondition(id: number) {
    actions.update(conditions.filter((c) => c !== id));
  }

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <CondicoesHeader
        search={search}
        onSearchChange={setSearch}
      />
      {
          !isMobile ?
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            
            {/* DISPONÍVEIS */}
            <Paper sx={{ p: 1, backgroundColor: "transparent" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  fontFamily: "Rajdhani",
                  color: "#FFEB3B",
                  pb: 1,
                }}
              >
                Condições disponíveis
              </Typography>

              <CondicoesList
                ids={available}
                onItemClick={addCondition}
                emptyText="Nenhuma condição disponível"
              />
            </Paper>

            {/* ATIVAS */}
            <Paper sx={{ p: 1, backgroundColor: "transparent" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "rgb(0 255 255)",
                  pb: 1,
                  fontFamily: "Rajdhani",
                  fontSize: "1.25rem",
                }}
              >
                Condições ativas ({conditions.length})
              </Typography>

              <CondicoesList
                ids={active}
                onItemClick={removeCondition}
                emptyText="Nenhuma condição ativa"
                active
              />
            </Paper>
          </Box> :
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            {/* ATIVAS */}
            <Paper sx={{ p: 1, backgroundColor: "transparent" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "rgb(0 255 255)",
                  pb: 1,
                  fontFamily: "Rajdhani",
                  fontSize: "1.25rem",
                }}
              >
                Condições ativas ({conditions.length})
              </Typography>

              <CondicoesList
                ids={active}
                onItemClick={removeCondition}
                emptyText="Nenhuma condição ativa"
                active
              />
            </Paper>
            
            {/* DISPONÍVEIS */}
            <Paper sx={{ p: 1, backgroundColor: "transparent" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  fontFamily: "Rajdhani",
                  color: "#FFEB3B",
                  pb: 1,
                }}
              >
                Condições disponíveis
              </Typography>

              <CondicoesList
                ids={available}
                onItemClick={addCondition}
                emptyText="Nenhuma condição disponível"
              />
            </Paper>
          </Box>
      }
    </Box>
  );
}
