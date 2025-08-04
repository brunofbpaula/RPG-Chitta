import { Route, Routes } from 'react-router-dom';
import { Home } from './_root/pages';
import LoginForm from './_auth/forms/LoginForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/sonner"
import PhantomLiberty from "@/assets/audio/Phantom-Liberty.mp3";
import { useEffect, useRef } from 'react';


const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.030; // Set to 50% volume
    }
  }, []);
  
  return (
    
    <main className='flex h-screen'>
        <audio ref={audioRef} src={PhantomLiberty} autoPlay loop ></audio>
        <Routes>
            {/*Public Routes*/}
            <Route element={<AuthLayout/>}>
              <Route path='/login' element={<LoginForm/>}/>

            </Route>
            {/*Private Routes*/}
            <Route element={<RootLayout/>}>
              <Route index element={<Home/>}/>
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App