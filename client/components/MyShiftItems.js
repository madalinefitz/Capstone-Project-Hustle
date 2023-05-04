import React, {useEffect, useContext, useState} from 'react';
import {Text, TextInput, Pressable, View} from 'react-native';
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

    const editShift=(id)=>{
      fetch (`http://127.0.0.1:5555/shifts/${id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            user_id: userInfo.id,
            start_date_time: editedStartDT,
            end_date_time: editedEndDT,
            job_id: editedJobId,
            location: editedLocation,
            hourly_pay: editedPay,
          })
      })
          .then(r=>r.json())
          .then(editedShift => {
              console.log(editedShift)
            })
            
    }
    

    return(
        <SafeAreaView>
            {showShiftEdit ? (
                <View style={styles.shiftItem}>
                    <Text>Editing Shift</Text>
                        <TextInput onChangeText={text=>setEditedStartDT(text)} style={styles.input} placeholder={start_date_time}/>
                        <TextInput onChangeText={text=>setEditedEndDT(text)} style={styles.input} placeholder={end_date_time}/>
                        <TextInput onChangeText={text=>setEditedJobId(text)} style={styles.input} placeholder={job_category} />
                        <TextInput onChangeText={text=>setEditedLocation(text)} style={styles.input} placeholder={location} />
                        <TextInput onChangeText={text=>setEditedPay(text)} style={styles.input} placeholder={hourly_pay.toString()} />
                    <Pressable style={styles.shiftDeleteButton} onPress={()=>{editShift(id), setShowShiftEdit(!showShiftEdit)}}>
                            <Text style={styles.shiftDeleteText}> Save Edits </Text>
                    </Pressable>
                </View>
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