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
    health: 0,
    cyberpsychosis: false,
    imageUrl: '',
    cyberImageUrl: '',
    sanity: 0,
    intelligence: 0,
    strength: 0,
    stealthiness: 0,
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
          health: currentAccount.health,
          cyberpsychosis: currentAccount.cyberpsychosis,
          imageUrl: currentAccount.imageUrl,
          cyberImageUrl: currentAccount.cyberImageUrl,
          sanity: currentAccount.sanity,
          intelligence: currentAccount.intelligence,
          strength: currentAccount.strength,
          stealthiness: currentAccount.stealthiness,
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
    (async () => {
      // Executa a verificação real de autenticação
      const loggedIn = await checkAuthUser();

      // Se não está logado, redireciona para login, exceto se já estiver em /register
      if(!loggedIn){
        if(location.pathname !== "/register"){
          navigate("/login");
        }
      } else {
        // Se estiver logado e estiver em /login ou /register, pode redirecionar para home ou dashboard, se quiser
        if(location.pathname === "/login" || location.pathname === "/register"){
          navigate("/");
        }
      }
    })();
  }, [navigate]);

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