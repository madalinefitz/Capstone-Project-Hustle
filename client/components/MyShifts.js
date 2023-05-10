import React, {useEffect, useContext, useState} from 'react'
import {Text, FlatList, Pressable, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from './AuthContext'
import { DateContext } from './DateContext'
import MyShiftItems from './MyShiftItems'


function MyShifts(){

    const {userInfo, myShifts} = useContext(AuthContext)
    const {firstday, lastday} = useContext(DateContext)
    const [currentWeek, setCurrentWeek] = useState(false)

    const weeksShifts = myShifts.filter(shift =>{
      const shiftDate = new Date(shift.start_date_time).getTime()
      const firstDate = new Date(firstday).getTime()
      const lastDate = new Date(lastday).getTime()

      if ((shiftDate >= firstDate) && (lastDate >= shiftDate)){
        return shift
      }
    })
    
    return (
      <SafeAreaView style={styles.shiftsContainer}>
          {currentWeek ? (
            <>
            <Pressable onPress={()=>setCurrentWeek(!currentWeek)} style={styles.shiftsButton}>
              <Text style={styles.shiftsButtonText}>View Current Week's Shifts</Text>
            </Pressable>
            <FlatList data={myShifts}
                renderItem={({item}) => <MyShiftItems job_category_name={item.job_category.category_name} job_category_id={item.job_category.id} start_date_time={item.start_date_time} hourly_pay={item.hourly_pay} location={item.location} end_date_time={item.end_date_time} id={item.id}/>}
                keyExtractor={item => item.id}/>
          </>
            
          ) : (
            <>
              <Pressable onPress={()=>setCurrentWeek(!currentWeek)} style={styles.shiftsButton}>
                <Text style={styles.shiftsButtonText}>View All Shifts</Text>
              </Pressable>
              <FlatList data={weeksShifts}
                renderItem={({item}) => <MyShiftItems job_category_name={item.job_category.category_name} job_category_id={item.job_category.id} start_date_time={item.start_date_time} hourly_pay={item.hourly_pay} location={item.location} end_date_time={item.end_date_time} id={item.id}/>}
                keyExtractor={item => item.id}/>
            </>
            
          )
          }
      </SafeAreaView>
    )
  }

export default MyShifts