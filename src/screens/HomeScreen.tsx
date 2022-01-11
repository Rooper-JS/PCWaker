
import React from 'react';
import {SafeAreaView,ScrollView,Image,StyleSheet,Text,View,TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles';
import { showToast } from '../services/toastService';


export const HomeScreen = () => {


  // const showToast = async () => {
  //   Toast.show({
  //     type: 'success',
  //     position: 'bottom',
  //     text1: 'Erfolgreich',
  //     text2: 'Befehl wurde erfolgreich gesendet'
  //   });
  // }
  
  const WakeUpPC = async () => {


    let user = await AsyncStorage.getItem('@AuthData');
    var user_json = JSON.parse(user);
    
    try {
        const response = await fetch(
          'http://rooper.de:8090/wakeup', {
            headers: {
                'Authorization': user_json.token,
                'Content-Type': 'application/json'
            }
          }
        );
        const res = await response;
        showToast("success", "Erfolgreich!", 'Befehl wurde erfolgreich gesendet');
    
      } catch (error) {
        console.error(error);
        showToast("error", "Fehlgeschlagen!", 'Fehler: ' + error);
      }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/2726461.jpg")} resizeMode="cover" style={styles.image}>
        <View>
          <Text style={styles_local.font}> 
            Rooper-Home starten
          </Text>
          <TouchableOpacity style={styles_local.circle} onPress={WakeUpPC}>
            <Image source={require("../assets/power-btn.png")} style={styles_local.icon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
     </View>
  );
};

const styles_local = StyleSheet.create({

  icon: {
    width: 100,
    height: 100,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 60,
    opacity: 0.9
  },
  circle: {
    height:260,
    width: 260,
    borderRadius: 130,
    borderWidth: 20,
    borderColor: "rgba(11, 189, 17,0.45)",
    backgroundColor: "rgba(11, 189, 17,0.2)",
    marginRight: "auto",
    marginLeft: "auto",
  },
  font: {
    fontSize: 35,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: -230,
    top: -70,
    color: 'white'
    
  },
  background: {
    height: "100%"
  }
});


