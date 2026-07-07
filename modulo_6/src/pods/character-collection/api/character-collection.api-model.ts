interface CharacterLocationApi {
  name: string;
  url: string;
}

export interface CharacterEntityApi {
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

export interface CharacterCollectionApiResponse {
  info: {
    count: number;
  };
  results: CharacterEntityApi[];
}
