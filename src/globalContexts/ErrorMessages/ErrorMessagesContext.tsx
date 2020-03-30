import React from 'react';

export interface ErrorMessagesContextType {
  showError: (error: any) => void
}

export const defaultErrorMessagesContext = {
  showError: () => undefined
};

export const ErrorMessagesContext = React.createContext<ErrorMessagesContextType>(defaultErrorMessagesContext);