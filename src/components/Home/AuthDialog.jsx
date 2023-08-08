import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';

const AuthDialog = ({ isOpen, closeModel }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isSignIn, setIsSignIn] = useState(true);

  const handleAuth = async () => {
    try {
      setIsLoading(true);
      if (isSignIn) {
        const res = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        if (res.user) {
          navigate('/account');
        }
      } else {
        const res = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        navigate('/account');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (event) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModel}
        fullWidth
        aria-labelledby={'login/register'}
      >
        <DialogTitle id={'login/register'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            {isSignIn ? 'Sign in' : 'Sign up'}
            <IconButton aria-label='close-model' onClick={closeModel}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField
            id='email'
            label='Email'
            value={user.email}
            name='email'
            onChange={updateForm}
            fullWidth
            variant='filled'
            sx={{ my: 2 }}
          />
          <TextField
            id='password'
            label='Password'
            value={user.password}
            name='password'
            onChange={updateForm}
            variant='filled'
            fullWidth
          />
          {error && (
            <Typography mt={1} variant='body1' color='error'>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Stack
            width={'100%'}
            mx={2}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              variant='body1'
              sx={{ cursor: 'pointer' }}
              color='initial'
              onClick={() => setIsSignIn((prev) => !prev)}
            >
              {isSignIn ? "Don't have an account?" : 'Already have an account!'}
            </Typography>
            <Button
              disableElevation
              onClick={handleAuth}
              variant='contained'
              color='primary'
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress color='inherit' size={22} />
              ) : isSignIn ? (
                'sign in'
              ) : (
                'sign up'
              )}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AuthDialog;
