import { Outlet } from 'react-router-dom';
import videoBg from '@/assets/video/Phantom Liberty.webm';
import PhantomLiberty from "@/assets/audio/Phantom-Liberty.mp3";

const RootLayout = () => {
  return (
    <section className='"main w-full md:flex'>
      <video src={videoBg} autoPlay loop muted className="overlay"></video>
      <div className='content'>
        <Outlet/>
      </div>
    </section>
  )
}

export default RootLayout