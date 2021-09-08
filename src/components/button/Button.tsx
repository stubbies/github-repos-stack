/** @jsx jsx */
import { jsx, css } from '@emotion/react';

type ButtonProps = {
  label: string;
  isLoading: boolean;
  onChange: () => void;
};

const styles = css({
  fontSize: '12px',
  padding: '3px',
  borderRadius: 'var(--borderRadius)',
  border: '1px solid #eaeaea',
  background: '#fff',
  color: '#000',
  cursor: 'pointer',
  transition: 'all 0.2s ease 0s',
  height: '46px',
  textTransform: 'uppercase',
  '&[disabled]': {
    opacity: 0.7,
    cursor: 'default',
  },
});

export default function Button({
  label,
  isLoading = false,
  onChange,
}: ButtonProps) {
  return (
    <button css={styles} type="button" onClick={onChange} disabled={isLoading}>
      {isLoading ? 'Loading more...' : label}
    </button>
  );
}
