import * as React from 'react';
import { ApiSource } from '#core/api-source';
import { getResourceCollection } from './api';
import {
  mapEpisodeFromApiToVm,
  mapLocationFromApiToVm,
} from './resource-collection.mapper';
import { ResourceItemVm, ResourceType } from './resource-collection.vm';
import { EpisodeApi, LocationApi } from '#common/api';

interface LoadResourceCollectionParams {
  resourceType: ResourceType;
  source: ApiSource;
  page: number;
  name: string;
}

export const useResourceCollection = () => {
  const [items, setItems] = React.useState<ResourceItemVm[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const requestId = React.useRef(0);

  const loadResourceCollection = React.useCallback(async (
    params: LoadResourceCollectionParams
  ) => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true);
    setError('');

    try {
      const response = await getResourceCollection(params);
      const mappedItems = params.resourceType === 'locations'
        ? (response.results as LocationApi[]).map(mapLocationFromApiToVm)
        : (response.results as EpisodeApi[]).map(mapEpisodeFromApiToVm);

      if (currentRequestId === requestId.current) {
        setItems(mappedItems);
        setPageCount(response.info.pages);
      }
    } catch (requestError) {
      if (currentRequestId === requestId.current) {
        setItems([]);
        setPageCount(0);
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'The collection could not be loaded'
        );
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  }, []);

  return { items, pageCount, isLoading, error, loadResourceCollection };
};
