import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button,
} from '@chakra-ui/react';

const Error = ({ open, error }) => {
  const [isOpen, setIsOpen] = useState(open);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Erro
          </AlertDialogHeader>

          <AlertDialogBody>
            {error}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme='red' onClick={onClose} ml={3}>
              Fechar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

Error.propTypes = {
  open: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
};

export default Error;
