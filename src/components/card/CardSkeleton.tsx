/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const styles = {
  card: css`
    background: #eaeaea;
    border-radius: var(--borderRadius);
    min-width: 300px;
    height: 190px;
    > div {
      padding: var(--space);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      flex: initial;
      grid-gap: 16px;
    }
  `,
};

export default function CardSkeleton() {
  return (
    <div css={styles.card}>
      <div />
    </div>
  );
}
