import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacter, saveCharacter } from './api/character.api';
import { createEmptyCharacter, Character } from './character.vm';
import {
  mapCharacterFromApiToVm,
  mapCharacterFromVmToApi,
} from './character.mappers';
import { linkRoutes } from '#core/router';
import { useApiSource } from '#core/api-source';
import { CharacterComponent } from './character.component';

export const CharacterContainer: React.FunctionComponent = () => {
  const [character, setCharacter] =
    React.useState<Character>(createEmptyCharacter);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [source] = useApiSource();

  React.useEffect(() => {
    let isCurrentRequest = true;

    if (id) {
      setIsLoading(true);
      setError('');
      getCharacter(id, source)
        .then((apiCharacter) => {
          if (isCurrentRequest) {
            setCharacter(mapCharacterFromApiToVm(apiCharacter));
          }
        })
        .catch((requestError: unknown) => {
          if (isCurrentRequest) {
            setError(
              requestError instanceof Error
                ? requestError.message
                : 'The character could not be loaded'
            );
          }
        })
        .finally(() => {
          if (isCurrentRequest) {
            setIsLoading(false);
          }
        });
    }

    return () => {
      isCurrentRequest = false;
    };
  }, [id, source]);

  const handleSave = async (character: Character) => {
    if (source !== 'local') {
      return;
    }

    const apiCharacter = mapCharacterFromVmToApi(character);
    const success = await saveCharacter(character.id, apiCharacter);
    if (success) {
      navigate({
        pathname: linkRoutes.characterCollection,
        search: new URLSearchParams({ source }).toString(),
      });
    } else {
      alert('Error saving character');
    }
  };

  const handleCancel = () => {
    navigate({
      pathname: linkRoutes.characterCollection,
      search: new URLSearchParams({ source }).toString(),
    });
  };

  return (
    <CharacterComponent
      character={character}
      isEditable={source === 'local'}
      isLoading={isLoading}
      error={error}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
