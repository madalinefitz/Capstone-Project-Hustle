import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function EstimatedPay({navigation}){

    const {logout} = useContext(AuthContext)

    return (
      <SafeAreaView>
            <Text>Estimated Pay</Text>
            <Button title='logout' onPress={()=> {logout()}}/>
      </SafeAreaView>
    );
  }

export default EstimatedPay