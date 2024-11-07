import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPostsByCategoryAPI } from '../api/posts';
import usePostStore from '../store/usePostStore';

export const usePostsByCategory = (slug) => {
  const queryClient = useQueryClient();
  const { currentPageCategory, setTotalPagesCategory } = usePostStore();
  
  return useQuery({
    queryKey: ['postsByCategory', slug, currentPageCategory],
    queryFn: async () => {
      const res = await fetchPostsByCategoryAPI(slug, currentPageCategory);
      const totalPages = Math.ceil(res.data.count / 9);
      setTotalPagesCategory(totalPages);
      queryClient.setQueryData(['postsByCategory', slug, currentPageCategory], res.data.results);
      return res.data.results || [];
    },
    keepPreviousData: true,
    onError: (err) => console.error("Error fetching posts by category:", err)
  });
};
