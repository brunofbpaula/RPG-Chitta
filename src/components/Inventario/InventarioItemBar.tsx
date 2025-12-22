import { Box, Typography, IconButton } from "@mui/material";
import { ChevronDown } from "lucide-react";

interface Props {
  nome: string;
}

export function InventarioItemBar({ nome }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: 3,
        py: 1.5,
        border: "1px solid #ff005c",
        color: "#5eead4",
        mb: 2,
        clipPath:
          "polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)",
      }}
    >
      <Typography fontWeight={500}>{nome}</Typography>

      <IconButton>
        <ChevronDown color="#5eead4" />
      </IconButton>
    </Box>
  );
}
