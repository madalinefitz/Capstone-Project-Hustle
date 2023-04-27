import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, SafeAreaView, StyleSheet} from 'react-native';
import { Avatar, Button, withTheme } from "react-native-paper"
import { AuthContext } from "./AuthStack/AuthContext";
import { StackActions } from "@react-navigation/native";


function Home({navigation, theme}){
  const { logout, loggedIn, userData } = useContext(AuthContext);

  const { colors } = theme;

  useEffect(() => {
    if (loggedIn === false) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [loggedIn]);

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.userContainer}>
        <Text>Home Screen</Text>
        <Text>{userData.name}</Text>
        <Button
          title="View Job Categories"
          onPress={() => navigation.navigate('Job Categories')}
        />
        </View>
        <Button mode="contained" onPress={() => logout()}>
        Logout
      </Button>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingRight: 30,
      paddingLeft: 30,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    userContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    textContainer: {
      marginTop: 10
    },
  });

export default Home