import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import * as React from 'react';
import { Portal } from 'react-portal';
import { useSnackbar } from 'notistack';

import { useDeleteTodo } from '../services';

export function DeleteTodoAlertDialogContainer({ itemId, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const onCompleted = React.useCallback(
    () => enqueueSnackbar('Your todo is deleted', { variant: 'success' }),
    [enqueueSnackbar]
  );

  const { mutate, status } = useDeleteTodo(itemId, onCompleted);

  const onSubmit = React.useCallback(async () => {
    mutate();
  }, [mutate]);

  React.useEffect(() => {
    if (status === 'error') {
      enqueueSnackbar('Oups..., an error occurred', { variant: 'error' });
    }
  }, [status]);

  return (
    <Portal>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'Do you confirm to delete this todo?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={status === 'loading'}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={status === 'loading'}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  );
}
