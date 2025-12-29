export type IContextType = {
  user: IPlayer | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IPlayer | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

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
    conditions: number[];
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

export interface CreateItemData {
  name: string;
  description: string;
  image: string;
}

export interface InventoryActions {
  create: (item: CreateItemData) => Promise<void>;
  delete: (itemId: string) => void;
}

export interface InventoryFeature {
  items: Item[];
  actions: InventoryActions;
}

export interface CreateNoteData {
  title: string;
  text: string;
}

export interface Note {
  $id: string;
  title: string;
  text: string;
  createdAt: string;
}

export interface NotesActions {
  create: (data: CreateNoteData) => Promise<void>;
  update: (noteId: string, data: Partial<Pick<Note, "title" | "text">>) => void;
  delete: (noteId: string) => Promise<void>;
}

export interface NotesFeature {
  notes: Note[];
  actions: NotesActions;
}


export interface ConditionsActions {
  update: (conditions: number[]) => Promise<void>;
}

export interface ConditionsFeature {
  conditions: number[];
  actions: ConditionsActions;
}

export interface PlayerTabsProps {
  items: InventoryFeature;
  notes: NotesFeature;
  conditions: ConditionsFeature;
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
  error?: boolean;
}


