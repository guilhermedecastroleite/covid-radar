import { useRouter } from 'next/router';
import {
  Box, Divider, Flex, Grid, Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { getCountryData, getCountryHistoricalData } from './api/country';

import { Card } from '../components/Cards';
import { LineChart } from '../components/Charts';

const CardsGrid = ({ title, subtitle, children }) => (
  <Box mt={8}>
    <Text fontSize='xl' color='gray.700'>{title}</Text>
    <Text fontSize='md' color='gray.700' fontWeight='light' mt={2}>{subtitle}</Text>
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={3}
      mt={4}
    >
      {children}
    </Grid>
  </Box>
);

CardsGrid.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

const CountryPage = () => {
  const router = useRouter();

  const selectedCountry = router.query.country;

  const { data: countryData } = useQuery(selectedCountry, () => getCountryData({ country: selectedCountry }));
  const { data: countryHistoricalData } = useQuery(
    `${selectedCountry}-historical`,
    () => getCountryHistoricalData({ country: selectedCountry, lastDays: 30 }),
  );

  const { country, tests, countryInfo: { flag } } = (countryData || { countryInfo: {} });

  const { timeline: { cases, deaths, recovered } } = (countryHistoricalData || { timeline: {} });

  const period = 30;

  // Difference in days to compare data
  const difference = 1;

  // Creates an array of the cases history
  const casesArray = Object.entries(cases || {});
  const casesTimeline = casesArray.map((item) => ({ date: item[0], value: item[1] }));
  const sortedCasesTimeline = casesTimeline.sort((a, b) => a.value - b.value);

  // Creates an array of the deaths history
  const deathsArray = Object.entries(deaths || {});
  const deathsTimeline = deathsArray.map((item) => ({ date: item[0], value: item[1] }));
  const sortedDeathsTimeline = deathsTimeline.sort((a, b) => a.value - b.value);

  // Creates an array of the recovered history
  const recoveredArray = Object.entries(recovered || {});
  const recoveredTimeline = recoveredArray.map((item) => ({ date: item[0], value: item[1] }));
  const sortedRecoveredTimeline = recoveredTimeline.sort((a, b) => a.value - b.value);

  return (
    <Box>
      <Box
        w='100%'
        p='8'
        border='1px solid gray.900'
        borderRadius='md'
        boxShadow='lg'
        bg='white'
      >
        {/** Country Header */}
        <Flex alignItems='center'>
          <img src={flag} alt={`${country}-flag`} style={{ width: '2rem' }} />
          <Box ml='2'>
            <Text fontSize='2xl' color='gray.700'>{country}</Text>
          </Box>
        </Flex>

        <Divider orientation='horizontal' borderColor='gray.700' mt={4} />

        {/** General */}
        <CardsGrid
          title='Dados Gerais'
          subtitle='Os dados percentuais representam a diferença em relação à última semana'
        >
          <Card
            title='Casos'
            value={casesTimeline[casesTimeline.length - 1]?.value}
            previousValue={casesTimeline[casesTimeline.length - 8]?.value}
            color='gray.200'

          />
          <Card
            title='Mortes'
            value={deathsTimeline[deathsTimeline.length - 1]?.value}
            previousValue={deathsTimeline[deathsTimeline.length - 8]?.value}
            color='gray.200'

          />
          <Card
            title='Recuperados'
            value={recoveredTimeline[casesTimeline.length - 1]?.value}
            previousValue={recoveredTimeline[casesTimeline.length - (difference + 1)]?.value}
            color='gray.200'
          />
          <Card title='Testes' value={(tests || '').toLocaleString()} color='gray.200' />
        </CardsGrid>

        {/** Daily */}
        <CardsGrid
          title='Dados Diários'
          subtitle='Os dados percentuais representam a diferença em relação ao dia anterior'
        >
          <Card
            title='Casos'
            value={casesTimeline[casesTimeline.length - 1]?.value - casesTimeline[casesTimeline.length - 2]?.value}
            previousValue={
                casesTimeline[casesTimeline.length - 2]?.value - casesTimeline[casesTimeline.length - 3]?.value
            }
            color='gray.200'
          />
          <Card
            title='Mortes'
            value={deathsTimeline[casesTimeline.length - 1]?.value - deathsTimeline[casesTimeline.length - 2]?.value}
            previousValue={
                deathsTimeline[casesTimeline.length - 2]?.value - deathsTimeline[casesTimeline.length - 3]?.value
            }
            color='gray.200'
          />
        </CardsGrid>

        {/** Historical Cases Chart */}
        <Box mt={12}>
          <Text fontSize='xl' color='gray.700'>{`Casos nos últimos ${period} dias`}</Text>
          <Box mt={4}>
            <LineChart
              data={casesTimeline}
              range={{
                min: sortedCasesTimeline[0]?.value,
                max: sortedCasesTimeline[sortedCasesTimeline.length - 1]?.value,
              }}
              tooltipText='casos'
            />
          </Box>
        </Box>

        {/** Historical Deaths Chart */}
        <Box mt={10}>
          <Text fontSize='xl' color='gray.700'>{`Mortes nos últimos ${period} dias`}</Text>
          <Box mt={4}>
            <LineChart
              data={deathsTimeline}
              range={{
                min: sortedDeathsTimeline[0]?.value,
                max: sortedDeathsTimeline[sortedDeathsTimeline.length - 1]?.value,
              }}
            />
          </Box>
        </Box>

        {/** Historical Recovered Chart */}
        <Box mt={10}>
          <Text fontSize='xl' color='gray.700'>{`Recuperados nos últimos ${period} dias`}</Text>
          <Box mt={4}>
            <LineChart
              data={recoveredTimeline}
              range={{
                min: sortedRecoveredTimeline[0]?.value,
                max: sortedRecoveredTimeline[sortedRecoveredTimeline.length - 1]?.value,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CountryPage;
