import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as React from 'react';

import { InputField } from './InputField';

const defaultInitialValues = { email: '', password: '' };

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

export function RegisterForm({
  initialValues = defaultInitialValues,
  onSubmit,
  loading
}) {
  const [canShownPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <div>
          <InputField
            name="email"
            margin="normal"
            label="Email Address"
            autoComplete="email"
            disabled={loading}
          />
          <InputField
            name="password"
            margin="normal"
            label="Password"
            type={canShownPassword ? 'text' : 'password'}
            autoComplete="current-password"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {canShownPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            onClick={handleSubmit}
            loading={loading}
          >
            Sign Up
          </LoadingButton>
        </div>
      )}
    </Formik>
  );
}
