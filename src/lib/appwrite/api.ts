import { ID, ImageGravity, Query } from 'appwrite';
import { INewPlayer } from '@/types';
import { account, appwriteConfig, avatars, databases, storage } from './config';

export async function uploadFile(file: File) {
    try {
        console.log(file);
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
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            ImageGravity.Top,
            100
        );
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

export async function createUserAccount(user: INewPlayer) {

    try {
        
        const newAccount = await account.create(
            ID.unique(), 
            user.email, 
            user.password,
            user.name
        );

        console.log("New Account")
        
        const uploadedImage = await uploadFile(user.image);
        if (!uploadedImage) throw Error;

        console.log("Image uploaded")
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
            intelligence: 100,
            strength: 100,
            stealthiness: 100,
            moral: 100,
            resilience: 100
        })

        return newPlayer

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

        console.log(currentAccount)

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.playerCollection,
            [Query.equal('accountId', currentAccount.$id)]
        )

        console.log(currentUser);

        if (!currentUser) throw Error('No user found');

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}