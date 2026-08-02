import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { useApiSource } from '#core/api-source';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';

export const CharacterCollectionContainer = () => {
  const {
    characterCollection,
    pageCount,
    isLoading,
    error,
    loadCharacterCollection,
  } = useCharacterCollection();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [source] = useApiSource();
  const requestedPage = Number(searchParams.get('page'));
  const page = Number.isInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const query = searchParams.get('name') ?? '';

  React.useEffect(() => {
    loadCharacterCollection({ source, page, name: query });
  }, [loadCharacterCollection, page, query, source]);

  const handleEdit = (id: string) => {
    navigate({
      pathname: linkRoutes.editCharacter(id),
      search: new URLSearchParams({ source }).toString(),
    });
  };

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

  const handleSearch = (name: string) => {
    updateSearchParams({ name, page: null });
  };

  const handlePageChange = (nextPage: number) => {
    updateSearchParams({ page: String(nextPage) });
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      query={query}
      page={page}
      pageCount={pageCount}
      isLoading={isLoading}
      error={error}
      onEdit={handleEdit}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
    />
  );
};
