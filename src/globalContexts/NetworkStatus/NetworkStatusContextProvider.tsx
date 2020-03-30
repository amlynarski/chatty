import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Snackbar } from 'react-native-paper';

import { NetworkStatusContext } from './NetworkStatusContext';

export default function NetworkStatusContextProvider(props: PropsWithChildren<{}>) {
  const [connected, setConnected] = useState<boolean>(true);
  const [snackVisible, setSnackVisible] = useState<boolean>(false);

  const handleConnectionChange = useCallback((status: boolean) => {
    setConnected(status);

    if (!status) {
      setSnackVisible(true);
    }
  }, [setConnected, setSnackVisible]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      handleConnectionChange(state.isConnected);
    });

    return () => unsubscribe()
  }, [handleConnectionChange]);

  return (
    <NetworkStatusContext.Provider value={{connected}}>
      <>
        {props.children}
        <Snackbar
          duration={Snackbar.DURATION_SHORT}
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}>
          You are offline!
        </Snackbar>
      </>
    </NetworkStatusContext.Provider>
  )
}
