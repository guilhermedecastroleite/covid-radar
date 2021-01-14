import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';

import TableComponent from '../components/table';

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

const GlobalTable = ({ data, amount, boxProps }) => {
  const sortedData = data.sort((a, b) => b.cases - a.cases).slice(0, amount);

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
    <Box width='100%' {...boxProps}>
      <TableComponent columns={columns} data={sortedData} />
    </Box>
  );
};

GlobalTable.propTypes = {
  data: PropTypes.array,
  amount: PropTypes.number,
  boxProps: PropTypes.object,
};

GlobalTable.defaultProps = {
  data: [],
  amount: 10,
  boxProps: {},
};

export default GlobalTable;
