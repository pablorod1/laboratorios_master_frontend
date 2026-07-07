import {
  CharacterCollectionApiResponse,
  CharacterEntityApi,
} from './character-collection.api-model';

const characterApiUrl = 'http://localhost:3000/api/character';

const throwOnError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getCharacterCollection = async (): Promise<
  CharacterEntityApi[]
> => {
  const response = await fetch(characterApiUrl);
  throwOnError(response);
  const characterCollection =
    (await response.json()) as CharacterCollectionApiResponse;

  return characterCollection.results;
};
