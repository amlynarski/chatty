import React from 'react';
import { Text, View } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
};
