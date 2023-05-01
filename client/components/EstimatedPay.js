import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function EstimatedPay({navigation}){

    const {logout, userInfo} = useContext(AuthContext)

    const [estPay, setEstPay] = useState('')

    const weeklyPayList = userInfo.shifts.map(shift=>{
        return(
            shift.hourly_pay
        )
    })

    const initialValue = 0
    const weeklyPaySum = weeklyPayList.reduce( 
        (accumulator, currentValue) => accumulator + currentValue, initialValue)

    console.log(weeklyPaySum)
   

    return (
      <SafeAreaView>
            <Text>Estimated Pay</Text>
            <Text>{weeklyPaySum}</Text>
            <Button title='logout' onPress={()=> {logout()}}/>
      </SafeAreaView>
    );
  }

export default EstimatedPay