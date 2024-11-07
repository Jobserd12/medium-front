import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPostsAPI } from '../api/posts';
import usePostStore from '../store/usePostStore';

export const usePosts = (page) => {
  const queryClient = useQueryClient();
  const { setTotalPagesPosts } = usePostStore();
  
  return useQuery({
    queryKey: ['posts', page],
    queryFn: async () => {
      const res = await fetchPostsAPI(page);
      const totalPages = Math.ceil(res.data.count / 9);
      setTotalPagesPosts(totalPages);
      queryClient.setQueryData(['posts', page], res.data.results);
      return res.data.results || [];
    },
    keepPreviousData: true,
    onError: (err) => console.error("Error fetching posts:", err)
  });
};
