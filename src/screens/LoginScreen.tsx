import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Button, ActivityIndicator, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './styles';
import {useAuth} from '../contexts/Auth';


import * as Keychain from 'react-native-keychain';
import { TextInput } from 'react-native-gesture-handler';
import {  CheckBox, Input } from 'react-native-elements';


const auth = useAuth();

export class LoginScreen extends React.Component <any, any> {
  state = {
    loading: false,
    email: 'julian.seiler@freenet.de',
    password: 'Logo0001!',
    checked: false
  }

  constructor(props) {
    super(props)
    
  }
  

  componentDidMount(){
    setTimeout(() => {
       this.startLogin();
    },1000);
   

  }

  signIn = async () => {
    this.state.loading = true;
    await auth.signIn(this.state.email, this.state.password);
  };

  startLogin = async () => {
    await auth.signIn();
  }

  checkBiometricSensors = async () => {
    var type = await Keychain.getAllGenericPasswordServices()
    console.log(type);
  }


 render() {
  return (
    <View style={styles.container}>
     <ImageBackground source={require("../assets/2726461.jpg")} resizeMode="cover" style={styles.image}>
      {this.state.loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="large" />
      ) : (
      <>
      <View style={styles.inputBoxes}>
        <Input
            placeholder='julian.seiler@freenet.de'
            value={this.state.email}
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
            value={this.state.password}
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

          <Button title="Einloggen" onPress={this.signIn} />
         
        </View>
        </>
      )}

    </ImageBackground>
    </View>
  );
  }
};