import { LayoutGrid, FileText, Boxes, Users } from "lucide-react";
import { NotesContent } from "../Anotacoes/NotesContent";
import { InventarioContent } from "../Inventario/InventarioContent";
import { ContatosContent } from "../Contatos/ContatosContent";
import { PlayerTabsProps } from "@/types";

export const getTabs = ({ items, notes }: PlayerTabsProps) => [
  {
    key: "inicio",
    label: "INÍCIO",
    icon: LayoutGrid,
    content: <div>Início</div>,
    onlyMobile: true,
  },
  {
    key: "notas",
    label: "NOTAS",
    icon: FileText,
    content: <NotesContent notepad={notes} />,
  },
  {
    key: "inventario",
    label: "INVENTÁRIO",
    icon: Boxes,
    content: <InventarioContent inventory={items} />,
  },
  {
    key: "contatos",
    label: "CONTATOS",
    icon: Users,
    content: <ContatosContent />,
  },
];
