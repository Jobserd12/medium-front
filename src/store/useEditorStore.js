import { create } from 'zustand';

const useEditorStore = create((set) => ({
  title: '',
  content: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  reset: () => set({ title: '', content: '' })
}));

export default useEditorStore;

