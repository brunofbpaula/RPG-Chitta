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
    currentHealth: number;
    maxHealth: number;
    imageUrl: string;
    cyberImageUrl: string;
    cyberpsychosis: number;
    strength: number;
    agility: number;
    intelligence: number;
    moral: number;
    resilience: number;
};

export type INewPlayer = {
    email: string;
    password: string;
    name: string;
    age: number;
    goal: string;
    image: File;
    cyberpsychosis: number;
    currentHealth: number;
    maxHealth: number;
    strength: number;
    agility: number;
    intelligence: number;
    moral: number;
    resilience: number;
}