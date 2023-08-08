import React from 'react';
import { app, firestore } from '../firebase';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useLoaderData } from 'react-router-dom';
import Loader from '../utils/Loader';
import { Stack, Typography } from '@mui/material';

const RedirectLink = () => {
  const longURL = useLoaderData();

  if (longURL) {
    location.href = longURL;
  } else {
    return (
      <Stack
        mt={5}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography variant='h4' color='textSecondary'>
          Invalid Link
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      mt={5}
      spacing={2}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Loader />
      <Typography variant='h5' color='textSecondary'>
        Redirecting to the Link
      </Typography>
    </Stack>
  );
};

export const loader = async ({ params }) => {
  const { shortCode } = params;
  if (shortCode.length > 6 || shortCode.length < 6) return;

  const docRef = doc(firestore, 'links', shortCode);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const { longURL, link, userId } = data;

    const docRef2 = doc(firestore, 'users', userId, 'links', link);

    await updateDoc(docRef2, {
      totalClicks: increment(1),
    });

    return longURL;
  }

  return null;
};

export default RedirectLink;
