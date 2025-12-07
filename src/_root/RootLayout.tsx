import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import { Tooltip } from '@mui/material';

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

  return (
    <section className="main w-full md:flex relative overflow-hidden">
      <video
        src="https://drbl5lmt8mq0ufbl.public.blob.vercel-storage.com/Phantom%20Liberty.webm"
        autoPlay
        loop
        muted
        className="overlay absolute inset-0 w-full h-full object-cover z-0"
      ></video>

      <audio ref={audioRef}>
        <source src="src/assets/audio/Phantom-Liberty.mp3" type="audio/mp3" />
      </audio>

      {/* Botão de Logout */}
      <Tooltip title="Sair" arrow>
        <button
          onClick={() => signOut()}
          className="absolute top-4  right-2 p-3 text-white shadow-lg z-20 cursor-pointer flex items-center justify-center"
        >
          <FiLogOut size={24} />
        </button>
      </Tooltip>

      {/* Botão Play/Pause */}
      <Tooltip title="Música" arrow>
        <button
          onClick={toggleMusic}
          className="absolute bottom-2 right-4 p-3 bg-red-600 cursor-pointer text-white rounded-full shadow-lg z-20 flex items-center justify-center"
        >
          {isPlaying ? <FaPause size={15} /> : <FaPlay size={15} />}
        </button>
      </Tooltip>

      <div className="content relative z-10 w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default RootLayout;
