import React, {useEffect, useContext, useState} from 'react'
import {Text, Pressable, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from './AuthContext'
import { DateContext } from './DateContext'



function EstimatedPay(){
    const {userInfo, myShifts} = useContext(AuthContext)
    const {firstday, lastday} = useContext(DateContext)

  
    const weeksShifts = myShifts.filter(shift=>{
        const shiftDate = new Date(shift.start_date_time).getTime()
        const firstDate = new Date(firstday).getTime()
        const lastDate = new Date(lastday).getTime()
  
        if ((shiftDate >= firstDate) && (shiftDate <= lastDate)){
          return shift
        }
      })
    
    
    const weeklyPayList = weeksShifts.map(shift=>{
      if (shift){
        return(shift.hourly_pay)
      } else {
        return 0
      }
    })

    const initialValue = 0
    const weeklyPaySum = weeklyPayList.reduce((accumulator, currentValue) => 
      accumulator + currentValue, initialValue
    )

    //need to change weekly pay state when shifts are updated
    // const [weeklyPay, setWeeklyPay] = useState(0)
    
  

    return (
      <SafeAreaView>
        <Text style={styles.haul}>This Week's Haul:</Text>
          <View style={styles.payContainer}>
            <Text style={styles.pay}>${weeklyPaySum}</Text>
          </View>
      </SafeAreaView>
    );
  }

export default EstimatedPay