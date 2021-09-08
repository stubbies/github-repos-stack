import { useQuery } from 'urql';
import { SearchResultItemConnection } from '@octokit/graphql-schema';

type SearchQueryVariables = {
  tech: string;
  cursor?: string;
  perPage?: number;
};

const searchQuery = `
  query ($query: String!, $first: Int, $after: String) {
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
`;

export function useSearch({
  tech,
  cursor,
  perPage = 10,
}: SearchQueryVariables) {
  return useQuery<SearchResultItemConnection>({
    query: searchQuery,
    variables: {
      query: tech,
      after: cursor,
      first: perPage,
    },
  });
}
