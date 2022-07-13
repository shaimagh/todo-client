import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { InputField } from './InputField';

const defaultInitialValues = {
  title: '',
  description: '',
  date: ''
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().nullable(),
  date: Yup.date().required()
});
export function TodoFormDialog({
  open,
  initialValues = defaultInitialValues,
  onSubmit,
  onClose,
  loading
}) {
  const onBackdropClick = React.useCallback(() => {
    if (!loading) {
      onClose();
    }
  }, [loading, onClose]);

  return (
    <Dialog open={open} onClose={onClose} onBackdropClick={onBackdropClick}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <DialogTitle>{'Add Todo'}</DialogTitle>
            <DialogContent>
              <InputField
                name="title"
                margin="normal"
                label="Title"
                autoComplete="title"
                disabled={loading}
              />
              <InputField
                name="description"
                margin="normal"
                label="Description"
                autoComplete="description"
                disabled={loading}
              />
              <InputField
                type="date"
                name="date"
                margin="normal"
                autoComplete="date"
                disabled={loading}
              />
            </DialogContent>
            <DialogActions>
              <Button disabled={loading} onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} onClick={handleSubmit}>
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
