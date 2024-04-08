import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  Pagination,
  FormControlLabel,
  Switch,
  CircularProgress,
} from '@mui/material';
import { TableNoData } from 'src/components/table';
import EnhancedTableHead from 'src/utils/EnhancedTableHead';
import EnhancedTableToolbar from 'src/utils/EnhancedTableToolbar';
import { getComparator, stableSort } from 'src/utils/SortFunctions';

import { OrgUsers } from 'src/_mock/headCells/OrgUsers';
import OrgUsersRows from './TableCells/OrgUsersRows';

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 10;

export default function RenderOrgUsers({ orgActivity, orgUserGroups, orgsUsers }) {
  // console.log('orgsss users', orgActivity);
  console.log('orgsss users', orgsUsers);

  if (!orgsUsers || !orgActivity || !orgUserGroups) {
    <CircularProgress />;
  }

  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let rowsOnMount = stableSort(orgsUsers, getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY));

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
    console.log('visibleRows of workflow', visibleRows);
  }, [orgsUsers]);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
      console.log('newOrderBy', newOrderBy);
      const sortedRows = stableSort(orgsUsers, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, orgsUsers]
  );

  // const handleClick = (event, name) => {
  //   event.preventDefault();

  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = orgsUsers?.map((n) => n.name);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleChangePage = useCallback(
    (event, newPage) => {
      console.log(newPage, 'newPage');
      setPage(newPage - 1);
      setCurrentPage(newPage);
      const sortedRows = stableSort(orgsUsers, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        (newPage - 1) * rowsPerPage,
        (newPage - 1) * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
      const numEmptyRows =
        newPage - 1 > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - orgsUsers.length) : 0;

      // const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      // setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage, orgsUsers]
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Card sx={{ cursor: 'pointer' }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                headCells={OrgUsers}
                onRequestSort={handleRequestSort}
                rowCount={orgsUsers.length}
              />
              <TableBody>
                {visibleRows !== null ? (
                  <>
                    {visibleRows?.map((row, index) => {
                      //   const isItemSelected = isSelected(row.name);
                      //   const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <OrgUsersRows
                          row={row}
                          orgUserGroups={orgUserGroups}
                          //labelId={labelId}
                          //isItemSelected={isItemSelected}
                          // handleClick={handleClick}
                        />
                      );
                    })}
                    <TableNoData isNotFound={!orgsUsers.length} type={'organization'} />
                  </>
                ) : (
                  <>
                    <TableRow>
                      <TableCell align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </>
                )}

                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
            {/* {console.log(Math.ceil(orgActivity?.length / 10), 'org len')} */}
            <Pagination
              count={Math.ceil(orgsUsers.length / 10)}
              color="primary"
              page={currentPage}
              onChange={handleChangePage}
            />
          </Box>
        </Card>

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>
  );
}
