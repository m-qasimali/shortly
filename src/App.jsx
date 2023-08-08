import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home/index';
import Account from './components/Account/index';
import { ThemeProvider } from '@emotion/react';
import theme from './components/theme';
import ProtectedRoute from './utils/ProtectedRoute';
import RedirectLink from './components/RedirectLink';
import { loader as urlLoader } from "./components/RedirectLink";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
  {
    path: '/:shortCode',
    element: <RedirectLink />,
    loader: urlLoader
  }
]);

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
