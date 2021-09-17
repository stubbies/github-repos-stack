/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import Button from '../components/button';
import { Card, CardSkeleton } from '../components/card';
import { ForkIcon, StarIcon } from '../components/icon';
import List from '../components/list';
import Stat from '../components/stat';
import { useSearch } from '../hooks/useSearch';

const queryFilters = [
  {
    label: 'Node',
    value: 'node',
  },
  {
    label: 'SCSS',
    value: 'scss',
  },
  {
    label: 'Typescript',
    value: 'typescript',
  },
  {
    label: 'React',
    value: 'react',
  },
  {
    label: 'Fastify',
    value: 'fastify',
  },
  {
    label: 'ThreeJs',
    value: 'threejs',
  },
];

const styles = {
  wrapper: css({}),
  container: css({
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '1048px',
    padding: 'var(--space)',
  }),
  content: css({
    display: 'grid',
    gridTemplatecolumns: '1fr',
    gridGap: 'var(--space)',
  }),
  repos: css({
    display: 'grid',
    gridGap: 'var(--space)',
    gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
  }),
};

const pageNum = 9;

const Repositories = React.memo(
  ({ query }: { query: string }) => {
    const { data, loading, fetchMore, error, networkStatus } = useSearch({
      query,
      first: pageNum,
      after: null,
    });
    const pageInfo = data?.search.pageInfo;
    return (
      <React.Fragment>
        <div css={styles.repos}>
          {loading && networkStatus !== NetworkStatus.fetchMore ? (
            <LoadingView items={6} />
          ) : error ? (
            `Error! ${error}`
          ) : data ? (
            data.search.edges.map(({ node: repo }) => (
              <Card
                key={repo.id}
                meta={[
                  <Stat
                    key={'forks'}
                    value={repo.forks.totalCount}
                    icon={<ForkIcon size={16} />}
                  />,
                  <Stat
                    key={'stars'}
                    value={repo.stargazers.totalCount}
                    icon={<StarIcon size={16} />}
                  />,
                ]}
                title={repo.name}
                subTitle={repo.owner.login}
                thumbnail={repo.owner.avatarUrl}
                description={repo.description as string}
                url={repo.url}
              />
            ))
          ) : null}
        </div>
        {pageInfo?.hasNextPage && (
          <Button
            label="Load more"
            isLoading={networkStatus === NetworkStatus.fetchMore}
            onChange={() =>
              fetchMore({
                variables: {
                  after: pageInfo.endCursor,
                },
              })
            }
          />
        )}
      </React.Fragment>
    );
  },
  (p, n) => p.query === n.query
);

const GitHubRepos = React.memo(() => {
  const [query, setQuery] = useState(queryFilters[0].value);
  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        <div css={styles.content}>
          <List
            onChange={(v) => setQuery(v)}
            items={queryFilters}
            selected={query}
          />
          <Repositories query={query} />
        </div>
      </div>
    </div>
  );
});

const LoadingView = React.memo(({ items }: { items: number }) => (
  <React.Fragment>
    {Array.from(Array(items).keys()).map((i) => (
      <CardSkeleton key={`skel_${i}`} />
    ))}
  </React.Fragment>
));

export default GitHubRepos;
