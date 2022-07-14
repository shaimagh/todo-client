import * as React from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { LoginForm } from '../components';
import { useLogin } from '../services';

export function LoginFormContainer(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, data, status } = useLogin();

  const { push } = useRouter();

  const onSubmit = React.useCallback(
    (values) => {
      mutate(values);
    },
    [mutate]
  );

  React.useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token);
      push('/');
    }
  }, [data, push]);

  React.useEffect(() => {
    if (status === 'error') {
      enqueueSnackbar('Oups..., an error occurred', { variant: 'error' });
    }
  }, [status]);

  return (
    <LoginForm {...props} onSubmit={onSubmit} loading={status === 'loading'} />
  );
}

