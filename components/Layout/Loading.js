import { Spinner } from '@chakra-ui/react';

import theme from '../../theme/theme';

const Loading = () => (
  <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor={theme.colors.gray2}
    color={theme.colors.blue2}
    size='xl'
  />
);

export default Loading;
