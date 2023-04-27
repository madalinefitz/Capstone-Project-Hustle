import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Home({navigation}){

    const {logout} = useContext(AuthContext)

    return (
      <SafeAreaView>
            <Text>Home Screen</Text>
            <Button title='logout' onPress={()=> {logout()}}/>
            <Button
              title="View Job Categories"
              onPress={() => navigation.navigate('Job Categories')}/>
      </SafeAreaView>
    );
  }

export default Home