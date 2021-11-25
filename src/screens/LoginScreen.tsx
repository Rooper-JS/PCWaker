import React, { useState } from 'react';
import {ImageBackground, View, Button, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import {styles} from './styles';
import {useAuth} from '../contexts/Auth';


const auth = useAuth();

export class LoginScreen extends React.Component <any, any> {
  state = {
    loading: false,
    email: '',
    password: '',
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
    console.log(this.state.email, this.state.password);
    await auth.signIn(this.state.email, this.state.password);
  };

  startLogin = async () => {
    await auth.signIn();
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
            placeholder='E-Mail'
            defaultValue={this.state.email}
            onChangeText={email => this.setState({email: email})}
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
            placeholder='Passwort'
            defaultValue={this.state.password}
            onChangeText={text => this.setState({password: text})}
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