import { Repository } from '@octokit/graphql-schema';
import { useInfiniteQuery } from 'react-query';
import client from '../api/client';

type SearchQueryVariables = {
  query: string;
  after?: string;
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

interface SearchResponse {
  repositories: Repository[];
  pageInfo: PageInfo;
  repositoryCount: number;
}

const searchQuery = `
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
`;

const fetchRepositories = async (variables: SearchQueryVariables) =>
  client.request<SearchQueryResponse>(searchQuery, variables).then(
    (res): SearchResponse => ({
      repositories: res.search.edges.map((e) => e.node),
      pageInfo: res.search.pageInfo,
      repositoryCount: res.search.repositoryCount,
    })
  );

export function useSearch(variables: SearchQueryVariables) {
  return useInfiniteQuery<SearchResponse, Error>(
    `repositories_${variables.query}`,
    ({ pageParam = null }) =>
      fetchRepositories({
        ...variables,
        after: pageParam,
        query: `${variables.query} sort:stars`,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
      // getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
      refetchOnWindowFocus: false,
    }
  );
}
