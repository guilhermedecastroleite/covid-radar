import { Select as ChakraSelect } from '@chakra-ui/react';

const Select = ({ ...props }) => (
  <ChakraSelect
    color='gray.700'
    borderColor='gray.700'
    iconColor='gray.700'
    focusBorderColor='teal.400'
    _hover={{ borderColor: 'teal.400' }}
    {...props}
  />
);

export default Select;
