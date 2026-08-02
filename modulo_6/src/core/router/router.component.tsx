import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { switchRoutes } from './routes';
import {
  CharacterCollectionScene,
  CharacterScene,
  EpisodeCollectionScene,
  LocationCollectionScene,
} from '#scenes';

export const RouterComponent: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path={switchRoutes.characterCollection}
          element={<CharacterCollectionScene />}
        />
        <Route
          path={switchRoutes.editCharacter}
          element={<CharacterScene />}
        />
        <Route
          path={switchRoutes.locations}
          element={<LocationCollectionScene />}
        />
        <Route
          path={switchRoutes.episodes}
          element={<EpisodeCollectionScene />}
        />
        <Route
          path={switchRoutes.root}
          element={<Navigate to={switchRoutes.characterCollection} />}
        />
      </Routes>
    </HashRouter>
  );
};
