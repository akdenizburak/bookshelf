import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase-config';
import {getAuth} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);

const HomeScreen = () => {
  const navigation=useNavigation()

  const handleSignOut=()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.replace("Login")
    })
    .catch(error=>alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}
        </Text>
      <TouchableOpacity
      onPress={handleSignOut}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    marginTop:40
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  },
});
