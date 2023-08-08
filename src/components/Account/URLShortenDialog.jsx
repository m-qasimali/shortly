import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const URLShortenDialog = ({ open, handleClose: closeModal, createLink }) => {
  const initialState = {
    name: '',
    url: '',
  };
  const [isUploading, setIsUploding] = useState(false);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({
    name: '',
    url: '',
  });

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setForm(initialState);
    closeModal();
  };

  const handleForm = async () => {
    let terrors = {};
    const tname = form.name.trim();
    const turl = form.url.trim();
    const regex =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

    if (tname.length < 3 || tname.length > 15) {
      terrors.name = 'The name should be min 3 and max 15';
    }

    if (!regex.test(turl)) {
      terrors.url = 'url is invalid';
    }

    if (!!Object.keys(terrors).length) {
      setErrors(terrors);
    } else {
      setIsUploding(true);
      try {
        await createLink(tname, turl);
      } catch (err) {
        alert(err);
      } finally {
        setIsUploding(false);
      }
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={'dialog-title'}
      >
        <DialogTitle id={'dialog-title'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            Shorten URL
            <IconButton aria-label='close-btn' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            id='name'
            label='name'
            name='name'
            value={form.name}
            variant='filled'
            onChange={updateForm}
            fullWidth
            sx={{ my: 2 }}
          />
          <TextField
            error={!!errors.url}
            helperText={errors.url}
            id='url'
            label='long url'
            name='url'
            value={form.url}
            variant='filled'
            onChange={updateForm}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isUploading}
            sx={{ mr: 2 }}
            disableElevation
            variant='contained'
            onClick={handleForm}
            color='primary'
          >
            {isUploading ? (
              <CircularProgress color='inherit' size={22} />
            ) : (
              'Shorten URL'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default URLShortenDialog;
