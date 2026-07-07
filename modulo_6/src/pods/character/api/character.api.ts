import { CharacterApi, CharacterUpdateApi } from './character.api-model';

const characterApiUrl = 'http://localhost:3000/api/character';

const throwOnError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getCharacter = async (id: string): Promise<CharacterApi> => {
  const response = await fetch(`${characterApiUrl}/${id}`);
  throwOnError(response);

  return response.json();
};

export const saveCharacter = async (
  id: string,
  character: CharacterUpdateApi
): Promise<boolean> => {
  const response = await fetch(`${characterApiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(character),
  });

  return response.ok;
};
