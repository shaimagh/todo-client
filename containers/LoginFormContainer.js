import * as React from 'react';
import { useRouter } from 'next/router';

import { LoginForm } from '../components';
import { useLogin } from '../services';

export function LoginFormContainer(props) {
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
    console.log('status: ', status);
  }, [status]);

  return <LoginForm {...props} onSubmit={onSubmit} />;
}
