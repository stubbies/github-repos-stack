import { createClient } from 'urql';

if (!import.meta.env.VITE_GITHUB_TOKEN) {
  throw new Error(
    'Missing Github personal access token as `VITE_GITHUB_TOKEN` env variable.'
  );
}

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  },
});

export default client;
