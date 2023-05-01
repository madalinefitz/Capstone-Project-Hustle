import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
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
              style={styles.buttonContainer}>
                <Text style={styles.buttonText}> + </Text>
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

  styles=StyleSheet.create({
    calendar: {
      borderWidth: 0,
      borderColor: 'blue',
      height: '100%',
      width: '100%',
      content: 'fill',
    },
    buttonContainer: {
      marginTop: 0,
      backgroundColor: "grey",
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 2,
      alignSelf: 'flex-end',
      margin: 10,
    },
    buttonText: {
      fontSize: 30,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });

export default CalendarContainer