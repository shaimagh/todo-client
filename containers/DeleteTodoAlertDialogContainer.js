import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import * as React from 'react';
import { Portal } from 'react-portal';
import { useDeleteTodo } from '../services';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };

export function DeleteTodoAlertDialogContainer({ itemId, open, onClose }) {
  const [isSnackBarOpen, setSnackBarOpen] = React.useState(false);

  const { mutate, status } = useDeleteTodo(itemId);

  const onSnackBarClose = React.useCallback(() => {
    setSnackBarOpen(false);
  }, []);

  const onSubmit = React.useCallback(() => {
    mutate();
  }, [mutate]);

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
      <Dialog
        open={open}
        onClose={onClose}
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
