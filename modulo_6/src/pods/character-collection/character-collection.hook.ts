import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacterCollection } from './api/character-collection.api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from '#common/mappers';
import { ApiSource } from '#core/api-source';

interface LoadCharacterCollectionParams {
  source: ApiSource;
  page: number;
  name: string;
}

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    CharacterEntityVm[]
  >([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const requestId = React.useRef(0);

  const loadCharacterCollection = React.useCallback(async (
    params: LoadCharacterCollectionParams
  ) => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true);
    setError('');

    try {
      const response = await getCharacterCollection(params);

      if (currentRequestId === requestId.current) {
        setCharacterCollection(
          mapToCollection(response.results, mapFromApiToVm)
        );
        setPageCount(response.info.pages);
      }
    } catch (requestError) {
      if (currentRequestId === requestId.current) {
        setCharacterCollection([]);
        setPageCount(0);
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Characters could not be loaded'
        );
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  }, []);

  return {
    characterCollection,
    pageCount,
    isLoading,
    error,
    loadCharacterCollection,
  };
};
