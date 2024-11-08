import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotiAPI } from '../../api/noti';
import Toast from '../../plugin/Toast';

export const useNotification = (userId) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['noti', userId],
    queryFn: async () => {
      const res = await fetchNotiAPI(userId);
      queryClient.setQueryData(['noti', userId], res.data);
      return res.data || [];
    },
    keepPreviousData: true,
    onError: (err) => { 
      console.error("Error fetching notifications:", err); 
      Toast("error", "Failed to fetch notifications", "Please try again later."); 
    },
    useErrorBoundary: true
  });
};

