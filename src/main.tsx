import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import GitHubRepos from './modules/GitHubRepos';
import { globalStyles } from './common/styles';
import client from './api/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Global
        styles={css`
          ${emotionReset}
          ${globalStyles}
        `}
      />
      <GitHubRepos />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
