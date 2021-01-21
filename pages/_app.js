import PropTypes from 'prop-types';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import BaseLayout from '../components/Layout/BaseLayout';

import chakraUiTheme from '../theme/chakraUiTheme';

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider theme={chakraUiTheme}>
    <CSSReset />
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  </ChakraProvider>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
