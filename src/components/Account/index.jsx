import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Snackbar,
  IconButton,
  Alert,
} from '@mui/material';
import ListCard from './ListCard';
import URLShortenDialog from './URLShortenDialog';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { app, auth, firestore } from '../../firebase';
import Loader from '../../utils/Loader';
import copy from 'copy-to-clipboard';
import { Close } from '@mui/icons-material';

const index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [openToast, setOpenToast] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const openDialog = () => {
    setOpenModal(true);
  };

  const handleToast = () => {
    setOpenToast(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = collection(
        firestore,
        'users',
        auth.currentUser.uid,
        'links'
      );
      const docSnap = await getDocs(docRef);

      const temporaryArray = [];
      docSnap.forEach((doc) => {
        temporaryArray.push({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          id: doc.id,
        });
      });

      setData(temporaryArray);
    };

    fetchData();
  }, []);

  const handleDeleteShortenURL = useCallback(async (link, shortCode) => {
    const res = await deleteDoc(
      doc(firestore, 'users', auth.currentUser.uid, 'links', link)
    );

    const res1 = await deleteDoc(doc(firestore, 'links', shortCode));

    setData((prev) => prev.filter((item) => item.id != link));
  }, []);

  const handleCreateShortenURL = async (name, longURL) => {
    try {
      const link = {
        name,
        longURL:
          longURL.includes('https://') || longURL.includes('http://')
            ? longURL
            : `http://${longURL}`,
        createdAt: serverTimestamp(), // Use serverTimestamp to get Firestore server time
        totalClicks: 0,
        shortCode: nanoid(6), // Generate a short code using nanoid
      };

      const doc1 = await addDoc(
        collection(firestore, 'users', auth.currentUser.uid, 'links'),
        link
      );

      setData((prev) => [
        ...prev,
        { ...link, createdAt: new Date(), id: doc1.id },
      ]);

      const doc2 = await setDoc(doc(firestore, 'links', link.shortCode), {
        link: doc1.id,
        longURL: link.longURL,
        userId: auth.currentUser.uid,
      });

      console.log(doc2);
    } catch (error) {
      throw new error('Error adding document:', error);
    }
  };

  const handleCopy = useCallback((url) => {
    copy(url);
    setOpenToast(true);
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openToast}
        autoHideDuration={2000}
        onClose={handleToast}
      >
        <Alert
          action={
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleToast}
            >
              <Close fontSize='small' />
            </IconButton>
          }
          severity='info'
        >
          URL copied to clipboard
        </Alert>
      </Snackbar>
      <URLShortenDialog
        createLink={handleCreateShortenURL}
        open={openModal}
        handleClose={closeModal}
      />
      <Navbar />
      <Container maxWidth='md'>
        <Box mt={15}>
          <Stack direction={'row'}>
            <Typography mr={2} variant='h4'>
              Links
            </Typography>
            <Button
              disableElevation
              onClick={openDialog}
              variant='contained'
              color='primary'
            >
              Create New
            </Button>
          </Stack>
        </Box>

        <Box my={10}>
          {data === null ? (
            <Loader />
          ) : !data.length ? (
            <Stack spacing={3} direction={'column'} alignItems={'center'}>
              <img width='225px' src='images/noData.svg' alt='no-data-svg' />
              <Typography variant='h6' color='textSecondary'>
                No Data
              </Typography>
            </Stack>
          ) : (
            data
              .sort((prev, next) => next.createdAt - prev.createdAt)
              .map((item, index) => {
                return (
                  <Fragment key={item.id}>
                    <ListCard
                      deletLink={handleDeleteShortenURL}
                      handleCopy={handleCopy}
                      {...item}
                    />
                    {index !== data.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                );
              })
          )}
        </Box>
      </Container>
    </>
  );
};

export default index;
