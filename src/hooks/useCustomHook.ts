import { useQuery } from 'react-query';

export default function useCustomHook() {
  return useQuery('customHook', () => 'Hello');
}
