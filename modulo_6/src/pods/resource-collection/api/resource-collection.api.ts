import {
  CollectionApiResponse,
  EpisodeApi,
  getJson,
  graphQLRequest,
  HttpError,
  LocationApi,
} from '#common/api';
import { ApiSource } from '#core/api-source';
import { ResourceType } from '../resource-collection.vm';

interface ResourceCollectionParams {
  resourceType: ResourceType;
  source: ApiSource;
  page: number;
  name: string;
}

export type ResourceCollectionApiResponse = CollectionApiResponse<
  LocationApi | EpisodeApi
>;

const restApiUrl = 'https://rickandmortyapi.com/api';

const emptyCollection = (): ResourceCollectionApiResponse => ({
  info: { count: 0, pages: 0 },
  results: [],
});

const getRestResourceCollection = async (
  resourceType: ResourceType,
  page: number,
  name: string
): Promise<ResourceCollectionApiResponse> => {
  const endpoint = resourceType === 'locations' ? 'location' : 'episode';
  const url = new URL(`${restApiUrl}/${endpoint}`);
  url.searchParams.set('page', String(page));

  if (name.trim()) {
    url.searchParams.set('name', name.trim());
  }

  try {
    return await getJson<ResourceCollectionApiResponse>(url.toString());
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return emptyCollection();
    }

    throw error;
  }
};

const locationsQuery = `
  query Locations($page: Int!, $name: String) {
    locations(page: $page, filter: { name: $name }) {
      info { count pages }
      results {
        id
        name
        type
        dimension
        residents { id }
      }
    }
  }
`;

const episodesQuery = `
  query Episodes($page: Int!, $name: String) {
    episodes(page: $page, filter: { name: $name }) {
      info { count pages }
      results {
        id
        name
        air_date
        episode
        characters { id }
      }
    }
  }
`;

interface GraphQLLocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: { id: string }[];
}

interface GraphQLEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: { id: string }[];
}

interface GraphQLLocationsResponse {
  locations: {
    info: { count: number; pages: number };
    results: GraphQLLocation[];
  } | null;
}

interface GraphQLEpisodesResponse {
  episodes: {
    info: { count: number; pages: number };
    results: GraphQLEpisode[];
  } | null;
}

const getGraphQLLocations = async (
  page: number,
  name: string
): Promise<ResourceCollectionApiResponse> => {
  const { locations } = await graphQLRequest<
    GraphQLLocationsResponse,
    { page: number; name?: string }
  >(locationsQuery, { page, name: name.trim() || undefined });

  if (!locations) {
    return emptyCollection();
  }

  return {
    info: locations.info,
    results: locations.results.map((location) => ({
      ...location,
      id: Number(location.id),
      residents: location.residents.map(({ id }) => id),
    })),
  };
};

const getGraphQLEpisodes = async (
  page: number,
  name: string
): Promise<ResourceCollectionApiResponse> => {
  const { episodes } = await graphQLRequest<
    GraphQLEpisodesResponse,
    { page: number; name?: string }
  >(episodesQuery, { page, name: name.trim() || undefined });

  if (!episodes) {
    return emptyCollection();
  }

  return {
    info: episodes.info,
    results: episodes.results.map((episode) => ({
      ...episode,
      id: Number(episode.id),
      characters: episode.characters.map(({ id }) => id),
    })),
  };
};

export const getResourceCollection = async ({
  resourceType,
  source,
  page,
  name,
}: ResourceCollectionParams): Promise<ResourceCollectionApiResponse> => {
  if (source !== 'graphql') {
    return getRestResourceCollection(resourceType, page, name);
  }

  return resourceType === 'locations'
    ? getGraphQLLocations(page, name)
    : getGraphQLEpisodes(page, name);
};
