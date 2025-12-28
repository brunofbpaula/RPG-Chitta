import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ChevronDown, Trash2 } from "lucide-react";
import { Item } from "@/types";

interface Props {
  item: Item;
  onDelete: (item: Item) => void;
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
        className="accordion-inventario"
        expandIcon={<ChevronDown color="#ffffff" />}
        sx={{
          background: "rgb(0 0 0 / 40%)",
          color: "#ffffff",
          borderBottom: "1px solid rgb(92 241 250 / 40%)",
          borderRight: "1px solid rgb(92 241 250 / 40%)"
        }}
      >
        <Typography flex={1} className="font-cyberpunk">{item.name}</Typography>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item);
          }}
          sx={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
          }}
        >
          <Trash2 size={18} color="#ffffff"/>
        </IconButton>
      </AccordionSummary>

      <AccordionDetails
        className="item-accordion-inventario"
        sx={{
          border: "1px solid rgb(92 241 250 / 40%)",
          borderTop: "none",
          background: "rgb(0 0 0 / 50%)",
          color: "#ffffff",
        }}
      >
        <Box display="flex" gap={2}>
          <img src={item.image} width={100} className="icon-item" />
          <Typography className="font-cyberpunk">{item.description}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
