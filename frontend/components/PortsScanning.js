import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TextInput, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import IMG from "../assets/favicon.png";
import { Table, Row, Rows } from 'react-native-table-component';
import { API_URL } from '../api-configurtaion.json'


const Ports = ({ navigation }) => {
  
  const [tableHead, setTableHead] = useState(["Open Ports"])
  const [portData, setPortData] = useState()
  const [url, setURL] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const URL = API_URL+"/fyp/portInUse"
  
  const getOpenPorts = async () => {

    setButtonClicked(true)
    setPortData("")

    try {
      const response = await fetch(URL,{
        method: "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"url" : url})
      })
      const result = await response.json();
      console.log(result.Ports);
      setPortData(result.Ports)
    } catch (error) {
      console.log(error)
    }

    setButtonClicked(false)
  }

  console.log(URL)
  
    return (
      <View style={styles.container}>
      <TextInput
      style={styles.TextInputStyle}
      placeholder="Enter URL Here!"
      onChangeText={(url) => setURL(url)}/>
      { portData ? portData.length === 0 ? <Text style={styles.loadingText}>No Data Found</Text> : 
        <Table borderStyle={{borderWidth: 2, borderColor: 'black', justifyContent: 'center'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.heading}/>
          <Rows data={portData} textStyle={styles.text}/>
        </Table> : buttonClicked && <Text style={styles.loadingText}>Loading...</Text>}
        <Image source={IMG} style={styles.Img}/>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={getOpenPorts}>
      <Text style={styles.buttonText}>Check Ports</Text>
      </Pressable>
      <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d8df',
    justifyContent: 'center',
  },
  TextInputStyle: {
    borderColor: "gray",
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 40,
    fontSize: 10,
    marginLeft: 58,
    marginBottom: 50
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'black',
    width: '40%',
    marginLeft: 115
  },
  heading: {
    fontSize: 20,
    marginTop: 20
  },
  Img: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 170
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  loadingText: {
    marginTop: 50,
    fontSize: 30,
    textAlign: 'center'
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
});

export default Ports;