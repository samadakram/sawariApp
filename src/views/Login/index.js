import React, { useState } from 'react';
import * as Facebook from 'expo-facebook';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ setSignedIn }) {

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '2752082565100808',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const name = (await response.json()).name;
        console.log("Name==>", name)
        Alert.alert('Logged in!', `Hi ${name}!`);

        await AsyncStorage.setItem('@storage_Key', name || "No Name" )
        // Alert.alert('Successfully');
        // setUserName((await response.json()));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const userLogIn = async () => {
    await logIn();
    setSignedIn(true)
  }

  return (
    <View style={{ flex: 1, }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={userLogIn} />
    </View>
  );
}

export default Login;