import create from "zustand";

const useBookStore = create((set) => ({
  books: [],
  favorites: [],
  recommendations: [],
  setBooks: (books) => set({ books }),
  addFavorite: (book) => set((state) => ({
    favorites: [...state.favorites, book]
  })),
  setRecommendations: (recs) => set({ recommendations: recs })
}));

export default useBookStore;
