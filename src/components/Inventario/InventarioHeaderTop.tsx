import { Box, Button, Typography } from "@mui/material";

interface Props {
  onAdd: () => void;
}

export function InventarioHeaderTop({ onAdd }: Props) {
  return (
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
        <Typography fontWeight={700} className="font-cyberpunk">ITEMS</Typography>
      </Box>

      <Button
        onClick={onAdd}
        sx={{
          px: 4,
          py: 1,
          color: "#C5003C",
          borderRadius: 0,
          border: "1px solid #C5003C",
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
        }}
        className="font-cyberpunk btn-modulo"
      >
        ADICIONAR
      </Button>
    </Box>
  );
}
