/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  card: css`
    display: block;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    min-width: 300px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.15s ease;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    outline: none;
    > div {
      padding: var(--space);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      flex: initial;
      grid-gap: 16px;
    }
    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
    }
  `,
  header: css`
    display: grid;
    grid-template-columns: 32px 1fr;
    grid-gap: 8px;
    align-items: center;
  `,
  title: css`
    overflow: hidden;
    > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    > div:first-of-type {
      font-weight: 500;
      line-height: 1.4rem;
      font-size: 1.2rem;
    }
    > div:last-child {
      font-weight: 400;
      line-height: 1.25rem;
      font-size: 0.875rem;
    }
  `,
  about: css`
    min-height: 48px;
    font-weight: 500;
    font-size: 0.875rem;
    color: #444;
    > p {
      line-height: 1.25rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `,
  image: css`
    width: 100%;
    height: 32px;
    background-size: cover;
    border-radius: 4px;
  `,
  meta: css`
    font-weight: 400;
    line-height: 1.25rem;
    font-size: 0.875rem;
    display: grid;
    grid-auto-flow: column;
  `,
};

type CardProps = {
  meta: ReactNode[];
  title: string;
  subTitle: string;
  thumbnail: string;
  description: string;
  url: string;
};

export default function Card(props: CardProps) {
  return (
    <a
      href={props.url}
      css={styles.card}
      title={`${props.subTitle} / ${props.title}`}
    >
      <div>
        <div css={styles.header}>
          <div
            css={styles.image}
            style={{ backgroundImage: `url(${props.thumbnail})` }}
          />
          <div css={styles.title}>
            <div>{props.title}</div>
            <div>{props.subTitle}</div>
          </div>
        </div>
        <div css={styles.about}>
          <p>{props.description}</p>
        </div>
        <div css={styles.meta}>{props.meta}</div>
      </div>
    </a>
  );
}
