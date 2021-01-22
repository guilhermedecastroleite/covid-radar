import { Spinner } from '@chakra-ui/react';

const Loading = (props) => (
  <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='teal.400'
    size='xl'
    {...props}
  />
);

export default Loading;
