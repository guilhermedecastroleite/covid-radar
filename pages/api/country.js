import axios from 'axios';

const getCountryData = async ({
  country,
  yesterday = false,
  strict = false,
}) => (
  axios.get(`https://corona.lmao.ninja/v2/countries/${country}?yesterday=${yesterday}&strict=${strict}&query`)
)

export default getCountryData;