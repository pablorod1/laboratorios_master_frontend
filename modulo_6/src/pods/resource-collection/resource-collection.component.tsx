import * as React from 'react';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { CollectionControls } from '#common/components/collection-controls';
import { ResourceItemVm, ResourceType } from './resource-collection.vm';
import * as classes from './resource-collection.styles';

interface Props {
  resourceType: ResourceType;
  items: ResourceItemVm[];
  query: string;
  page: number;
  pageCount: number;
  isLoading: boolean;
  error: string;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
}

const labels: Record<
  ResourceType,
  { title: string; search: string; empty: string }
> = {
  locations: {
    title: 'Rick & Morty locations',
    search: 'Location name',
    empty: 'No locations found',
  },
  episodes: {
    title: 'Rick & Morty episodes',
    search: 'Episode name',
    empty: 'No episodes found',
  },
};

export const ResourceCollectionComponent: React.FunctionComponent<Props> = ({
  resourceType,
  items,
  query,
  page,
  pageCount,
  isLoading,
  error,
  onSearch,
  onPageChange,
}) => {
  const copy = labels[resourceType];

  return (
    <section className={classes.root}>
      <Typography component="h1" variant="h4">
        {copy.title}
      </Typography>
      <CollectionControls
        query={query}
        page={page}
        pageCount={pageCount}
        searchLabel={copy.search}
        onSearch={onSearch}
        onPageChange={onPageChange}
      />

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : isLoading ? (
        <div className={classes.feedback}>
          <CircularProgress aria-label={`Loading ${resourceType}`} />
        </div>
      ) : items.length === 0 ? (
        <Alert severity="info">{copy.empty}</Alert>
      ) : (
        <ul className={classes.list}>
          {items.map((item) => (
            <li key={item.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    {item.overline}
                  </Typography>
                  <Typography component="h2" variant="h6">
                    {item.name}
                  </Typography>
                  <dl className={classes.facts}>
                    {item.facts.map(({ label, value }) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
