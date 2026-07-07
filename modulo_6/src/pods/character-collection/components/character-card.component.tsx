import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { CharacterEntityVm } from '../character-collection.vm';
import * as classes from './character-card.styles';

interface Props {
  character: CharacterEntityVm;
  onEdit: (id: string) => void;
}

export const CharacterCard: React.FunctionComponent<Props> = (props) => {
  const { character, onEdit } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={character.picture} aria-label={character.name} />}
        title={character.name}
        subheader={`${character.status} - ${character.species}`}
      />
      <CardMedia
        component="img"
        image={character.picture}
        title={character.name}
        className={classes.media}
      />
      <CardContent>
        <div className={classes.content}>
          <Typography variant="subtitle1" gutterBottom>
            {character.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current location: {character.location}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.bestSentence}
          >
            {character.bestSentence || 'No best sentence saved yet'}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label={`Edit ${character.name}`}
          onClick={() => onEdit(character.id)}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
