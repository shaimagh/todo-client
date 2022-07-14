import * as React from 'react';

import { TodoListItem } from '../components';
import { UpdateTodoDialogContainer } from './UpdateTodoDialogContainer';
import { DeleteTodoAlertDialogContainer } from './DeleteTodoAlertDialogContainer';

export function TodoListItemContainer({ item, ...props }) {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const initialValues = React.useMemo(
    () => ({
      title: item.title,
      description: item.description,
      date: item.date.substr(0, 10)
    }),
    [item.date, item.description, item.title]
  );

  const onActionClick = React.useCallback((key) => {
    switch (key) {
      case 'edit':
        setUpdateDialogOpen(true);
        break;
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      default:
        break;
    }
  }, []);

  const onUpdateDialogClose = React.useCallback(() => {
    setUpdateDialogOpen(false);
  }, []);

  const onDeleteDialogClose = React.useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <>
      <TodoListItem {...props} item={item} onActionClick={onActionClick} />

      <UpdateTodoDialogContainer
        itemId={item._id}
        open={isUpdateDialogOpen}
        onClose={onUpdateDialogClose}
        initialValues={initialValues}
      />

      <DeleteTodoAlertDialogContainer
        itemId={item._id}
        open={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
      />
    </>
  );
}
