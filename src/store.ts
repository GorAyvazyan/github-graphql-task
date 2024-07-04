import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Repository } from './types';
import { createJSONStorage } from 'zustand/middleware';

interface StoreState {
  repositories: Repository[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
  setRepositories: (repos: Repository[]) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setEndCursor: (cursor: string | null) => void;
  setStartCursor: (cursor: string | null) => void;
  setTotalPages: (pages: number) => void;
  setPagination: (endCursor: string | null, hasNextPage: boolean) => void;
  clearSearchQuery: () => void;
  getRepoById: (id: string) => Repository | undefined;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      repositories: [],
      searchQuery: '',
      currentPage: 1,
      totalPages: 0,
      endCursor: null,
      startCursor: null,
      hasNextPage: false,
      setRepositories: (repos) => set({ repositories: repos }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setTotalPages: (pages: number) => set({ totalPages: pages }),
      setEndCursor: (cursor) => set(() => ({ endCursor: cursor })),
      setStartCursor: (cursor) => set(() => ({ startCursor: cursor })),
      setPagination: (endCursor, hasNextPage) => set({ endCursor, hasNextPage }),
      clearSearchQuery: () => set({ searchQuery: '' }),
      getRepoById: (id) => {
        const { repositories } = get();
        return repositories.find((repo) => repo.id === id);
      },
    }),
    {
      name: 'github-repo-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
