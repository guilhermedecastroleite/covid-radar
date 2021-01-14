import axios from 'axios';

export const getCountryData = async ({
  country,
  yesterday = false,
  strict = false,
}) => (
  axios.get(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=${yesterday}&strict=${strict}&query`)
);

export const getCountryHistoricalData = async ({
  country,
  lastDays = false,
}) => (
  axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=${lastDays}
  `)
);

export const getAllCountries = async () => (
  axios.get('https://disease.sh/v3/covid-19/countries')
);
