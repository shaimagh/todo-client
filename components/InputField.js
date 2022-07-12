import { TextField } from '@mui/material';
import * as React from 'react';
import { useField } from 'formik';

export function InputField({ name, ...props }) {
  const [{ value, onChange, onBlur }, { error }] = useField(name);

  return (
    <TextField
      {...props}
      name={name}
      margin="normal"
      fullWidth
      value={value}
      onChange={onChange(name)}
      onBlur={onBlur(name)}
      helperText={error}
      error={!!error}
    />
  );
}
