import PropTypes from 'prop-types';
import {
  Box, Flex, Icon, Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa';
import { SiGitlab } from 'react-icons/si';

import RadarIcon from '../../public/radar.svg';

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
      {/** App logo */}
      <Flex mt={10} flexDirection='column' alignItems='center' onClick={() => router.push('/')} cursor='pointer'>
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

      {/** All content of the app is rendered here */}
      <Box pt={8} pb={32} px={['16px', '24px', 16, 24, 32, 64]} width='100%'>
        {children}
      </Box>

      <footer style={{ position: 'absolute', bottom: 32 }}>
        <Flex flexDirection='column' alignItems='center'>
          <Flex mb={2} justifyContent='center' alignItems='center'>
            <a
              href='https://github.com/guilhermedecastroleite'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon as={FaGithub} fontSize='20px' />
            </a>
            <a
              href='https://gitlab.com/guileite'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '24px' }}
            >
              <Icon as={SiGitlab} fontSize='20px' />
            </a>
          </Flex>
          2021 - Guilherme Leite
        </Flex>
      </footer>
    </Flex>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
