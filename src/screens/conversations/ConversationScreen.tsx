import { Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import { AuthContext, AuthContextType } from '../../globalContexts/AuthContext';

export default function ConversationsScreen() {
  const { me } = useContext<AuthContextType>(AuthContext);

  if (!me) {
    return null;
  }


  return (
    <View>

    </View>
  );
}