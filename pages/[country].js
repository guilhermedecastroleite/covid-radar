import {
  Box, Divider, Flex, Grid, Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Card from '../components/card';

import { getCountryData, getCountryHistoricalData } from './api/country';

export async function getServerSideProps({ params }) {
  const res = await getCountryData({ country: params.country });
  const countryData = res.data;
  const resHistorical = await getCountryHistoricalData({ country: params.country, lastDays: 30 });
  const countryHistoricalData = resHistorical.data;
  return {
    props: {
      countryData,
      countryHistoricalData,
    },
  };
}

const CountryPage = ({ countryData, countryHistoricalData }) => {
  const {
    country, tests, countryInfo: { flag },
  } = countryData;

  const { timeline: { cases, deaths, recovered } } = countryHistoricalData;

  console.log('Country Data: ', countryData);
  console.log('Country Data: ', countryHistoricalData);

  // Difference in days to compare data
  const difference = 1;

  // Creates an array of the cases history
  const casesArray = Object.entries(cases);
  const casesTimeline = casesArray.map((item) => ({ date: item[0], value: item[1] }));

  // Creates an array of the deaths history
  const deathsArray = Object.entries(deaths);
  const deathsTimeline = deathsArray.map((item) => ({ date: item[0], value: item[1] }));

  // Creates an array of the recovered history
  const recoveredArray = Object.entries(recovered);
  const recoveredTimeline = recoveredArray.map((item) => ({ date: item[0], value: item[1] }));

  return (
    <Box p='8' bg='gray.100' height='100vh'>
      <Box
        w='100%'
        p='8'
        border='1px solid gray.900'
        borderRadius='md'
        boxShadow='lg'
        bg='white'
      >
        <Flex
          alignItems='center'
        >
          <img src={flag} alt={`${country}-flag`} style={{ width: '2rem' }} />
          <Box ml='2'>
            <Text fontSize='2xl' color='gray.700'>{country}</Text>
          </Box>
        </Flex>
        <Divider orientation='horizontal' my={4} />

        {/** General */}
        <Text fontSize='xl' color='gray.700'>Dados Gerais</Text>
        <Text fontSize='md' color='gray.700' fontWeight='light' mt={2}>Os dados percentuais representam a diferença em relação à medição da última semana</Text>
        <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={4}>
          <Card title='Casos' value={casesTimeline[casesTimeline.length - 1].value} previousValue={casesTimeline[casesTimeline.length - 8].value} color='gray.200' />
          <Card title='Mortes' value={deathsTimeline[deathsTimeline.length - 1].value} previousValue={deathsTimeline[deathsTimeline.length - 8].value} color='gray.200' />
          <Card title='Recuperados' value={recoveredTimeline[casesTimeline.length - 1].value} previousValue={recoveredTimeline[casesTimeline.length - (difference + 1)].value} color='gray.200' />
          <Card title='Testes' value={tests.toLocaleString()} color='gray.200' />
        </Grid>

        {/** Daily */}
        <Text fontSize='xl' color='gray.700' mt={8}>Dados Diários</Text>
        <Text fontSize='md' color='gray.700' fontWeight='light' mt={2}>Os dados percentuais representam a diferença em relação à medição do dia anterior</Text>
        <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={4}>
          <Card
            title='Casos'
            value={casesTimeline[casesTimeline.length - 1].value - casesTimeline[casesTimeline.length - 2].value}
            previousValue={
              casesTimeline[casesTimeline.length - 2].value - casesTimeline[casesTimeline.length - 3].value
            }
            color='gray.200'
          />
          <Card
            title='Mortes'
            value={deathsTimeline[casesTimeline.length - 1].value - deathsTimeline[casesTimeline.length - 2].value}
            previousValue={
              deathsTimeline[casesTimeline.length - 2].value - deathsTimeline[casesTimeline.length - 3].value
            }
            color='gray.200'

          />
        </Grid>
      </Box>
    </Box>
  );
};

CountryPage.propTypes = {
  countryData: PropTypes.shape({
    country: PropTypes.string,
    tests: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    countryInfo: PropTypes.shape({
      flag: PropTypes.string,
    }),
  }),
  countryHistoricalData: PropTypes.shape({
    timeline: PropTypes.shape({
      cases: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      deaths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      recovered: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

CountryPage.defaultProps = {
  countryData: {
    country: '',
    tests: null,
    countryInfo: {
      flag: '',
    },
  },
  countryHistoricalData: {
    timeline: {
      cases: null,
      deaths: null,
      recovered: null,
    },
  },
};

export default CountryPage;
