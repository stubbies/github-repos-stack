/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import Button from '../components/button';
import { Card, CardSkeleton } from '../components/card';
import { ForkIcon, StarIcon } from '../components/icon';
import List from '../components/list';
import Stat from '../components/stat';
import { useSearch } from '../hooks/useSearch';
import { QueryStatus } from '../common/types';

const queryFilters = [
  {
    label: 'React',
    value: 'react',
  },
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

const GitHubRepos = () => {
  const [query, setQuery] = useState(queryFilters[0].value);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useSearch({
    query,
    first: 9,
  });
  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        <div css={styles.content}>
          <List
            onChange={(v) => setQuery(v)}
            items={queryFilters}
            selected={query}
          />

          <div css={styles.repos}>
            {status === QueryStatus.loading ? (
              <React.Fragment>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </React.Fragment>
            ) : status === QueryStatus.error ? (
              <div>Oops...{error?.message}</div>
            ) : data ? (
              data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.repositories.map((repo) => (
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
                  ))}
                </React.Fragment>
              ))
            ) : null}
          </div>

          {data && hasNextPage ? (
            <Button
              label="Load more"
              isLoading={isFetchingNextPage}
              onChange={() => fetchNextPage()}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GitHubRepos;
