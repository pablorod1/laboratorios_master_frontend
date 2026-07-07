import {
  CharacterCollectionApiResponse,
  CharacterEntityApi,
} from './character-collection.api-model';
import { getBestSentence } from '#common/api/best-sentence.repository';

const characterApiUrl =
  import.meta.env.VITE_RICK_AND_MORTY_API_URL ??
  'https://rickandmortyapi.com/api/character';

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

  return characterCollection.results.map((character) => ({
    ...character,
    bestSentence: getBestSentence(String(character.id)),
  }));
};
