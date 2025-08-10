import { INewPlayer } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, createNote, createUserAccount, deleteItem, deleteNote, getCurrentUser, signInAccount, updateItems } from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';
import { create } from 'domain';

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

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};


export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ item, playerId }: { item: Record<string, string>, playerId: string }) => createItem(item, playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
}

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ note, playerId }: { note: Record<string, string>, playerId: string }) => createNote(note, playerId),
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