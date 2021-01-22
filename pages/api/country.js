import axios from 'axios';

export const getCountryData = async ({
  country,
  yesterday = false,
  strict = false,
}) => (
  axios.get(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=${yesterday}&strict=${strict}&query`)
    .then(({ data }) => data)
);

export const getCountryHistoricalData = async ({
  country,
  lastDays = false,
}) => (
  axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=${lastDays}`)
    .then(({ data }) => data)
);

export const getAllCountries = async () => (
  axios.get('https://disease.sh/v3/covid-19/countries')
    .then(({ data }) => data)
);
