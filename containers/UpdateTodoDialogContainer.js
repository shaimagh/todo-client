import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { Portal } from 'react-portal';

import { TodoFormDialog } from '../components';
import { useUpdateTodo } from '../services';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };

export function UpdateTodoDialogContainer({
  itemId,
  open,
  initialValues,
  onClose
}) {
  const [isSnackBarOpen, setSnackBarOpen] = React.useState(false);

  const { mutate, status } = useUpdateTodo(itemId);

  const onSubmit = React.useCallback(
    (data) => {
      const [year, month, day] = data.date.split('-');
      const date = `${month}-${day}-${year}`;

      mutate({ ...data, date });
    },
    [mutate]
  );

  const onSnackBarClose = React.useCallback(() => {
    setSnackBarOpen(false);
  }, []);

  React.useEffect(() => {
    if (status === 'success') {
      onClose();
    }
  }, [onClose, status]);

  React.useEffect(() => {
    if (status === 'success' || status === 'error') {
      setSnackBarOpen(true);
    }
  }, [status]);

  return (
    <Portal>
      <TodoFormDialog
        open={open}
        initialValues={initialValues}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={status === 'loading'}
      />

      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={onSnackBarClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          variant="filled"
          onClose={onSnackBarClose}
          severity={status === 'error' ? 'error' : 'success'}
          sx={styles.alert}
        >
          {status === 'error'
            ? 'Oups..., an error occurred'
            : 'You todo is updated'}
        </Alert>
      </Snackbar>
    </Portal>
  );
}

const styles = {
  alert: {
    width: '100%'
  }
};
