import * as React from 'react';
import {
  capitalize,
  colors,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Edit as IconEdit, Delete as IconDelete } from '@mui/icons-material';

import { TodoListItemContainer } from '../containers';

const columns = [
  {
    id: '_id',
    label: 'ID',
    minWidth: 170
  },
  {
    id: 'title',
    label: 'Title',
    minWidth: 170,
    format: capitalize
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    format: capitalize
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    format: (date) => date.substr(0, 10)
  }
];

const actions = [
  {
    key: 'edit',
    icon: IconEdit,
    color: colors.green.A700
  },
  {
    key: 'delete',
    icon: IconDelete,
    color: colors.red.A700
  }
];

const rowsPerPageOptions = [5, 10, 25, 100];

export function TodoList({ items }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = React.useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = React.useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  return (
    <Paper sx={styles.paper}>
      <TableContainer sx={styles.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions?.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {items
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <TodoListItemContainer
                    key={item._id}
                    actions={actions}
                    columns={columns}
                    item={item}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={items?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const styles = {
  paper: {
    mt: 4,
    width: '100%',
    overflow: 'hidden'
  },
  container: {
    maxHeight: 440
  }
};
