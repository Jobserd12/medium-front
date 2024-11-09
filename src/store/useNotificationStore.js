import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';

const useNotificationStore = create((set) => ({
  notificatios: [],
  unreadCount: 0,

  setNotifications: (noti) => set({ notificatios: noti }),
  setUnreadCount: (count) => set({ unreadCount: count }),
}));

export const queryClient = new QueryClient();

export default useNotificationStore;
