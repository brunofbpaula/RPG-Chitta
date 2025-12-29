import { CreateItemData, CreateNoteData, INewPlayer } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, createNote, createUserAccount, deleteItem, deleteNote, getCurrentUser, signInAccount, signOutAccount } from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInAccount(user),
  });
};

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewPlayer) => createUserAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};


export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};


export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ item, playerId }: { item: CreateItemData, playerId: string }) => createItem(item, playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
}

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ note, playerId }: { note: CreateNoteData, playerId: string }) => createNote(note, playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
}


export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
};