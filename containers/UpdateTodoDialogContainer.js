import { useSnackbar } from 'notistack';
import * as React from 'react';

import { TodoFormDialog } from '../components';
import { useUpdateTodo } from '../services';

export function UpdateTodoDialogContainer({
  itemId,
  open,
  initialValues,
  onClose
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, status } = useUpdateTodo(itemId);

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
      enqueueSnackbar('Your todo is updated', { variant: 'success' });
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
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={onSubmit}
      loading={status === 'loading'}
    />
  );
}
