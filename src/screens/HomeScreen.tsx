
import React from 'react';
import {SafeAreaView,ScrollView,Image,StyleSheet,Text,View,TouchableOpacity} from 'react-native';


export const HomeScreen = () => {

  const WakeUpPC = () => {

    alert("Pressed");
    console.log("pressed");
  
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


