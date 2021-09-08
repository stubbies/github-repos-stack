import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import GitHubRepos from './modules/GitHubRepos';
import { globalStyles } from './common/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Global
        styles={css`
          ${emotionReset}
          ${globalStyles}
        `}
      />
      <GitHubRepos />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
