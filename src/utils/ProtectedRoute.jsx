import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setInitialLoad(false);
    });

    return () => unsubscribe();
  }, []);

  if (initialLoad) {
    return <Loader />;
  } else {
    if (!user) {
      return <Navigate replace to='/' />;
    } else {
      return <Outlet />;
    }
  }
};

export default ProtectedRoute;
