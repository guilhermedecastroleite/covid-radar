import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';
import { getAllCountries } from './api/country';
import GlobalTable from '../containers/globalTable';

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
  console.log(allCountriesData);
  return (
    <Flex flexDirection='column' alignItems='center'>
      <Head>
        <title>Covid Radar</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Text fontSize='xl' color='gray.700'>Visualize dados da Covid 19 ao redor do mundo.</Text>
      <Text mt={4} fontSize='lg' color='gray.700'>Todos os dados exibidos são consultados na base da Johns Hopkins University</Text>

      <GlobalTable data={allCountriesData} amount={10} boxProps={{ mt: 10 }} />
    </Flex>
  );
};

export default Home;
