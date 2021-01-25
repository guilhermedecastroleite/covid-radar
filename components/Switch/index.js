import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';

const Switch = ({
  options, value, onClick, boxProps,
}) => (
  <Flex bg='gray.300' alignItems='center' justifyContent='center' borderRadius='md' overflow='hidden' {...boxProps}>
    {options.map((item) => (
      <Box
        key={item.value}
        p={2}
        cursor='pointer'
        color={value === item.value ? 'gray.200' : 'gray.700'}
        bg={value === item.value ? 'teal.400' : 'none'}
        onClick={() => onClick(item.value)}
      >
        {item.name}
      </Box>
    ))}
  </Flex>
);

Switch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  value: PropTypes.string,
  onClick: PropTypes.func,
  boxProps: PropTypes.object,
};

Switch.defaultProps = {
  options: [{
    name: '',
    value: '',
  }],
  value: '',
  onClick: () => {},
  boxProps: {},
};

export default Switch;
