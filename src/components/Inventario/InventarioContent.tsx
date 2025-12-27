import { useState } from "react";
import { ItemInventario } from "../../types";
import { InventarioHeaderTop } from "./InventarioHeaderTop";
import { InventarioSearch } from "./InventarioSearch";
import { InventarioItemAccordion } from "./InventarioItemAccordion";
import { ConfirmarExclusaoItem } from "./ConfirmarExclusaoItem";
import CreateItemModal from "../shared/CreateItemModal";
import { Item } from "@/_root/RootLayout";
import DeleteItemModal from "../shared/DeleteItemModal";

interface Props {
  items: Item[];
  setitems: (items: Item[]) => void;
}

export function InventarioContent( { items, setitems }: Props ) {
  
  const [busca, setBusca] = useState("");
  const [itemExcluir, setItemExcluir] = useState<Item | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const itemsFiltrados = items.filter((item) =>
    item.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <InventarioHeaderTop onAdd={() => setAddModalOpen(true)} />
      <InventarioSearch value={busca} onChange={setBusca} />

      {itemsFiltrados.map((item) => (
        <InventarioItemAccordion
          key={item.id}
          item={item}
          onDelete={setItemExcluir}
        />
      ))}

      <DeleteItemModal
        open={itemExcluir !== null}
        onClose={() => setItemExcluir(null)}
        itemId={itemExcluir?.id}
      />

      <CreateItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        playerId={""}
      />

      
    </>
  );
}
