import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function Calendar({navigation}){

    const {logout} = useContext(AuthContext)

    return (
      <SafeAreaView>
            <Text>Calendar</Text>
            <Button title='logout' onPress={()=> {logout()}}/>
      </SafeAreaView>
    );
  }

export default Calendar