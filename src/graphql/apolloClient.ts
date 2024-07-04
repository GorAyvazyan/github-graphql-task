import { ApolloClient, InMemoryCache } from '@apollo/client';

const token = import.meta.env.VITE_API_KEY;

export const apolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
