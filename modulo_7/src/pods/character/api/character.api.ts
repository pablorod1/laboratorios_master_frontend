import { CharacterApi, CharacterUpdateApi } from './character.api-model';
import {
  getBestSentence,
  saveBestSentence,
} from '#common/api/best-sentence.repository';

const characterApiUrl =
  import.meta.env.VITE_RICK_AND_MORTY_API_URL ??
  'https://rickandmortyapi.com/api/character';

const throwOnError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getCharacter = async (id: string): Promise<CharacterApi> => {
  const response = await fetch(`${characterApiUrl}/${id}`);
  throwOnError(response);
  const character = (await response.json()) as CharacterApi;

  return {
    ...character,
    bestSentence: getBestSentence(String(character.id)),
  };
};

export const saveCharacter = async (
  id: string,
  character: CharacterUpdateApi
): Promise<boolean> => {
  saveBestSentence(id, character.bestSentence);
  return true;
};
