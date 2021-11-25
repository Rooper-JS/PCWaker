import React, {useState} from 'react';
import {ImageBackground, View, Button, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './styles';
import {useAuth} from '../contexts/Auth';


import * as Keychain from 'react-native-keychain';
import { TextInput } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';

Keychain.setGenericPassword('julian.seiler@freenet.de', 'Logo0001!',{
  service: 'FaceID',
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY as any,
  accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
})


export class LoginScreen extends React.Component {
  constructor
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  componentDidMount()

  const signIn = async () => {
    isLoading(true);
    await auth.signIn(email,password);
  };

  const startLogin = async () => {
    await auth.signIn();
  }

  return (
    <View style={styles.container}>
     <ImageBackground source={require("../assets/2726461.jpg")} resizeMode="cover" style={styles.image}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="large" />
      ) : (
      <>
      <View style={styles.inputBoxes}>
        <Input
            placeholder='julian.seiler@freenet.de'
            value={email}
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color='white'
              />}
            autoCompleteType=''
            label='E-Mail'
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
            disabledInputStyle={{color: 'white'}}
          />
          <Input
            placeholder='Logo0001!'
            value={password}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='white'
              />}
            autoCompleteType=''
            label='Passwort'
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
            disabledInputStyle={{color: 'white'}}
            secureTextEntry={true}
            
          />
      </View>
        <View style={styles.Button}>
          <Button title="Einloggen" onPress={signIn} />
        </View>
        </>
      )}

    </ImageBackground>
    </View>
  );
};