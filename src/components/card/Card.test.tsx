/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render, cleanup } from '@testing-library/react';
import Card from './Card';
import { ForkIcon, StarIcon } from '../icon';
import Stat from '../stat';

afterEach(() => {
  cleanup();
});

describe('Card', () => {
  test('it renders', () => {
    const label = 'Title';
    const { getByText } = render(
      <Card
        meta={[
          <Stat key={'forks'} value={123123} icon={<ForkIcon size={16} />} />,
          <Stat key={'stars'} value={123123} icon={<StarIcon size={16} />} />,
        ]}
        title={label}
        subTitle={'subTitle'}
        thumbnail={'#'}
        description={'...'}
        url={'#'}
      />
    );
    const card = getByText(label);
    expect(card).toBeInTheDocument();
  });
});
