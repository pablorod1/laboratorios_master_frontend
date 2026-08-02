export interface PageInfoApi {
  count: number;
  pages: number;
}

export interface CollectionApiResponse<T> {
  info: PageInfoApi;
  results: T[];
}

export interface CharacterLocationApi {
  name: string;
  url: string;
}

export interface CharacterApi {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocationApi;
  location: CharacterLocationApi;
  image: string;
  episode: string[];
  url: string;
  created: string;
  bestSentence?: string;
}

export interface LocationApi {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface EpisodeApi {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}
