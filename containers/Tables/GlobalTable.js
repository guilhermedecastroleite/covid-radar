import { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Flex, Skeleton, Text,
} from '@chakra-ui/react';

import TableComponent from '../../components/Table/Table';

const BaseCell = ({ cell: { value } }) => (
  <Text color='gray.700'>{value.toLocaleString()}</Text>
);

BaseCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
  }).isRequired,
};

const FlagCell = ({ row: { original } }) => {
  const { countryInfo: { flag }, country } = original;
  return (
    <Flex justifyContent='center'>
      <img src={flag} style={{ width: '2rem' }} alt={`${country}-flag`} />
    </Flex>
  );
};

FlagCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      countryInfo: PropTypes.shape({
        flag: PropTypes.string,
      }),
      country: PropTypes.string,
    }),
  }),
};

FlagCell.defaultProps = {
  row: {
    original: {
      countryInfo: {
        flag: '',
      },
      country: '',
    },
  },
};

const GlobalTable = ({ data, onRowClick, boxProps }) => {
  const sortedData = data && data.sort((a, b) => b.cases - a.cases);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        accessor: 'country.countryInfo.flag',
        Cell: FlagCell,
      },
      {
        Header: 'País',
        accessor: 'country',
        Cell: BaseCell,
      },
      {
        Header: 'Casos',
        accessor: 'cases',
        Cell: BaseCell,
      },
      {
        Header: 'Mortes',
        accessor: 'deaths',
        Cell: BaseCell,
      },
      {
        Header: 'Recuperados',
        accessor: 'recovered',
        Cell: BaseCell,
      },
      {
        Header: 'Testes',
        accessor: 'tests',
        Cell: BaseCell,
      },
    ],
    [],
  );

  return (
    <>
      {!data && (
        <Flex width='100%' alignItems='center' justifyContent='center' {...boxProps}>
          <Skeleton width='100%' height='300px' borderRadius='md' />
        </Flex>
      )}

      {data && (
        <Box width='100%' {...boxProps}>
          <TableComponent columns={columns} data={sortedData} onRowClick={onRowClick} />
        </Box>
      )}
    </>
  );
};

GlobalTable.propTypes = {
  data: PropTypes.array,
  amount: PropTypes.number,
  onRowClick: PropTypes.func,
  boxProps: PropTypes.object,
};

GlobalTable.defaultProps = {
  data: null,
  amount: 10,
  onRowClick: () => {},
  boxProps: {},
};

export default GlobalTable;
