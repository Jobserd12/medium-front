import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';

const usePostStore = create((set) => ({
  currentSearchQuery: '',
  currentPagePosts: 1,
  currentPageCategory: 1,
  currentPageSearch: 1,
  totalPagesPosts: 1,
  totalPagesCategory: 1,
  totalPagesSearch: 1, 

  setCurrentPagePosts: (page) => set({ currentPagePosts: page }),
  setCurrentPageCategory: (page) => set({ currentPageCategory: page }),
  setCurrentPageSearch: (page) => set({ currentPageSearch: page }),
  setCurrentSearchQuery: (query) => set({ currentSearchQuery: query }),
  setTotalPagesPosts: (total) => set({ totalPagesPosts: total }),
  setTotalPagesCategory: (total) => set({ totalPagesCategory: total }),
  setTotalPagesSearch: (total) => set({ totalPagesSearch: total })
}));

export const queryClient = new QueryClient();

export default usePostStore;
