import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import Avatar from '@/components/ui/avatar';
import EuModal from '@/components/modals/EuModal';
import PericiasModal from '@/components/modals/PericiasModal';
import { ResponsiveTabs } from '@/components/ui/ResponsiveTabs';

const RootLayout = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  
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

  const [EuModalOpen, setEuModalOpen] = useState(false);
  const [PericiasModalOpen, setPericiasModalOpen] = useState(false);

  return (
    <div className="container-rpg">
      <div className="video-bg">
        <video autoPlay muted loop playsInline controls>
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
              <Avatar img="/src/assets/images/avatar.png" />
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
                <h4>ATRIBUTOS</h4>
              </div>
              <div className="box-atributos">
                <div className="atributo">
                  <p className="label-atributo">Força</p>
                  <div className="barra-atributo">
                    <div className="progresso-barra">
                      <span className='numero-progresso'></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divisor">
          <svg width="16" height="928" viewBox="0 0 16 928" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M14.5 928L14.5 778L1 764.5L1 132.5L14.5 119L14.5 0" stroke="#FCEE21" stroke-width="2"/>
          </svg>
        </div>
        <div className="box-conteudo">
          <ResponsiveTabs />
        </div>
      </div>

    
      {/* Modais */}
      <div className="modais-custom">
        <EuModal
          open={EuModalOpen}
          onClose={() => setEuModalOpen(false)}
          playerId={""}
        />
        <PericiasModal
          open={PericiasModalOpen}
          onClose={() => setPericiasModalOpen(false)}
          playerId={""}
        />
      </div>

    </div>
  );
};

export default RootLayout;

// <section className="w-full md:flex relative overflow-hidden">
//       <video
//         src="https://drbl5lmt8mq0ufbl.public.blob.vercel-storage.com/Phantom%20Liberty.webm"
//         autoPlay
//         loop
//         muted
//         className="overlay absolute inset-0 w-full h-full object-cover z-0"
//       ></video>

//       <audio ref={audioRef}>
//         <source src="https://drbl5lmt8mq0ufbl.public.blob.vercel-storage.com/Phantom-Liberty.mp3" type="audio/mp3" />
//       </audio>

//       {/* Botão de Logout */}
//       <Tooltip title="Sair" arrow>
//         <button
//           onClick={() => signOut()}
//           className="absolute top-4  right-2 p-3 text-white shadow-lg z-20 cursor-pointer flex items-center justify-center"
//         >
//           <FiLogOut size={24} />
//         </button>
//       </Tooltip>

//       {/* Botão Play/Pause */}
//       <Tooltip title="Música" arrow>
//         <button
//           onClick={toggleMusic}
//           className="absolute bottom-2 right-4 p-3 bg-red-600 cursor-pointer text-white rounded-full shadow-lg z-20 flex items-center justify-center"
//         >
//           {isPlaying ? <FaPause size={15} /> : <FaPlay size={15} />}
//         </button>
//       </Tooltip>

//       <div className="content relative z-10 w-full">
//         <Outlet />
//       </div>
//     </section>