import React from 'react';

export interface NetworkStatusContextType {
  connected: boolean;
}

export const defaultNetworkStatusContext = {
  connected: true
};

export const NetworkStatusContext = React.createContext<NetworkStatusContextType>(defaultNetworkStatusContext);
