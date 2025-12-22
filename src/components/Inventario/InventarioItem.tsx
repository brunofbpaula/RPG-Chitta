import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ChevronDown, Trash2 } from "lucide-react";
import { ItemInventario } from "@/types/ItemInventario";

interface InventarioItemProps {
  item: ItemInventario;
  onDelete: (item: ItemInventario) => void;
}

export function InventarioItem({
  item,
  onDelete,
}: InventarioItemProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronDown />}>
        <Typography>{item.nome}</Typography>
      </AccordionSummary>

      <AccordionActions>
        <IconButton color="error" onClick={() => onDelete(item)}>
          <Trash2 size={18} />
        </IconButton>
      </AccordionActions>

      <AccordionDetails>
        <div className="item-detalhes">
          <img src={item.imagem} alt={item.nome} />
          <div>
            <h4>Descrição</h4>
            <p>{item.descricao}</p>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
