import { gql, useQuery } from '@apollo/client';
import { Repository } from '@octokit/graphql-schema';

type SearchQueryVariables = {
  query: string;
  after?: string | null;
  first: number;
};

interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface SearchQueryResponse {
  search: {
    repositoryCount: number;
    pageInfo: PageInfo;
    edges: [{ node: Repository }];
  };
}

const SEARCH_QUERY = gql(`
  query Search($query: String!, $first: Int, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
            owner {
              avatarUrl
              login
            }
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            updatedAt
          }
        }
      }
    }
  }
`);

export function useSearch(variables: SearchQueryVariables) {
  return useQuery<SearchQueryResponse, SearchQueryVariables>(SEARCH_QUERY, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
}
