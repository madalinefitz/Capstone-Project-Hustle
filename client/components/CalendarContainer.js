import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


function CalendarContainer({navigation}){

    const {userInfo} = useContext(AuthContext)
    const [startDate, setStartDate] = useState('')
    // console.log(startDate)

    return (
      <SafeAreaView>
            <TouchableOpacity 
              style={styles.addShiftButtonContainer}>
                <Text style={styles.addShiftButtonText}> + </Text>
            </TouchableOpacity>
            <Calendar onDayPress={day => {setStartDate(day)}} markingType="multi-period" 
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
      </SafeAreaView>
    );
  }

export default CalendarContainer