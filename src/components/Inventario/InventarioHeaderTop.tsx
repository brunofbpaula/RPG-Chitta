import { Box, Button, Typography } from "@mui/material";

interface Props {
  onAdd: () => void;
}

export function InventarioHeaderTop({ onAdd }: Props) {
  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Box
        sx={{
          px: 3,
          py: 1,
          border: "1px solid #FFD600",
          color: "#fff",
          letterSpacing: 4,
          clipPath: "polygon(0 0, 95% 0, 85% 100%, 0 100%)",
        }}
      >
        <Typography fontWeight={700}>ITEMS</Typography>
      </Box>

      <Button
        onClick={onAdd}
        sx={{
          px: 4,
          color: "#ff005c",
          border: "1px solid #ff005c",
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        ADICIONAR
      </Button>
    </Box>
  );
}
