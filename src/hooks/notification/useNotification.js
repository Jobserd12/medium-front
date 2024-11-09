import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotiAPI } from '../../api/noti';
import useNotificationStore from '../../store/useNotificationStore';
import Toast from '../../plugin/Toast';

export const useNotification = (userId) => {
  const queryClient = useQueryClient();
  const { setUnreadCount } = useNotificationStore();

  return useQuery({
    queryKey: ['noti', userId],
    queryFn: async () => {
      const res = await fetchNotiAPI(userId);
      const notifications = res.data;
      const unreadCount = notifications.filter(n => !n.seen).length; 
      setUnreadCount(unreadCount); 
      queryClient.setQueryData(['noti', userId], notifications);
      return notifications || [];
    },
    keepPreviousData: true,
    onError: (err) => { 
      Toast("error", "Failed to fetch notifications", "Please try again later."); 
    },
    useErrorBoundary: true
  });
};

