import { useQuery, useQueryClient } from '@tanstack/react-query';
import { searchPostsAPI } from '../api/posts';
import usePostStore from '../store/usePostStore';

export const useSearchPosts = (query, page) => {
  const queryClient = useQueryClient();
  const { setTotalPagesSearch } = usePostStore();

  return useQuery({
    queryKey: ['searchPosts', query, page],
    queryFn: async () => {
      const res = await searchPostsAPI(query, page);
      const totalPages = Math.ceil(res.data.count / 9);
      setTotalPagesSearch(totalPages);
      queryClient.setQueryData(['searchPosts', query, page], { ...res.data, totalPages });
      return res.data.results ? Object.values(res.data.results) : [];
    },
    enabled: !!query,
    keepPreviousData: true,
    staleTime: Infinity,  
    onError: (err) => console.error("Error fetching search posts:", err)
  });
};
