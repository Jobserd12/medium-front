import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesAPI } from '../api/posts';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetchCategoriesAPI();
      return res.data || [];
    }
  });
};
