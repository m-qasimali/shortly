import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <>
      <Stack
        mt={5}
        direction={'row'}
        alignContent={'center'}
        justifyContent={'center'}
      >
        <CircularProgress />
      </Stack>
    </>
  );
};

export default Loader;
