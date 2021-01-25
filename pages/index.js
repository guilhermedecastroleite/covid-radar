import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';

import { useState } from 'react';
import { getAllCountries } from './api/country';

import Combobox from '../components/Inputs/Combobox';
import GlobalTable from '../containers/Tables/GlobalTable';
import MapChart from '../components/Charts/MapChart';
import Switch from '../components/Switch';

const options = [
  {
    name: 'Casos', value: 'cases', minColor: '#E9D8FD', maxColor: '#805AD5',
  },
  {
    name: 'Mortes', value: 'deaths', minColor: '#FED7D7', maxColor: '#E53E3E',
  },
  {
    name: 'Recuperados', value: 'recovered', minColor: '#9AE6B4', maxColor: '#38A169',
  },
];

const Home = () => {
  const router = useRouter();
  const { data } = useQuery('all-countries', getAllCountries);

  const [marker, setMarker] = useState('cases');
  const [tooltipContent, setTooltipContent] = useState('');

  const countriesList = data ? data.map((item) => item.country).sort() : [];

  const showCountry = ({ country }) => {
    router.push(`/${country}`);
  };

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Head>
        <title>Covid Radar</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Text fontSize='xl' color='gray.600'>Visualize dados da Covid 19 ao redor do mundo.</Text>
      <Text mt={4} fontSize='lg' color='gray.600'>Todos os dados exibidos são consultados na base da Johns Hopkins University</Text>

      <Combobox
        options={countriesList}
        onChange={(value) => showCountry({ country: value })}
        inputProps={{
          placeholder: 'Busque por um país...',
        }}
        boxProps={{
          mt: 8,
          w: '60%',
        }}
      />

      <ReactTooltip backgroundColor='#2D3748'>
        {tooltipContent}
      </ReactTooltip>

      <Box mt={10} w='100%'>
        <MapChart
          marker={marker}
          setTooltipContent={setTooltipContent}
          countryData={(data || []).map((item) => (
            {
              name: item.country,
              ISO3: item.countryInfo.iso3,
              [marker]: item[marker],
            }
          ))}
          minColor={options.find((item) => item.value === marker).minColor}
          maxColor={options.find((item) => item.value === marker).maxColor}
        />
      </Box>

      <Switch
        options={options}
        value={marker}
        onClick={(value) => setMarker(value)}
        boxProps={{ mt: 5 }}
      />

      <GlobalTable
        data={data}
        amount={10}
        onRowClick={showCountry}
        boxProps={{ mt: 10 }}
      />
    </Flex>
  );
};

export default Home;
