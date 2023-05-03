import React, {useEffect, useContext, useState, useCallback, useMemo, Fragment, useRef} from 'react';
import {Text, Pressable, View, Switch, Alert, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import {Calendar, CalendarUtils, CalendarList, Agenda, AgendaSchedule, AgendaEntry,} from 'react-native-calendars';

const INITIAL_DATE = '2023-05-05'


function CalendarContainer(){
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const {userInfo} = useContext(AuthContext)

  const myShifts = [...userInfo.shifts]
  console.log(myShifts)
  const myShiftDates = myShifts.map( shift => {
    return(
      shift.start_date_time
    )
    }
  )
  
  console.log(myShiftDates)

  const eachDate = myShiftDates.forEach(date => {
    return date
  } 
  )

  const getDate = (count) => {
    const date = new Date(eachDate);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };


  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [getDate(-1)]: {
        dotColor: 'red',
        marked: true
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red'
      }
    };
  }, [selected]);

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with selectable date</Text>
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={marked}
        />
      </Fragment>
    );
  };



  const renderCalendarWithMarkedDatesAndHiddenArrows = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
        <Calendar
          style={styles.calendar}
          current={INITIAL_DATE}
          hideExtraDays
          firstDay={1}
          markedDates={{
            [getDate(6)]: {selected: true, marked: true, disableTouchEvent: true},
            [getDate(7)]: {selected: true, marked: true, dotColor: 'red'},
            [getDate(8)]: {marked: true, dotColor: 'red', disableTouchEvent: true},
            [getDate(9)]: {marked: true},
            [getDate(10)]: {disabled: true, activeOpacity: 0, disableTouchEvent: false}
          }}
          hideArrows={true}
          // disabledByDefault={true}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMultiDotMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with multi-dot marking</Text>
        <Calendar
          style={styles.calendar}
          current={INITIAL_DATE}
          markingType={'multi-dot'}
          markedDates={{
            [getDate(2)]: {
              selected: true,
              dots: [
                {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'white'}
              ]
            },
            [getDate(3)]: {
              disabled: true,
              dots: [
                {key: 'vacation', color: 'green', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'green'}
              ]
            }
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithPeriodMarkingAndSpinner = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with period marking and spinner</Text>
        <Calendar
          // style={styles.calendar}
          current={INITIAL_DATE}
          minDate={getDate(-5)}
          displayLoadingIndicator
          markingType={'period'}
          theme={{
            calendarBackground: '#333248',
            textSectionTitleColor: 'white',
            textSectionTitleDisabledColor: 'gray',
            dayTextColor: 'red',
            todayTextColor: 'white',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
            // textDisabledColor: 'red',
            stylesheet: {
              calendar: {
                header: {
                  week: {
                    marginTop: 30,
                    marginHorizontal: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                }
              }
            }
          }}
          markedDates={{
            [getDate(-2)]: {disabled: true},
            [getDate(1)]: {textColor: 'pink'},
            [getDate(2)]: {textColor: 'pink'},
            [getDate(12)]: {startingDay: true, color: 'green', endingDay: true},
            [getDate(22)]: {startingDay: true, color: 'green'},
            [getDate(23)]: {endingDay: true, color: 'gray'},
            [getDate(25)]: {startingDay: true, color: 'gray'},
            [getDate(26)]: {color: 'gray'},
            [getDate(27)]: {endingDay: true, color: 'gray'}
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithPeriodMarkingAndDotMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with period marking and dot marking</Text>
        <Calendar
          current={INITIAL_DATE}
          minDate={getDate(-14)}
          markingType={'period'}
          markedDates={{
            [INITIAL_DATE]: {marked: true, dotColor: '#50cebb'},
            [getDate(4)]: {marked: true, dotColor: '#50cebb'},
            [getDate(9)]: {startingDay: true, color: '#50cebb', textColor: 'white'},
            [getDate(10)]: {
              color: '#70d7c7',
              customTextStyle: {
                color: '#FFFAAA',
                fontWeight: '700'
              }
            },
            [getDate(11)]: {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
            [getDate(12)]: {color: '#70d7c7', inactive: true},
            [getDate(13)]: {
              endingDay: true,
              color: '#50cebb',
              textColor: 'white',
              customContainerStyle: {
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5
              }
            },
            [getDate(25)]: {inactive: true, disableTouchEvent: true}
          }}
          disabledDaysIndexes={[0, 6]}
          theme={{
            textInactiveColor: '#a68a9f',
            textSectionTitleDisabledColor: 'grey',
            textSectionTitleColor: '#319e8e',
            arrowColor: '#319e8e'
          }}
          onDayPress={(day) => console.warn(`${day.dateString} pressed`)}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMultiPeriodMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with multi-period marking</Text>
        <Calendar
          style={styles.calendar}
          current={INITIAL_DATE}
          markingType={'multi-period'}
          markedDates={{
            [INITIAL_DATE]: {
              periods: [
                {startingDay: true, endingDay: false, color: 'green'},
                {startingDay: true, endingDay: false, color: 'orange'}
              ]
            },
            [getDate(1)]: {
              periods: [
                {startingDay: false, endingDay: true, color: 'green'},
                {startingDay: false, endingDay: true, color: 'orange'},
                {startingDay: true, endingDay: false, color: 'pink'}
              ]
            },
            [getDate(3)]: {
              periods: [
                {startingDay: true, endingDay: true, color: 'orange'},
                {color: 'transparent'},
                {startingDay: false, endingDay: false, color: 'pink'}
              ]
            }
          }}
        />
      </Fragment>
    );
  };

  const renderExamples = () => {
    return (
      <Fragment>
        {renderCalendarWithSelectableDate()}
        {renderCalendarWithMarkedDatesAndHiddenArrows()}
        {renderCalendarWithMultiDotMarking()}
        {renderCalendarWithPeriodMarkingAndSpinner()}
        {renderCalendarWithPeriodMarkingAndDotMarking()}
        {renderCalendarWithMultiPeriodMarking()}
      </Fragment>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderExamples()}
    </ScrollView>
  );
};

export default CalendarContainer;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  switchText: {
    margin: 10,
    fontSize: 16
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  disabledText: {
    color: 'grey'
  },
  defaultText: {
    color: 'purple'
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  customDay: {
    textAlign: 'center'
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2'
  }
});        



//   const timeToString = (time)=>{
//     const date = new Date(time)
//     return date.toISOString().split('T')[0]
//   }

//   const [items, setItems] = useState({})
  

//   const loadItems = (day) => {
//     settimeout(()=>{
//       for (let i = -15; i<85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000
//         const strTime = timeToString(time)
//         if (!items[strTime]) {
//           items[strTime] = []
//           const numItems = Math.floor(Math.random() * 3 + 1)
//           for (let j=0; j< numItems; j++) {
//             items[strTime].push({
//               name:'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//               day: strTime
//             })
            
//           }
//         }
//       }
//       const newItems = {}
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key]
//       })
//       setItems(newItems)
//     }, 1000)
//   }


//   const renderItem = (reservation, isFirst) => {
//     const fontSize = isFirst ? 16 : 14;
//     const color = isFirst ? 'black' : '#43515c';
//     return(
//       <TouchableOpacity style={[styles.item, {height: reservation.height}]} onPress={() => Alert.alert(reservation.name)}>
//           <Text style={{fontSize, color}}>{reservation.name}</Text>
//       </TouchableOpacity>
//     )
//   }
//   renderEmptyDate = () => {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   }

//   rowHasChanged = (r1, r2) => {
//     return r1.name !== r2.name;
//   }

//   return (
//     <View style={{flex:1}}>
//       <Agenda items={items} loadItemsforMonth={loadItems} selected={'2023-05-07'} renderItems={renderItem} renderEmptyDate={renderEmptyDate} rowHasChanged={rowHasChanged} showClosingKnob={true}/>
//     </View>

//   )
// }
// export default CalendarContainer

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   }
// });
    
    // const [addShift, setAddShift] = useState(false)
    
    // const [startDate, setStartDate] = useState('')
    // const [startTime, setStartTime] = useState('')
    // // const [endDate, setEndDate] = useState('')
    // const [jobCategory, setJobCategory] = useState('')
    // const [hourlyPay, setHourlyPay] = useState('')
    // const [location, setLocation] = useState('')

    // const [createdShift, setCreatedShift] = useState('')
    
    // const userId = userInfo.id


    // const createNewShift = () => {
    //   const newShift = {
    //     user_id: userId,
    //     start_date_time: startDate,
    //     start_time: startTime,
    //     job_id: jobCategory,
    //     hourly_pay: hourlyPay,
    //     location: location
    //   }
    //   fetch('http://127.0.0.1:5555/shifts', { 
    //     method:'POST',
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(newShift)
    //     }
    //   )
    //       .then(r => r.json())
    //       .then(shift => setCreatedShift(shift))
    // }
    // console.log(createdShift)
    // console.log(location)
    // console.log(userId)
    // console.log(jobCategory)
    // console.log(hourlyPay)
    // console.log(startTime)


//     return (
//       <SafeAreaView>
//           {addShift ? (
//               <TouchableOpacity 
//               style={styles.addShiftButtonContainer} onPress={()=>{createNewShift()}}>
//                 <Text style={styles.addShiftButtonText}> Save Shift </Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity 
//                 style={styles.addShiftButtonContainer} onPress={()=>setAddShift(!addShift)}>
//                   <Text style={styles.addShiftButtonText}> + </Text>
//               </TouchableOpacity>
//             )
//           }
//           <Calendar onDayPress={day => {setStartDate(day.dateString)}} markingType="multi-period" 
//           style={styles.calendar}
//           theme={{
//             backgroundColor: '#ffffff',
//             calendarBackground: '#ffffff',
//             textSectionTitleColor: '#b6c1cd',
//             selectedDayBackgroundColor: '#00adf5',
//             selectedDayTextColor: '#ffffff',
//             todayTextColor: '#00adf5',
//             dayTextColor: '#2d4150',
//             textDisabledColor: '#d9e'
//           }}
//           />
//           {addShift ? (
//               <View>
//                 <TextInput style={styles.shiftInput} placeholder='tap start date on calendar'>{startDate}</TextInput>
//                 {/* <TextInput style={styles.shiftInput} placeholder='tap end date on calendar'>{endDate}</TextInput> */}
//                 <TextInput style={styles.shiftInput} placeholder='start time' onChangeText={(text)=>{setStartTime(text)}}/>
//                 <TextInput style={styles.shiftInput} placeholder='job category' onChangeText={(text)=>{setJobCategory(text)}}/>
//                 <TextInput style={styles.shiftInput} placeholder='hourly pay' onChangeText={(text)=>{setHourlyPay(text)}}/>
//                 <TextInput style={styles.shiftInput} placeholder='location' onChangeText={(text)=>{setLocation(text)}}/>
//               </View>
//             ):(
//               null
//             )
//           }      
//       </SafeAreaView>
//     );
//   }

// export default CalendarContainer