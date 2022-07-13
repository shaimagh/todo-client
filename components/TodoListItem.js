import * as React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

export function TodoListItem({ item, columns, actions, onActionClick }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
      {columns?.map((column) => {
        const value = item[column.id];

        return (
          <TableCell key={column.id} align={column.align}>
            {column.format ? column.format(value) : value}
          </TableCell>
        );
      })}

      {actions?.length > 0 && (
        <TableCell>
          {actions.map(({ key, icon: Icon }) => (
            <IconButton key={key} onClick={() => onActionClick?.(key)}>
              <Icon />
            </IconButton>
          ))}
        </TableCell>
      )}
    </TableRow>
  );
}
