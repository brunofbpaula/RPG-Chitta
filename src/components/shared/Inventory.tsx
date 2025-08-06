import { useState } from 'react'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Inventory = () => {

  const Items = [
  {
    name: "Coconut Milk",
    description: "Rich coconut milk for curries and desserts.",
    image: "http://dummyimage.com/131x100.png/ff4444/ffffff"
  }
]

  const Notes = [
    {
      title: 'Diário de Missão',
      text: 'Use a poção de cura antes do confronto com o caçador cibernético.',
      createdAt: '2025-12-25T10:30:00'
    }
  ]

  const windows = ["Inventory", "Notes"];
  const [window, setWindow] = useState("Inventory");
  const [selectedItem, setSelectedItem] = useState(0);
  const item = Items[selectedItem];

  return (
    <div className='inventory-card'>

      <div className='w-full flex justify-between mb-4'>
      {
        windows.map((currentWindow) => (
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
            <div className="grid grid-cols-3 gap-2 mb-4 w-full overflow-y-auto custom-scrollbar max-h-64 pr-1">
              {Items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.image && setSelectedItem(index)}
                  className={`flex items-center justify-center h-16 rounded-md border text-2xl cursor-pointer transition overflow-hidden ${
                    item.image
                      ? selectedItem === index
                        ? "border-white bg-[#141413]"
                        : "border-red-600 bg-[#0c0c0c]"
                      : "border-gray-700 bg-black text-gray-500"
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
          <div className="w-full space-y-2">
            {Notes.map((note, index) => (
              <div
                key={index}
                className="border border-red-500 bg-[#111] p-4 rounded-lg text-left shadow-md"
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
            ))}
          </div>
        )}
      </div>
  )
}

export default Inventory