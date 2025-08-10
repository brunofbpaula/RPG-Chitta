import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <section className='"main w-full md:flex'>
      <video src={"https://drbl5lmt8mq0ufbl.public.blob.vercel-storage.com/Phantom%20Liberty.webm"} autoPlay loop muted className="overlay"></video>
      <div className='content'>
        <Outlet/>
      </div>
    </section>
  )
}

export default RootLayout