import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function EstimatedPay(){
    const {logout, userInfo} = useContext(AuthContext)

    const weeklyPayList = userInfo.shifts.map(shift=>{
        return(
            shift.hourly_pay
        )
    })

    const initialValue = 0
    const weeklyPaySum = weeklyPayList.reduce(
        (accumulator, currentValue) => accumulator + currentValue, initialValue)
  

    return (
      <SafeAreaView>
          <View style={styles.payContainer}>
            <Text style={styles.pay}>${weeklyPaySum}</Text>
          </View>
      </SafeAreaView>
    );
  }

export default EstimatedPay