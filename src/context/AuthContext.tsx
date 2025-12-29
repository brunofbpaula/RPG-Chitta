import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IPlayer } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const INITIAL_USER: IPlayer = {
  id: "",
  email: "",
  name: "",
  age: 0,
  goal: "",
  conditions: [],
  maxHealth: 100,
  currentHealth: 0,
  cyberpsychosis: 0,
  imageUrl: "",
  cyberImageUrl: "",
  intelligence: 0,
  strength: 0,
  agility: 0,
  moral: 0,
  resilience: 0,
};

const AuthContext = createContext<IContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IPlayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);

      const currentAccount = await getCurrentUser();

      if (!currentAccount) {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }

      setUser({
        id: currentAccount.$id,
        email: currentAccount.email,
        name: currentAccount.name,
        age: currentAccount.age,
        goal: currentAccount.goal,
        conditions: currentAccount.conditions,
        currentHealth: currentAccount.currentHealth,
        maxHealth: currentAccount.maxHealth,
        cyberpsychosis: currentAccount.cyberpsychosis,
        imageUrl: currentAccount.imageUrl,
        cyberImageUrl: currentAccount.cyberImageUrl,
        intelligence: currentAccount.intelligence,
        strength: currentAccount.strength,
        agility: currentAccount.agility,
        moral: currentAccount.moral,
        resilience: currentAccount.resilience,
      });

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
