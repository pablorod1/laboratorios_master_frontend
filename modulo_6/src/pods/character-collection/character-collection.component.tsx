import * as React from 'react';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { CollectionControls } from '#common/components/collection-controls';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';

interface Props {
  characterCollection: CharacterEntityVm[];
  query: string;
  page: number;
  pageCount: number;
  isLoading: boolean;
  error: string;
  onEdit: (id: string) => void;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    characterCollection,
    query,
    page,
    pageCount,
    isLoading,
    error,
    onEdit,
    onSearch,
    onPageChange,
  } = props;

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4">
        Rick & Morty characters
      </Typography>

      <CollectionControls
        query={query}
        page={page}
        pageCount={pageCount}
        searchLabel="Character name"
        onSearch={onSearch}
        onPageChange={onPageChange}
      />

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : isLoading ? (
        <div className={classes.feedback}>
          <CircularProgress aria-label="Loading characters" />
        </div>
      ) : characterCollection.length === 0 ? (
        <Alert severity="info">No characters found</Alert>
      ) : (
        <ul className={classes.list}>
          {characterCollection.map((character) => (
            <li key={character.id}>
              <CharacterCard character={character} onEdit={onEdit} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
