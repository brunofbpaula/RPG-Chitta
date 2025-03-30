import './globals.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './_root/pages';
import LoginForm from './_auth/forms/LoginForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';


const App = () => {
  return (
    
    <main className='flex h-screen'>
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
    </main>
  )
}

export default App