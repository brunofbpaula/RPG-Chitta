import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ChevronDown, Trash2 } from "lucide-react";
import { ItemInventario } from "@/types/ItemInventario";

interface Props {
  item: ItemInventario;
  onDelete: (item: ItemInventario) => void;
}

export function InventarioItemAccordion({ item, onDelete }: Props) {
  return (
    <Accordion
      disableGutters
      square
      sx={{
        background: "transparent",
        boxShadow: "none",
        mb: 2,
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown color="#5EF6FF" />}
        sx={{
        //   px: 3,
        //   py: 1.5,
          background: "#C5003C",
          color: "#5EF6FF",
          clipPath:
            "polygon(0 0, 100% 0, 100% 50%, 96% 100%, 0 100%)",
        }}
      >
        <Typography flex={1}>{item.nome}</Typography>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item);
          }}
        >
          <Trash2 size={18} color="#5EF6FF"/>
        </IconButton>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          border: "1px solid #C5003C",
          borderTop: "none",
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
        }}
      >
        <Box display="flex" gap={2}>
          <img src={item.imagem} width={100} />
          <Typography>{item.descricao}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
