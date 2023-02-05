import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TextInput, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import IMG from "../assets/favicon.png";
import { API_URL } from '../api-configurtaion.json';


const TraceRoute = ({ navigation }) => {
  
  const [tableHead, setTableHead] = useState(["Counter","IP Address","Speed(ms)"])
  const [traceRouteData, setTraceRouteData] = useState();
  const [url, setURL] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const URL = API_URL+"/fyp/traceRoute"

  const getTraceHops = async () => {

    setButtonClicked(true)
    setTraceRouteData("")

    try {
      const response = await fetch(URL,{
        method: "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"url" : url})
      })
      const result = await response.json();
      console.log(result.Received_Data);
      setTraceRouteData(result.Received_Data)
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
      { traceRouteData ? traceRouteData.length === 0 ? <Text style={styles.loadingText}>No Data Found</Text> :
        <Table borderStyle={{borderWidth: 2, borderColor: 'black', justifyContent: 'center'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.heading}/>
          <Rows data={traceRouteData} textStyle={styles.text}/>
        </Table> : buttonClicked && <Text style={styles.loadingText}>Loading...</Text>}
        <Image source={IMG} style={styles.Img}/>
      <Text>{"\n"}</Text>
      <Pressable style={styles.button} onPress={getTraceHops}>
      <Text style={styles.buttonText}>Trace</Text>
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
    marginBottom: 30
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

export default TraceRoute;