import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

export type ApiSource = 'local' | 'rest' | 'graphql';
export type PublicApiSource = Exclude<ApiSource, 'local'>;

const isApiSource = (value: string | null): value is ApiSource =>
  value === 'local' || value === 'rest' || value === 'graphql';

interface UseApiSourceOptions {
  allowLocal?: boolean;
}

export const useApiSource = (
  options: UseApiSourceOptions = {}
): [ApiSource, (source: ApiSource) => void] => {
  const { allowLocal = true } = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedSource = searchParams.get('source');
  const defaultSource: ApiSource = allowLocal ? 'local' : 'rest';
  const source =
    isApiSource(requestedSource) && (allowLocal || requestedSource !== 'local')
      ? requestedSource
      : defaultSource;

  const setSource = React.useCallback(
    (nextSource: ApiSource) => {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set('source', nextSource);
      nextSearchParams.delete('page');
      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams]
  );

  return [source, setSource];
};
