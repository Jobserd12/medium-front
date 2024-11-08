import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';

const useNotificationStore = create((set) => ({
  notificatios: [],

  setNotifications: (noti) => set({ notificatios: noti }),
}));

export const queryClient = new QueryClient();

export default useNotificationStore;
