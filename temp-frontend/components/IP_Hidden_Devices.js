import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { API_URL } from '../api-configurtaion.json';
import IMG from "../assets/favicon.png";


const Devices = () => {

    const [tableHead, setTableHead] = useState(["IP Address","MAC Address"])
    const [devicesData, setDevicesData] = useState()

    const URL = API_URL+"/fyp/devices"

    const fillData = async () => {
        try {
            const response = await fetch(URL,{
              method: "GET"
            })
            const result = await response.json();
            console.log(result.Found_Devices);
            setDevicesData(result.Found_Devices)
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(()=>{
        fillData()
        console.log(URL)
    },[])

    return (
        <View style={styles.container}>
        { devicesData ?
        <Table borderStyle={{borderWidth: 2, borderColor: 'black', justifyContent: 'center'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.heading}/>
          <Rows data={devicesData} textStyle={styles.text}/>
        </Table> : <Text style={styles.loadingText}>Loading...</Text>}
        <Image source={IMG} style={styles.Img}/>
        <StatusBar style="auto" />
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#d3d8df',
    justifyContent: 'center'
},
head: {
    height: 40,
    backgroundColor: 'grey'
},
text: {
    margin: 6,
    textAlign: 'center'
},
heading: {
    margin: 6,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
},
loadingText: {
    fontSize: 30,
    textAlign: 'center'
},
Img: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 150
  },
});

export default Devices;