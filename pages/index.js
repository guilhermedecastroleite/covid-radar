import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import { getAllCountries } from './api/country';
import GlobalTable from '../containers/Tables/GlobalTable';
import Combobox from '../components/Inputs/Combobox';

export async function getServerSideProps() {
  const res = await getAllCountries();
  const allCountriesData = res.data;
  return {
    props: {
      allCountriesData,
    },
  };
}

const Home = ({ allCountriesData }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const router = useRouter();

  const countriesList = allCountriesData.map((item) => item.country).sort();

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
        data={allCountriesData}
        amount={10}
        onRowClick={showCountry}
        boxProps={{ mt: 10 }}
      />
    </Flex>
  );
};

export default Home;
