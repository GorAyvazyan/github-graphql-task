export interface LanguageEdge {
  edges: {
    node: {
      name: string;
      color: string;
    };
  }[];
}

export interface Repository {
  id: string;
  name: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description: string;
  languages: LanguageEdge;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
}

export interface Edge {
  cursor: string;
  node: Repository;
}

export interface SearchData {
  search: {
    repositoryCount: number;
    edges: Edge[];
    pageInfo: PageInfo;
  };
}
