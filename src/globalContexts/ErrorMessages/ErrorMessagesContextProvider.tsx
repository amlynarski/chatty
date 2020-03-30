import React, { PropsWithChildren, useState } from 'react';

import { ErrorMessagesContext } from './ErrorMessagesContext';
import { Snackbar } from 'react-native-paper';

export default function ErrorMessagesContextProvider(props: PropsWithChildren<{}>) {
  const [error, setError] = useState<string | null>(null);
  const [snackVisible, setSnackVisible] = useState<boolean>(false);

  function showError(err: any) {
    if (!err) {
      return;
    }
    if (typeof err === 'string') {
      setError(err);
    } else if (err && err.message && typeof err.message === 'string') {
      setError(err.message);
    } else {
      setError('Something wrong...')
    }
    setSnackVisible(true);
  }

  function clearError() {
    setError(null);
    setSnackVisible(false);
  }

  return (
    <ErrorMessagesContext.Provider value={{
      showError
    }}>
      {props.children}
      <Snackbar
        duration={Snackbar.DURATION_SHORT}
        visible={snackVisible}
        onDismiss={clearError}>
        {error}
      </Snackbar>
    </ErrorMessagesContext.Provider>
  )
}