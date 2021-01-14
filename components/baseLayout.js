import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';

const BaseLayout = ({ children }) => (
  <Flex
    display='flex'
    flexDirection='column'
    alignItems='center'
    overflow='auto'
    bg='gray.100'
    minHeight='100vh'
  >
    <Text mt={4} fontSize='6xl' color='gray.700'>Covid Radar</Text>
    <Box pt={8} pb={24} px={16} width='100%'>
      {children}
    </Box>
    <footer style={{ position: 'absolute', bottom: 32 }}>
      <a
        href='https://github.com/guilhermedecastroleite'
        target='_blank'
        rel='noopener noreferrer'
      >
        @2021 - Guilherme Leite
      </a>
    </footer>
  </Flex>
);

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
