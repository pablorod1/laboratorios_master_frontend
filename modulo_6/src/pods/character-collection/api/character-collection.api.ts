import {
  CharacterCollectionApiResponse,
  CharacterEntityApi,
} from './character-collection.api-model';
import {
  getJson,
  graphQLRequest,
  GraphQLCharacterApi,
  HttpError,
  mapGraphQLCharacterToApi,
} from '#common/api';
import { ApiSource } from '#core/api-source';

const localApiUrl = 'http://localhost:3000/api/character';
const restApiUrl = 'https://rickandmortyapi.com/api/character';

interface CharacterCollectionParams {
  source: ApiSource;
  page: number;
  name: string;
}

const emptyCollection = (): CharacterCollectionApiResponse => ({
  info: { count: 0, pages: 0 },
  results: [],
});

const normalizeCollection = (
  response: CharacterCollectionApiResponse
): CharacterCollectionApiResponse => ({
  ...response,
  info: {
    count: response.info.count,
    pages: response.info.pages ?? (response.info.count > 0 ? 1 : 0),
  },
});

const getLocalCharacterCollection = async (
  name: string
): Promise<CharacterCollectionApiResponse> => {
  const response = normalizeCollection(
    await getJson<CharacterCollectionApiResponse>(localApiUrl)
  );
  const normalizedName = name.trim().toLocaleLowerCase();

  if (!normalizedName) {
    return response;
  }

  const results = response.results.filter(({ name: characterName }) =>
    characterName.toLocaleLowerCase().includes(normalizedName)
  );

  return {
    info: { count: results.length, pages: results.length > 0 ? 1 : 0 },
    results,
  };
};

const getRestCharacterCollection = async (
  page: number,
  name: string
): Promise<CharacterCollectionApiResponse> => {
  const url = new URL(restApiUrl);
  url.searchParams.set('page', String(page));

  if (name.trim()) {
    url.searchParams.set('name', name.trim());
  }

  try {
    return normalizeCollection(
      await getJson<CharacterCollectionApiResponse>(url.toString())
    );
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return emptyCollection();
    }

    throw error;
  }
};

const charactersQuery = `
  query Characters($page: Int!, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
      }
      results {
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
  }
`;

interface GraphQLCharactersResponse {
  characters: {
    info: { count: number; pages: number };
    results: GraphQLCharacterApi[];
  } | null;
}

const getGraphQLCharacterCollection = async (
  page: number,
  name: string
): Promise<CharacterCollectionApiResponse> => {
  const { characters } = await graphQLRequest<
    GraphQLCharactersResponse,
    { page: number; name?: string }
  >(charactersQuery, {
    page,
    name: name.trim() || undefined,
  });

  if (!characters) {
    return emptyCollection();
  }

  return {
    info: characters.info,
    results: characters.results.map(mapGraphQLCharacterToApi),
  };
};

export const getCharacterCollection = async ({
  source,
  page,
  name,
}: CharacterCollectionParams): Promise<CharacterCollectionApiResponse> => {
  switch (source) {
    case 'rest':
      return getRestCharacterCollection(page, name);
    case 'graphql':
      return getGraphQLCharacterCollection(page, name);
    default:
      return getLocalCharacterCollection(name);
  }
};

export type { CharacterEntityApi };
