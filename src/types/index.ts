export type IContextType = {
    user: IPlayer;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IPlayer>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};
  
export type IPlayer = {
    id: string;
    email: string;
    name: string;
    age: number;
    goal: string;
    health: number;
    cyberpsychosis: boolean;
    imageUrl: string;
};
  