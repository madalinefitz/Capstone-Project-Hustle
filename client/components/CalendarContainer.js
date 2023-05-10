import React, {useEffect, useContext, useState, useCallback, useMemo, Fragment, useRef} from 'react'
import {Text, View, Switch, Alert, Modal, TouchableOpacity, TextInput, Pressable, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from './AuthContext'
import {Calendar, CalendarUtils, CalendarList, Agenda, AgendaSchedule, AgendaEntry,} from 'react-native-calendars'
import DatePicker from 'react-native-date-picker'


function CalendarContainer(){
  const {userInfo, myJobCategories, addNewShift, myShifts} = useContext(AuthContext)
     
  const [addShift, setAddShift] = useState(false)
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())
  const [jobCategory, setJobCategory] = useState('')
  const [hourlyPay, setHourlyPay] = useState('')
  const [location, setLocation] = useState('')
  const [startOpen, setStartOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)

  const [showDropdown, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState('Select Job Category')

  const myUniqueCategories = [...new Map(userInfo.job_categories.map((c) => [c.category_name, c])).values()]
  
  const renderDropdown = myUniqueCategories.map(jc => {
    if (showDropdown) {
        return (
          <View key={jc.id} style={styles.dropdownContainer}>
            <Pressable key={jc.id} onPress={()=> {setSelected(jc.category_name), setShowDropdown(!setShowDropdown), setJobCategory(jc.id)}} style={styles.dropdownOptions}>
                <Text key={jc.id}>{jc.category_name}</Text>
            </Pressable>
          </View>
          )
      }
  })

  const createNewShift = () => {
    const newShift = {
      user_id: userInfo.id,
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
        .then(newShift => addNewShift({...newShift, start_date_time:startDateTime, end_date_time:endDateTime}))
        console.log(newShift)
        
      setStartDateTime('')
      setEndDateTime('')
      setHourlyPay('')
      setJobCategory('')
      setLocation('')
      setSelected('Select Job Category')
  }

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit", 
    minute: "2-digit", 
    timeZone: "EDT"
  }
  
  // console.log(startDateTime)

  // const myShiftDates = userInfo.shifts.map( shift => {
  //   const shiftDate = new Date(shift.start_date_time)
  //   return{
  //     setShiftDates(shiftDate)
  //   }
  //   }
    
  // )
  // const [shiftDates, setShiftDates] = useState([])
  
  // console.log(myShiftDates)
  // const getDate = (count) => {
  //   const date = new Date();
  //   const newDate = date.setDate(date.getDate() + count);
  //   return CalendarUtils.getCalendarDateString(newDate);
  // };

  // const shiftDates = userInfo.shifts.map(shift => {
  //   const dateTime = shift.start_date_time
  //   return(CalendarUtils.getCalendarDateString(dateTime))
  // })
  // console.log(shiftDates)
  
  

  return (
    <SafeAreaView >
        
        <Calendar onDayPress={day => {console.log(day.dateString)}} isMultiSelection={true} markingType="multi-period" 
        style={styles.calendar}
        // markedDates={{[shiftDates]: {marked: true, dotColor: 'red', disableTouchEvent: true}}}
        // markedDates={{
        //   [getDate(2)]: {
        //     shiftDates: true,
        //     dots: [
        //       {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
        //       {key: 'massage', color: 'red', selectedDotColor: 'white'}
        //     ]
        //   },
        //   [getDate(3)]: {
        //     disabled: true,
        //     dots: [
        //       {key: 'vacation', color: 'green', selectedDotColor: 'red'},
        //       {key: 'massage', color: 'red', selectedDotColor: 'green'}
        //     ]
        //   }
        // }}
        theme={{
          backgroundColor: '#EEF0F2',
          calendarBackground: '#EEF0F2',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e'
        }}

        />
        <View>
        {addShift ? (
          <Modal>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={()=>setAddShift(!addShift)} style={styles.addShiftExitButton}>
                <Text style={styles.addShiftExitButtonText}>x</Text>
              </Pressable>
              <Text style={styles.shiftInput}>{new Date(startDateTime).toLocaleString("en-US", dateOptions)}</Text>
                  <Pressable title='+' onPress={() => setStartOpen(true)} style={styles.addDateButton}>
                    <Text style={styles.addDateText}>+</Text>
                  </Pressable>
                  <DatePicker
                    modal
                    open={startOpen}
                    date={startDateTime}
                    onConfirm={(date) => {
                      setStartOpen(false)
                      setStartDateTime(date)
                    }}
                    onCancel={() => {
                      setStartOpen(false)
                    }}
                  />
              <Text style={styles.shiftInput}>{new Date(endDateTime).toLocaleString("en-US", dateOptions)}</Text>
                  <Pressable title='+' onPress={() => setEndOpen(true)} style={styles.addDateButton}>
                    <Text style={styles.addDateText}>+</Text>
                  </Pressable>
                  <DatePicker
                    modal
                    open={endOpen}
                    date={endDateTime}
                    onConfirm={(date) => {
                      setEndOpen(false)
                      setEndDateTime(date)
                    }}
                    onCancel={() => {
                      setEndOpen(false)
                    }}
                  />
              <Pressable style={styles.dropdown} onPress={()=>setShowDropdown(!showDropdown)}>
                  <Text style={styles.modalText}>{selected}</Text>
                  {renderDropdown}
              </Pressable>
              <TextInput style={styles.shiftInput} placeholder='hourly pay' value={hourlyPay} onChangeText={(text)=>setHourlyPay(text)}/>
              <TextInput style={styles.shiftInput} placeholder='location' value={location} onChangeText={(text)=>setLocation(text)}/>
              <TouchableOpacity 
                  style={styles.saveShiftButtonContainer} onPress={()=>{createNewShift(), setAddShift(!addShift)}} >
                <Text style={styles.saveShiftButtonText}> Save Shift </Text>
              </TouchableOpacity>
            </View>
            </View>
          </Modal>
          ):(
            (
              <TouchableOpacity 
                style={styles.addShiftButtonContainer} onPress={()=>setAddShift(!addShift)}>
                  <Text style={styles.addShiftButtonText}> Add Shift </Text>
              </TouchableOpacity>
            )
          )
        } 
        </View>     
    </SafeAreaView>
  );
}


export default CalendarContainer