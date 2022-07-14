import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';
import { RegisterForm } from '../components';
import { useRegister } from '../services';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };

export function RegisterFormContainer() {
  const [open, setOpen] = React.useState(false);

  const { mutate, data, status } = useRegister();
  const { push } = useRouter();

  const onSubmit = React.useCallback(
    (values) => {
      mutate(values);
    },
    [mutate]
  );

  const onSnackBarClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token);
      push('/');
    }
  }, [data, push]);
  React.useEffect(() => {
    if (status === 'error') {
      setOpen(true);
    }
  }, [status]);

  return (
    <React.Fragment>
      <RegisterForm onSubmit={onSubmit} loading={status === 'loading'} />

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onSnackBarClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          variant="filled"
          onClose={onSnackBarClose}
          severity="error"
          sx={styles.alert}
        >
          Invalid Credentials
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
const styles = {
  alert: {
    width: '100%'
  }
};
