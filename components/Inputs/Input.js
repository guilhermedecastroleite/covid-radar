import { Input as ChakraInput } from '@chakra-ui/react';

const Input = ({ ...props }) => (
  <ChakraInput
    bg='white'
    color='gray.700'
    borderColor='gray.700'
    _focus={{ borderColor: 'teal.400' }}
    _hover={{ borderColor: 'teal.400' }}
    {...props}
  />
);

export default Input;
