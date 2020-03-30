import * as React from 'react';
import { View } from 'react-native';
import { useContext } from 'react';
import { Button, Text } from 'react-native-paper';

import { AuthContext, AuthContextType } from '../../globalContexts/Auth/AuthContext';

export default function ProfileScreen() {
  const {logout, me} = useContext<AuthContextType>(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {me && <Text>{me.username}</Text>}
      <Button onPress={logout} mode="outlined">
        Logout
      </Button>
    </View>
  );
}