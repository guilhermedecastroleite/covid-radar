import {
  Box, Divider, Flex, Grid, Text,
} from '@chakra-ui/react';
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
    country, cases, deaths, todayCases, todayDeaths, recovered, tests, deathsPerOneMillion, countryInfo: { flag },
  } = countryData;

  console.log('Country Data: ', countryData);
  console.log('Country Data: ', countryHistoricalData);

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
        <Text fontSize='xl' color='gray.700'>Dados Gerais</Text>
        <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={4}>
          <Card title='Casos' data={cases.toLocaleString()} color='cyan.400' />
          <Card title='Mortes' data={deaths.toLocaleString()} color='cyan.400' />
          <Card title='Recuperados' data={recovered.toLocaleString()} color='cyan.400' />
          <Card title='Testes' data={tests.toLocaleString()} color='cyan.400' />
        </Grid>
        <Text fontSize='xl' color='gray.700' mt={4}>Dados Diários</Text>
        <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={4}>
          <Card title='Casos' data={todayCases.toLocaleString()} color='purple.300' />
          <Card title='Mortes' data={todayDeaths.toLocaleString()} color='purple.300' />
        </Grid>
      </Box>
    </Box>
  );
};

export default CountryPage;
