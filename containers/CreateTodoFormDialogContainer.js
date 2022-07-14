import { useSnackbar } from 'notistack';
import * as React from 'react';

import { TodoFormDialog } from '../components';
import { useCreateTodo } from '../services';

export function CreateTodoFormDialogContainer({ open, onClose }) {
  const { mutate, status } = useCreateTodo();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = React.useCallback(
    (data) => {
      const [year, month, day] = data.date.split('-');
      const date = `${month}-${day}-${year}`;

      mutate({ ...data, date });
    },
    [mutate]
  );

  React.useEffect(() => {
    if (status === 'success') {
      enqueueSnackbar('Your todo is created', { variant: 'success' });
      onClose();
    }
  }, [onClose, status]);

  React.useEffect(() => {
    if (status === 'error') {
      enqueueSnackbar('Oups..., an error occurred', { variant: 'error' });
    }
  }, [status]);

  return (
    <TodoFormDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={status === 'loading'}
    />
  );
}
