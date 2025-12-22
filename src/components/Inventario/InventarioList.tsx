import { ItemInventario } from "@/types/ItemInventario";
import { InventarioItem } from "./InventarioItem";

interface InventarioListProps {
  itens: ItemInventario[];
  onDelete: (item: ItemInventario) => void;
}

export function InventarioList({
  itens,
  onDelete,
}: InventarioListProps) {
  return (
    <div className="list-inventario">
      {itens.map((item) => (
        <InventarioItem
          key={item.id}
          item={item}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
