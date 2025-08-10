import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    playerCollection: import.meta.env.VITE_APPWRITE_PLAYER_COLLECTION_ID,
    noteCollection: import.meta.env.VITE_APPWRITE_NOTE_COLLECTION_ID,
    itemCollection: import.meta.env.VITE_APPWRITE_ITEM_COLLECTION_ID,
    relicsCollection: import.meta.env.VITE_APPWRITE_RELICS_COLLECTION_ID
}


export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);