import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyShifts({navigation}){

    const {logout} = useContext(AuthContext)

    return (
      <SafeAreaView>
            <Text>MyShifts</Text>
            <Button title='logout' onPress={()=> {logout()}}/>
      </SafeAreaView>
    );
  }

export default MyShifts