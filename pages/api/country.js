import axios from 'axios';

export const getCountryData = async ({
  country,
  yesterday = false,
  strict = false,
}) => (
  axios.get(`https://corona.lmao.ninja/v2/countries/${country}?yesterday=${yesterday}&strict=${strict}&query`)
);

export const getCountryHistoricalData = async ({
  country,
  lastDays = false,
}) => (
  axios.get(`https://corona.lmao.ninja/v2/historical/${country}?lastdays=${lastDays}
  `)
);
