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

export interface RelicsDocument {
  $id: string;
  player: string;
  data: Record<string, number>;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  image?: string;
  quantity: number;
}

export interface Note {
  $id: string;
  title: string;
  text: string;
  createdAt: string;
}

export interface CreateItemData {
  name: string;
  description: string;
  image: string;
}

export interface InventoryActions {
  create: (item: CreateItemData) => Promise<void>;
  delete: (itemId: string) => void;
}

export interface CreateNoteData {
  title: string;
  text: string;
}

export interface NotesActions {
  create: (data: CreateNoteData) => Promise<void>;
  update: (noteId: string, data: Partial<Pick<Note, "title" | "text">>) => void;
  delete: (noteId: string) => Promise<void>;
}

export interface InventoryFeature {
  items: Item[];
  actions: InventoryActions;
}

export interface NotesFeature {
  notes: Note[];
  actions: NotesActions;
}

export interface PlayerTabsProps {
  items: InventoryFeature;
  notes: NotesFeature;
}

export interface Contato {
  id: string;
  nome: string;
  avatar: string;
  ultimaMensagem: string;
}

export interface Mensagem {
  id: string;
  texto: string;
  autor: "eu" | "outro";
  data?: string;
}
