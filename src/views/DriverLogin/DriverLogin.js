import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';

import { auth } from '../../config/firebase';

function DriverLogin({ setDriverDashboard, setDriverName }) {

    const [userName, setUserName] = useState('');

    const handleAuth = async () => {
        try {
            await Facebook.initializeAsync({ appId: '2752082565100808', }); // enter your Facebook App Id 
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                auth.signInWithCredential(credential)
                    .then(user => { // All the details about user are in here returned from firebase
                        console.log('Logged in successfully', user);
                        console.log('User name==>', user.user.displayName);
                        setUserName(user.user.displayName);
                        setDriverName(user.user.displayName);
                        setDriverDashboard(true);
                        console.log("Profile==>", user.user.photoURL);
                    })
                    .catch((error) => {
                        console.log('Error occurred ', error)
                    });
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Login as Driver</Text>
            <Button
                title="Login as Driver"
                onPress={handleAuth}
            />
            <Text>User : {userName} </Text>
        </View>
    )
}

export default DriverLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
