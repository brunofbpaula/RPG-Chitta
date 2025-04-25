import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IPlayer } from '@/types'
import { create } from 'domain'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
    id: '',
    email: '',
    name: '',
    age: 0,
    goal: '',
    health: 0,
    cyberpsychosis: false,
    imageUrl: ''
}

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}: {children: React.ReactNode} ) => {
  
  const [user, setUser] = useState<IPlayer>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      const currentAccount = await getCurrentUser();

      if(currentAccount){
        setUser({
          id: currentAccount.$id,
          email: currentAccount.email,
          name: currentAccount.name,
          age: currentAccount.age,
          goal: currentAccount.goal,
          health: currentAccount.health,
          cyberpsychosis: currentAccount.cyberpsychosis,
          imageUrl: currentAccount.imageUrl
        })
        setIsAuthenticated(true);
  
        return true;
      }

      return false;


    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);