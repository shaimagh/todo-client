import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';

import { LoginForm } from '../components';
import { useLogin } from '../services';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };

export function LoginFormContainer(props) {
  const [open, setOpen] = React.useState(false);

  const { mutate, data, status } = useLogin();

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
      <LoginForm
        {...props}
        onSubmit={onSubmit}
        loading={status === 'loading'}
      />
    </React.Fragment>
  );
}

const styles = {
  alert: {
    width: '100%'
  }
};
