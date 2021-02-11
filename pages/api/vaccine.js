import axios from 'axios';

const getCountriesVaccineData = async ({ days }) => (
  axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=${days}`)
    .then(({ data }) => data)
);

export default getCountriesVaccineData;
