import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


function CalendarContainer({navigation}){

    const {logout} = useContext(AuthContext)

    return (
      <SafeAreaView>
            <Button title='Add Shift' />
            <Calendar onDayPress={day => {console.log('selected day', day)}} />
      </SafeAreaView>
    );
  }

export default CalendarContainer