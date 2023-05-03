import React, {useEffect, useContext, useState, useCallback, useMemo, Fragment, useRef} from 'react';
import {Text, Pressable, View, Switch, Alert, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import {Calendar, CalendarUtils, CalendarList, Agenda, AgendaSchedule, AgendaEntry,} from 'react-native-calendars';


function CalendarContainer(){

  const {userInfo, addNewShift} = useContext(AuthContext)
     
  const [addShift, setAddShift] = useState(false)
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [jobCategory, setJobCategory] = useState('')
  const [hourlyPay, setHourlyPay] = useState('')
  const [location, setLocation] = useState('')

  // const [shiftDates, setShiftDates] = useState(myShiftDates)
  const myShifts = [...userInfo.shifts]
  const userId = userInfo.id

  //trying to get my shift dates to populate to calendar
  // const myShiftDates = myShifts.map( shift => {
  //   return(
  //     Date(shift.start_date_time.split(' ')[0])
  //     )
  //   }
  // )
  
  // console.log(shiftDates)

  const createNewShift = () => {
    const newShift = {
      user_id: userId,
      start_date_time: startDateTime,
      end_date_time: endDateTime,
      job_id: jobCategory,
      hourly_pay: hourlyPay,
      location: location
    }
    fetch('http://127.0.0.1:5555/shifts', { 
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newShift)
      }
    )
        .then(r => r.json())
        .then(newShift => addNewShift(newShift))

      setStartDateTime('')
      setEndDateTime('')
      setHourlyPay('')
      setJobCategory('')
      setLocation('')
  }
  

  return (
    <SafeAreaView>
        {addShift ? (
            <TouchableOpacity 
            style={styles.addShiftButtonContainer} onPress={()=>setAddShift(!addShift)}>
              <Text style={styles.addShiftButtonText}> - </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.addShiftButtonContainer} onPress={()=>setAddShift(!addShift)}>
                <Text style={styles.addShiftButtonText}> + </Text>
            </TouchableOpacity>
          )
        }
        <Calendar onDayPress={day => {setStartDateTime(day.dateString)}} markingType="multi-period" 
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e'
        }}
        />
        {addShift ? (
            <View>
              <TextInput style={styles.shiftInput} placeholder='tap start date on calendar'  value={startDateTime} onChangeText={(text)=>{setStartDateTime(text)}}/>
              <TextInput style={styles.shiftInput} placeholder='tap end date on calendar' value={endDateTime} onChangeText={(text)=>{setEndDateTime(text)}}/>
              <TextInput style={styles.shiftInput} placeholder='job category' value={jobCategory} onChangeText={(text)=>{setJobCategory(text)}}/>
              <TextInput style={styles.shiftInput} placeholder='hourly pay' value={hourlyPay} onChangeText={(text)=>{setHourlyPay(text)}}/>
              <TextInput style={styles.shiftInput} placeholder='location' value={location} onChangeText={(text)=>{setLocation(text)}}/>
              <TouchableOpacity 
                  style={styles.addShiftButtonContainer} onPress={()=>createNewShift()}>
                <Text style={styles.addShiftButtonText}> Save Shift </Text>
              </TouchableOpacity>
            </View>
          ):(
            null
          )
        }      
    </SafeAreaView>
  );
}

export default CalendarContainer