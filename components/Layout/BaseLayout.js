import PropTypes from 'prop-types';
import {
  Box, Flex, Icon, Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import RadarIcon from '../../public/radar.svg';
// import VercelIcon from '../../public/vercel.svg';

const BaseLayout = ({ children }) => {
  const router = useRouter();
  return (
    <Flex
      display='flex'
      flexDirection='column'
      alignItems='center'
      overflow='auto'
      bg='gray.100'
      minHeight='100vh'
    >
      <Flex mt={4} flexDirection='column' alignItems='center' onClick={() => router.push('/')} cursor='pointer'>
        <Icon
          as={RadarIcon}
          alt='Radar by Theo K. from the Noun Project'
          title='Radar by Theo K. from the Noun Project'
          w='130px'
          h='130px'
          color='gray.600'
          fill='teal.400'
        />
        <Text mt={-4} fontSize='6xl' fontWeight='bold' color='teal.400'>
          Covid Radar
        </Text>
      </Flex>
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
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
