import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const api = (import.meta.env.VITE_API as string) || null;
const githubToken = (import.meta.env.VITE_GITHUB_TOKEN as string) || null;

if (!api) {
  throw new Error('Missing Graphl API as `VITE_API` env variable.');
}

if (!githubToken) {
  throw new Error(
    'Missing Github personal access token as `VITE_GITHUB_TOKEN` env variable.'
  );
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: relayStylePagination(['query']),
      },
    },
  },
});

const client = new ApolloClient({
  uri: api,
  cache: cache,
  headers: {
    authorization: `token ${githubToken}`,
  },
});

export default client;
