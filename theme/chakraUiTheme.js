import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  xxl: '1800px',
});

const chakraUiTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'Nunito Sans',
        fontWeight: 'normal',
        color: 'gray.400',
      },
      sizes: {
        md: {
          height: '36px',
          fontSize: ['12px', '13px', '16px'],
        },
      },
      variants: {
        outline: () => ({
          bg: 'white',
          color: 'gray.400',
          borderColor: 'gray.400',
        }),
        solid: () => ({
          bg: 'green.400',
          color: 'white',
        }),
      },
    },

    Input: {
      baseStyle: {
        field: {
          color: 'gray.700',
        },
      },
      variants: {
        outline: () => ({
          field: {
            bg: 'white',
            borderColor: 'gray.400',
            _focus: { borderColor: 'teal.400', boxShadow: 'none' },
            _hover: { borderColor: 'teal.400', boxShadow: 'none' },
          },
        }),
        filled: () => ({
          field: {
            bg: 'white',
            borderColor: 'gray.400',
            _focus: { borderColor: 'teal.400', boxShadow: 'none' },
            _hover: { borderColor: 'teal.400', boxShadow: 'none' },
          },
        }),
      },
    },

    Select: {
      baseStyle: {
        field: {
          color: 'gray.700',
        },
      },
      variants: {
        outline: () => ({
          field: {
            bg: 'white',
            borderColor: 'gray.400',
            _focus: { borderColor: 'teal.400', boxShadow: 'none' },
            _hover: { borderColor: 'teal.400', boxShadow: 'none' },
          },
        }),
        filled: () => ({
          field: {
            bg: 'white',
            borderColor: 'gray.400',
            _focus: { borderColor: 'teal.400', boxShadow: 'none' },
            _hover: { borderColor: 'teal.400', boxShadow: 'none' },
          },
        }),
      },
    },
  },
  breakpoints,
});

export default chakraUiTheme;
