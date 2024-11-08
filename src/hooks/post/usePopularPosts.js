import { useQuery } from '@tanstack/react-query';
import { fetchPopularPostsAPI } from '../../api/posts';

export const usePopularPosts = () => {
  return useQuery({
    queryKey: ['popularPosts'],
    queryFn: async () => {
      const res = await fetchPopularPostsAPI();
      return res.data ? Object.values(res.data) : [];
    }
  });
};
