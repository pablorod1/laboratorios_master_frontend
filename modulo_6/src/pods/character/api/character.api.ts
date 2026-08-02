import { CharacterApi, CharacterUpdateApi } from './character.api-model';
import {
  getJson,
  graphQLRequest,
  GraphQLCharacterApi,
  mapGraphQLCharacterToApi,
} from '#common/api';
import { ApiSource } from '#core/api-source';

const localApiUrl = 'http://localhost:3000/api/character';
const restApiUrl = 'https://rickandmortyapi.com/api/character';

const characterQuery = `
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin { name }
      location { name }
      image
      episode { id }
      created
    }
  }
`;

interface GraphQLCharacterResponse {
  character: GraphQLCharacterApi | null;
}

export const getCharacter = async (
  id: string,
  source: ApiSource
): Promise<CharacterApi> => {
  if (source === 'graphql') {
    const { character } = await graphQLRequest<
      GraphQLCharacterResponse,
      { id: string }
    >(characterQuery, { id });

    if (!character) {
      throw new Error('Character not found');
    }

    return mapGraphQLCharacterToApi(character);
  }

  const apiUrl = source === 'rest' ? restApiUrl : localApiUrl;

  return getJson<CharacterApi>(`${apiUrl}/${id}`);
};

export const saveCharacter = async (
  id: string,
  character: CharacterUpdateApi
): Promise<boolean> => {
  const response = await fetch(`${localApiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(character),
  });

  return response.ok;
};
