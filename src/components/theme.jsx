import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#56B7BA',
      contrastText: '#fff',
    },
    secondary: {
      main: '#03142F',
    },
  },
  typography: {
    h4: {
      fontWeight: '600',
    },
    h3: {
      fontWeight: '600',
    },
    fontFamily: 'poppins',
    button: {
      textTransform: 'capitalize',
    },
  },
});

export default theme;
