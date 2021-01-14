import PropTypes from 'prop-types';
import {
  Flex, Icon, Text, Input, Select,
} from '@chakra-ui/react';
import {
  FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight,
} from 'react-icons/fi';

const PaginationIcon = ({ icon, onClick, isDisabled }) => (
  <Icon
    as={icon}
    type='button'
    onClick={onClick}
    disabled={isDisabled}
    w={6}
    h={6}
    color='gray.600'
    cursor='pointer'
  />
);

PaginationIcon.propTypes = {
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const TablePagination = ({
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  gotoPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {
  const pageSizeOptions = [10, 20, 30, 40, 50, 100];

  return (
    <Flex alignItems='center' bg='white' py={4} px={6} borderRadius='0 0 0.375rem 0.375rem'>
      <PaginationIcon icon={FiChevronsLeft} onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} />
      <PaginationIcon icon={FiChevronLeft} onClick={() => previousPage()} isDisabled={!canPreviousPage} />
      <PaginationIcon icon={FiChevronRight} onClick={() => nextPage()} isDisabled={!canNextPage} />
      <PaginationIcon icon={FiChevronsRight} onClick={() => gotoPage(pageCount - 1)} isDisabled={!canNextPage} />
      <Text ml={4} color='gray.700'>
        {`Página ${pageIndex + 1} de ${pageOptions.length}`}
      </Text>
      <Text ml={4} color='gray.700'>
        Vá para:
        {' '}
        <Input
          ml={2}
          type='number'
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '100px' }}
        />
      </Text>
      {' '}
      <Flex ml={4} alignItems='center'>
        <Text color='gray.700'>
          Itens por página:
        </Text>
        {' '}
        <Select
          ml={4}
          w={150}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              {pageSizeOption}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

TablePagination.propTypes = {
  canPreviousPage: PropTypes.bool.isRequired,
  previousPage: PropTypes.func.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  nextPage: PropTypes.func.isRequired,
  gotoPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageOptions: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default TablePagination;
