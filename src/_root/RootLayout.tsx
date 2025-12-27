import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AudioLines, LogOut } from 'lucide-react';
import { Box, IconButton } from '@mui/material';

import { InventoryFeature, Item, Note, NotesFeature, RelicsDocument } from '@/types';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import { getPlayerItems, getPlayerNotes, getPlayerRelics, updateRelics, updateUser } from '@/lib/appwrite/api';

import EuModal from '@/components/modals/EuModal';
import PericiasModal from '@/components/modals/PericiasModal';
import Avatar from '@/components/ui/avatar';
import AtributoBar from '@/components/Atributos/Barra';
import AtributosModal from '@/components/modals/AtributosModal';
import { ResponsiveTabs } from '@/components/ResponsiveTabs/ResponsiveTabs';
import { VidaStatus } from '@/components/ui/VidaStatus';

import PhantomAudio from '@/assets/audio/Phantom-Liberty.mp3';


const RootLayout = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { user, setUser } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  
  const [relics, setRelics] = useState<RelicsDocument | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);


  const [EuModalOpen, setEuModalOpen] = useState(false);
  const [PericiasModalOpen, setPericiasModalOpen] = useState(false);
  const [AtributosModalOpen, setAtributosModalOpen] = useState(false);
  
  const toggleMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.02;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const handleUpdateUser = async (data: Record<string, number>) => {
    if (!user) return;
    await updateUser(user.id, data);
    setUser((prev) =>
      prev ? {...prev, ...data} : prev
    );
  };
 
  const handleSavePericias = async (data: Record<string, number>) => {
    if (!user || !relics) return;

    // atualiza no backend APENAS o campo data
    await updateRelics(relics.$id, data);

    // atualiza o estado local
    setRelics((prev) =>
      prev
        ? {
            ...prev,
            data,
          }
        : prev
    );
  };


  const inventoryFeature: InventoryFeature = {
    items,
    actions: {
      create: (newItem) => {
        setItems((prev) => [newItem, ...prev]);
      },
      delete: (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      },
    },
  };


  const notesFeature: NotesFeature = {
    notes,
    actions: {
      create: (newNote) => {
        setNotes((prev) => [newNote, ...prev]);
      },
      delete: (noteId) => {
        setNotes((prev) => prev.filter((note) => note.$id !== noteId));
      },
    },
  };



  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  useEffect(() => {
    if (!user) return;

    const loadRelics = async () => {
      const data = await getPlayerRelics(user.id);
      if (data) setRelics(data);
    };
    
    const loadItems = async () => {
      const documents = await getPlayerItems(user.id);
      const parsedItems: Item[] = documents.map((doc) => ({
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        image: doc.image,
        quantity: doc.quantity ?? 0,
      }));

      setItems(parsedItems);
    };

    const loadNotes = async () => {
      const documents = await getPlayerNotes(user.id);
      const parsedNotes: Note[] = documents.map((doc) => ({
        $id: doc.$id,
        title: doc.title,
        text: doc.text,
        createdAt: doc.createdAt,
      }));

      setNotes(parsedNotes);
    };


    loadNotes();
    loadItems();
    loadRelics();
  }, [user]);
  
  
  return (
    <div className="container-rpg">
      <audio src={PhantomAudio} ref={audioRef}></audio>
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src={import.meta.env.VITE_VIDEO_BG} type="video/mp4"/>
        </video>
      </div>
      <div className={`content ${user.cyberpsychosis === 100 ? "dead" : ""}`}>
        <div className="box-dados">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <div className="logo">
                <h4 className='logo-titulo'>ANJOS DE FERRO</h4>
            </div>
            <div className="grupo-btn-header">
              <IconButton onClick={toggleMusic} title={isPlaying ? "Parar música" : "Tocar música"} color={isPlaying ? "primary" : "warning"}>
                <AudioLines />
              </IconButton>
              <IconButton
                onClick={() => signOut()}
                title="Sair"
                color="primary"
              >
                <LogOut />
              </IconButton>
            </div>
          </Box>

          <div className="personagem">
            <div className="personagem-status">
              <VidaStatus atual={user.currentHealth} max={user.maxHealth} />
            </div>

            <div className="personagem-dados">
              <Avatar img={user.imageUrl ?? null} />
              <div className="grupo-btn-personagem">
                <button className="btn-personagem tp" onClick={() => setEuModalOpen(true)}>
                  EU
                </button>
                <button className="btn-personagem bt" onClick={ () => setPericiasModalOpen(true)}>
                  PERICIAS
                </button>
              </div>
            </div>

            <div className="personagem-atributos">
              <div className="titulo-atributos">
                <div className="titulo-atributos-header">
                  <h4>ATRIBUTOS</h4>
                </div>
              </div>
              <div className="box-atributos">
                <AtributoBar label="Força" value={user.strength} max={100} />
                <AtributoBar label="Intelecto" value={user.intelligence} max={100} />
                <AtributoBar label="Agilidade" value={user.agility} max={100} />
                <AtributoBar label="Resilência" value={user.resilience} max={100} />
                <AtributoBar label="Moral" value={user.moral} max={100} />
              </div>
            </div>
          </div>

        </div>
        <div className="divisor">
          <svg width="16" height="928" viewBox="0 0 16 928" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M14.5 928L14.5 778L1 764.5L1 132.5L14.5 119L14.5 0" stroke="#FCEE21" strokeWidth="2"/>
          </svg>
        </div>
        <div className="box-conteudo">
          <ResponsiveTabs
            items={inventoryFeature}
            notes={notesFeature}
          />        
        </div>
      </div>

    
      {/* Modais */}
      <div className="modais-custom">
        <EuModal
          open={EuModalOpen}
          onClose={() => setEuModalOpen(false)}
          player={user}
          onSave={handleUpdateUser}
        />
        <PericiasModal
          open={PericiasModalOpen}
          onClose={() => setPericiasModalOpen(false)}
          relics={relics?.data ?? null}
          onSave={handleSavePericias}
        />
        <AtributosModal
          open={AtributosModalOpen}
          onClose={() => setAtributosModalOpen(false)}
          user={user}
          onSave={handleUpdateUser}
        />
      </div>

    </div>
  );
};

export default RootLayout;