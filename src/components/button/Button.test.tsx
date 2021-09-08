/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './Button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  test('it renders the button', () => {
    const label = 'Test';
    const { getByText } = render(
      <Button label={label} isLoading={false} onChange={() => null} />
    );
    const button = getByText(label);
    expect(button).toBeInTheDocument();
  });
  test('calls `onChange` on click', () => {
    const label = 'Test';
    const onChange = jest.fn();
    const { getByText } = render(
      <Button label={label} isLoading={false} onChange={onChange} />
    );
    const button = getByText(label);
    button.click();
    expect(onChange).toHaveBeenCalled();
  });
});
