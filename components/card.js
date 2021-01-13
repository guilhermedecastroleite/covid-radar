import { Box, Text } from '@chakra-ui/react';

const Card = ({
  title, data, color, ...props
}) => (
  <Box bg={color} p='3' borderRadius='md' boxShadow='md' {...props}>
    <Text fontSize='lg' color='gray.50'>{title}</Text>
    <Text fontSize='2xl' color='gray.600'>{data}</Text>
  </Box>
);

export default Card;
