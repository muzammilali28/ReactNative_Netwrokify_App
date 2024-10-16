import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import IMG from "../assets/favicon.png";
import { API_URL } from '../api-configurtaion.json';


const SpeedTest = ({ navigation }) => {
  
  const [speedTestData, setSpeedTestData] = useState();

  const URL = API_URL+"/fyp/speedTest"

  const getSpeedTest = async () => {
    try {
      const response = await fetch(URL,{
        method: "GET"
      })
      const result = await response.json();
      console.log(result);
      setSpeedTestData(result.Speed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSpeedTest();
    console.log(URL)
  },[]);

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Current Speed</Text>
        <Text>{"\n\n"}</Text>
        {speedTestData ? <Text style={styles.fetchedSpeed}>{speedTestData}</Text> : <Text style={styles.loadingText}>Loading ...</Text>}
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
  Img: {
    marginTop: 50
  },
  heading:{
    fontSize: 40
  },
  loadingText: {
    fontSize: 30
  },
  fetchedSpeed: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default SpeedTest;