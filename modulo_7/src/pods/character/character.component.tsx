import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextFieldComponent } from '#common/components/form/text-field';
import { Character } from './character.vm';
import * as classes from './character.styles';

interface Props {
  character: Character;
  onSave: (character: Character) => void;
  onCancel: () => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, onSave, onCancel } = props;

  return (
    <Formik
      onSubmit={onSave}
      initialValues={character}
      enableReinitialize={true}
    >
      {() => (
        <Form className={classes.root}>
          <div className={classes.summary}>
            {character.image && (
              <img
                className={classes.image}
                src={character.image}
                alt={character.name}
              />
            )}
            <div className={classes.content}>
              <Typography component="h1" variant="h4">
                {character.name}
              </Typography>
              <dl className={classes.metadata}>
                <div>
                  <dt>Status</dt>
                  <dd>{character.status}</dd>
                </div>
                <div>
                  <dt>Species</dt>
                  <dd>
                    {character.species}
                    {character.type ? ` - ${character.type}` : ''}
                  </dd>
                </div>
                <div>
                  <dt>Gender</dt>
                  <dd>{character.gender}</dd>
                </div>
                <div>
                  <dt>Origin</dt>
                  <dd>{character.origin}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{character.location}</dd>
                </div>
                <div>
                  <dt>Episodes</dt>
                  <dd>{character.episodeCount}</dd>
                </div>
              </dl>
            </div>
          </div>
          <TextFieldComponent
            name="bestSentence"
            label="Best sentence"
            multiline={true}
            rows={3}
          />
          <div className={classes.actions}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button type="button" variant="outlined" onClick={onCancel}>
              Back
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
