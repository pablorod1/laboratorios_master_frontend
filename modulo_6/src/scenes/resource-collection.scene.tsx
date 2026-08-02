import * as React from 'react';
import { AppLayout } from '#layouts';
import { ResourceCollectionContainer } from '#pods/resource-collection';

export const LocationCollectionScene = () => (
  <AppLayout>
    <ResourceCollectionContainer resourceType="locations" />
  </AppLayout>
);

export const EpisodeCollectionScene = () => (
  <AppLayout>
    <ResourceCollectionContainer resourceType="episodes" />
  </AppLayout>
);
