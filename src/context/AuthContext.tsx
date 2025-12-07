import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IPlayer } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
    id: '',
    email: '',
    name: '',
    age: 0,
    goal: '',
    maxHealth: 100,
    currentHealth: 10,
    cyberpsychosis: 0,
    imageUrl: '',
    cyberImageUrl: '',
    sanity: 0,
    intelligence: 0,
    strength: 0,
    agility: 0,
    moral: 0,
    resilience: 0
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
          currentHealth: currentAccount.currentHealth,
          maxHealth: currentAccount.maxHealth,
          cyberpsychosis: currentAccount.cyberpsychosis,
          imageUrl: currentAccount.imageUrl,
          cyberImageUrl: currentAccount.cyberImageUrl,
          intelligence: currentAccount.intelligence,
          strength: currentAccount.strength,
          agility: currentAccount.agility,
          moral: currentAccount.moral,
          resilience: currentAccount.resilience
        });
        setIsAuthenticated(true);
        return true;
      } else {
        // Não tem usuário, limpa tudo
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
        return false;
      }

    } catch (error) {
      console.log("Erro ao verificar usuário:", error);
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
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
      navigate("/login");
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