import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react';
import TablePagination from './TablePagination';

const TableComponent = ({ columns, data, onRowClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );

  const setBorderRadius = ({ index, arr }) => {
    if (index === 0) {
      return '0.375rem 0 0 0';
    }

    if (index === arr.length - 1) {
      return '0 0.375rem 0 0';
    }

    return 0;
  };

  return (
    <Box overflow='auto'>
      <Table {...getTableProps()} border='1px solid gray.700' boxShadow='md'>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index, arr) => (
                <Th
                  {...column.getHeaderProps()}
                  bg='teal.400'
                  color='white'
                  p={6}
                  borderRadius={() => setBorderRadius({ index, arr })}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const _onRowClick = onRowClick ? () => onRowClick(row.original) : null;
            return (
              <Tr
                onClick={_onRowClick}
                cursor={_onRowClick ? 'pointer' : 'default'}
                bg='white'
                _hover={{ bg: 'gray.100' }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <TablePagination
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Box>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onRowClick: PropTypes.func,
};

TableComponent.defaultProps = {
  columns: [],
  data: [],
  onRowClick: () => {},
};

export default TableComponent;
