import 'globals'
import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    
    <main className='flex h-screen'>
        <Routes>
            {/*Public Routes*/}
            <Route path='/login-in' element={<LoginForm/>}/>
            {/*Private Routes*/}
            <Route index element={<Home/>}/>
        </Routes>
    </main>
  )
}

export default App