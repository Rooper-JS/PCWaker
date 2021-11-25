
import React from 'react';
import {SafeAreaView,ScrollView,Image,StyleSheet,Text,View,TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles';


export const HomeScreen = () => {

  const WakeUpPC = async () => {


    let user = await AsyncStorage.getItem('@AuthData');
    var user_json = JSON.parse(user);
    
    try {
        const response = await fetch(
          'http://rooper-vpn.ddns.net:8090/wakeup', {
            headers: {
                'Authorization': user_json.token,
                'Content-Type': 'application/json'
            }
          }
        );
        const res = await response;
        alert("Erfolgreich gestartet!");
    
      } catch (error) {
        console.error(error);
        alert("Error");
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
            <Image source={require("../assets/on_icon.png")} style={styles_local.icon} />
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
    marginTop: 6
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


