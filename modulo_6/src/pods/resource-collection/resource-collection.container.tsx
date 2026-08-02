import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApiSource } from '#core/api-source';
import { ResourceCollectionComponent } from './resource-collection.component';
import { useResourceCollection } from './resource-collection.hook';
import { ResourceType } from './resource-collection.vm';

interface Props {
  resourceType: ResourceType;
}

export const ResourceCollectionContainer: React.FunctionComponent<Props> = ({
  resourceType,
}) => {
  const { items, pageCount, isLoading, error, loadResourceCollection } =
    useResourceCollection();
  const [searchParams, setSearchParams] = useSearchParams();
  const [source] = useApiSource({ allowLocal: false });
  const requestedPage = Number(searchParams.get('page'));
  const page = Number.isInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const query = searchParams.get('name') ?? '';

  React.useEffect(() => {
    loadResourceCollection({ resourceType, source, page, name: query });
  }, [loadResourceCollection, page, query, resourceType, source]);

  const updateSearchParams = (values: Record<string, string | null>) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        nextSearchParams.set(key, value);
      } else {
        nextSearchParams.delete(key);
      }
    });

    setSearchParams(nextSearchParams);
  };

  return (
    <ResourceCollectionComponent
      resourceType={resourceType}
      items={items}
      query={query}
      page={page}
      pageCount={pageCount}
      isLoading={isLoading}
      error={error}
      onSearch={(name) => updateSearchParams({ name, page: null })}
      onPageChange={(nextPage) =>
        updateSearchParams({ page: String(nextPage) })
      }
    />
  );
};
