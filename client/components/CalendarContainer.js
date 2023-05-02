import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


function CalendarContainer({navigation}){

    const {userInfo} = useContext(AuthContext)
    const [addShift, setAddShift] = useState(false)
    
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    // const [endDate, setEndDate] = useState('')
    const [jobCategory, setJobCategory] = useState('')
    const [hourlyPay, setHourlyPay] = useState('')
    const [location, setLocation] = useState('')

    const [createdShift, setCreatedShift] = useState('')
    
    const userId = userInfo.id


    const createNewShift = () => {
      const newShift = {
        user_id: userId,
        // start_date_time: startDate,
        start_time: startTime,
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
          .then(shift => setCreatedShift(shift))
    }
    console.log(createdShift)
    console.log(location)
    console.log(userId)
    console.log(jobCategory)
    console.log(hourlyPay)
    console.log(startTime)


    return (
      <SafeAreaView>
          {addShift ? (
              <TouchableOpacity 
              style={styles.addShiftButtonContainer} onPress={()=>{createNewShift()}}>
                <Text style={styles.addShiftButtonText}> Save Shift </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.addShiftButtonContainer} onPress={()=>setAddShift(!addShift)}>
                  <Text style={styles.addShiftButtonText}> + </Text>
              </TouchableOpacity>
            )
          }
          <Calendar onDayPress={day => {setStartDate(day.dateString)}} markingType="multi-period" 
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
                <TextInput style={styles.shiftInput} placeholder='tap start date on calendar'>{startDate}</TextInput>
                {/* <TextInput style={styles.shiftInput} placeholder='tap end date on calendar'>{endDate}</TextInput> */}
                <TextInput style={styles.shiftInput} placeholder='start time' onChangeText={(text)=>{setStartTime(text)}}/>
                <TextInput style={styles.shiftInput} placeholder='job category' onChangeText={(text)=>{setJobCategory(text)}}/>
                <TextInput style={styles.shiftInput} placeholder='hourly pay' onChangeText={(text)=>{setHourlyPay(text)}}/>
                <TextInput style={styles.shiftInput} placeholder='location' onChangeText={(text)=>{setLocation(text)}}/>
              </View>
            ):(
              null
            )
          }      
      </SafeAreaView>
    );
  }

export default CalendarContainer