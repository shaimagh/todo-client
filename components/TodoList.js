import * as React from 'react';
import {
  capitalize,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

const columns = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'title', label: 'Title', minWidth: 170, format: capitalize },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    format: capitalize
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170
  }
];

const rowsPerPageOptions = [5, 10, 25, 100];

export function TodoList({ rows }) {
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
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows?.length}
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
