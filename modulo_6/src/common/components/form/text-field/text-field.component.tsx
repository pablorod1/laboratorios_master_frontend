import React from 'react';
import { cx } from '@emotion/css';
import { useField } from 'formik';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import * as classes from './text-field.styles';

type Props = TextFieldProps & {
  name: string;
};

export const TextFieldComponent: React.FunctionComponent<Props> = (props) => {
  const { name, onChange, onBlur, value, error, slotProps } = props;

  const [field, meta] = useField(name);
  const hasError = error || Boolean(meta.touched && meta.error);
  const helperText = meta.error || props.helperText;

  return (
    <MuiTextField
      {...props}
      name={name}
      id={name}
      onChange={onChange || field.onChange}
      onBlur={onBlur || field.onBlur}
      value={value ?? field.value ?? ''}
      error={hasError}
      helperText={hasError ? helperText : ''}
      fullWidth={true}
      margin="normal"
      slotProps={{
        ...slotProps,
        htmlInput: {
          ...slotProps?.htmlInput,
          className: cx(
            (slotProps?.htmlInput as any)?.className,
            classes.input
          ),
        },
      }}
    />
  );
};
