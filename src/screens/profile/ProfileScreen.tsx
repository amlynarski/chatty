import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useContext, useEffect } from 'react';
import { AuthContext, AuthContextType } from '../../globalContexts/AuthContext';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  const {logout} = useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    console.log('Profile screen mounted');

    return () => console.log('Unmounted profile screen')
  },[])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={logout} mode="outlined">
        Logout
      </Button>
    </View>
  );
}