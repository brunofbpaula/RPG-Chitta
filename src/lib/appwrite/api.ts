import { ID, ImageGravity, Query } from 'appwrite';
import { INewPlayer } from '@/types';
import { account, appwriteConfig, avatars, databases, storage } from './config';

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export function getFilePreview(fileId: string) {
    try {
        // Not available on free plan anymore
        // const fileUrl = storage.getFilePreview(
        //     appwriteConfig.storageId,
        //     fileId,
        //     2000,
        //     2000,
        //     ImageGravity.Top,
        //     100
        // );

        const fileUrl = storage.getFileView(
            appwriteConfig.storageId,
            fileId
        )
        console.log(fileUrl)
        return fileUrl;
    } catch (error) {
        console.log(error);
    };
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )
        return {status: "ok"};
    } catch (error) {
        console.log(error);
    }
}

export async function savePlayerToDB(player: {
    accountId: string;
    email: string;
    name: string;
    age: number;
    goal: string;
    imageUrl: string;
    sanity: number;
    intelligence: number;
    strength: number;
    stealthiness: number;
    moral: number;
    resilience: number;
}) {
    try {
        const newPlayer = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.playerCollection,
            ID.unique(),
            player
        )

        return newPlayer;
    } catch (error) {
        console.log(error);
    }
}

export async function createPlayerRelics(playerId: string) { 
    try {
        const newRelics = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.relicsCollection,
            ID.unique(),
            {
                player: playerId
            }
        )

        return newRelics;

    }
    catch (error) {
        console.log(error);        
    }
}

export async function createUserAccount(user: INewPlayer) {

    try {
        
        const newAccount = await account.create(
            ID.unique(), 
            user.email, 
            user.password,
            user.name
        );
        
        const uploadedImage = await uploadFile(user.image);
        if (!uploadedImage) throw Error;

        const imageUrl = getFilePreview(uploadedImage.$id);
        if (!imageUrl) {
            await deleteFile(uploadedImage.$id);
            throw Error;
        }

        const newPlayer = await savePlayerToDB({
            accountId: newAccount.$id,
            email: user.email,
            name: user.name,
            age: user.age,
            goal: user.goal,
            imageUrl: imageUrl,
            sanity: 100,
            intelligence: user.intelligence,
            strength: user.strength,
            stealthiness: user.stealthiness,
            moral: user.moral,
            resilience: user.resilience
        })


        await createPlayerRelics(newPlayer!.$id);

        return newPlayer;

    } catch (error) {
        console.log(error);
    }

}


export async function signInAccount(user: {email: string; password: string;}) {

    try {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        return session;
    } catch(error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        
        if(!currentAccount) throw Error('No account found');
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.playerCollection,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error('No user found');

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(userId: string, attributes: Record<string, number>) {
    try {
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.playerCollection,
            userId,
            attributes
        )

        return updatedUser;
    } catch (error) {
        console.log(error);
    }
}


export async function getPlayerItems(playerId: string) {

    try {
        const items = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.itemCollection,
            [Query.equal('playerId', playerId)]
        );

        if (!items) {
            throw Error('No items found');
        }

        return items;
    } catch (error) {
        console.log(error);
    };

}

export async function getPlayerRelics(playerId: string) {
    try {
        const relics = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.relicsCollection,
            [Query.equal('player', playerId)]
        );

        if (!relics.documents || relics.documents.length === 0) {
            throw new Error('No relics found');
        }

        return relics.documents[0];
    } catch (error) {
        console.log(error);
    };
}

export async function updateRelics(relicsId: string, relics: Record<string, number>) {
    try {
        const updatedRelics = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.relicsCollection,
            relicsId,
            relics
        )

        return updatedRelics;
    } catch (error) {
        console.log(error);
    }
};

export async function updateItems(itemsId: string,items: Record<string, string>) {
  try {
    const updatedItems = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itemCollection,
      itemsId,
      items
    );

    return updatedItems;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createItem(item: Record<string, string>, playerId: string) {
    try {
        const newItem = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.itemCollection,
            ID.unique(),
            {
                name: item.name,
                description: item.description,
                image: item.image,
                quantity: 1,
                player: playerId 
            }
        )
        return newItem;
    } catch (error) {
        console.log(error);
    }
}

export async function createNote(note: Record<string, string>, playerId: string) {
    try {
        const newNote = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.noteCollection,
            ID.unique(),
            {
                title: note.title,
                text: note.text,
                createdAt: note.createdAt,
                player: playerId 
            }
        )
        return newNote;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteItem(itemId: string) {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.itemCollection,
            itemId
        )
        return {status: "ok"};
    } catch (error) {
        console.log(error);
    }
}

export async function deleteNote(noteId: string) {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.noteCollection,
            noteId
        )
        return {status: "ok"};
    } catch (error) {
        console.log(error);
    }
}