import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotiAPI } from '../../api/noti';
import useNotificationStore from '../../store/useNotificationStore';
import Toast from '../../plugin/Toast';
import useUserData from '../../plugin/useUserData';

export const useNotification = () => {
    const queryClient = useQueryClient();
    const { setUnreadCount } = useNotificationStore();
    const userData = useUserData();

    return useQuery({
        queryKey: ['noti', userData?.user_id],
        queryFn: async () => {
            if (!userData?.user_id) {
                setUnreadCount(0);
                return [];
            }

            try {
                const res = await fetchNotiAPI(userData.user_id);
                const notifications = res.data || [];
                const unreadCount = notifications.filter(n => !n.seen).length;
                setUnreadCount(unreadCount);
                return notifications;
            } catch (error) {
                setUnreadCount(0);
                throw error;
            }
        },
        enabled: !!userData?.user_id,
        keepPreviousData: false,     
        retry: 1,                   
        staleTime: 30000,           
        onError: (err) => {
            Toast("error", "Failed to fetch notifications", "Please try again later.");
            setUnreadCount(0);
        }
    });
}