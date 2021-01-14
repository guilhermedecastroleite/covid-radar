import PropTypes from 'prop-types';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';
import BaseLayout from '../components/baseLayout';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  </ThemeProvider>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
