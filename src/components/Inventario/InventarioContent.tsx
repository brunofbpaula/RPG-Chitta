import { useState } from "react";
import { ItemInventario } from "../../types";
import { InventarioHeaderTop } from "./InventarioHeaderTop";
import { InventarioSearch } from "./InventarioSearch";
import { InventarioItemAccordion } from "./InventarioItemAccordion";
import { ConfirmarExclusaoItem } from "./ConfirmarExclusaoItem";
import CreateItemModal from "../shared/CreateItemModal";
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutation';

export function InventarioContent() {
  
  const [itens, setItens] = useState<ItemInventario[]>([
    {
      id: "1",
      nome: "Espada",
      descricao: "Espada longa de aço.",
      imagem:
        "https://facasbv.cdn.magazord.com.br/img/2023/01/produto/4603/2.jpg",
    },
    {
      id: "2",
      nome: "Chapéu",
      descricao: "Chapéu mágico.",
      imagem:
        "https://facasbv.cdn.magazord.com.br/img/2023/01/produto/4603/2.jpg",
    },
    {
      id: "3",
      nome: "Armadura",
      descricao: "Armadura pesada.",
      imagem:
        "https://facasbv.cdn.magazord.com.br/img/2023/01/produto/4603/2.jpg",
    },
  ]);

  const { data: currentUser } = useGetCurrentUser();
  const [busca, setBusca] = useState("");
  const [itemExcluir, setItemExcluir] = useState<ItemInventario | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const itensFiltrados = itens.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <InventarioHeaderTop onAdd={() => setAddModalOpen(true)} />
      <InventarioSearch value={busca} onChange={setBusca} />

      {itensFiltrados.map((item) => (
        <InventarioItemAccordion
          key={item.id}
          item={item}
          onDelete={setItemExcluir}
        />
      ))}

      <ConfirmarExclusaoItem
        open={!!itemExcluir}
        description={
          itemExcluir
            ? `Deseja excluir "${itemExcluir.nome}" do inventário?`
            : ""
        }
        onCancel={() => setItemExcluir(null)}
        onConfirm={() => {
          if (!itemExcluir) return;
          setItens((prev) =>
            prev.filter((i) => i.id !== itemExcluir.id)
          );
          setItemExcluir(null);
        }}
      />

      <CreateItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        playerId={currentUser?.$id || ""}
      />

      
    </>
  );
}
