import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import * as classes from './collection-controls.styles';

interface Props {
  query: string;
  page: number;
  pageCount: number;
  searchLabel: string;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
}

export const CollectionControls: React.FunctionComponent<Props> = ({
  query,
  page,
  pageCount,
  searchLabel,
  onSearch,
  onPageChange,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSearch(String(formData.get('query') ?? '').trim());
  };

  return (
    <div className={classes.root}>
      <form className={classes.search} onSubmit={handleSubmit}>
        <TextField
          key={query}
          name="query"
          label={searchLabel}
          defaultValue={query}
          size="small"
          fullWidth
        />
        {query && (
          <IconButton aria-label="Clear search" onClick={() => onSearch('')}>
            <ClearIcon />
          </IconButton>
        )}
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </form>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={Math.min(page, pageCount)}
          onChange={(_, nextPage) => onPageChange(nextPage)}
          color="primary"
          showFirstButton
          showLastButton
        />
      )}
    </div>
  );
};
