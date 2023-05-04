import React, {useEffect, useContext, useState} from 'react';
import {Text, FlatList, Pressable, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyShiftItems({job_category, start_date_time, hourly_pay, location, end_date_time, id}){

    const {userInfo, myShifts, deleteShift} = useContext(AuthContext)

    const [editedStartDT, setEditedStartDT] = useState(start_date_time)
    const [editedEndDT, setEditedEndDT] = useState(end_date_time)
    const [editedJobId, setEditedJobId] = useState(job_category)
    const [editedLocation, setEditedLocation] = useState(location)
    const [editedPay, setEditedPay] = useState(hourly_pay)

    const [showShiftEdit, setShowShiftEdit] = useState(false)

    const editShift=()=>{
      fetch (`http://127.0.0.1:5555/shifts/${userInfo.id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            start_date_time: editedStartDT,
            end_date_time: editedEndDT,
            job_category: editedJobId,
            location: editedLocation,
            hourly_pay: editedPay,
          })
      })
          .then(r=>r.json())
          .then(editedShift => {
              updateShift(editedShift)
            })
    }
    

    return(
        <SafeAreaView>
            {showShiftEdit ? (
                <Text>Editing Shift</Text>

            ) : (
                <View style={styles.shiftItem}>
                    <Pressable style={styles.shiftDeleteButton} onPress={()=>deleteShift(id)}>
                        <Text style={styles.shiftDeleteText}>x</Text>
                    </Pressable>
                    <Text style={styles.shiftText}>Start: {start_date_time}</Text>
                    <Text style={styles.shiftText}>End: {end_date_time}</Text>
                    <Text style={styles.shiftText}>{job_category}</Text>
                    <Text style={styles.shiftText}>{location}</Text>
                    <Text style={styles.shiftText}>${hourly_pay}/hr</Text>
                    <Pressable style={styles.shiftDeleteButton} onPress={()=>setShowShiftEdit(!showShiftEdit)}>
                        <Text style={styles.shiftDeleteText}> edit shift </Text>
                    </Pressable>
                </View>
            )}
        
        </SafeAreaView>
      )
}

export default MyShiftItems