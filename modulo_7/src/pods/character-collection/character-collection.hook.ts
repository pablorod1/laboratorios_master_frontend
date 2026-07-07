import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacterCollection } from './api/character-collection.api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from '#common/mappers';

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    CharacterEntityVm[]
  >(
    []
  );

  const loadCharacterCollection = React.useCallback(() => {
    getCharacterCollection().then((result) =>
      setCharacterCollection(mapToCollection(result, mapFromApiToVm))
    );
  }, []);

  return { characterCollection, loadCharacterCollection };
};
