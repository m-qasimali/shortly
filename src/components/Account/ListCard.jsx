import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Hidden,
} from '@mui/material';
import React, { memo, useState } from 'react';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import { format } from 'date-fns';

const ListCard = ({
  id,
  name,
  createdAt,
  longURL,
  shortCode,
  totalClicks,
  deletLink,
  handleCopy: copyURL,
}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const shortURL = `${location.hostname}:${location.port}/${shortCode}`;

  const closeConfirm = () => {
    setIsOpenConfirm(false);
  };

  const handleConfirm = (e) => {
    if (e.target.value == 'true') {
      deletLink(id, shortCode);
    }
    setIsOpenConfirm(false);
  };
  return (
    <>
      <Dialog
        open={isOpenConfirm}
        onClose={closeConfirm}
        aria-labelledby={'confirmation-box'}
        fullWidth
      >
        <DialogTitle id={'confirmation-box'}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this link?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 2 }}>
          <Button
            autoFocus
            value={false}
            variant='outlined'
            color='primary'
            size='small'
            onClick={handleConfirm}
            disableElevation
          >
            Cancel
          </Button>
          <Button
            value={true}
            variant='contained'
            size='small'
            color='primary'
            onClick={handleConfirm}
            disableElevation
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item xs={10} sm={8}>
          <Box width={'50%'}>
            <Typography variant='overline' color='textSecondary'>
              {`CREATED AT ${format(createdAt, 'dd MMM, hh:mm')}`}
            </Typography>
            <Box my={2}>
              <Typography variant='h5' color='initial'>
                {name}
              </Typography>
              <Typography
                variant='body1'
                color='initial'
                overflow={'hidden'}
                textOverflow={'ellipsis'}
              >
                {longURL}
              </Typography>
            </Box>
            <Stack
              spacing={3}
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
            >
              <Typography variant='body2' color='primary'>
                {shortURL}
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <Button
                  onClick={() => copyURL(shortURL)}
                  disableElevation
                  size='small'
                  variant='outlined'
                >
                  Copy
                </Button>
                <Button
                  disableElevation
                  color='secondary'
                  size='small'
                  variant='contained'
                  onClick={() => setIsOpenConfirm(true)}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Stack
              direction={'row'}
              justifyContent={'center'}
              alignItems={'end'}
            >
              <Typography variant='subtitle2' color='initial'>
                {totalClicks}
              </Typography>
              <StackedBarChartIcon />
            </Stack>
            <Hidden smDown={true}>
              <Typography
                sx={{ textTransform: 'uppercase' }}
                mt={1}
                variant='body2'
                color='initial'
              >
                TOTAL CLICK
              </Typography>
            </Hidden>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(ListCard);
