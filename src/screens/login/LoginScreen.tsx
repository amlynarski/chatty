import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';

import { AuthContext } from '../../globalContexts/Auth/AuthContext';
import { ErrorMessagesContext, ErrorMessagesContextType } from '../../globalContexts/ErrorMessages/ErrorMessagesContext';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const {showError} = useContext<ErrorMessagesContextType>(ErrorMessagesContext);

  const {login} = useContext(AuthContext);

  async function handleLogin() {
    setDisabled(true);
    try {
      await login(username, password);
    } catch(e) {
      showError(e);
    } finally {
      setDisabled(false);
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginPage}>
          <Avatar.Icon size={72} icon="chat" style={styles.logo} />
          <View style={styles.inputs}>
            <TextInput
              label='Username'
              value={username}
              disabled={disabled}
              onChangeText={value => setUsername(value)}
              mode="outlined"
            />
            <TextInput
              label='Password'
              value={password}
              onChangeText={value => setPassword(value)}
              mode="outlined"
              disabled={disabled}
              secureTextEntry={true}
            />
          </View>
          <Button onPress={handleLogin} mode="outlined" disabled={disabled}>
            Login
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginPage: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  inputs: {
    marginBottom: 20
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20
  }
});
