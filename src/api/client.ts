import { GraphQLClient } from 'graphql-request';

const apiUrl = 'https://api.github.com/graphql';

if (!import.meta.env.VITE_GITHUB_TOKEN) {
  throw new Error(
    'Missing Github personal access token as `VITE_GITHUB_TOKEN` env variable.'
  );
}

const client = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export default client;
