
import React, { useState } from 'react';
import {SafeAreaView,ScrollView,Image,StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



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
    <SafeAreaView style={styles.background}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.font}> 
            Rooper-Home starten
          </Text>
          <TouchableOpacity style={styles.circle} onPress={WakeUpPC}>
            <Image source={require("../assets/on_icon.png")} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  icon: {
    width: 100,
    height: 100,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 50
  },
  circle: {
    height:200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "blue",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 100
  },
  font: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30
    
  },
  background: {
    height: "100%"
  }
});


