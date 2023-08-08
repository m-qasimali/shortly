import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar = () => {
  return (
    <>
      <AppBar color='secondary' elevation={0} position='fixed'>
        <Toolbar>
          <Typography variant='h6'>Shortly</Typography>
          <Box ml={'auto'}>
            <Button color='inherit'>Links</Button>
            <Button onClick={() => signOut(auth)} color='inherit'>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
