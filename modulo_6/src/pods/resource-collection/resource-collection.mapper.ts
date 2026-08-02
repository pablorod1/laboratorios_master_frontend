import { EpisodeApi, LocationApi } from '#common/api';
import { ResourceItemVm } from './resource-collection.vm';

export const mapLocationFromApiToVm = (
  location: LocationApi
): ResourceItemVm => ({
  id: String(location.id),
  name: location.name,
  overline: location.type,
  facts: [
    { label: 'Dimension', value: location.dimension },
    { label: 'Residents', value: String(location.residents.length) },
  ],
});

export const mapEpisodeFromApiToVm = (
  episode: EpisodeApi
): ResourceItemVm => ({
  id: String(episode.id),
  name: episode.name,
  overline: episode.episode,
  facts: [
    { label: 'Air date', value: episode.air_date },
    { label: 'Characters', value: String(episode.characters.length) },
  ],
});
