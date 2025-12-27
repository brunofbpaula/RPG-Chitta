import { Slider, Box, Typography } from "@mui/material";

interface VidaStatusProps {
  atual: number;
  max: number;
}

export function VidaStatus({ atual, max }: VidaStatusProps) {
  return (
    <Box className="vida-status">
        <Typography variant="caption" className="vida-texto">
            {atual}/{max}
        </Typography>

      <Slider
        value={atual}
        min={0}
        max={max}
        sx={{
          color: "#6fff75",
          borderRadius: 0,
          py: 0.5,
          height: 16,
          "& .MuiSlider-thumb": { display: "none" },
          "& .MuiSlider-rail": { opacity: 0.3 },
        }}
      />

      
    </Box>
  );
}
