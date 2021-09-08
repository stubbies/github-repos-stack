/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { humanReadbleCount } from '../../common/utils';

type StatProps = {
  value: number;
  icon: ReactNode;
};

export default function Stat({ value, icon }: StatProps) {
  return (
    <div
      css={css`
        > svg {
          margin-right: 8px;
          vertical-align: text-bottom;
        }
      `}
    >
      {icon}
      {humanReadbleCount(value)}
    </div>
  );
}
