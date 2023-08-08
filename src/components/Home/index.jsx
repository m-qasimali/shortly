import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Container,
  Grid,
  Hidden,
} from '@mui/material';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthDialog from './AuthDialog';

const index = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);

  const closeModel = () => {
    setIsOpenModel(false);
  };
  return (
    <>
      <AuthDialog isOpen={isOpenModel} closeModel={closeModel} />
      <Box
        display={'flex'}
        flexDirection={'column'}
        bgcolor={(theme) => theme.palette.primary.main}
        height={'100vh'}
        color={(theme) => theme.palette.primary.contrastText}
      >
        <Container maxWidth='xl'>
          <Box display={'flex'} flexDirection={'column'}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              pt={3}
            >
              <Typography variant='h4' color='inherit'>
                Shortly
              </Typography>
              <Button
                onClick={() => setIsOpenModel(true)}
                variant='text'
                color='inherit'
              >
                Login/SignUp
              </Button>
            </Stack>
          </Box>
        </Container>

        <Stack flexGrow={1} justifyContent={'center'} alignItems={'center'}>
          <Container maxWidth='xl'>
            <Grid container spacing={5} alignItems={'center'}>
              <Grid item sm={6}>
                <Typography variant='h3' color='inherit'>
                  Short links, big results
                </Typography>
                <Box my={2}>
                  <Typography variant='body1' color='inherit'>
                    Powerful link shortner to help your brand to grow
                  </Typography>
                </Box>
                <Button
                  sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.primary.main,
                  })}
                  color='inherit'
                  disableElevation
                  variant='contained'
                  onClick={() => setIsOpenModel(true)}
                >
                  Get Started
                </Button>
              </Grid>
              <Hidden only={'xs'}>
                <Grid item sm={6}>
                  <img
                    style={{ width: '100%' }}
                    src='images/header.png'
                    alt=''
                  />
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </Stack>
      </Box>
    </>
  );
};

export default index;
