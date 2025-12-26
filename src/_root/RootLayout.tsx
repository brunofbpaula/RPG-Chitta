import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import Avatar from '@/components/ui/avatar';
import EuModal from '@/components/modals/EuModal';
import PericiasModal from '@/components/modals/PericiasModal';
import { ResponsiveTabs } from '@/components/ResponsiveTabs/ResponsiveTabs';
import { useUserContext } from '@/context/AuthContext';
import { getPlayerItems, getPlayerRelics, updateRelics, updateUser } from '@/lib/appwrite/api';
import AtributoBar from '@/components/Atributos/Barra';
import AtributosModal from '@/components/modals/AtributosModal';
import { SquarePen } from 'lucide-react';

interface RelicsDocument {
  $id: string;
  player: string;
  data: Record<string, number>;
}

export interface InventarioItem {
  id: string;
  nome: string;
  descricao: string;
  imagem?: string;
  quantidade?: number;
}

interface InventarioDocument {
  $id: string;
  player: string;
  items: InventarioItem[];
}


const RootLayout = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { user, setUser } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  
  const [relics, setRelics] = useState<RelicsDocument | null>(null);
  const [items, setItems] = useState<InventarioDocument | null>(null);
  const [inventario, setInventario] = useState<InventarioItem[]>([]);


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


  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  useEffect(() => {
    if (!user) return;

    
    const loadRelics = async () => {
      const data = await getPlayerRelics(user.id);
      if (data) setRelics(data);
    };
    
    // const loadItems = async () => {
    //   const doc = await getPlayerItems(user.id);
    //   if (doc?.items) {
    //     setInventario(doc.items);
    //   }
    // };

    // loadItems();
    loadRelics();
  }, [user]);  
  
  
  return (
    <div className="container-rpg">
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/src/assets/video/Phantom_Liberty.webm" type="video/mp4"/>
        </video>
      </div>
      <div className="content">
        <div className="box-dados">
          <div className="logo lg">
              <h4 className='logo-titulo'>ANJOS DE FERRO</h4>
          </div>

          <div className="personagem">
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
                  {/* <button
                    className="btn-editar-atributos cursor-pointer"
                    onClick={() => setAtributosModalOpen(true)}
                    title="Editar atributos"
                  >
                    <SquarePen size={16} />
                  </button> */}
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
          <ResponsiveTabs user={user}/>
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