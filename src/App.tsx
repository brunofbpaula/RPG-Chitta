import { Route, Routes } from 'react-router-dom';
import { Home } from './_root/pages';
import LoginForm from './_auth/forms/LoginForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/sonner"
import SignUpForm from './_auth/forms/SignUpForm';

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/*Public Routes*/}
            <Route element={<AuthLayout/>}>
              <Route path='/login' element={<LoginForm/>}/>
              <Route path='/register' element={<SignUpForm/>}/>
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