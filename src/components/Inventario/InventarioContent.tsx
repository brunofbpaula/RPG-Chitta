import { useState } from "react";
import { InventoryFeature, Item } from "../../types";
import { InventarioHeaderTop } from "./InventarioHeaderTop";
import { InventarioSearch } from "./InventarioSearch";
import { InventarioItemAccordion } from "./InventarioItemAccordion";
import CreateItemModal from "./CreateItemModal";
import DeleteItemModal from "./DeleteItemModal";
import { Box } from "@mui/material";

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", p: 1, maxHeight: { xs: "70dvh", md: "75dvh" } }}>   
        {itemsFiltrados.map((item) => (
          <InventarioItemAccordion
            key={item.id}
            item={item}
            onDelete={() => setItemExcluir(item)}
          />
        ))}
      </Box>

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
            ...data,
          });
        }}
      />
    </>
  );
}
