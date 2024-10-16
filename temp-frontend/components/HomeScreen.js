import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import IMG from "../assets/favicon.png";
import * as Font from 'expo-font';

const HomeScreen = ({ navigation }) => {
  
  // const loadFonts = async () => {
  //   try {
  //     await Font.loadAsync({
  //       'Solitreo-Regular': require('../assets/fonts/Solitreo-Regular.ttf'),
  //     });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  // useEffect(()=>{
  //   loadFonts();
  // },[])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Networkify</Text>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Speed Test')}>
      <Text style={styles.text}>Speed-Test</Text>
      </Pressable>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Ping')}>
      <Text style={styles.text}>Ping</Text>
      </Pressable>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Ports Scanning')}>
      <Text style={styles.text}>Port-Scanning</Text>
      </Pressable>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Trace Route')}>
      <Text style={styles.text}>Trace-Route</Text>
      </Pressable>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('IP Hidden Devices')}>
      <Text style={styles.text}>IP-Hidden-Devices</Text>
      </Pressable>
      <Image source={IMG} style={styles.Img}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d8df',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  Img: {
    marginTop: 50
  },
  heading: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 6
    // fontFamily: 'abeezee-italic'
    // fontFamily : 'Solitreo-Regular'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,    //32 Default
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default HomeScreen;