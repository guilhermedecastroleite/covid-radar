import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { getAllCountries } from './api/country';

import Combobox from '../components/Inputs/Combobox';
import GlobalTable from '../containers/Tables/GlobalTable';

const Home = () => {
  const router = useRouter();
  const { data } = useQuery('all-countries', getAllCountries);

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

      <Text fontSize='xl' color='gray.700'>Visualize dados da Covid 19 ao redor do mundo.</Text>
      <Text mt={4} fontSize='lg' color='gray.700'>Todos os dados exibidos são consultados na base da Johns Hopkins University</Text>

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
