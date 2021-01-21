import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Flex, Icon, Input, InputGroup, InputRightElement, List, ListItem,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useCombobox } from 'downshift';

const ComboBox = ({
  options, searchValue, onChange, inputProps, boxProps,
}) => {
  const [items, setItems] = useState(options);
  const [value, setValue] = useState(searchValue);

  const onValueChange = ({ inputValue }) => {
    setValue(inputValue);
    setItems(
      options
        .filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase())),
    );
  };

  const {
    isOpen,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    inputValue: value,
    onInputValueChange: onValueChange,
    items,
  });

  const onPressEnter = (event) => {
    if (event.keyCode === 0 && items.length === 1) {
      onChange(items[0]);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      onChange(selectedItem);
    }
  }, [onChange, selectedItem]);

  return (
    <Box {...boxProps}>
      <Flex w='100%' justifyContent='center' {...getComboboxProps()}>
        <InputGroup>
          <Input onKeyPress={onPressEnter} {...getInputProps()} {...inputProps} />
          <InputRightElement>
            <Icon as={AiOutlineArrowDown} color='gray.500' cursor='pointer' {...getToggleButtonProps()} />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <List
        width='100%'
        maxH='200px'
        overflowY='scroll'
        padding={(isOpen && items.length) ? 2 : 0}
        styleType='disc'
        bg='white'
        border={(isOpen && items.length) ? '1px solid' : 'none'}
        borderColor='teal.400'
        borderRadius='md'
        {...getMenuProps()}
      >
        {isOpen
          && items.map((item, index) => (
            <ListItem
              fontWeight={selectedItem === item ? 'bold' : ''}
              backgroundColor={highlightedIndex === index ? 'teal.400' : ''}
              key={item}
              {...getItemProps({ item, index })}
            >
              {item}
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

ComboBox.propTypes = {
  options: PropTypes.array,
  searchValue: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  inputProps: PropTypes.object,
  boxProps: PropTypes.object,
};

ComboBox.defaultProps = {
  options: [],
  searchValue: '',
  onChange: () => {},
  onEnter: () => {},
  inputProps: {},
  boxProps: {},
};

export default ComboBox;
