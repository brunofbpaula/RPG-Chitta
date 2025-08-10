import { useState, useEffect } from 'react';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutation';
import CreateItemModal from './CreateItemModal';
import DeleteItemModal from './DeleteItemModal';
import DeleteNoteModal from './DeleteNoteModal';
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import CreateNoteModal from './CreateNoteModal';

const Inventory = () => {
  const { data: currentUser } = useGetCurrentUser();

  const [items, setItems] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [window, setWindow] = useState("Inventory");
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedNote, setSelectedNote] = useState(0);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [removeNoteModalOpen, setRemoveNoteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser?.items) {
      setItems(currentUser.items);
      setSelectedItem(0);
    }

    if (currentUser?.notes) {
      setNotes(currentUser.notes);
      setSelectedNote(0);  // Corrigido aqui: resetar selectedNote, não selectedItem
    }
  }, [currentUser?.items, currentUser?.notes]);

  const item = items[selectedItem];
  const note = notes[selectedNote];

  return (
    <div className="inventory-card">
      {/* Botões de troca de aba */}
      <div className='w-full flex justify-between mb-4'>
        {["Inventory", "Notes"].map((currentWindow) => (
          <button
            key={currentWindow}
            onClick={() => setWindow(currentWindow)}
            className={`w-1/2 text-center py-2 text-sm uppercase tracking-widest transition ${
              window === currentWindow
                ? "text-white border-b-2 border-red-500 font-semibold"
                : "text-white/40 hover:text-red-400"
            }`}
          >
            {currentWindow === "Inventory" ? "Inventário" : "Notas"}
          </button>
        ))}
      </div>

      {window === "Inventory" ? (
        <>
          {/* Botões adicionar/remover */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-red-950 hover:bg-red-900 text-white px-3 py-1 rounded"
            >
              Adicionar
            </button>
            <button
              onClick={() => setRemoveModalOpen(true)}
              disabled={items.length === 0}
              className={`px-3 py-1 rounded text-white ${
                items.length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500"
              }`}
            >
              Excluir
            </button>
          </div>

          {/* Lista de itens */}
          <div className="grid grid-cols-3 gap-2 mb-4 w-full overflow-y-auto custom-scrollbar max-h-64 pr-1">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => item.image && setSelectedItem(index)}
                className={`flex items-center justify-center h-16 rounded-md text-2xl cursor-pointer transition overflow-hidden ${
                  item.image
                    ? selectedItem === index
                      ? "border-4 border-red-500 bg-[#141413]"
                      : "border-none bg-[#0c0c0c]"
                    : "border-none bg-black text-gray-500"
                }`}
              >
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-10" />
                ) : (
                  <span className="text-gray-600">+</span>
                )}
              </div>
            ))}
          </div>

          {/* Detalhes do item */}
          <div className="w-full bg-[#0d0d0d] border border-red-500 rounded-lg p-3 text-left">
            {item && item.image ? (
              <>
                <h3 className="text-red-400 font-semibold text-base">
                  {item.name}
                </h3>
                <p className="text-white text-sm">{item.description}</p>
              </>
            ) : (
              <p className="text-white/40 text-sm">Selecione um item válido.</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Botões adicionar/remover para notas */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setAddNoteModalOpen(true)}
              className="bg-red-950 hover:bg-red-900 text-white px-3 py-1 rounded"
            >
              Criar
            </button>

            <button
              onClick={() => setRemoveNoteModalOpen(true)}
              disabled={notes.length === 0}
              className={`px-3 py-1 rounded text-white ${
                notes.length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500"
              }`}
            >
              Apagar
            </button>
          </div>

          {/* Lista de notas */}
          <div className="w-full space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
            {notes.length > 0 ? (
              notes.map((note, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedNote(i)}
                  className={`border border-red-500 bg-[#111] p-4 rounded-lg text-left shadow-md cursor-pointer transition ${
                    selectedNote === i   ? "border-4 border-red-600 bg-[#220000]" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-red-400 font-semibold text-sm uppercase tracking-widest">
                      {note.title}
                    </h4>
                    <span className="text-white/30 text-xs">
                      {format(new Date(note.createdAt), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  <p className="text-white text-sm leading-snug">{note.text}</p>
                </div>
              ))
            ) : (
              <p className="text-white/40 text-center mt-4">Nenhuma nota encontrada.</p>
            )}
          </div>

          {/* Modais */}
          <CreateNoteModal
            open={addNoteModalOpen}
            onClose={() => setAddNoteModalOpen(false)}
            playerId={currentUser?.$id || ""}
          />

          <DeleteNoteModal
            open={removeNoteModalOpen}
            onClose={() => setRemoveNoteModalOpen(false)}
            noteId={note?.$id}
            noteTitle={note?.title.toUpperCase()}
          />
        </>
      )}

      {/* Modais */}
      <CreateItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        playerId={currentUser?.$id || ""}
      />

      <DeleteItemModal
        open={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        itemId={item?.$id}
        itemName={item?.name.toUpperCase()}
      />
    </div>
  );
};

export default Inventory;
