import PropTypes from 'prop-types';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import BaseLayout from '../components/Layout/BaseLayout';

import chakraUiTheme from '../theme/chakraUiTheme';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={chakraUiTheme}>
      <CSSReset />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  </QueryClientProvider>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
