import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';

import {styles} from './styles';
import {useAuth} from '../contexts/Auth';


import * as Keychain from 'react-native-keychain';
Keychain.setGenericPassword('julian.seiler@freenet.de', 'Logo0001!',{
  service: 'FaceID',
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY as any,
  accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
})


export const LoginScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    await auth.signIn();
  };
  

  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (<>
        <Button title="Sign In" onPress={signIn} />
        </>
      )}
    </View>
  );
};