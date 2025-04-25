import { ID, Query } from 'appwrite';
import { IPlayer } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config'

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