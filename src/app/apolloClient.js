import { ApolloClient, InMemoryCache } from '@apollo/client';
import { apiUrl } from '../config'


export const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache()
});
