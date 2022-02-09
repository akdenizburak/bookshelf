import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState,useEffect } from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase-config';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigation=useNavigation();

    const app=initializeApp(firebaseConfig);
    const auth=getAuth(app);

    useEffect(()=>{
        const unsubscribe= auth.onAuthStateChanged(user=>{
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubscribe
    },[])

    const handleSignUp=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(userCredential=>{
            console.log("Account Created!")
            const user=userCredential.user;
            console.log(user)
            Alert.alert(user)
        })
        .catch(error=>{
            console.log(error)
            Alert.alert(error.message)
        })
    }

    const handleSignIn=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log("Signed In!")
            const user=userCredential.user
            console.log(user)
            Alert.alert("Signed In! Welcome")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email }
                    onChangeText={text =>setEmail(text)}
                    style={styles.input}
                ></TextInput>
                <TextInput
                    placeholder='Password'
                    value={password }
                    onChangeText={text =>setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                ></TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button,styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height:40
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782f9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems:"center"
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
    buttonOutlineText: {
        color: "#0782f9",
        fontWeight: "700",
        fontSize: 16
    },
});
