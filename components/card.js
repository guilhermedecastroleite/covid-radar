import {
  Box, Flex, Icon, Text,
} from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Card = ({
  title, value, previousValue, color, ...props
}) => {
  const current = parseInt(value, 10);
  const previous = parseInt(previousValue, 10);
  const percentage = ((current - previous) / current) * 100;

  return (
    <Flex bg={color} p='3' borderRadius='md' boxShadow='md' alignItems='flex-end' justifyContent='space-between' {...props}>
      <Box>
        <Text fontSize='lg' color='gray.600' fontWeight='light'>{title}</Text>
        <Text fontSize='2xl' color='gray.600'>{value.toLocaleString()}</Text>
      </Box>
      {
        previousValue
        && (
          <Flex alignItems='center'>
            <Icon as={percentage >= 0 ? FaPlus : FaMinus} color={percentage > 0 ? 'green.500' : 'blue.500'} />
            <Text ml={1} color={percentage >= 0 ? 'green.500' : 'blue.500'}>{`${Math.abs(percentage.toFixed(2))}%`}</Text>
          </Flex>
        )
      }
    </Flex>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  previousValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Card.defaultProps = {
  title: '',
  value: 'Não há dados disponíveis',
  previousValue: null,
  color: null,
};

export default Card;
