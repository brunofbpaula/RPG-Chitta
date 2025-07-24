import { useState } from 'react'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Inventary = () => {

  const Items = [
  {
    name: "Balsamic Vinaigrette",
    description: "Rich and tangy dressing perfect for salads.",
    image: "http://dummyimage.com/182x100.png/5fa2dd/ffffff"
  },
  {
    name: "Marinated Artichokes",
    description: "Artichoke hearts marinated in herbs and oil.",
    image: "http://dummyimage.com/187x100.png/dddddd/000000"
  },
  {
    name: "Portable Phone Mug Holder",
    description: "Convenient holder for drinks and phones while driving.",
    image: "http://dummyimage.com/165x100.png/5fa2dd/ffffff"
  },
  {
    name: "Garden Tool Set",
    description: "Complete set of gardening tools for all your needs.",
    image: "http://dummyimage.com/245x100.png/cc0000/ffffff"
  },
  {
    name: "Electric Stir Fry Pan",
    description: "Large stir fry pan with non-stick surface.",
    image: "http://dummyimage.com/237x100.png/ff4444/ffffff"
  },
  {
    name: "Coconut Chia Seed Pudding",
    description: "Ready-to-eat chia seed pudding made with coconut milk, perfect for breakfast or dessert.",
    image: "http://dummyimage.com/116x100.png/ff4444/ffffff"
  },
  {
    name: "Air Fryer",
    description: "Compact air fryer for healthier cooking.",
    image: "http://dummyimage.com/203x100.png/cc0000/ffffff"
  },
  {
    name: "Smartphone Photography Tripod",
    description: "Lightweight tripod designed for smartphone photography.",
    image: "http://dummyimage.com/101x100.png/cc0000/ffffff"
  },
  {
    name: "Outdoor Adventure Backpack",
    description: "Durable backpack for hiking or travel.",
    image: "http://dummyimage.com/229x100.png/ff4444/ffffff"
  },
  {
    name: "Pet Hair Remover",
    description: "Effective roller for removing pet hair from furniture.",
    image: "http://dummyimage.com/215x100.png/5fa2dd/ffffff"
  },
  {
    name: "Portable Phone Mug Holder",
    description: "Convenient holder for drinks and phones while driving.",
    image: "http://dummyimage.com/222x100.png/cc0000/ffffff"
  },
  {
    name: "Compact Hair Dryer",
    description: "Lightweight hair dryer with multiple speed settings.",
    image: "http://dummyimage.com/135x100.png/cc0000/ffffff"
  },
  {
    name: "Mixed Nuts",
    description: "A blend of assorted nuts, perfect for snacking or adding to recipes.",
    image: "http://dummyimage.com/194x100.png/5fa2dd/ffffff"
  },
  {
    name: "Garlic Herb Grilled Chicken",
    description: "Marinated grilled chicken breasts seasoned with garlic and herbs.",
    image: "http://dummyimage.com/128x100.png/cc0000/ffffff"
  },
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
    <div className='inventary-card'>
      
      <div className='w-full flex justify-between border-b border-red-600 mb-4'>

      {
        windows.map((currentWindow) => (
          <button
            key={currentWindow}
            onClick={() => setWindow(currentWindow)}
            className={`w-1/2 text-center py-2 text-sm uppercase tracking-widest transition ${
              window === currentWindow
                ? "text-red-500 border-b-2 border-red-500 font-semibold"
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
                        ? "border-red-500 bg-[#141414]"
                        : "border-gray-600 bg-[#0c0c0c]"
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

export default Inventary