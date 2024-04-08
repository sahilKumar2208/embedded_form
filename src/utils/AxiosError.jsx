import React, { useState } from 'react';
import { Snackbar, Alert, useTheme } from '@mui/material';
import axiosInstance from './axios';

const AxiosError = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to show the snackbar
  const showSnackbar = (message) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  // Axios interceptor for handling errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorMessage =
        error.response?.data?.msg ||
        error.response.data.error ||
        'An error occurred. Contact administrator!';
      showSnackbar(errorMessage);
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AxiosError;
