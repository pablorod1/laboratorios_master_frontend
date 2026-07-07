import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacter, saveCharacter } from './api/character.api';
import { createEmptyCharacter, Character } from './character.vm';
import {
  mapCharacterFromApiToVm,
  mapCharacterFromVmToApi,
} from './character.mappers';
import { linkRoutes } from '#core/router';
import { CharacterComponent } from './character.component';

export const CharacterContainer: React.FunctionComponent = () => {
  const [character, setCharacter] =
    React.useState<Character>(createEmptyCharacter);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      getCharacter(id).then((apiCharacter) =>
        setCharacter(mapCharacterFromApiToVm(apiCharacter))
      );
    }
  }, [id]);

  const handleSave = async (character: Character) => {
    const apiCharacter = mapCharacterFromVmToApi(character);
    const success = await saveCharacter(character.id, apiCharacter);
    if (success) {
      navigate(linkRoutes.characterCollection);
    } else {
      alert('Error saving character');
    }
  };

  const handleCancel = () => {
    navigate(linkRoutes.characterCollection);
  };

  return (
    <CharacterComponent
      character={character}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
