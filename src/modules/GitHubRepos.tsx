/** @jsx jsx */
import { jsx } from '@emotion/react';

type GitHubReposProps = {
  name?: string;
};

const GitHubRepos = (props: GitHubReposProps) => {
  return (
    <div>
      <div>Filters</div>
      <div css={{ color: 'hotpink' }}>Items</div>
    </div>
  );
};

export default GitHubRepos;
