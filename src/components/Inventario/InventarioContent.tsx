import { useState } from "react";
import { InventoryFeature, Item } from "../../types";
import { InventarioHeaderTop } from "./InventarioHeaderTop";
import { InventarioSearch } from "./InventarioSearch";
import { InventarioItemAccordion } from "./InventarioItemAccordion";
import CreateItemModal from "../shared/CreateItemModal";
import DeleteItemModal from "../shared/DeleteItemModal";

interface Props {
  inventory: InventoryFeature;
}

export function InventarioContent({ inventory }: Props) {
  const { items, actions } = inventory;

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
          onDelete={() => setItemExcluir(item)}
        />
      ))}

      {/* MODAL DE CONFIRMAÇÃO */}
      <DeleteItemModal
        open={!!itemExcluir}
        itemName={itemExcluir?.name}
        onClose={() => setItemExcluir(null)}
        onConfirm={() => {
          if (!itemExcluir) return;
          actions.delete(itemExcluir.id);
          setItemExcluir(null);
        }}
      />

      {/* MODAL DE CRIAÇÃO */}
      <CreateItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreate={(data) => {
          actions.create({
            id: crypto.randomUUID(),
            quantity: 1,
            ...data,
          });
        }}
      />
    </>
  );
}
