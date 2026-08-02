import { CharacterApi } from './rick-and-morty.api-model';

interface GraphQLCharacterLocation {
  name: string;
}

export interface GraphQLCharacterApi {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: GraphQLCharacterLocation;
  location: GraphQLCharacterLocation;
  image: string;
  episode: { id: string }[];
  created: string;
}

export const mapGraphQLCharacterToApi = (
  character: GraphQLCharacterApi
): CharacterApi => ({
  ...character,
  id: Number(character.id),
  origin: { name: character.origin.name, url: '' },
  location: { name: character.location.name, url: '' },
  episode: character.episode.map(({ id }) => id),
  url: '',
});
