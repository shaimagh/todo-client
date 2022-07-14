import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from './InputField';

const defaultInitialValues = { email: '', password: '' };

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

export function LoginForm({
  initialValues = defaultInitialValues,
  onSubmit,
  loading
}) {
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
            type="password"
            autoComplete="current-password"
            disabled={loading}
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
            Sign In
          </LoadingButton>
        </div>
      )}
    </Formik>
  );
}
