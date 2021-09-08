/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

type ListItem = {
  label: string;
  value: string;
};

type ListProps = {
  items: ListItem[];
  selected: string;
  onChange: (v: string) => void;
};

const selectedStyle = css`
  font-weight: 500;
  border-bottom: solid 1px;
`;

const List = ({ items, onChange, selected }: ListProps) => {
  return (
    <div
      css={css`
        display: flex;
        font-size: 1.2rem;
        flex-wrap: wrap;
        > div {
          padding: 10px 0;
          margin: 0 var(--space) 0 0;
          cursor: pointer;
        }
      `}
    >
      {items.map((item, k) => (
        <div
          key={k}
          onClick={() => onChange(item.value)}
          css={item.value === selected ? selectedStyle : ''}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default React.memo(
  List,
  (pProps, nProps) => pProps.selected === nProps.selected
);
