import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiSource, useApiSource } from '#core/api-source';
import { switchRoutes } from '#core/router';
import * as classes from './app.layout.styles';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const isCharacterSection = location.pathname.startsWith('/characters');
  const currentSection = location.pathname.startsWith('/locations')
    ? switchRoutes.locations
    : location.pathname.startsWith('/episodes')
      ? switchRoutes.episodes
      : switchRoutes.characterCollection;
  const [source, setSource] = useApiSource({
    allowLocal: isCharacterSection,
  });

  const navigateToSection = (path: string) => {
    const nextSource =
      path !== switchRoutes.characterCollection && source === 'local'
        ? 'rest'
        : source;

    navigate({
      pathname: path,
      search: new URLSearchParams({ source: nextSource }).toString(),
    });
  };

  const handleSourceChange = (_: React.MouseEvent<HTMLElement>, value: ApiSource | null) => {
    if (value) {
      setSource(value);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.brand}>
            <PublicIcon />
            <Typography component="span" variant="h6">
              Rick & Morty API Lab
            </Typography>
          </div>
          <ToggleButtonGroup
            value={source}
            exclusive
            size="small"
            onChange={handleSourceChange}
            aria-label="API source"
            className={classes.sourceSelector}
          >
            {isCharacterSection && (
              <ToggleButton value="local">Local</ToggleButton>
            )}
            <ToggleButton value="rest">REST</ToggleButton>
            <ToggleButton value="graphql">GraphQL</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
        <Tabs
          value={currentSection}
          onChange={(_, path: string) => navigateToSection(path)}
          aria-label="Resources"
          variant="scrollable"
          scrollButtons="auto"
          className={classes.navigation}
        >
          <Tab label="Characters" value={switchRoutes.characterCollection} />
          <Tab label="Locations" value={switchRoutes.locations} />
          <Tab label="Episodes" value={switchRoutes.episodes} />
        </Tabs>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </>
  );
};
