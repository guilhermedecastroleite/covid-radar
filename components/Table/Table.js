import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import {
  Table, Thead, Tbody, Tr, Th, Td,
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

  return (
    <>
      <Table {...getTableProps()} border='1px solid gray.700' boxShadow='md' borderRadius='0.375rem 0.375rem 0 0' overflow='hidden'>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  bg='teal.400'
                  color='white'
                  p={6}
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
    </>
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
