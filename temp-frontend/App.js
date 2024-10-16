import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button } from 'react-native';
import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import SpeedTest from './components/SpeedTest';
import Ping from './components/Ping';
import Ports from './components/PortsScanning';
import TraceRoute from './components/TraceRoute';
import HiddenDevices from './components/IP_Hidden_Devices';

const Stack = createStackNavigator();

const App = () => { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen}/>
        <Stack.Screen name="Speed Test" component={SpeedTest}/>
        <Stack.Screen name="Ping" component={Ping}/>
        <Stack.Screen name="Ports Scanning" component={Ports}/>
        <Stack.Screen name="Trace Route" component={TraceRoute}/>
        <Stack.Screen name="IP Hidden Devices" component={HiddenDevices}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d8df',
    justifyContent: 'center',
    alignItems: 'center',
  },
  home: {
    textAlign: 'center',
    justifyContent: 'center'
  }
});

export default App;