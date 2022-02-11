import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GreetScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: "green", fontSize: 50, fontWeight: "900", textAlign: "center",textTransform:'uppercase'}}>GreetScreen</Text>
        </View>
    )
}

export default GreetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "orange",
        alignContent: "center",
        justifyContent: "center"
    }
})