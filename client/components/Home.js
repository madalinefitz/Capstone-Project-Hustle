import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function Home({navigation}){

    const {userInfo, logout} = useContext(AuthContext)
    

    return (
      <SafeAreaView>
            <Text style={styles.welcomeUser}>Welcome {userInfo.first_name}</Text>
            <Pressable
              onPress={() => navigation.navigate('Calendar Container')} style={styles.buttons}>
                <Text style={styles.buttonText}>View Calendar</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('My Shifts')} style={styles.buttons}>
                <Text style={styles.buttonText}>My Shifts</Text>
              </Pressable>
            <Pressable
            onPress={() => navigation.navigate('Estimated Pay')} style={styles.buttons}>
              <Text style={styles.buttonText}>Estimated Pay</Text>
            </Pressable>
            <Pressable
            onPress={() => navigation.navigate('Job Categories')} style={styles.buttons}>
              <Text style={styles.buttonText}>All Job Categories</Text>
            </Pressable>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  welcomeUser: {
    fontSize: 30,
    alignSelf: 'center',
    padding: 20,
    fontWeight: 'bold'
  },

  buttons: {
      marginTop: 0,
      backgroundColor: "blue",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 2,
      alignSelf: 'stretch',
      marginVertical: 30,
      marginHorizontal: 10
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    paddingVertical: 20,
    
  }
})

export default Home
