import { Alert, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const HomeScreen = () => {
  const [username, setUsername] = useState("")
  const navigation = useNavigation()
  let usersArr = ["burak", "ceyda", "ahmet", "selen"]

  const exampleMethod = () => {
    if (usersArr.includes(username)) {
      navigation.replace("Greet")
      Alert.alert("Hoşgeldin",username.toUpperCase())
    }
    else Alert.alert("Kullanıcı mevcut değil!")

  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={username}
          onChangeText={text => setUsername(text)}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={exampleMethod}
            style={styles.buttonDeneme}

          >
            <Text style={styles.buttonText}>Giriş</Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={styles.container}>
        <Text>E-mail: {auth.currentUser?.email}
        </Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonDeneme: {
    width: "40%",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center"
  },
  buttonContainer: {
    textAlign: "center"
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    height: 40,
    borderWidth: 1,
    borderColor: "#900"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782f9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 16
  },
});
