import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TextInput, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import IMG from "../assets/favicon.png";
import { API_URL } from '../api-configurtaion.json';

const Ping = ({ navigation }) => {

  const [pingData, setPingData] = useState("");
  const [url, setURL] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const URL = API_URL+"/fyp/ping"

  const getPing = async () => {

    setButtonClicked(true)
    setPingData("")

    try {
      const response = await fetch(URL,{
        method: "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"url" : url})
      })

      const result = await response.json();
      console.log(result.Host);
      setPingData(result.Host)
    } catch (error) {
      console.log(error)
    }

    setButtonClicked(false)
  }

  console.log(URL)

    return (
    <SafeAreaView style={styles.container}>
      <TextInput
      style={styles.TextInputStyle}
      placeholder="Enter URL Here!"
      onChangeText={(url) => setURL(url)}
      />
      <Text>{"\n\n"}</Text>
      {pingData && <Text style={styles.text}>{pingData}</Text>}
      {buttonClicked && <Text style={styles.text}>Loading....</Text>}
      <Image source={IMG} style={styles.Img}/>
      <Text>{"\n\n"}</Text>
      <Pressable style={styles.button} onPress={getPing}>
      <Text style={styles.buttonText}>Ping Host</Text>
      </Pressable>
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
    marginTop: 30
  },
  TextInputStyle: {
    borderColor: "gray",
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 40,
    fontSize: 10
  },
  text: {
    fontSize: 30
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
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Ping;