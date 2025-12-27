import { LayoutGrid, FileText, Boxes, Users } from "lucide-react";
import { NotesContent } from "../Anotacoes/NotesContent";
import { InventarioContent } from "../Inventario/InventarioContent";
import { ContatosContent } from "../Contatos/ContatosContent";
import { Item, Note } from "@/_root/RootLayout";

type TabsConfigProps = {
  items: Item[];
  notes: Note[];
};

export const getTabs = ({ items, notes }: TabsConfigProps) => [
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
    content: <NotesContent notes={notes} />,
  },
  {
    key: "inventario",
    label: "INVENTÁRIO",
    icon: Boxes,
    content: <InventarioContent items={items} />,
  },
  {
    key: "contatos",
    label: "CONTATOS",
    icon: Users,
    content: <ContatosContent />,
  },
];
