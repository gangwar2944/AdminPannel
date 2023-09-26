import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element, isAuthenticated }) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
