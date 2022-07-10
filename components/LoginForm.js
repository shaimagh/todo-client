import { Button } from '@mui/material';
import { Formik } from 'formik';

import { InputField } from './InputField';

const defaultInitialValues = { email: '', password: '' };

export function LoginForm({ initialValues = defaultInitialValues, onSubmit }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <div>
          <InputField
            name="email"
            margin="normal"
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <InputField
            name="password"
            margin="normal"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </div>
      )}
    </Formik>
  );
}
