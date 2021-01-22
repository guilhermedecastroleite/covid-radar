import { Spinner } from '@chakra-ui/react';

const Loading = () => (
  <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='teal.400'
    size='xl'
  />
);

export default Loading;
