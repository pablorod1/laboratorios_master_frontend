import * as apiModel from './api/character.api-model';
import * as viewModel from './character.vm';

export const mapCharacterFromApiToVm = (
  character: apiModel.CharacterApi
): viewModel.Character => ({
  id: String(character.id),
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  origin: character.origin.name,
  location: character.location.name,
  image: character.image,
  episodeCount: character.episode.length,
  bestSentence: character.bestSentence ?? '',
});

export const mapCharacterFromVmToApi = (
  character: viewModel.Character
): apiModel.CharacterUpdateApi => ({
  bestSentence: character.bestSentence,
});
